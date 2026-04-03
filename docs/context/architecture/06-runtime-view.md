# 6. Runtime View
<!-- Show important interaction scenarios and how components collaborate during execution -->

> For full Uno turn and action rules that govern this view, see [08-crosscutting-concepts.md](08-crosscutting-concepts.md).

## Game Logic Capabilities

### Deck (`deck.ts`)
- **Card Model**: Defines the `Card` discriminated union — `DigitCard`, `SpecialCard`, and `Wildcard` — with type guards
- **Deck Construction**: Exports the canonical 108-card deck and a `getShuffledDeck()` factory

### Discard Rules (`discardable.ts`)
- **Play Validation**: Pure function `discardable(card, top)` encoding all legal-play rules (same color, digit, type, or wildcard)

### Discard Pile (`discard-pile.ts`)
- **Enforced Discarding**: Wraps played cards; rejects illegal plays and exposes `peek()` for the top card
- **Recycling**: `reuse()` returns all-but-top cards back to the draw pile when it runs out

### Draw Pile (`draw-pile.ts`)
- **Card Drawing**: Yields the next available card; auto-refills from the discard pile when exhausted

### Hand (`hand.ts`)
- **Hand Management**: Supports `add()`, `discard(index)`, emptiness check, and `discardable(top)` to enumerate playable cards

### Player (`player.ts`)
- **Turn Execution**: `turn()` attempts a discard via a pluggable strategy, draws if no play exists, and signals a win when the hand is empty
- **Pluggable Strategy**: Accepts a `discarder` function (default: `naiveDiscarder`) for AI or human-controlled play

### Naive Discarder (`naive-discarder.ts`)
- **Default AI Strategy**: Picks the first playable card from hand, or returns `null` to force a draw

### Dealer (`dealer.ts`)
- **Setup**: Deals 7 cards per player, seeds the discard pile, and wires all components into a `Dealing` object

### Game (`game.ts`)
- **Orchestration**: `Game.play()` cycles through players, handles initial direction (Reverse opening card), and returns the winner

## Game Loop

### Normal Turn Movement
1. Read top card from discard pile.
2. Try to discard a legal card from hand.
3. If none is legal, draw one card.
4. If drawn card is legal, discard it immediately; else keep it in hand.

### Turn Orchestration
- `Game.play()` loops over players until one player has an empty hand
- Initial direction is derived from the top discard card at game start
- `Player.turn()` handles draw-or-discard behavior for one player turn

### Invariants
- A turn ends after either one discard or one draw (+ optional immediate discard if legal)
- A player wins when their hand becomes empty at end of their turn
- Draw pile and discard pile are the shared state between players

### Known Gaps
- Not all special card effects appear fully modeled yet
- Reverse handling during play should be covered by additional tests

## Serialization Capabilities
- **State Encoding**: Converts game state to JSON for persistence in Cosmos DB
- **State Decoding**: Restores a `Game` instance from its stored representation
