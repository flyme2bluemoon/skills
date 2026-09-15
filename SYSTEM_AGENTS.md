# AGENTS.md

## Personal Preferences

- Do not write over-engineered solutions. Think before you write. If there is a simpler solution, use it, however, this does not mean you should cut corners and ignore edge cases.
- Feel free to ask me questions at anytime to clarify anything or provide suggestions on how my ideas can be improved.
- Prefer 4 spaces for indentation unless a language or project already has a strong convention.
- A dev server might already be running so check before running another dev server. If possible, just use the one that is already running since most dev servers support hot reloading. However, if you must start your own dev server for testing, make sure that it is running on a different port if possible.
- Prefer to use pnpm unless the project is clearly using a different JS package manager.
- When a project is using Tailwind, make sure to use it rather than raw CSS. When using Tailwind, make sure you use canonical classes, arbitrary values should be used sparingly only when there is a good reason to do so. Theme variables should be used where appropriate for enforcing a consistent design system (e.g., color palettes, fonts, font sizes, etc).
- Do not use `any` when working in TypeScript
- Git commit messages should be one-liners.
- Do not add/install any packages without explicit permission. If you want to install something, ask me for permission before installing it.
- Comments document how code is used, not to be used to annotate every line of code. Use comments sparingly. Write code that documents itself.

## Principle skills

The `pstack-principle-*` skills are short decision guides, one rule each. At the start of any nontrivial or multi-step task, walk every branch below. The branches overlap, so follow every branch whose trigger matches. A possible match is enough: if a principle might apply, invoke it and use the full skill to decide. Read each invoked skill in full before making the decision it governs. Walk the tree again when the task changes during planning, implementation, debugging, review, or verification.

- **Are you deciding what to build or how much change the task deserves?**
    - Any nontrivial edit, migration, analysis, or check? Invoke the Skill tool call with `pstack-principle-build-the-lever` so the work or its proof becomes a rerunnable tool instead of a hand-done result.
    - Adding, refactoring, or rewriting a system? Invoke the Skill tool call with `pstack-principle-subtract-before-you-add` to remove dead weight before choosing the new shape.
    - Refactoring, sizing a diff, adding layers, introducing abstractions, or threading a signal through the system? Invoke the Skill tool call with `pstack-principle-laziness-protocol` to find the smallest maintainable change, with deletion as the first option.
    - Integrating a new requirement into an existing design? Invoke the Skill tool call with `pstack-principle-redesign-from-first-principles` so the result looks intentional rather than bolted on.
    - About to write logic, choose core types or data structures, decide what concurrent actors share, or sequence setup work against feature work? Invoke the Skill tool call with `pstack-principle-foundational-thinking` to preserve options and make later logic simpler.
    - Making a product, UX, API-consumer, maintainer-experience, or feature-scope tradeoff? Invoke the Skill tool call with `pstack-principle-experience-first` to optimize the result for the people who use it rather than for implementation convenience.
    - Choosing a novel UI interaction or architecture with no clear codebase precedent? Invoke the Skill tool call with `pstack-principle-exhaust-the-design-space` to compare genuinely different concrete options before committing.
    - Running a planned rewrite or migration with explicit phases? Invoke the Skill tool call with `pstack-principle-outcome-oriented-execution` to converge on the target design without accumulating throwaway compatibility work.

- **Are you shaping code, data, boundaries, or state?**
    - Writing stateful logic, extending repeated branching, or repeating shape assumptions across files? Invoke the Skill tool call with `pstack-principle-model-the-domain` to encode the rules in one domain structure.
    - Handling external input, validation, errors, configuration, transport, storage, CLI wiring, or framework adapters? Invoke the Skill tool call with `pstack-principle-boundary-discipline` to validate at the edge and keep internal logic typed and direct.
    - Writing or reviewing code in a statically typed language, especially types, function signatures, external-data parsing, casts, variants, or schema-derived models? Invoke the Skill tool call with `pstack-principle-type-system-discipline` to move invalid states and missing cases into compile-time failures.
    - Designing a command, lifecycle operation, worker, or loop that may retry, restart, or resume after a partial failure? Invoke the Skill tool call with `pstack-principle-make-operations-idempotent` so repeated execution converges on one end state.
    - Replacing an internal API while callers still use the old one? Invoke the Skill tool call with `pstack-principle-migrate-callers-then-delete-legacy-apis` to complete the migration in one wave and avoid parallel contracts.
    - Allowing concurrent actors to touch the same file, branch, key, resource, or state object? Invoke the Skill tool call with `pstack-principle-separate-before-serializing-shared-state` to remove shared mutation before considering locks or sequencing.
    - Reviewing or changing code that is hard to trace, has pass-through layers, one-caller wrappers, or broad mutable state? Invoke the Skill tool call with `pstack-principle-minimize-reader-load` to reduce indirection and the state a reader must remember.

