---
name: grilling
description: Interview the user to resolve a rough idea, problem, decision, or plan. Use when the user asks to be grilled, wants to stress-test their thinking, or another skill needs a decision-focused interview.
---

# Grilling

Interview the user until you share a complete understanding of the subject. Accept a rough idea, problem, undecided choice, or existing plan as the starting point.

## Work the design tree

Map the subject as a **design tree**. Each decision may open decisions that depend on it. The **frontier** is every unresolved decision whose prerequisites are settled.

Ask the whole frontier in one round, then wait for the user's answers. Questions in the same round must be independent. Keep a question for a later round when its answer depends on another open question.

Use this format:

```text
❓ **Q1 - <question title>:** <question body, including choices when useful>

➡️ <recommended answer with brief reasoning>

---

❓ **Q2 - <question title>:** <question body, including choices when useful>

➡️ <recommended answer with brief reasoning>
```

Give a concrete recommendation for every question. The user makes the final decision. When the user is unsure, compare the viable choices, test them with concrete scenarios, and make a stronger recommendation. Leave the decision unresolved if the user still cannot choose.

After each round, recompute the frontier from the user's answers. When an answer changes an earlier decision, reopen every dependent decision whose answer may no longer hold.

## Find facts

Investigate facts that the environment or available tools can establish. Do not ask the user to perform research the agent can do. Use parallel tool calls or delegation when they are supported and useful, but keep the interview usable without subagents. Treat a running investigation as an unresolved prerequisite and continue with the rest of the frontier.

Ask the user for decisions and for knowledge that only they can supply. Never turn an agent recommendation into a settled decision without the user's answer.

## Control scope

Use no fixed question limit. Continue until no relevant branch remains silently assumed. If the subject is too large for one coherent session, propose a boundary for smaller grilling sessions and preserve the unresolved branches for them. Do not silently prune the tree.

## Finish the session

When the frontier is empty, summarize:

- the objective;
- settled decisions;
- important constraints;
- rejected alternatives that affect the result;
- anything explicitly out of scope.

Ask the user to confirm that you have reached a shared understanding. The session is complete only after that confirmation.

If the user asks to stop while the frontier is not empty, determine whether they want to accept the partial result or discard the session:

- **Accept partial:** Summarize the settled decisions and unresolved branches. State that shared understanding is incomplete.
- **Discard:** Confirm that the session's conclusions are abandoned.

This skill interviews only. It does not implement the result, write files, or start another workflow. A calling skill may use the settled decisions after the session ends.
