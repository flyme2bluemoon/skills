/** Push local skills into the Notion skills database. GitHub remains the source of truth. */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const ENV_NAME = ".env";
const ENV_KEY = "NOTION_SKILLS_DATABASE_ID";
const SKILLS_DIRNAME = "skills";
const SKILL_FILE = "SKILL.md";
const RICH_TEXT_LIMIT = 2000;

const USAGE = `Usage: sync-notion <command> [options]

Push local skills into the Notion skills database. GitHub remains the source of truth.

Commands:
  push [slugs...]          upsert local skills into Notion

Options:
  --database-id <id>       Notion skills database ID; stored in .env as ${ENV_KEY}
  --dry-run                print actions without writing to Notion
`;

class CLIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CLIError";
  }
}

type Skill = {
  slug: string;
  name: string;
  description: string;
  body: string;
  path: string;
};

type NotionPage = {
  id?: string;
  properties?: Record<string, { title?: Array<{ plain_text?: string }> } | undefined>;
};

type QueryPayload = {
  results?: NotionPage[];
  has_more?: boolean;
  next_cursor?: string | null;
};

function repoRoot(): string {
  return join(dirname(fileURLToPath(import.meta.url)), "..");
}

function unquote(value: string): string {
  if (
    value.length >= 2 &&
    value[0] === value[value.length - 1] &&
    (value[0] === "'" || value[0] === '"')
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function splitLinesKeepEnds(text: string): string[] {
  if (text.length === 0) {
    return [];
  }
  return text.split(/(?<=\r\n|\n|\r)/);
}

function parseFrontmatter(text: string): { fields: Record<string, string>; body: string } {
  if (!text.startsWith("---\n") && !text.startsWith("---\r\n")) {
    throw new Error("missing YAML frontmatter");
  }
  const rest = text.slice(text.indexOf("\n") + 1);
  const fmLines: string[] = [];
  const bodyLines: string[] = [];
  let inBody = false;
  for (const line of rest.split(/(?<=\n)/)) {
    if (!inBody && line.trim() === "---") {
      inBody = true;
      continue;
    }
    if (!inBody) {
      fmLines.push(line);
    } else {
      bodyLines.push(line);
    }
  }
  if (!inBody) {
    throw new Error("unterminated YAML frontmatter");
  }
  const fields: Record<string, string> = {};
  for (const raw of fmLines) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }
    const sep = line.indexOf(":");
    if (sep === -1) {
      throw new Error(`invalid frontmatter line: ${line}`);
    }
    fields[line.slice(0, sep).trim()] = unquote(line.slice(sep + 1).trim());
  }
  let body = bodyLines.join("");
  while (body.startsWith("\n")) {
    body = body.slice(1);
  }
  return { fields, body };
}

function parseEnv(text: string): Record<string, string> {
  const values: Record<string, string> = {};
  for (const raw of text.split(/\r\n|\n|\r/)) {
    let line = raw.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }
    if (line.startsWith("export ")) {
      line = line.slice("export ".length).trim();
    }
    const sep = line.indexOf("=");
    if (sep === -1) {
      continue;
    }
    values[line.slice(0, sep).trim()] = unquote(line.slice(sep + 1).trim());
  }
  return values;
}

async function upsertEnvKey(path: string, key: string, value: string): Promise<void> {
  const raw = existsSync(path) ? await readFile(path, "utf8") : "";
  const lines = splitLinesKeepEnds(raw);
  let updated = false;
  const newLines: string[] = [];
  for (const line of lines) {
    const stripped = line.trim();
    const check = stripped.startsWith("export ")
      ? stripped.slice("export ".length).trim()
      : stripped;
    if (!check || check.startsWith("#")) {
      newLines.push(line);
      continue;
    }
    const eq = check.indexOf("=");
    const existingKey = (eq === -1 ? check : check.slice(0, eq)).trim();
    if (existingKey === key) {
      newLines.push(`${key}=${value}\n`);
      updated = true;
    } else {
      newLines.push(line);
    }
  }
  if (!updated) {
    if (newLines.length > 0 && !newLines[newLines.length - 1]?.endsWith("\n")) {
      newLines[newLines.length - 1] += "\n";
    }
    newLines.push(`${key}=${value}\n`);
  }
  await writeFile(path, newLines.join(""));
}

