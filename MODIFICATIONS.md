# MODIFICATIONS.md

This file outlines how the skills differ from their upstream counterparts.

The prompt and routing revisions draw on OpenAI's [Rethinking skills and prompts for GPT-6 Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra). They preserve local preferences while reducing broad triggers, duplicated instructions, and mandatory procedures.

## pstack

Github: https://github.com/cursor/plugins/tree/main/pstack/skills

### pstack-principle-\* (23 skills)

The 23 principle skills have `disable-model-invocation: true` removed so Codex and Claude Code can select applicable principles. `SYSTEM_AGENTS.md` uses task-specific selection rather than a mandatory catalog walkthrough.

Several principles also differ behaviorally:

- `build-the-lever` chooses automation when repetition or reproducible evidence justifies it. It allows existing tools and direct edits instead of requiring a new artifact for all nontrivial work.
- `prove-it-works` matches verification to the claim, prefers existing checks, and stops after relevant and required checks pass. It distinguishes structural prompt validation from behavioral evaluation.
- `sequence-verifiable-units` permits mechanical batches at meaningful verification boundaries and follows the project's Git workflow. It does not require a rebase or a check after every individual edit.
- `never-block-on-the-human` preserves explicit approval rules and existing authorization while allowing scoped, reversible execution to continue.
- `guard-the-context-window` supports filtered reads and optional delegation, and moves branch-specific detail behind contextual references.
- `attack-the-premise` chooses evidence for the actual failing assumption. Actor imbalance is one diagnostic case rather than a required explanation for every repeated failure.
- `encode-lessons-in-structure` targets demonstrated recurring mistakes, keeps enforcement proportional, and uses existing skills, `AGENTS.md`, or `CONTEXT.md` for durable guidance rather than personal memory notes.

The import helper generates temporary review copies. It does not overwrite local adaptations or copy style rules into `SYSTEM_AGENTS.md`.

### unslop

It remains model-invocable because other skills call it as a workflow dependency. Its description targets substantive prose editing. The numbered style rules remain intact; `SYSTEM_AGENTS.md` keeps only a short baseline and a task-specific invocation.

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
- It can be selected through its description like an ordinary skill. The description distinguishes interviewing plus documentation from an interview alone. The local upstream copy disables model invocation and must be called explicitly.
- A conflict found before writing reopens the interview and requires another confirmation.
- Partial or discarded interviews do not change documentation.
- Context documentation is updated only where the confirmed domain language belongs. The workflow does not create placeholder files and does not implement the design.

### writing-for-agents

The main `SKILL.md` now emphasizes task outcomes, precise discovery, conditional references, explicit authorization, and evaluation against representative requests. It removes the upstream theory-heavy writing model and fixed-process framing while retaining single-source guidance, contextual pointers, co-location, and pruning. `agents/openai.yaml` is unchanged.

`SKILL-MECHANICS.md` also differs:

- It pairs `disable-model-invocation: true` with `policy.allow_implicit_invocation: false` when defining a user-invoked skill. Model-invocable skills are discoverable and callable through the Skill tool; user-invoked skills are neither.
- Skill-to-skill workflows use `Call the Skill tool with "<skill-name>"`, and only model-invocable skills can be targets. A relative link discloses reference material rather than invoking a workflow. Runtimes without a Skill tool use their supported skill-loading mechanism while preserving explicit-only restrictions.

### codebase-design

Keeps the upstream deep-module vocabulary, deletion test, seam discipline, dependency categories, and design-it-twice comparison. The adaptation changes invocation and agent coordination:

- Model invocation is enabled so other local skills can call it through the Skill tool convention. The description targets module responsibilities and interface design.
- Users can still invoke it explicitly in both Claude Code and Codex.
- Design-it-twice uses parallel subagents when the agent supports them and sequential independent designs otherwise.

### improve-codebase-architecture

The adaptation makes the workflow portable and matches this repository's approved paper trail:

- The grilling loop updates settled domain language only when `CONTEXT.md` already exists. It does not create the file.
- When exploring alternative interfaces for a deepening candidate, it calls `codebase-design` and runs that skill's design-it-twice workflow. It stops at design comparison and does not implement the refactor.
- Codebase exploration uses ordinary tools. Delegation is optional and does not require a particular subagent command.
- Every report uses the local `html-communication` skill for Tailwind CDN, Mermaid CDN, and visual-report guidance. The upstream temp-directory, browser-opening, and `HTML-REPORT.md` workflow is removed.
- Model invocation is disabled for both Claude Code and Codex.

## anti-slop

Github: https://github.com/dmmulroy/anti-slop/tree/main/skills/install-anti-slop

### install-anti-slop

The installation workflow, script, and bundled Oxlint plugin are unchanged. The local copy is explicit-only in Claude Code and Codex because it is a one-time repository setup skill.

## Theo's SKILLS.md video

These skills were rewritten using many of the ideas from his video.
