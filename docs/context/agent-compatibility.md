# Agent compatibility matrix

As of 2026-04-02, this is a practical compatibility guide for instruction discovery.

## Summary
- Keep [AGENTS.md](../../AGENTS.md) as the canonical, cross-agent instruction source.
- Treat files under [.github/instructions](../../.github/instructions) and [.github/prompts](../../.github/prompts) as Copilot-first unless verified otherwise for a specific tool.
- Mirror only the minimum necessary guidance into each agent's native format.

## Matrix
| Agent/tool | Auto-reads AGENTS.md | Auto-reads .github/*.md | Native instruction location(s) | Recommendation |
|---|---|---|---|---|
| GitHub Copilot (VS Code) | Yes | Yes, for supported customization types | .github/instructions, .github/prompts, plus workspace instruction files | Keep AGENTS.md + Copilot scoped files |
| Claude Code (CLI/editor integrations) | Often yes | Usually no | .claude/ (for Claude-specific guidance) | Keep AGENTS.md canonical, add thin Claude mirror if needed |
| Cursor | Varies by version/settings | Usually no | Cursor project rules files/config | Keep AGENTS.md canonical, mirror only critical rules |
| Aider | Limited/indirect | No (by default) | CLI flags, config, optional convention files | Pass AGENTS.md explicitly in workflow or scripts |

## Operating model
1. Canonical rules live in [AGENTS.md](../../AGENTS.md).
2. Copilot-specific behavior lives in [.github/instructions](../../.github/instructions) and [.github/prompts](../../.github/prompts).
3. For each additional agent, create a short adapter file that references AGENTS.md and repeats only high-impact constraints.
4. Review adapters monthly or when tooling versions change.

## High-value shared constraints to mirror
- game/ tests are source of truth for game behavior.
- web/index.js is legacy and must not define game rules.
- behavior changes require tests.
- prefer small, behavior-preserving edits.

## Optional next files (if you adopt more agents)
- .claude/CLAUDE.md
- .cursor/rules.md
- scripts/agent-context.ps1 (helper to print AGENTS.md + selected context docs)
