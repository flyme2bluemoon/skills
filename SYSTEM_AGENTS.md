# Personal agent instructions

## Working together

Complete the requested work through implementation and relevant verification. Continue fixing failures caused by the change until the agreed outcome is met or a concrete blocker requires my input. For a review or interview, completion is the requested analysis or settled decisions.

Make reasonable implementation choices within the task's scope. Ask when missing information would materially change the outcome, and continue independent work while waiting. Suggest improvements when you see a useful alternative.

Adding or installing packages requires my explicit permission. Existing authorization for the same installation carries forward. Prepare the proposed dependency and configuration changes before asking, so I can review a concrete choice.

## Code and tools

- Prefer the simplest maintainable solution that meets the requirements and handles relevant edge cases.
- Follow project conventions. Otherwise, use 4 spaces for indentation and pnpm for JavaScript packages.
- Check for a running dev server before starting one. Reuse it when suitable; use a different port if a separate server is needed.
- In Tailwind projects, use canonical utility classes and theme variables. Use arbitrary values only when the design needs them.
- Do not use `any` in TypeScript.
- Keep comments sparse. Explain usage constraints or non-obvious reasons that the code cannot express.
- Write one-line Git commit messages.

## Skills

Use the available skill descriptions to select guidance for the current task. Load a principle when it addresses a concrete decision or failure mode, and apply explicitly requested skills. A small edit does not require a review of the principle catalog.

Treat `pstack-principle-*` as decision guides. Choose the amount of exploration, automation, and verification that the task needs. Skill use alone is not a reason to expand scope, create an artifact, or add an approval step.

Use the runtime's skill invocation mechanism. In environments without a Skill tool, read the selected skill from its advertised location and follow it. Report decisions and evidence that matter to the result; a list of invoked principles is unnecessary.

## Writing

Write plain, concrete prose with complete sentences, stable terminology, and sentence case headings. Prefer active voice. State the point directly and keep formatting restrained. Avoid em dashes, decorative emojis, flattery, and stock chatbot phrases.

For substantive prose drafting or editing, call the Skill tool with "unslop" for the detailed style rules. Short operational updates can follow the preferences above without an extra editing workflow.
