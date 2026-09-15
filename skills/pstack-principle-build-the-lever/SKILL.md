---
name: pstack-principle-build-the-lever
description: Choose reusable automation for repetitive transformations or checks that need deterministic, rerunnable evidence.
---

# Build the lever

Use a script, codemod, generator, or existing tool when it makes the work more reliable or easier to repeat and review.

Prefer an existing command when it already does the job. Build a small tool when repeated edits share a mechanical recipe, an analysis must cover many inputs, or a one-off comparison needs reproducible evidence. Direct edits and inspection are appropriate when automation would add more maintenance than confidence.

For a transformation, try a representative unit before applying it broadly. Make reruns safe, show the resulting diff, and verify the intended behavior. Keep the tool when future work or review needs it; a temporary helper is enough for session-only work.

When delegating repeated work, share a common procedure and isolate write ownership. Use deterministic automation instead of delegation when it can perform the whole transformation reliably.

Finish when the requested result is verified and any retained tool has a clear way to rerun it. Producing a new file is not itself evidence that automation was useful.
