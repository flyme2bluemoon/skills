# Skill mechanics

Use this reference for skill invocation policy and workflow dependencies. Shared writing guidance lives in [SKILL.md](SKILL.md).

## Invocation

Preserve an existing invocation policy unless the user asks to change it. For a new skill, choose based on who should initiate the workflow:

- A **model-invocable** skill lets the agent discover it on its own and call it through the Skill tool. The user can still invoke it by name. Its description is a model-facing context pointer, so permanent context load buys discovery and skill-to-skill invocation. Mechanics: omit `disable-model-invocation` and omit `policy.allow_implicit_invocation: false`. Write a short model-facing description with the specific circumstances in which the skill helps.
- A **user-invoked** skill can only be invoked by the human. The model cannot discover it on its own or call it through the Skill tool. This removes its description from the model's context and spends cognitive load instead: the human must remember the skill exists and invoke it by name. Mechanics: set `disable-model-invocation: true` and `policy.allow_implicit_invocation: false`. The description becomes a human-facing one-line summary with its trigger list stripped.

Use model invocation when the agent must be able to discover the skill on its own, or another skill references it. Use user invocation when only the human should start it.

### Skill-to-skill invocation

Use `Call the Skill tool with "<skill-name>"` only when the target skill is model-invocable. A user-invoked skill cannot be called through the Skill tool. If an agent must invoke a workflow dependency, make the target model-invocable. If the shared material is reference rather than a workflow, put it in a plain file and link to that file.

Do not replace workflow invocation with a relative link to the target's `SKILL.md`. A link discloses reference material; the Skill tool starts a workflow. In runtimes without a Skill tool, use the supported skill-loading mechanism, including reading the advertised skill file when that is how the runtime applies skills. Preserve explicit-only restrictions in either case.

## Splitting by invocation

Create a separate model-invocable skill when it has a distinct task trigger or another workflow needs to invoke it independently. Keep shared reference material in ordinary files. Each added skill has a discovery cost, so a new name alone does not justify splitting.

## Router skills

When user-invoked skills multiply past what you can remember, a **router skill** can name them and tell the human which one to invoke. It can only hint, never call them. If the router must start a target itself, make that target model-invocable.
