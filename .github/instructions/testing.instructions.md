---
applyTo: "game/**/*.test.ts"
description: "Use when writing or updating Node test runner tests for game behavior"
---

# Testing instructions

- Use node:test and node:assert as in existing tests.
- Prefer behavior-focused test names.
- Build minimal fixtures with explicit cards.
- Cover both happy path and edge cases.
- Keep each test focused on one rule or invariant.

## Recommended structure
1. Arrange: explicit top card, draw pile, and hands.
2. Act: call target method once.
3. Assert: verify winner, card movement, or state transition.

## Regression guidance
- When fixing a bug, add a failing test first when practical.
- Keep tests deterministic (no randomness unless controlled).
