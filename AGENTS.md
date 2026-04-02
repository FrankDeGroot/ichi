# AGENTS

Purpose: shared, agent-agnostic context for contributors working on this repository.

## Project intent
- Build an Uno-like game engine in TypeScript under game/.
- Keep game logic deterministic and testable.
- Treat browser code in swa/ as secondary integration code for now.

## Source of truth
- Core rules, behavior, and invariants live in game/ and game/*.test.ts.
- If README or swa/ code conflicts with game/ tests, prefer game/ tests.
- The file swa/index.js is legacy and may not represent current architecture.

## Working agreements
- Prefer small, behavior-preserving changes.
- Add or update tests for behavior changes.
- Keep exports and public APIs stable unless change is intentional and documented.
- Favor pure functions and small classes for game logic.

## Build and test
- Type-check and build: npm run build
- Run tests: npm test

## Domain notes
- Card model is a discriminated union in game/deck.ts.
- Discard legality is centralized in game/discardable.ts.
- Turn execution is on Player.turn(), loop orchestration is in Game.play().

## Legacy web note
- Do not infer game rules from swa/index.js.
- Do not refactor game logic to match swa/index.js behavior.
- If touching swa/, keep changes minimal unless asked for a web modernization task.

## Preferred change flow
1. Read nearby tests first.
2. Implement behavior in game/.
3. Add or update tests.
4. Run npm test.
5. Briefly document non-obvious decisions in docs/context/.
