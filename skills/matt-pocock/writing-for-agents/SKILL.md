---
name: writing-for-agents
description: Write or revise skills, AGENTS.md, CLAUDE.md, and reference documents that guide agents.
---

# Writing for agents

Write instructions that give an agent the context, constraints, and decision criteria it needs to complete the task. Preserve the user's preferences and operational requirements. Let the agent choose the procedure when correctness does not depend on a fixed sequence.

For skill frontmatter, invocation policy, and workflow dependencies, read [SKILL-MECHANICS.md](SKILL-MECHANICS.md).

## Decide what belongs

Keep information the agent cannot cheaply discover from the environment: project conventions, reasons for a choice, fragile operational details, authorization boundaries, and the intended outcome.

Review generic advice and past workarounds against the models that will use the document. A rule that helped one model may constrain another. Remove instructions supported only by habit; retain demonstrated requirements. Favor deleting a redundant sentence over compressing it into jargon.

## Make discovery precise

A skill description or document pointer should say what the material does and when it applies. Name distinct cases briefly. Keep workflow steps and long examples in the target document.

For example, a migration skill should trigger when adding or reviewing migrations. Merely reading a database query is not enough. A document pointer can say, "Read deployment.md when preparing a deployment."

When useful guidance is missed, inspect the pointer and invocation policy before adding its whole body to `AGENTS.md`.

## Organize by need

Keep shared purpose, constraints, and completion criteria in the entrypoint. Move substantial detail needed by only one branch into a reference, and link it where that branch is selected. A short, coherent skill can remain one file.

Keep a concept's definition, rules, and exceptions together. Maintain one authoritative copy of each rule. Use terms the intended reader already understands, defining project-specific language where necessary.

Split a workflow when its modes need meaningfully different information, or a real handoff isolates independent work. Extra files and routers need a concrete benefit.

## Define boundaries and completion

Describe the observable result that makes the task complete and the limits of its scope. For implementation, include relevant verification and resolving failures caused by the change. For an interview, specify which decisions must be settled and whether confirmation is part of the requested workflow.

Distinguish requirements from defaults. Reserve fixed ordering for actual dependencies, such as confirming a design before publishing it. Make optional exploration and examples recognizably optional.

State what the agent can do under existing authorization and where it must ask. Preserve explicit approval requirements. Phrase reversible execution work so the agent can continue through the requested outcome without inventing additional approval gates.

## Review and evaluate

Inspect the finished document for conflicting instructions, duplicate rules, stale references, and triggers that attract unrelated work. Check that removing a procedure did not remove a required capability or boundary.

For a substantial behavioral change, compare the old and revised instructions on representative requests in fresh sessions when practical. Include a request that should trigger the skill, a nearby request that should not, and a case that exercises its authorization or completion boundary. Hold task inputs and model settings constant when comparing versions.

Judge actual decisions and artifacts, including unnecessary reads, tool calls, approval pauses, and premature stops. Shorter text and valid frontmatter are useful structural results; they do not prove better model behavior. Report which kind of validation was performed. Add new rules only for observed failures that the rule can address.
