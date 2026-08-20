---
name: postplan-read
description: Read content from a postplan.dev URL. Use whenever the user provides a postplan.dev URL or asks to inspect one.
---

# Read a PostPlan page

When given a `postplan.dev` URL:

1. Remove its trailing slash, if present.
2. If the resulting URL does not end in `/raw`, append `/raw`.
3. Fetch the transformed URL from the shell and write the response to `/tmp/postplan.html`:

    ```sh
    url="${url%/}"
    case "$url" in
        */raw) ;;
        *) url="$url/raw" ;;
    esac
    curl --fail --location --silent --show-error "$url" --output /tmp/postplan.html
    ```

4. If `curl` succeeds, read `/tmp/postplan.html` and use its contents for the request.
5. If `curl` fails, report the failure and stop. Do not use a browser, web search, or another retrieval method as a fallback.