async function resolveDatabaseId(root: string, supplied: string | undefined): Promise<string> {
  const envPath = join(root, ENV_NAME);
  if (supplied) {
    await upsertEnvKey(envPath, ENV_KEY, supplied);
    return supplied;
  }
  if (existsSync(envPath)) {
    const value = parseEnv(await readFile(envPath, "utf8"))[ENV_KEY]?.trim() ?? "";
    if (value) {
      return value;
    }
  }
  throw new CLIError(`Missing ${ENV_KEY}. Pass --database-id or set it in ${ENV_NAME}.`);
}

async function parseSkill(path: string): Promise<Skill> {
  const { fields, body } = parseFrontmatter(await readFile(path, "utf8"));
  const slug = basename(dirname(path));
  return {
    slug,
    name: fields.name || slug,
    description: fields.description ?? "",
    body,
    path,
  };
}

async function discoverSkills(root: string, slugs?: string[]): Promise<Skill[]> {
  const skillsRoot = join(root, SKILLS_DIRNAME);
  const wanted = slugs ? new Set(slugs) : undefined;
  const entries = (await readdir(skillsRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const found: Skill[] = [];
  for (const slug of entries) {
    if (wanted && !wanted.has(slug)) {
      continue;
    }
    const skillMd = join(skillsRoot, slug, SKILL_FILE);
    if (!existsSync(skillMd)) {
      continue;
    }
    found.push(await parseSkill(skillMd));
  }

  if (wanted) {
    const present = new Set(found.map((skill) => skill.slug));
    const missing = [...wanted].filter((slug) => !present.has(slug)).sort();
    if (missing.length > 0) {
      throw new CLIError(`Unknown skill slug(s): ${missing.join(", ")}`);
    }
  }
  return found;
}

function createMarkdown(title: string, body: string): string {
  return `---\ntitle: ${title}\n---\n\n${body}`;
}

function titleOf(page: NotionPage): string {
  const props = page.properties ?? {};
  const title = props["Skill name"] ?? props.title ?? {};
  const items = title.title ?? [];
  return items.map((item) => item.plain_text ?? "").join("");
}

function runCommand(
  command: string,
  args: string[],
  stdin?: string,
): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args);
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk: string) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      resolve({ code: code ?? 1, stdout, stderr });
    });
    if (stdin === undefined) {
      child.stdin.end();
    } else {
      child.stdin.end(stdin);
    }
  });
}

async function runNtn(args: string[], stdin?: string, retries = 5): Promise<string> {
  const cmd = ["ntn", ...args];
  let delay = 1000;
  for (let attempt = 0; attempt < retries; attempt++) {
    let result: { code: number; stdout: string; stderr: string };
    try {
      result = await runCommand("ntn", args, stdin);
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      throw new CLIError(`$ ${cmd.join(" ")}\n${detail}`);
    }
    if (result.code === 0) {
      return result.stdout;
    }
    const combined = `${result.stderr}\n${result.stdout}`;
    if (combined.includes("429") && attempt < retries - 1) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      delay *= 2;
      continue;
    }
    throw new CLIError(`$ ${cmd.join(" ")}\n${combined.trim()}`);
  }
  throw new CLIError(`$ ${cmd.join(" ")}\nretries exhausted`);
}

function parseJson<T>(stdout: string): T {
  const trimmed = stdout.trim();
  if (!trimmed) {
    return {} as T;
  }
  return JSON.parse(trimmed) as T;
}

class Notion {
  async queryPages(databaseId: string): Promise<NotionPage[]> {
    const pages: NotionPage[] = [];
    let cursor: string | undefined;
    while (true) {
      const args = ["datasources", "query", databaseId, "--limit", "100", "--json"];
      if (cursor) {
        args.push("--start-cursor", cursor);
      }
      const payload = parseJson<QueryPayload>(await runNtn(args));
      pages.push(...(payload.results ?? []));
      if (!payload.has_more) {
        return pages;
      }
      cursor = payload.next_cursor ?? undefined;
      if (!cursor) {
        return pages;
      }
    }
  }

  async createPage(databaseId: string, title: string, body: string): Promise<NotionPage> {
    const stdout = await runNtn(
      ["pages", "create", "--parent", `database:${databaseId}`, "--json"],
      createMarkdown(title, body),
    );
    return parseJson<NotionPage>(stdout);
  }

