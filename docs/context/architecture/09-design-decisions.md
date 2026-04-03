# 9. Design Decisions
<!-- Document key architectural decisions and their rationale -->

## Centralized Legality
- Legal discard checks are centralized in `game/discardable.ts`; no module duplicates this logic.
- Card shape and discriminants are centralized in `game/deck.ts`.

## Determinism and Testability
- Move legality decisions are kept deterministic and free of side effects to make them easy to test.
- Zone transitions (draw pile → hand, hand → discard pile) are explicit in both code and tests.
