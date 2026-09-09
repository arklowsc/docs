# AGENTS.md

## Section: Docs Submodule

- You are in the submodule repo `docs`. It is not a true folder within `core`. Do not install anything into this folder, and do not cross-build. This folder represents the git repo `arklowsc/docs`. It is a submodule, not a folder within `core`.
- You are free to edit the markdown files.
- Never reference things outside this folder, because they are in a different repo. For example, an image you use must exist within this folder, even if that duplicates it.
- Never reference this submodule in any GitHub workflow or CI. If you think you need to, reconsider your approach.
- Treat this folder as sterile from the core folder in terms of git references to and from it. This does not apply to the content of the docs or to your knowledge.
- Submit changes to this submodule with normal git operations: commit on a branch, push the branch, open the PR with gh, and merge it. Do not use Graphite or the ghp macro here. Graphite has no access to arklowsc/docs. After the merge, move the submodule pointer in core through the normal core flow.
- These rules are guardrails, not bans. When one blocks the task, stop and ask Marcus rather than satisfy its letter while the problem survives (CLAUDE.md, "Conflict over standing orders").
