# 8. Crosscutting Concepts
<!-- Describe recurring patterns and solutions that apply across multiple building blocks -->

## Uno Rules Reference

> Source: https://unorules.net/#uno-rules — paraphrased summary. Executable truth is always `game/` tests. If this summary conflicts with game behavior, update tests first, then code/docs.

### Core Objective
- Be first to play all cards in hand.

### Setup
- Use a 112-card deck; deal 7 cards to each player.
- Remaining cards become the draw pile (face down).
- Flip one card to start the discard pile; first player is left of dealer.

### Match Legality
- Number card: matches by color or same number.
- Action card (Skip, Reverse, Draw Two): matches by color or same symbol.
- Wild: always legal; player chooses next color.
- Wild Draw Four: only legal when player has no card matching current color.

### Action Effects
- **Skip**: next player loses turn.
- **Reverse**: direction flips.
- **Draw Two**: next player draws 2 and loses turn.
- **Wild**: choose next color.
- **Wild Draw Four**:
  - Next player may accept (draw 4, lose turn) or challenge legality.
  - Challenge succeeds (illegal play): W+4 owner draws 4.
  - Challenge fails (legal play): challenger draws 6 and loses turn.
- **Wild Shuffle Hands**: collect all hands, shuffle, redeal from left of current player, choose next color.
- **Wild Customizable**: not yet supported in this codebase.

### UNO Call and Penalty
- Player with one card remaining must call UNO.
- If caught before next player begins turn, penalized player draws 2.

### Policy Choices
- **Stacking**: not allowed by official rules.
- **First discard action card**: source sections are inconsistent; codify one policy in tests and treat tests as authoritative.

### Minimal State
- `players`, `direction`, `currentIndex`, `drawPile`, `discardPileTop`, `pendingPenalty` (optional), `chosenColor` (optional).
- Deterministic turn transition is critical for testability.
- Keep legality checks centralized in one function/module (currently `discardable.ts`).
