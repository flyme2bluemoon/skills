---
name: pstack-principle-attack-the-premise
description: Reassess a shared assumption when repeated fixes fail the same check.
---

# Attack the premise

When repeated fixes based on the same assumption fail, state that assumption and identify an observation that could disprove it before attempting another fix.

Choose the observation for the actual failure. For uneven load or resource ownership, measure the distribution across actors and inspect how roles are assigned. For other failures, inspect the relevant input, state transition, dependency, or contract. Build a rerunnable measurement when the result needs comparison across runs.

Interpret the evidence narrowly. An even distribution can rule out a particular imbalance; it does not prove every assumption correct. If role assignment causes the defect, consider changing ownership or assignment rather than repeatedly compensating for it.

Resume implementation when the evidence supports a revised explanation or identifies the next discriminating check. Keep the premise and findings in the conversation unless the project already has a suitable record.
