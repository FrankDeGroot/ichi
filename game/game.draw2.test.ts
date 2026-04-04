import assert from "node:assert";
import test from "node:test";
import { Game } from "./game.ts";
import { testDeal } from "./test-deal.ts";

test("A Draw2 on top of the discard pile should make the first player draw 2 cards", () => {
  // Draw2 starts on top, so Player 0 draws 2 cards and their turn is skipped.
  // Player 1 plays next and wins immediately.
  const { discardPile, drawPile, players } = testDeal({
    top: {
      color: "Red",
      action: "Draw2",
    },
    draw: [
      { color: "Yellow", digit: 1 },
      { color: "Yellow", digit: 2 },
    ],
    hands: [
      // Player 0 - should draw 2 cards, hand starts with 0
      [],
      // Player 1
      [{
        color: "Red",
        digit: 2,
      }],
      // Player 2
      [{
        color: "Red",
        digit: 3,
      }],
    ],
  });

  const game = new Game({ discardPile, drawPile, players });
  assert.strictEqual(game.play().name, players[1].name);
});

test("Discarding a Draw2 card should make the next player draw 2 cards", () => {
  // Player 0 discards Draw2, Player 1 draws 2 cards and their turn is skipped.
  // Player 2 plays next and wins.
  const { discardPile, drawPile, players } = testDeal({
    top: {
      color: "Red",
      digit: 9,
    },
    draw: [
      { color: "Blue", digit: 1 },
      { color: "Green", digit: 2 },
    ],
    hands: [
      // Player 0
      [{
        color: "Blue",
        digit: 5,
      }, {
        color: "Red",
        action: "Draw2",
      }],
      // Player 1 - should draw 2 cards
      [{
        color: "Yellow",
        digit: 1,
      }],
      // Player 2
      [{
        color: "Red",
        digit: 3,
      }],
    ],
  });

  const game = new Game({ discardPile, drawPile, players });
  assert.strictEqual(game.play().name, players[2].name);
});

