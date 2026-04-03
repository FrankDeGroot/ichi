# AGENTS

Purpose: shared, agent-agnostic context for contributors working on this repository.

## Project intent
- See docs/context/architecture/01-introduction-and-goals.md.

## Source of truth
- See docs/context/architecture/02-constraints.md (Rules Source of Truth).
- See docs/context/architecture/08-crosscutting-concepts.md (Uno Rules Reference).

## Working agreements
- Prefer small, behavior-preserving changes.
- Add or update tests for behavior changes.
- Keep exports and public APIs stable unless change is intentional and documented.
- Favor pure functions and small classes for game logic.

## Build and test
- Type-check and build: npm run build
- Run tests: npm test

## Domain notes
- See docs/context/architecture/06-runtime-view.md (Game Logic Capabilities).
- See docs/context/architecture/08-crosscutting-concepts.md (Minimal State).

## Legacy web note
- See docs/context/architecture/02-constraints.md (Rules Source of Truth).
- See docs/context/architecture/05-building-block-view.md (Code Components).

## Preferred change flow
1. Read nearby tests first.
2. Implement behavior in game/.
3. Add or update tests.
4. Run npm test.
5. Briefly document non-obvious decisions in docs/context/.
