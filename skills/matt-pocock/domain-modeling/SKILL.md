---
name: domain-modeling
description: Build and maintain a project's shared domain language in CONTEXT.md. Use when naming domain concepts, resolving overloaded terminology, checking vocabulary against the code, or creating, reviewing, or editing a CONTEXT.md.
---

# Domain modeling

Treat domain language as live project state. Sharpen terms while discussing or changing the project, then record each settled meaning in `CONTEXT.md` as soon as it becomes clear. The file should help the user and future agents use the same words for the same concepts.

Reading `CONTEXT.md` to follow its vocabulary is ordinary project work. Use this skill when the language itself may need to change.

## Find the right context

1. Look for `CONTEXT-MAP.md` at the repository root. If it exists, read it and follow it to the context that owns the current topic.
2. Otherwise, use the nearest applicable `CONTEXT.md`, preferring the repository root when there is only one.
3. If neither file exists, wait until the first domain term is settled, then create a root `CONTEXT.md` using [the context format](references/context-format.md).

Use an existing map, but create or expand `CONTEXT-MAP.md` only when the user asks. If a map does not make ownership clear, ask which context owns the term before writing it.

## Set up ongoing use

When the user asks to establish this practice for a project, look for the repository's `AGENTS.md` or `CLAUDE.md`. Add the following section to the existing instruction file, adapting the paths if the repository already uses a context map or nested context files:

```md
## Domain language

When naming or changing project-specific domain concepts, read `CONTEXT.md`. If `CONTEXT-MAP.md` exists, follow it to the relevant context. Use the canonical terms and flag conflicts instead of inventing synonyms.
```

Update a matching section in place. If neither instruction file exists, ask before creating one. Keep ordinary glossary edits scoped to the context files.

## Work the language

Read the applicable `CONTEXT.md` before proposing terminology. Inspect relevant code and project docs when they can confirm how a concept currently behaves.

While working:

- Call out a term that conflicts with the recorded language. Quote both meanings and ask which one should win.
- Split overloaded words. If "account" appears to mean both a customer organization and a login identity, propose separate canonical terms.
- Collapse aliases. Recommend one term and record misleading synonyms under `_Avoid_` when that warning will prevent real confusion.
- Test fuzzy definitions with the smallest concrete scenario that distinguishes them. Keep scenarios focused on the ambiguity at hand.
- Treat code as evidence of current behavior and the user as the source of product intent. Surface disagreements between them instead of silently choosing one.

Once a meaning is settled, update `CONTEXT.md` in the same turn. Edit the existing entry rather than adding a competing definition. Keep unresolved guesses out of the glossary.

Before creating or editing the file, read [the context format](references/context-format.md). Preserve the file's useful local organization unless changing it removes ambiguity.

## Maintain an existing context

When the user asks for a review or the project has materially changed, check the affected language for:

- one word used for different concepts;
- several words used for one concept;
- definitions contradicted by current behavior or stated intent;
- domain concepts that the project relies on but has not named;
- terms that no longer exist in the domain;
- relationships that make two definitions inconsistent.

Make editorial fixes directly when the intended meaning is clear. Bring semantic changes to the user as concrete choices. Update only the affected entries. Limit edits to context docs unless the user also asks to align code or other documentation.

## Completion

Finish when every settled term touched in the discussion has one canonical meaning, related entries agree, and the file contains only agreed domain language. Report the terms added, changed, or removed, plus any unresolved contradiction.
