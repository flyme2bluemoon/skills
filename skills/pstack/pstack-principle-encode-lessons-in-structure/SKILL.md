---
name: pstack-principle-encode-lessons-in-structure
description: Turn a recurring, mechanically detectable mistake into a type, lint rule, check, or shared implementation.
---

# Encode lessons in structure

When the same correction recurs, decide whether a mechanism can prevent it reliably. Prefer an existing type, configuration setting, lint rule, or shared implementation over another repeated instruction.

Choose a mechanism that catches the demonstrated failure without rejecting valid work. Keep enforcement proportional to the error's cost and the mechanism's maintenance burden. Verify both a failing case and a valid case when introducing a new guard.

If the correction requires judgment, keep one concise instruction with a concrete example in the applicable skill or `AGENTS.md`. A one-off correction can remain in the conversation. Use `CONTEXT.md` for settled domain meaning.

Fix the current instance within the task's scope. Broader tooling changes need the same scope and permissions as any other work. Remove redundant instructions once their replacement covers the intended behavior, retaining any rationale needed to maintain it.
