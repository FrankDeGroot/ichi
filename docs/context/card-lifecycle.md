# Card lifecycle context

## Zones
- Draw pile: cards available to draw.
- Hand: cards held by a player.
- Discard pile: top card defines what can be legally discarded.

## Normal turn movement
1. Read top card from discard pile.
2. Try to discard a legal card from hand.
3. If none is legal, draw one card.
4. If drawn card is legal, discard it immediately; else keep it in hand.

## Rule authority
- Legal discard checks are centralized in game/discardable.ts.
- Card shape and discriminants are centralized in game/deck.ts.

## Design intent
- Keep move legality decisions deterministic and easy to test.
- Keep zone transitions explicit in code and tests.
