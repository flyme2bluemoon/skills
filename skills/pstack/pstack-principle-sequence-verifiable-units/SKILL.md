---
name: pstack-principle-sequence-verifiable-units
description: Sequence migrations or dependent changes around meaningful verification boundaries.
---

# Sequence work into verifiable units

Choose units that can be checked before dependent work builds on them. A unit may be one behavior change, a migration phase, or a batch of mechanical edits verified together.

Place checks where failures can still be attributed to a manageable change. A failing regression case followed by a fix is useful for debugging. A baseline comparison may be better for a bulk transformation. Use the sequence that proves the intended result.

When commits or PRs are part of the requested delivery, organize them around coherent changes and explain any intentionally incomplete intermediate state. Follow the project's branching and integration workflow.

Finish when each dependency boundary has relevant evidence and the combined result meets the requested outcome.
