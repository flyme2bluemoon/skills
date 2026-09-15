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

Claude seems be less eager to call the unslop tool compared to Codex so you may need to add something like this to your `{CLAUDE,AGENTS}.md`: "Before you respond to the user, you must always call the Skill tool with `unslop`."

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
- `html-communication` and `postplan-read`, inspired by [Theo's video](https://www.youtube.com/watch?v=e1snsuY4lTI&t=560s)

## system agent instructions

Some agents (_ahem Claude_) require a little encouragement to actually use the SKILLS. Therefore, I have left my global `AGENTS.md` file here in `SYSTEM_AGENTS.md`. It can either be copied to `~/.agents` and `~/.claude` or it can simply be symlinked.

```sh
mkdir -p ~/.agents ~/.claude
ln -sf "$(pwd)/SYSTEM_AGENTS.md" ~/.agents/AGENTS.md
ln -sf "$(pwd)/SYSTEM_AGENTS.md" ~/.claude/CLAUDE.md
```
