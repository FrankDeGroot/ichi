# Game loop context

This document describes intended turn orchestration behavior in the current engine.

## Current implementation anchor points
- Game.play() loops over players until one player has an empty hand.
- Initial direction is derived from the top discard card at game start.
- Player.turn() handles draw-or-discard behavior for one player turn.

## Invariants
- A turn ends after either one discard or one draw (+ optional immediate discard if legal).
- A player wins when their hand becomes empty at end of their turn.
- Draw pile and discard pile are the shared state between players.

## Known gaps
- Not all special card effects appear fully modeled yet.
- Reverse handling during play should be covered by additional tests.
