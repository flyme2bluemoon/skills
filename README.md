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