- **Are you executing, debugging, coordinating, or learning from the work?**
    - Investigating a bug, failure, flaky behavior, or surprising state? Invoke the Skill tool call with `pstack-principle-fix-root-causes` to reproduce the symptom and fix the mechanism that creates it.
    - Have two or more fixes based on the same premise failed the same gate? Call the Skill tool with `pstack-principle-attack-the-premise` to record the premise, measure which actors hold the imbalance, and question the premise before attempting another fix.
    - Performing a sweep, migration, run of similar edits, or a stack of commits or PRs? Invoke the Skill tool call with `pstack-principle-sequence-verifiable-units` so each small unit ends in a check before the next begins.
    - Handling large outputs, long files, repeated reads, broad exploration, or parallel fan-out that could crowd the main context? Invoke the Skill tool call with `pstack-principle-guard-the-context-window` to isolate bulk work and retain only decision-relevant findings.
    - About to ask the human for permission or direction on reversible execution work? Invoke the Skill tool call with `pstack-principle-never-block-on-the-human` to make a reasonable choice, proceed, and present the result for asynchronous correction.
    - Repeating an instruction, seeing the same correction again, or finding a rule future work could violate? Invoke the Skill tool call with `pstack-principle-encode-lessons-in-structure` to turn the lesson into an enforceable mechanism.

- **Are you writing, changing, or deciding whether to keep a test?** Call the Skill tool with `pstack-principle-test-behavior-not-implementation` to exercise code through its user-facing interface and assert a literal observable result.

- **Are you about to report that work is complete or correct?** Invoke the Skill tool call with `pstack-principle-prove-it-works` to inspect or exercise the real artifact and verify the full path rather than relying on a proxy such as compilation or a self-report.

Treat a principle name from the user as a direct trigger. In the final response, name each principle that materially shaped the work and state the specific decision it changed. A citation without a changed decision does not count as applying it.

## Writing Style Guide

Edit text to remove AI patterns.

### Process

1. Scan for the patterns below.
2. Rewrite. Preserve meaning, match intended tone.
3. Self-audit: "What makes this obviously AI generated?" Fix remaining tells.

### Patterns to detect and fix

Rule numbers are stable ids that other skills cite. A removed rule leaves a gap.

#### Content

3. **Superficial -ing phrases.** "highlighting...", "ensuring...", "reflecting...", "showcasing...", "fostering...". Delete or expand with real sources.
4. **Vague attributions.** "Experts believe", "Industry reports suggest", "Some critics argue". Name the source or delete.

#### Language

7. **AI vocabulary.** Additionally, crucial, delve, enduring, enhance, fostering, garner, interplay, intricate, landscape (abstract), pivotal, showcase, tapestry (abstract), testament, underscore, vibrant. Replace with plain words.
8. **Fancy ways to say "is".** "serves as", "stands as", "boasts", "features". Just say "is" or "has".
9. **"Not just X, but Y."** State the point directly instead.
10. **Rule of three.** Forcing ideas into groups of three. Use the natural number.
11. **Synonym cycling.** Protagonist, main character, central figure, hero all in one paragraph. Pick one, repeat it.
12. **False ranges.** "from X to Y" where X and Y aren't on a meaningful scale. List topics directly.

#### Style

