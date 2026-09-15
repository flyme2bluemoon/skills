#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
upstream_root="${PSTACK_SKILLS_ROOT:-$repo_root/skills-examples/pstack/pstack/skills}"

adapt_principle() {
    local upstream_name="$1"
    local local_name="pstack-$upstream_name"
    local target_dir="$repo_root/skills/$local_name"

    mkdir -p "$target_dir"
    sed \
        -e "s/^name: $upstream_name$/name: $local_name/" \
        -e '/^disable-model-invocation: true$/d' \
        -e 's#](../principle-#](../pstack-principle-#g' \
        "$upstream_root/$upstream_name/SKILL.md" > "$target_dir/SKILL.md"
}

adapt_unslop() {
    sed \
        -e 's/^description: Cut AI tells from any writing\. Must always apply\.$/description: Cut AI tells from any writing. Use whenever you are writing prose targeting a human./' \
        -e '/^disable-model-invocation: true$/d' \
        "$upstream_root/unslop/SKILL.md" > "$repo_root/skills/unslop/SKILL.md"

    local system_agents="$repo_root/SYSTEM_AGENTS.md"
    local updated_system_agents
    updated_system_agents="$(mktemp)"
    awk '/^## Writing Style Guide$/ { exit } { print }' "$system_agents" > "$updated_system_agents"
    printf '## Writing Style Guide\n\n' >> "$updated_system_agents"
    sed -n '/^# Unslop$/,$p' "$repo_root/skills/unslop/SKILL.md" \
        | sed -e '1,2d' -e 's/^### /#### /' -e 's/^## /### /' \
        >> "$updated_system_agents"
    mv "$updated_system_agents" "$system_agents"
}

targets=("$@")
if [[ ${#targets[@]} -eq 0 ]]; then
    targets=(principle-attack-the-premise principle-test-behavior-not-implementation unslop)
fi

for target in "${targets[@]}"; do
    case "$target" in
        principle-attack-the-premise|principle-test-behavior-not-implementation)
            adapt_principle "$target"
            ;;
        unslop)
            adapt_unslop
            ;;
        *)
            echo "Unknown pstack skill: $target" >&2
            exit 2
            ;;
    esac
done
