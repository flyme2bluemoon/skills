# `CONTEXT.md` format

`CONTEXT.md` is the project's source of truth for domain language. It records what project-specific words mean so people and agents can use them consistently. It is not a design history, implementation guide, or scratchpad.

## Default shape

```md
# <Context name>

<One or two sentences naming the part of the domain this file covers.>

## Language

**Order**:
A customer's confirmed request for one or more products.
_Avoid_: purchase, transaction

**Customer**:
A person or organization that can place an **Order**.
_Avoid_: user, account

## Relationships

- A **Customer** may place many **Orders**.
- An **Order** belongs to one **Customer**.
```

`## Relationships` is optional. Add it only when a relationship clarifies the meaning or boundary of terms already in the glossary.

## Entry rules

- Include project-specific domain concepts. Leave programming terms, frameworks, file paths, class names, and API details in their normal technical documentation.
- Give each concept one canonical term. Define what it is and how it differs from the nearest concept in one or two sentences.
- Use the canonical terms inside other definitions and relationships. Bold those references when it helps scanning.
- Add `_Avoid_` only for aliases or collisions someone is likely to use. It is a warning, not a thesaurus.
- Add a short example only when a definition cannot make an important boundary clear on its own.
- Record agreed meanings. Keep proposals, TODOs, design decisions, and unresolved questions elsewhere or in the conversation until they are settled.

Group terms under descriptive `##` or `###` headings when the groups help a reader find them. A small context should stay flat.

## Editing rules

- Change an entry in place when its meaning evolves.
- Rename a term consistently across this file in one edit. A glossary rename does not authorize code changes.
- Remove an entry when the concept has left the domain, not merely because the current task does not touch it.
- Preserve useful wording and ordering. Avoid whole-file churn for a local change.

## Existing context maps

If the repository already has `CONTEXT-MAP.md`, use it as an index. Each entry should name a context, link to its `CONTEXT.md`, and state what language that context owns. Relationships between contexts are optional and should use the canonical terms from those contexts.

Do not introduce a context map as part of ordinary glossary maintenance. Create one only at the user's request.
