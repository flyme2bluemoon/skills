# AGENTS.md

## General guidelines

- When creating a new skill based on a reference skill that someone else has created, make sure to add it to `MODIFICATIONS.md` to explain how our version differs from the reference skill.
    - The modifications should be described at a high level. much of the wording is the same, just outline what differences there are. If the skill was completely different, explain the different behaviours in the skills and the different architectural decisions surrounding the skill's design.
    - When there is no change, just state "No changes."
    - If the reference skill source is not consulted and only ideas are used, some variant of "These skills were rewritten using many of the ideas [insert source]." will suffice

## Guidelines for adapting Matt Pocock skills

- Many of Matt Pocock's skills rely on each other. When the user asks you to create a skill based on one of them, check whether its dependencies are already present in `skills/`. Read existing adaptations because they may differ from Matt Pocock's versions. If a dependency has not been adapted, consider whether the user should create it first.

### Paper trail

For adapted skills, a paper trail means durable working context, decisions, or specifications that the skill writes alongside its primary output. The approved paper trail is:

- `AGENTS.md` for agent instructions. `CLAUDE.md` includes this file, so `AGENTS.md` is the source of truth.
- `CONTEXT.md` for project or domain context.
    - `CONTEXT-MAP.md` for routing agents to the relevant `CONTEXT.md` when a repository has more than one context.

These approaches are deferred. Do not use them by default, but they are not permanently rejected:

- ADRs, including `docs/adr/*.md` and context-specific ADR directories.
- Per-repository agent configuration under `docs/agents/`, including:
    - `docs/agents/issue-tracker.md`
    - `docs/agents/domain.md`
    - `docs/agents/triage-labels.md`

Recommend a deferred approach only when it would materially strengthen the skill. Name the capability it adds, explain why the approved files are insufficient, account for the maintenance cost, and wait for the user's approval.

Treat any other paper trail as unevaluated. Redesign around the approved files or no durable record when that preserves the skill's capability. If it would materially weaken the skill, ask the user first and explain what would be written, where it would live, and why it is needed. Do not silently remove the capability or introduce a new location.

## Guidelines for adapting pstack skills

- Many of Lauren's pstack skills are Cursor specific. Make sure that they are made to work with the tools I use: Codex and Claude Code. However, I still want my skills to be written in a way where they are very portable to any AI agent that I may want to test out.
