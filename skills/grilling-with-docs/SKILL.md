---
name: grilling-with-docs
description: A relentless interview to sharpen a plan or design.
---

# Grilling with docs

Combine `grilling` and `domain-modeling` in one workflow. Finish the interview before editing documentation. This ordering overrides `domain-modeling`'s normal practice of recording terms as soon as they settle.

This skill writes documentation only. It does not implement the resulting design.

## Prepare the interview

Load and follow the two supporting skills:

- `grilling` controls the interview, fact-finding, question rounds, recommendations, changed answers, and confirmation gate.
- `domain-modeling` controls the meaning and format of `CONTEXT.md` and `CONTEXT-MAP.md`.

Read applicable context files before asking questions. Inspect relevant code whenever it can establish facts or expose a conflict. Treat existing documentation as input to the interview, not as permission to make new decisions.

## Grill without writing

Run the interview according to `grilling`. Keep every proposed documentation change in the conversation while the design tree remains open.

Do not create or edit `CONTEXT.md`, `CONTEXT-MAP.md`, or any other project file during the interview. A settled answer is not enough to open the write gate. The user must confirm the closing summary as shared understanding.

If an answer changes, reopen affected decisions before presenting another closing summary. Do not preserve superseded answers as documentation history.

## Handle an early stop

If the user stops before confirming shared understanding, follow `grilling` to distinguish accept partial from discard.

- On accept partial, summarize settled decisions and unresolved branches. Do not edit documentation.
- On discard, abandon the session's conclusions and do not edit documentation.

Both outcomes end this workflow without implementation.

## Write after confirmation

Once the user confirms shared understanding, compare the confirmed summary with the applicable context and code before editing anything.

If that comparison exposes a conflict or missing decision that could materially change the documentation, resume the interview. Present the affected questions and require a new confirmation before writing.

When no decision remains open, use `domain-modeling` to update only domain terms settled in the confirmed summary. Do not create or expand `CONTEXT-MAP.md` without the user's permission. Check that the result contains no unresolved ideas or incidental implementation details.

Do not create a document merely to prove the workflow ran. A confirmed session may require no context changes.

## Finish

Report:

- which context files changed;
- which confirmed domain terms each change records;
- any confirmed material that did not belong in project context; and
- that implementation remains a separate step.
