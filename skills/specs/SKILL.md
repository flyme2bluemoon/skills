---
name: specs
description: Create, maintain, and apply living project specifications under docs/specs. Use when planning, implementing, or reviewing work governed by a spec, or when explicit user decisions require a specification update.
---

# Specs

Treat specifications as living, prescriptive statements of the user's intended goal state. Specifications define what the system must become or continue to satisfy. The code reveals what the system currently does.

Do not turn specifications into implementation inventories, issue records, or append-only decision logs.

## Find the applicable specification

Consult `docs/specs/*.md` only when:

- planning, implementing, or reviewing work governed by a specification;
- the user asks to create, revise, or inspect a specification; or
- a design or architecture session has produced decisions that the user wants recorded.

Inspect filenames and headings first, then read only likely matches. Read the relevant code independently when current behavior or implementation details matter.

Prefer extending an existing specification over creating an overlapping document. Create a new file only for a coherent capability, boundary, or cross-cutting concern that has no suitable home. Use a short, kebab-case subject for its filename.

If applicability remains ambiguous and choosing incorrectly would materially affect the work, ask the user which specification governs it.

## Apply a specification

Treat an applicable specification as a requirement, not as evidence of the current implementation.

- Compare the code and specification without assuming either describes the other.
- Treat a mismatch as an implementation conflict unless the user decides that the intended design has changed.
- Surface conflicts and propose options. Do not silently rewrite the specification to match the code.
- Use terms defined in an applicable `CONTEXT.md`, but keep domain vocabulary out of the specification when it adds no requirement.

## Respect decision authority

Specifications record decisions made by the user. You may investigate facts, expose tradeoffs, recommend an option, and draft proposed wording. Do not make a design decision on the user's behalf or claim shared understanding before the user confirms it.

Edit a specification only when:

- the user directly requests the edit;
- the user explicitly makes or approves the relevant decision; or
- an orchestrating skill reaches its user-confirmation gate and delegates the settled decisions here.

After a design or grilling session:

- on confirmed shared understanding, record the settled decisions;
- on an accepted partial result, record only decisions that were actually settled; and
- on discard, make no specification changes.

Unanswered questions, agent recommendations, and tentative ideas are not decisions. Leave them out unless the user explicitly wants them represented as constraints or unresolved work.

## Create or update a specification

Before writing, read [references/spec-format.md](references/spec-format.md).

Synthesize decisions from the conversation and any applicable specification. Inspect the repository for facts needed to make the specification accurate, but do not copy incidental implementation details into it.

Update living documents in place:

- replace superseded requirements instead of preserving a chronology;
- remove statements the user has withdrawn;
- keep the document internally consistent; and
- do not add changelogs, decision timelines, or historical alternatives.

## Check the result

When creating or updating a specification, verify that:

- every included requirement traces to an explicit user decision;
- all settled decisions relevant to the subject are represented;
- tentative or unresolved choices are excluded;
- the document prescribes the goal state rather than narrating the code;
- details are no lower-level than needed to constrain the design; and
- the revised document does not contradict itself or another applicable specification.

When applying a specification without edit authority, report relevant conflicts or ambiguities and leave the document unchanged.
