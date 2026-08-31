# MODIFICATIONS.md

This file outlines how the skills differ from their upstream counterparts.

## pstack

Github: https://github.com/cursor/plugins/tree/main/pstack/skills

### bro

No changes.

### unslop

No changes.

### principle-\* (21 skills)

The 21 principle skills have `disable-model-invocation: true` removed from each skill so Codex and Claude Code can invoke the matching principle automatically. `SYSTEM_AGENTS.md` also provides a broad, multi-select decision tree that routes agents to applicable principles.

## Matt Pocock skills

Github: https://github.com/mattpocock/skills/tree/main/skills

### domain-modeling

Keeps the upstream practice of challenging ambiguous terms, checking them against the code, and updating `CONTEXT.md` as soon as meanings are settled. The adaptation changes the surrounding document model:

- The skill's only domain-modeling paper trail is `CONTEXT.md`. Unlike the local upstream copy, it does not create or offer ADRs.
- `CONTEXT-MAP.md` is treated as an existing routing mechanism. Creating or expanding one requires the user's permission rather than being inferred from repository size.
- It can install a short domain-language instruction in an existing `AGENTS.md` or `CLAUDE.md` when the user asks to establish the practice.
- It adds an explicit maintenance workflow for reviewing aliases, overloaded terms, stale concepts, and inconsistent relationships.
- Its context format allows an optional relationships section and puts more emphasis on minimal edits, agreed language, and separation from implementation details.

### grilling

Keeps the upstream design-tree model, frontier-based question rounds, recommendations, fact-finding, and user confirmation gate. The adaptation makes the workflow more explicit and less dependent on a particular agent runtime:

- Fact-finding may use ordinary tools, parallel calls, or subagents. Subagents are not required.
- It distinguishes user decisions from agent recommendations and leaves a choice open when the user has not decided.
- Changed answers reopen dependent branches.
- Large interviews may be split into smaller sessions without silently dropping unresolved branches.
- Early stops have defined accept-partial and discard outcomes.
- The skill ends with a structured summary and is explicitly interview-only. It does not write files or implement the result.

### grilling-with-docs

This is a full redesign of upstream `grill-with-docs`. The upstream skill is a thin router that invokes `grilling` and `domain-modeling`, which can produce glossary entries and ADRs during the interview. The adaptation is an orchestrated workflow over `grilling` and `domain-modeling`:

- It reads existing context and relevant code before and after the interview.
- It keeps all proposed documentation changes in the conversation until the design tree is closed and the user confirms the final summary.
- It writes confirmed domain language to `CONTEXT.md`. It does not use ADRs.
- It can be selected through its description like an ordinary skill. The local upstream copy disables model invocation and must be called explicitly.
- A conflict found before writing reopens the interview and requires another confirmation.
- Partial or discarded interviews do not change documentation.
- Context documentation is updated only where the confirmed domain language belongs. The workflow does not create placeholder files and does not implement the design.

### writing-for-agents

The main `SKILL.md` and `agents/openai.yaml` are unchanged. The adaptation changes only `SKILL-MECHANICS.md`:

- It pairs `disable-model-invocation: true` with `policy.allow_implicit_invocation: false` when defining a user-invoked skill. Model-invocable skills are discoverable and callable through the Skill tool; user-invoked skills are neither.
- Skill-to-skill workflows use `Call the Skill tool with "<skill-name>"`, and only model-invocable skills can be targets. A relative link discloses reference material rather than invoking a workflow.

### codebase-design

Keeps the upstream deep-module vocabulary, deletion test, seam discipline, dependency categories, and design-it-twice comparison. The adaptation changes invocation and agent coordination:

- Model invocation is disabled for both Claude Code and Codex.
- Other local skills read it through a relative file reference instead of relying on a runtime-specific skill call.
- Design-it-twice uses parallel subagents when the agent supports them and sequential independent designs otherwise.

### improve-codebase-architecture

Keeps the upstream hotspot-led scan, friction questions, deletion test, candidate cards, visual comparison, and recommendation strengths. The adaptation narrows the workflow and makes it portable:

- The skill is a project-read-only survey. It stops after the report and does not grill, edit `CONTEXT.md`, create ADRs, propose interfaces, or implement a candidate.
- It reads the local `codebase-design` adaptation through a relative file reference rather than a runtime-specific skill call.
- Codebase exploration uses available tools, with delegation optional rather than requiring a particular subagent command.
- Every report uses the local `html-communication` skill. That skill owns the Tailwind CDN, Mermaid CDN, and visual-report guidance; the upstream temp-directory, browser-opening, and `HTML-REPORT.md` workflow is removed.
- Model invocation is disabled for both Claude Code and Codex.

## anti-slop

Github: https://github.com/dmmulroy/anti-slop/tree/main/skills/install-anti-slop

### install-anti-slop

The installation workflow, script, and bundled Oxlint plugin are unchanged. The local copy is explicit-only in Claude Code and Codex because it is a one-time repository setup skill.

## Theo's SKILLS.md video

These skills were rewritten using many of the ideas from his video.