13. **Em dash overuse.** Avoid em dashes entirely. Use periods or commas only (no parentheses, no en dashes, no hyphen-as-dash substitutes). If a thought needs separation, end the sentence or use a comma.
14. **Colon overuse.** Colons are fine before a list or example. Not as mid-sentence connectors. "If you're coming from traditional automation: instead of registering event handlers, you describe conditions" adds nothing with the colon. Rewrite to let the point stand on its own without comparison framing. "Describing when the scheduler should fire works best as plain English." Same meaning, no crutch punctuation.
15. **Boldface overuse.** Don't bold every proper noun or acronym.
16. **Inline-header lists.** The tell is a bold label and colon that restates the line: "**Performance:** Performance improved...". Convert those to prose. A bold lead-in that ends in a period, names the item, and is followed by genuinely new detail ("**Schema in TypeScript.** Tables live in one file.") is fine, not a tell.
17. **Title case headings.** Use sentence case.
18. **Decorative emojis.** Remove from headings and bullets.
19. **Curly quotes.** Replace with straight quotes.

#### Communication artifacts

20. **Chatbot phrases.** "I hope this helps!", "Let me know if...", "Of course!", "Certainly!", "Found the smoking gun!" Remove.
21. **Sycophantic tone.** "Great question! You're absolutely right!" Respond directly.

#### Filler

23. **Filler phrases.** "In order to" becomes "To". "Due to the fact that" becomes "Because". "It is important to note that" gets deleted.
24. **Excessive hedging.** "could potentially possibly be argued that it might" becomes "may".
25. **Generic conclusions.** "The future looks bright." State specific plans or facts.

#### Jargon

26. **Abstract metaphor nouns.** Substrate, wedge, vector, locus, vantage, nexus, primitive (as noun), harness (as metaphor), surface (as in "API surface"), bedrock, scaffolding (as metaphor), modality, paradigm, gold-plating, ratchet (as metaphor), evacuate (for moving code), endgame, north star, flywheel. These read as technical but usually have a plainer concrete word. "Substrate" becomes "base". "Wedge in" becomes "add". "Vector" becomes "way" or "method". "Gold-plating" becomes "more than the job needs". "Ratchet" becomes the mechanism's real name or "a limit that only tightens". "Evacuate" becomes "move out". "Endgame" becomes "the last phase". Pick the concrete word.

#### Plain speech

27. **Say what it does, not how it feels.** "the database stays close at hand", "SQL you can read", "types that follow your schema" name a feeling. The fix names the mechanism or a number: "`.toSQL()` returns the exact string sent to the database", "a column rename fails the build". Ask what the sentence tells the reader to do or know, then write that. If you can't restate it as a concrete instruction, fact, or number, cut it. One more check: if the sentence could appear unchanged in another project's docs, it says nothing about this one. Cut it.
28. **Shorten or split dense sentences.** If the reader has to backtrack to parse a sentence, break it in two or drop clauses. One idea per sentence.
29. **Active voice.** Prefer it. Catch "is/are/was/were + past participle" and name the actor: "queries are validated" becomes "the compiler validates queries", "the file is parsed by the loader" becomes "the loader parses the file". Passive is fine only when the actor is unknown or genuinely doesn't matter.
30. **Cut adverbs, or use a stronger verb.** "runs quickly" becomes "is fast" or the number. "significantly improves" becomes the measured delta. An adverb propping up a weak verb means the verb is wrong.
31. **Prefer the plain word.** "utilize" becomes "use", "leverage" becomes "use", "facilitate" becomes "help", "numerous" becomes "many", "in the event that" becomes "if". The fancier synonym is rarely clearer.
32. **Mannered prose.** Metaphor or flourish where a literal phrase exists: aphorisms ("wire it or delete it"), rhetorical fragments for effect, personified code ("the plan holds it"), figurative verbs ("rides along", "stands on"), stock framing phrases. "A dial worth turning" becomes "a parameter worth varying". Say what you mean. Rule 26 covers the metaphor nouns.
33. **Over-compression.** Dropped articles, verbless fragments, symbol-speak, and abbreviations that make the reader decode instead of read. "Parser rejects bad date → exit 2, no write" becomes "The parser rejects a bad date, exits with code 2, and writes nothing." Write whole sentences with their articles and verbs, and spell out arrows and abbreviations.
