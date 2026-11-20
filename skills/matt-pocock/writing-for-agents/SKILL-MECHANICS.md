# Skill mechanics

Use this reference for skill invocation policy and workflow dependencies. Shared writing guidance lives in [SKILL.md](SKILL.md).

## Invocation

Preserve an existing invocation policy unless the user asks to change it. For a new skill, choose based on who should initiate the workflow:

- A **model-invocable** skill lets the agent discover it on its own, and other skills can reach it. The user can still invoke it by name. Its description is a model-facing context pointer, so permanent context load buys discovery and skill-to-skill invocation. Mechanics: omit `disable-model-invocation` and omit `policy.allow_implicit_invocation: false`. Write a short model-facing description with the specific circumstances in which the skill helps.
- A **user-invoked** skill can only be invoked by the human. The model cannot discover it on its own, and no other skill can reach it. This removes its description from the model's context and spends cognitive load instead: the human must remember the skill exists and invoke it by name. Mechanics: set `disable-model-invocation: true` and `policy.allow_implicit_invocation: false`. The description becomes a human-facing one-line summary with its trigger list stripped.

Use model invocation when the agent must be able to discover the skill on its own, or another skill references it. Use user invocation when only the human should start it.

Shared reference that two user-invoked skills both need can live in neither, because neither can reach the other. Put it in a plain file that both skills link to.

## Splitting by invocation

Create a separate model-invocable skill when it has a distinct task trigger or another workflow needs to invoke it independently. Keep shared reference material in ordinary files. Each added skill has a discovery cost, so a new name alone does not justify splitting.

## Router skills

When user-invoked skills multiply past what you can remember, a **router skill** can name them and tell the human which one to invoke. It can only hint, never call them. If the router must start a target itself, make that target model-invocable.
