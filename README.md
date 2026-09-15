# Matthew's skills

These are my skills, not what I can do, but what I hope my agents can do.

## install

Using `pnpm`/`npm`/`yarn`/`bun`

```sh
pnpx skills add https://github.com/flyme2bluemoon/skills
npx skills add https://github.com/flyme2bluemoon/skills
yarn dlx skills add https://github.com/flyme2bluemoon/skills
bunx --bun skills add https://github.com/flyme2bluemoon/skills
```

## notes for certain skills

### unslop

For substantive prose drafting or editing, call the Skill tool with "unslop". `SYSTEM_AGENTS.md` keeps a short style baseline for ordinary responses.

### html-communication

This skill by default writes to HTML artifacts to a local directory. To configure it, run the following.

```
mkdir -p ~/.config/matthew-skills
echo 'ARTIFACTS_DIR="$HOME/Developer/postplan/artifacts"' > ~/.config/matthew-skills/config
```

## credits

Many of my skills are ~~stolen~~ heavily inspired from the following:

- [pstack](https://github.com/cursor/plugins/tree/main/pstack) by poteto
- [Skills by Matt Pocock](https://github.com/mattpocock/skills)
- [anti-slop](https://github.com/dmmulroy/anti-slop) by Dillon Mulroy
- `html-communication` and `draftbox-read`, inspired by [Theo's video](https://www.youtube.com/watch?v=e1snsuY4lTI&t=560s)

## system agent instructions

`SYSTEM_AGENTS.md` contains my personal preferences, execution boundaries, and task-specific skill guidance. It can be copied or symlinked to the instruction locations used by your agents.

```sh
mkdir -p ~/.agents ~/.claude
ln -sf "$(pwd)/SYSTEM_AGENTS.md" ~/.agents/AGENTS.md
ln -sf "$(pwd)/SYSTEM_AGENTS.md" ~/.claude/CLAUDE.md
```

## updating pstack adaptations

Run `bash scripts/adapt-pstack-skills.sh` to generate upstream review copies in a temporary directory. Compare them with `skills/` and apply relevant changes manually. The helper preserves local adaptations and does not modify `SYSTEM_AGENTS.md`.

Verify the import helper with `python3 -m unittest discover -s scripts -v`. Tests use an isolated temporary repository and need no additional packages.
