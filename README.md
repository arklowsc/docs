# Arklow Docs

The documentation site for Arklow, built on [Mintlify](https://mintlify.com).

## Development

```
npm i -g mint
mint dev
```

Preview at `http://localhost:3000`. Run `mint broken-links` before pushing.

## Boundaries

This repo is consumed as a submodule, but stands alone: nothing in here references the consuming repo, and every asset lives in this folder.

The actual end domain is hosted on https://arklowdocs.io, partly down to it being better practice to avoid domain-scoped cookies from being misused, and equally partly because Mintlify doesn't have a great history for Security. So it gets its own blast chamber... eh domain!