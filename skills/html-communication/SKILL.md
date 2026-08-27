---
name: html-communication
description: Create standalone HTML write-ups or UI mocks for the user. Use for communication artifacts outside a codebase.
---

# HTML communication

Create a standalone HTML document that the user can read outside the terminal or chat thread.

## Artifact location

Use the shell to load and expand `ARTIFACTS_DIR`. Source the config in the same shell invocation that accesses the artifact so the variable remains available.

```sh
. ~/.config/matthew-skills/config
: "${ARTIFACTS_DIR:?Configure ARTIFACTS_DIR}"
mkdir -p -- "$ARTIFACTS_DIR"
artifact_path="$ARTIFACTS_DIR/descriptive-name.html"
```

Use `$artifact_path` for the file operation in that shell invocation. Ask the user to configure the file before proceeding when the config or `ARTIFACTS_DIR` is missing.

Use a short, descriptive filename ending in `.html`. Choose an unused filename for a new artifact. Reuse an existing filename when the user asks to update it.

When the user provides an artifact path, use it. Otherwise, source the config and access existing artifacts through `$ARTIFACTS_DIR`. Read and inspect the HTML source with filesystem and text tools.

## Write the artifact

Use the `unslop` skill to write and edit prose in the HTML artifact.

Write for the user. Make the document read like a clear spec or report, with direct language and an information-first layout. Favor useful headings, short paragraphs, lists, tables, callouts, and diagrams when they make the subject easier to understand.

- Use semantic HTML.
- Keep custom CSS inline in the file.
- Use inline SVG for diagrams and small graphics.
- Prefer to embed images with a data-URL or link to image online.
- Use inline JavaScript only when interaction makes the content easier to understand.
- Keep custom scripts and modules inline in the file.
- Give external links `target="_blank"` and `rel="noopener noreferrer"`.
- Make the document readable at desktop and mobile widths.

Choose the structure and visual treatment to fit the material. The file should stand on its own and retain the context a reader needs.

### Tailwind and diagrams

Use Tailwind via CDN for layout and styling:

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

Use Mermaid via CDN when a graph, flow, or sequence communicates relationships more clearly than prose:

```html
<script type="module">
  import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
  mermaid.initialize({ startOnLoad: true, theme: "neutral" });
</script>
```

Mix Mermaid with hand-crafted HTML, CSS, and inline SVG. Use Mermaid for graph-shaped relationships such as call graphs, dependencies, flows, and sequences. Use hand-built visuals for editorial forms such as mass diagrams, cross-sections, and collapse comparisons. When the caller asks for before-and-after visualisations, make each comparison prominent and easy to scan. Be visual when the structure carries information that prose would hide.

### UI mocks

Render the proposed interfaces in the HTML at a useful level of visual detail.

When showing multiple variants, label them A, B, C, and so on. Place them in a shared comparison layout so the user can scan the differences in one view.

## Finish locally

Inspect the saved source with filesystem and text tools for malformed markup, missing content, and broken local references.

Always report the resolved local path to the HTML file.

## Publish to Postplan

Upload when the user explicitly asks to publish or upload the artifact to Postplan. Postplan is operated by a third party, and uploaded URLs are publicly accessible. Check the artifact before uploading it. Treat every upload as permanent because Postplan provides no way to delete uploaded files. Upload public, non-sensitive information. Keep artifacts containing secrets, personal data, or confidential material local, and tell the user why. Confirm the exact file and its contents before running the upload command.

Upload public, non-sensitive information. Keep artifacts containing secrets, personal data, or confidential material local, and tell the user why.

After the safety check, write the local file first, then run:

```sh
pnpx postplan upload <file.html>
```

Available upload controls:

```text
--draft <draft-id>    Update a specific draft
--new                 Always create a new draft
--description <text>  Set a short description for the draft
```

Match upload options to the user's request. If authentication fails, ask the user to run `postplan auth login`. Report the artifact as hosted after the command succeeds and returns its URL.

After a successful upload, report both the local path and the Postplan URL returned by the command. If it fails for another reason, report the local path and the upload error.
