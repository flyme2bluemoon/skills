# Specification format

Use the smallest structure that clearly expresses the user's decisions. A specification is a contract for the goal state, not a record of the conversation that produced it.

## Default shape

```markdown
# <Subject> specification

<One or two sentences stating the intended outcome.>

## Objective

<What this specification is intended to achieve and why it matters.>

## Requirements

- <Prescriptive requirement>
- <Prescriptive requirement>

## Architecture and boundaries

<High-level responsibilities, ownership, and allowed dependencies.>

## Contracts

<Observable behavior, invariants, inputs, outputs, or compatibility promises.>

## Constraints

<Limits that materially shape acceptable implementations.>

## Out of scope

<Nearby concerns this specification deliberately does not govern.>
```

Keep `Objective` and `Requirements`. Include the other sections only when they carry a settled decision. Rename sections when a subject-specific heading communicates the contract more clearly.

## Writing rules

- Write requirements as direct prescriptions. Use `must` for hard constraints and `should` for defaults that allow justified exceptions.
- Describe architecture at the level of responsibilities, boundaries, dependencies, invariants, and externally observable behavior.
- Avoid source paths, function names, class inventories, call-by-call narration, and other details that the code can answer.
- Include an example, schema, state model, or pseudocode only when prose would leave a settled contract ambiguous.
- Include rationale only when it is necessary to interpret a requirement or preserve an important tradeoff. Do not recreate a decision log.
- Do not add status fields, issue metadata, implementation checklists, open-question sections, or mandatory user stories.
- Use canonical vocabulary from an applicable `CONTEXT.md`.
- Keep one coherent capability, boundary, or cross-cutting concern per file. Update it in place as the user's decisions change.

## Content boundary

A useful specification answers questions such as:

- What outcome must the system provide?
- Which responsibilities belong on each side of a boundary?
- What behavior or data contracts must remain true?
- Which constraints rule out otherwise plausible implementations?
- What nearby work is intentionally outside this specification?

It should not try to answer:

- Which files and functions currently implement the behavior?
- What sequence of decisions led here?
- Which issue, label, or milestone tracks the work?
- Which low-level implementation is preferred when the user has not decided?
