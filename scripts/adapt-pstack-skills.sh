#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
upstream_root="${PSTACK_SKILLS_ROOT:-$repo_root/skills-examples/pstack/pstack/skills}"

targets=("$@")
if [[ ${#targets[@]} -eq 0 ]]; then
    targets=(principle-attack-the-premise principle-test-behavior-not-implementation unslop)
fi

# Validate the complete request before generating review copies.
for target in "${targets[@]}"; do
    case "$target" in
        principle-attack-the-premise|principle-test-behavior-not-implementation|unslop) ;;
        *)
            echo "Unknown pstack skill: $target" >&2
            exit 2
            ;;
    esac
    if [[ ! -f "$upstream_root/$target/SKILL.md" ]]; then
        echo "Missing upstream skill: $upstream_root/$target/SKILL.md" >&2
        exit 1
    fi
done

# Upstream imports are review candidates; local skills contain deliberate changes.
output_root="$(mktemp -d "${TMPDIR:-/tmp}/pstack-review.XXXXXX")"
for target in "${targets[@]}"; do
    if [[ "$target" == unslop ]]; then
        local_name=unslop
    else
        local_name="pstack-$target"
    fi
    mkdir -p "$output_root/$local_name"
    sed \
        -e "s/^name: $target$/name: $local_name/" \
        -e '/^disable-model-invocation: true$/d' \
        -e 's#](../principle-#](../pstack-principle-#g' \
        -e 's/^description: Cut AI tells from any writing\. Must always apply\.$/description: Edit substantive human-facing prose to remove AI writing patterns while preserving meaning and tone./' \
        "$upstream_root/$target/SKILL.md" > "$output_root/$local_name/SKILL.md"
done

printf 'Review copies: %s\nCompare with skills/ before applying upstream changes.\n' "$output_root"
