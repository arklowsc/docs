# AGENTS.md

## Section: Docs Submodule

- You are in a sub module repo `docs` that is *not* a "true" folder within `core`. This means that you have to be careful to not install anything into this folder, or cross-build things. This folder `docs` represents the git repo `arklowsc/docs` and is in no way a folder within `core` - it is a sub module.
- You are free to edit the markdown files.
- You are never to reference things that are outside of this folder, as they are in a different repo. If for example you are trying to use an image, you must ensure the image exists within this folder (sub module) regardless if it may be duplicated.
- You are never to reference this sub module in any github workflows/ci. If you need to do so, reconsider your approach.
- You are to treat this folder as sterile from the core folder in terms of references to and from it. This does not apply to the writing of docs, or your understanding - but rather just git references.  