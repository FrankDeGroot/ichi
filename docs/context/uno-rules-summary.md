# Uno rules summary (agent-oriented)

Source: https://unorules.net/#uno-rules
Captured: 2026-04-02
Purpose: compact, implementation-oriented summary for coding agents.

## Scope and caution
- This is a paraphrased summary, not a verbatim rulebook.
- For this repository, executable truth is still game/ tests.
- If this summary conflicts with game behavior, update tests first, then code/docs.

## Core objective
- Be first to play all cards in hand.

## Setup
- Use a 112-card deck.
- Deal 7 cards to each player.
- Remaining cards become the draw pile (face down).
- Flip one card to start discard pile.
- First player is left of dealer.

## Turn model
1. Active player may play exactly one card that matches top discard by color, number, or symbol.
2. Wild cards are playable regardless of top card.
3. If player does not play, they draw one card.
4. If drawn card is playable, player may play it immediately.
5. Turn ends; next player becomes active based on direction.
6. If draw pile is empty, reshuffle discard pile into new draw pile (keep current top discard).

## Match legality
- Number card: matches by color or same number.
- Action card (Skip, Reverse, Draw Two): matches by color or same symbol.
- Wild: always legal; player chooses next color.
- Wild Draw Four: only legal when player has no card matching current color.

## Action effects
- Skip: next player loses turn.
- Reverse: direction flips.
- Draw Two: next player draws 2 and loses turn.
- Wild: choose next color.
- Wild Draw Four:
  - Next player may accept: draw 4 and lose turn.
  - Or challenge legality:
    - If play was legal (no color match in hand, wilds count as a color match check per source text), challenger draws 6 and loses turn.
    - If play was illegal (player had a color match), played W+4 owner draws 4 instead.
  - Color selection from played W+4 still applies.
- Wild Shuffle Hands: collect all hands, shuffle, redeal from left of current player, preserve current direction, choose next color.
- Wild Customizable: prewritten custom effect applies; also choose next color.

## Current repository support status
- Wild Customizable cards are not yet supported in this codebase.
- Agents should not implement or assume custom-rule execution unless explicitly requested.

## UNO call and penalty
- When a player reaches one card, they must call UNO.
- If caught before next player begins turn, penalized player draws 2.

## End of hand and scoring (optional game mode)
- Hand ends immediately when a player plays final card.
- Winner scores points from opponents' remaining cards:
  - Number cards: face value.
  - Skip/Reverse/Draw Two: 20 each.
  - Wild-family cards: 50 each.
- First to 500 points wins match (multi-hand mode).

## Common policy choices for implementation
- Stacking: source FAQ says not allowed by official rules.
- First discard action card behavior: source sections are inconsistent:
  - One section says ignore initial action card and flip next.
  - Another step-by-step section says apply most first-card actions with specific exceptions.
- Recommendation for this repo: codify one policy in tests and treat tests as authoritative.

## Minimal state machine hints for agents
- State: players, direction, currentIndex, drawPile, discardPileTop, pendingPenalty(optional), chosenColor(optional).
- Deterministic turn transition is critical for testability.
- Keep legality checks centralized in one function/module.
