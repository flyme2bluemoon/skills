---
name: grilling-with-docs
description: Interview the user to settle a project design, then record the confirmed domain language and specifications. Use when the user wants a decision-focused grilling session with a durable project paper trail.
---

# Grilling with docs

Combine `grilling`, `domain-modeling`, and `specs` in one workflow. Finish the interview before editing documentation. This ordering overrides `domain-modeling`'s normal practice of recording terms as soon as they settle.

This skill writes documentation only. It does not implement the resulting design.

## Prepare the interview

Load and follow the three supporting skills:

- `grilling` controls the interview, fact-finding, question rounds, recommendations, changed answers, and confirmation gate.
- `domain-modeling` controls the meaning and format of `CONTEXT.md` and `CONTEXT-MAP.md`.
- `specs` controls the authority, scope, and format of `docs/specs/*.md`.

Read applicable context and specification files before asking questions. Inspect relevant code whenever it can establish facts or expose a conflict. Treat existing documentation as input to the interview, not as permission to make new decisions.

## Grill without writing

Run the interview according to `grilling`. Keep every proposed documentation change in the conversation while the design tree remains open.

Do not create or edit `CONTEXT.md`, `CONTEXT-MAP.md`, `docs/specs/*.md`, or any other project file during the interview. A settled answer is not enough to open the write gate. The user must confirm the closing summary as shared understanding.

If an answer changes, reopen affected decisions before presenting another closing summary. Do not preserve superseded answers as documentation history.

## Handle an early stop

If the user stops before confirming shared understanding, follow `grilling` to distinguish accept partial from discard.

- On accept partial, summarize settled decisions and unresolved branches. Do not edit documentation.
- On discard, abandon the session's conclusions and do not edit documentation.

Both outcomes end this workflow without implementation.

## Write after confirmation

Once the user confirms shared understanding, compare the confirmed summary with the applicable context, specifications, and code before editing anything.

If that comparison exposes a conflict or missing decision that could materially change the documentation, resume the interview. Present the affected questions and require a new confirmation before writing.

When no decision remains open:

1. Use `domain-modeling` to update only domain terms settled in the confirmed summary. Do not create or expand `CONTEXT-MAP.md` without the user's permission.
2. Use `specs` to update the applicable living specifications with the confirmed goal-state decisions. Update existing files in place and create a new spec only when no suitable one exists.
3. Check both document sets together. Their terminology and requirements must agree, and neither may contain unresolved ideas or incidental implementation details.

Do not create a document merely to prove the workflow ran. A confirmed session may require only context changes, only specification changes, both, or neither.

## Finish

Report:

- which context and specification files changed;
- which confirmed decisions each change records;
- any confirmed material that did not belong in either document; and
- that implementation remains a separate step.
