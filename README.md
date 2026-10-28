# Arklow Docs

The documentation site for Arklow. [Fumadocs](https://fumadocs.dev) builds it as a static Next.js export, and the `arklow-docs` Cloudflare Worker serves it behind Cloudflare Access.

## Development

```
pnpm install
pnpm dev
```

Preview at `http://localhost:3000`. Run `pnpm build` before you push: it writes the site to `out/` and fails on an MDX error, a broken internal link, or a missing heading anchor. `pnpm preview` serves `out/` with Wrangler, as Cloudflare serves it.

## Content

Pages are MDX files in `content/docs`. The `meta.json` file in each folder sets the folder title and the page order. The build reads the API reference from `https://api.arklow.io/swagger/ui/json`.

## Deploy

A push to `main` builds the site and deploys it with `wrangler deploy`. The Worker has no `workers.dev` URL and no preview URLs, so `arklowdocs.io` is its only address.

## Boundaries

This repo is consumed as a submodule, but stands alone: nothing in here references the consuming repo, and every asset lives in this folder.

The actual end domain is hosted on https://arklowdocs.io, partly down to it being better practice to avoid domain-scoped cookies from being misused, and equally partly because Mintlify doesn't have a great history for Security. So it gets its own blast chamber... eh domain!
