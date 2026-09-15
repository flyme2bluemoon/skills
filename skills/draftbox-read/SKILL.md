---
name: draftbox-read
description: Read content from a Draftbox artifact URL. Use whenever the user provides a Draftbox public link or asks to inspect one.
---

# Read a Draftbox artifact

When given a Draftbox artifact URL:

1. Fetch the URL from the shell and write the response to `/tmp/draftbox.html`:

    ```sh
    curl --fail --location --silent --show-error "$url" --output /tmp/draftbox.html
    ```

2. If `curl` succeeds, read `/tmp/draftbox.html` and use its contents for the request.
3. If `curl` fails, report the failure and stop. Do not use a browser, web search, or another retrieval method as a fallback.