  async editPage(pageId: string, body: string): Promise<NotionPage> {
    const stdout = await runNtn(
      ["pages", "edit", pageId, "--allow-deleting-content", "--json"],
      body,
    );
    return parseJson<NotionPage>(stdout);
  }

  async setDescription(pageId: string, description: string): Promise<void> {
    const content = description.slice(0, RICH_TEXT_LIMIT);
    const payload = {
      properties: {
        Description: {
          rich_text: content ? [{ type: "text", text: { content } }] : [],
        },
      },
    };
    await runNtn(["api", `v1/pages/${pageId}`, "-X", "PATCH", "-d", JSON.stringify(payload)]);
  }
}

function indexPages(pages: NotionPage[]): Map<string, NotionPage> {
  const byTitle = new Map<string, NotionPage>();
  for (const page of pages) {
    const title = titleOf(page);
    if (!title) {
      continue;
    }
    if (byTitle.has(title)) {
      console.error(`warning: duplicate Notion title '${title}'; using ${page.id}`);
    }
    byTitle.set(title, page);
  }
  return byTitle;
}

function warnUnmatchedNotionPages(byTitle: Map<string, NotionPage>, localNames: Set<string>): void {
  for (const title of [...byTitle.keys()].sort()) {
    if (!localNames.has(title)) {
      console.error(`warning: Notion skill '${title}' is not in the repo`);
    }
  }
}

async function push(
  root: string,
  slugs: string[] | undefined,
  dryRun: boolean,
  databaseIdArg?: string,
): Promise<number> {
  const databaseId = await resolveDatabaseId(root, databaseIdArg);
  const skills = await discoverSkills(root, slugs);
  const localNames = new Set((await discoverSkills(root)).map((skill) => skill.name));
  const notion = new Notion();
  const byTitle = indexPages(await notion.queryPages(databaseId));
  warnUnmatchedNotionPages(byTitle, localNames);
  let created = 0;
  let updated = 0;
  for (const skill of skills) {
    const page = byTitle.get(skill.name);
    const action = page ? "update" : "create";
    console.log(`${action.padEnd(6)} ${skill.name}`);
    if (dryRun) {
      continue;
    }
    let pageId: string | undefined;
    if (page) {
      const result = await notion.editPage(page.id ?? "", skill.body);
      pageId = result.id || page.id;
      updated += 1;
    } else {
      const result = await notion.createPage(databaseId, skill.name, skill.body);
      pageId = result.id;
      created += 1;
    }
    if (!pageId) {
      throw new CLIError(`Notion did not return a page id for ${skill.name}`);
    }
    await notion.setDescription(pageId, skill.description);
  }
  if (dryRun) {
    console.log(`dry-run: ${skills.length} skill(s)`);
  } else {
    console.log(`created ${created}, updated ${updated}`);
  }
  return 0;
}

function parsePushArgs(argv: string[]): {
  slugs: string[];
  databaseId: string | undefined;
  dryRun: boolean;
} {
  try {
    const { values, positionals } = parseArgs({
      args: argv,
      allowPositionals: true,
      strict: true,
      options: {
        "database-id": { type: "string" },
        "dry-run": { type: "boolean", default: false },
        help: { type: "boolean", short: "h", default: false },
      },
    });
    if (values.help) {
      process.stdout.write(USAGE);
      process.exit(0);
    }
    return {
      slugs: positionals,
      databaseId: values["database-id"],
      dryRun: values["dry-run"] ?? false,
    };
  } catch (error) {
    throw new CLIError(error instanceof Error ? error.message : String(error));
  }
}

async function main(): Promise<number> {
  const argv = process.argv.slice(2);
  if (argv.includes("-h") || argv.includes("--help")) {
    process.stdout.write(USAGE);
    return 0;
  }
  if (argv.length === 0) {
    process.stderr.write(USAGE);
    return 2;
  }
  const [command, ...rest] = argv;
  if (command !== "push") {
    throw new CLIError(`unknown command: ${command}`);
  }
  const { slugs, databaseId, dryRun } = parsePushArgs(rest);
  return push(repoRoot(), slugs.length > 0 ? slugs : undefined, dryRun, databaseId);
}

try {
  process.exit(await main());
} catch (error) {
  if (error instanceof CLIError) {
    console.error(error.message);
    process.exit(1);
  }
  throw error;
}
