import { access, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ALLOWED_TARGETS = new Set([
  "principle-attack-the-premise",
  "principle-test-behavior-not-implementation",
  "unslop",
]);

const DEFAULT_TARGETS = [
  "principle-attack-the-premise",
  "principle-test-behavior-not-implementation",
  "unslop",
];

const UNSLOP_DESCRIPTION =
  "description: Cut AI tells from any writing. Must always apply.";
const ADAPTED_UNSLOP_DESCRIPTION =
  "description: Edit substantive human-facing prose to remove AI writing patterns while preserving meaning and tone.";

function repoRoot(): string {
  return join(dirname(fileURLToPath(import.meta.url)), "..");
}

function localName(target: string): string {
  return target === "unslop" ? "unslop" : `pstack-${target}`;
}

function adaptMarkdown(source: string, target: string, local: string): string {
  return source
    .split("\n")
    .filter((line) => line !== "disable-model-invocation: true")
    .map((line) => {
      if (line === `name: ${target}`) {
        return `name: ${local}`;
      }
      if (line === UNSLOP_DESCRIPTION) {
        return ADAPTED_UNSLOP_DESCRIPTION;
      }
      return line.replaceAll("](../principle-", "](../pstack-principle-");
    })
    .join("\n");
}

async function main(): Promise<void> {
  const upstreamRoot =
    process.env.PSTACK_SKILLS_ROOT ??
    join(repoRoot(), "skills-examples/cursor-plugins/pstack/skills");
  const targets = process.argv.slice(2).length > 0 ? process.argv.slice(2) : DEFAULT_TARGETS;

  for (const target of targets) {
    if (!ALLOWED_TARGETS.has(target)) {
      console.error(`Unknown pstack skill: ${target}`);
      process.exit(2);
    }
    const skillPath = join(upstreamRoot, target, "SKILL.md");
    try {
      await access(skillPath);
    } catch {
      console.error(`Missing upstream skill: ${skillPath}`);
      process.exit(1);
    }
  }

  const outputRoot = await mkdtemp(join(tmpdir(), "pstack-review."));
  for (const target of targets) {
    const local = localName(target);
    const destDir = join(outputRoot, local);
    await mkdir(destDir, { recursive: true });
    const source = await readFile(join(upstreamRoot, target, "SKILL.md"), "utf8");
    await writeFile(join(destDir, "SKILL.md"), adaptMarkdown(source, target, local));
  }

  process.stdout.write(
    `Review copies: ${outputRoot}\nCompare with skills/pstack/ before applying upstream changes.\n`,
  );
}

await main();
