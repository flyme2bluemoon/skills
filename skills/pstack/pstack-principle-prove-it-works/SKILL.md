---
name: pstack-principle-prove-it-works
description: Choose direct evidence when a completion claim depends on runtime behavior, integration, or a delegated artifact.
---

# Prove it works

Match evidence to the claim. A build checks compilation; a working feature requires evidence from its behavior. Inspect delegated artifacts directly before relying on a delegate's summary.

Use the smallest check that covers the changed behavior and relevant failure modes. For an integration change, exercise the affected communication path. For a document edit, inspect the saved content, references, and diff. For live state, read the actual value or process rather than inferring it from timestamps or cached output.

Use existing checks first. Add a rerunnable check when the comparison is complex or likely to recur. Complete required project checks, then stop testing once the relevant evidence passes. Broaden or repeat checks when changes, failures, or unresolved risks justify it.

If verification fails, distinguish a defect in the result from a defect in the observation method. Fix failures caused by the requested change and rerun affected checks. If a check is unavailable, report what remains unverified and why.

Finish by stating what was checked and what that evidence establishes. Static checks of a prompt's structure do not establish how well a model will follow it.
