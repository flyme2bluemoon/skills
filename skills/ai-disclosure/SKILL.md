---
name: ai-disclosure
description: Disclose that an AI wrote text you post publicly or send to other people on Matthew's behalf. Use when writing GitHub issue, pull request, discussion, and review comments, pull request descriptions, issue closures, commit messages, or Slack, forum, and email posts.
---

# AI disclosure

When you write text that will be posted publicly or sent to other people on Matthew's behalf, say in that text that an AI wrote it.

This covers comments, reviews, pull request descriptions, commit messages, and other posts you publish in Matthew's name. Source code, UI strings, and product docs stay unsigned. A message whose only reader is Matthew stays unsigned.

## When to sign

Sign text you composed or substantially rewrote.

Leave text unsigned when Matthew wrote the wording and you are only delivering it, or when he explicitly asks you to send it unsigned.

Use one disclosure per message. When you edit a message, keep the existing disclosure and do not add a second one.

## Model and harness

Use the model name your runtime reports. Read it from your system identity, a developer message, or a tool that reports the model. When you have no real name, write `An AI agent`. Never guess or invent a model name.

The harness is the app you are running in, such as Cursor, Claude Code, Codex, or OpenCode. Name it when you know it. Leave it out when you do not.

The robot marker is part of the disclosure. Keep it when a style pass would otherwise remove decorative emojis.

## Formats

### Comments and short posts

Start a GitHub issue comment, pull request comment, discussion reply, review comment, or issue-closure note with a callout. Then leave a blank line.

```markdown
> [!NOTE]
> 🤖 **<model> responding on behalf of Matthew**
```

Replace `<model>` with your actual model name.

Where a Markdown callout does not render, use one plain line at the top. That includes Slack, email, Discord, Linear, and most forums.

```text
🤖 <model> responding on behalf of Matthew
```

When the model name is unknown:

```markdown
> [!NOTE]
> 🤖 **An AI agent responding on behalf of Matthew**
```

```text
🤖 An AI agent responding on behalf of Matthew
```

### Pull request descriptions and commits

End the body with a footer. Leave the pull request title and the commit subject alone.

```text
🤖 Written by <model> in <harness> on behalf of Matthew
```

Omit `in <harness>` when you do not know the harness. When you do not know the model, write `An AI agent` in its place:

```text
🤖 Written by An AI agent in <harness> on behalf of Matthew
```

## Destination rules

Before posting in a repository, read its contribution guide, pull request template, and agent instructions. When those files specify an attribution line, use their line and still name the model.

[t3code](https://github.com/pingdotgg/t3code/blob/main/.github/pull_request_template.md) asks people who used an agent to end with the model and harness, as in `Written by inayayousfi, typed by GPT-5.6 Sol running in OpenCode`. Its agent comments open with a GitHub note, as in [this discussion comment](https://github.com/pingdotgg/t3code/discussions/6766#discussioncomment-18185210). Use that repo's line when you post there.

When a destination forbids AI attribution or agent posts, follow that rule and tell Matthew what you withheld.

## Examples

GitHub review comment:

```markdown
> [!NOTE]
> 🤖 **<model> responding on behalf of Matthew**

The retry loop treats HTTP 429 like a dropped connection. It now waits for Retry-After before the next attempt.
```

Slack:

```text
🤖 <model> responding on behalf of Matthew

The retry loop treats HTTP 429 like a dropped connection. It now waits for Retry-After before the next attempt.
```

Commit:

```text
fix(web): wait for Retry-After on HTTP 429

The retry loop was treating rate limits as immediate failures.

🤖 Written by <model> in <harness> on behalf of Matthew
```

`<model>` and `<harness>` are placeholders. Fill in the model and harness you actually have.
