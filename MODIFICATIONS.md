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

This is a full redesign of upstream `grill-with-docs`. The upstream skill is a thin router that invokes `grilling` and `domain-modeling`, which can produce glossary entries and ADRs during the interview. The adaptation is an orchestrated workflow over `grilling`, `domain-modeling`, and `specs`:

- It reads existing context, specifications, and relevant code before and after the interview.
- It keeps all proposed documentation changes in the conversation until the design tree is closed and the user confirms the final summary.
- It writes the confirmed domain language to `CONTEXT.md` and goal-state requirements to `docs/specs/*.md`. It does not use ADRs.
- It can be selected through its description like an ordinary skill. The local upstream copy disables model invocation and must be called explicitly.
- A conflict found before writing reopens the interview and requires another confirmation.
- Partial or discarded interviews do not change documentation.
- Documentation is updated only where the confirmed decisions belong. The workflow does not create placeholder files and does not implement the design.

### specs

Loosely based on upstream `to-spec`, but built for a different specification lifecycle. `to-spec` synthesizes the current conversation into a fixed feature template, checks testing seams with the user, and publishes the result to an issue tracker with a triage label. `specs` instead manages living files under `docs/specs/`:

- Specifications are prescriptive descriptions of the intended goal state, not issue records, implementation inventories, or append-only decision logs.
- The skill can create, maintain, inspect, or apply a specification during planning, implementation, and review.
- It prefers updating an applicable specification in place and removes superseded requirements instead of preserving decision history.
- The code and specification are independent sources for current behavior and intended behavior. A mismatch is surfaced as a conflict rather than resolved by rewriting the spec to match the code.
- Only explicit user decisions may become requirements. Recommendations, unanswered questions, and tentative ideas stay out.
- It uses a flexible project-file format rather than `to-spec`'s required problem, solution, user-story, implementation, testing, and scope sections.
- It has no issue-tracker, setup-skill, triage-label, or mandatory testing-seam dependency.
- It can be selected through its description during specification work. The local `to-spec` copy disables model invocation and only runs when explicitly called.

### writing-for-agents

No changes.

## anti-slop

Github: https://github.com/dmmulroy/anti-slop/tree/main/skills/install-anti-slop

### install-anti-slop

The installation workflow, script, and bundled Oxlint plugin are unchanged. The local copy is explicit-only in Claude Code and Codex because it is a one-time repository setup skill.

## Theo's SKILLS.md video

These skills were rewritten using many of the ideas from his video.
