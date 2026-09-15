---
name: pstack-principle-guard-the-context-window
description: Reduce context pressure from large outputs, broad exploration, or repeated reads.
---

# Guard the context window

Keep decision-relevant evidence in the active context. Search and read bounded sections before requesting entire files or large tool outputs. Save bulky intermediate results outside the conversation and retrieve the parts needed for the next decision.

Use subagents for independent bulk analysis when delegation is available, authorized, and worth its coordination cost. Give them a bounded question and request findings with source locations. Direct filtered reads are sufficient for smaller work.

Keep shared constraints in a skill's entrypoint. Disclose substantial branch-specific detail through references that say when to read them. Avoid rereading unchanged material already available in context.

Before a handoff or compaction, preserve the objective, constraints, decisions, completed checks, and next unresolved step using the environment's supported mechanism.
