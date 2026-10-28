# AGENTS.md

## Section: Docs Site

- This site is built with Fumadocs as a static Next.js export. Pages are MDX files with YAML frontmatter in `content/docs`. The `meta.json` file in each folder sets the folder title and the page order.
- The MDX components follow the Mintlify names (`Note`, `Warning`, `Tip`, `Info`, `Steps`, `Step`, `Card`, `Columns`, `CardGroup`, `Tabs`, `Tab`), defined in `components/mintlify.tsx`. Card icons are Lucide icon names, plus `google` and `aws`.
- Run `pnpm build` to check the site. It fails on an MDX error, a broken internal link, or a missing heading anchor.
- Use the active voice and the second person ("you").
- Use one idea per sentence.
- Use sentence case for headings.
- Use bold for UI elements: Click **Settings**.
- Use code formatting for file names, commands, paths, and code references.
- The submodule rules in AGENTS.override.md in this folder apply to every task here.
