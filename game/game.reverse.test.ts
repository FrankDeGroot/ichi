import assert from "node:assert";
import test from "node:test";
import { Game } from "./game.ts";
import { testDeal } from "./test-deal.ts";

test("A Reverse on top of the discard pile should reverse turn direction", () => {
  const { discardPile, drawPile, players } = testDeal({
    top: {
      color: "Red",
      action: "Reverse",
    },
    draw: [],
    hands: [
      // Player 0
      [{
        color: "Red",
        digit: 1,
      }, {
        color: "Blue",
        digit: 1,
      }],
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
  assert.strictEqual(game.play().name, players[2].name);
});

test("Discarding a reverse card should reverse direction only when it is discarded", () => {
  const { discardPile, drawPile, players } = testDeal({
    top: {
      color: "Red",
      digit: 9,
    },
    draw: [],
    hands: [
      // Player 0
      [{
        color: "Blue",
        digit: 5,
      }, {
        color: "Red",
        action: "Reverse",
      }],
      // Player 1
      [{
        color: "Red",
        digit: 1,
      }],
      // Player 2
      [{
        color: "Red",
        digit: 2,
      }],
    ],
  });

  const game = new Game({ discardPile, drawPile, players });
  assert.strictEqual(game.play().name, players[2].name);
});

test("A reverse card should not reverse direction again when it stays on top after a draw", () => {
  const { discardPile, drawPile, players } = testDeal({
    top: {
      color: "Red",
      digit: 9,
    },
    draw: [{
      color: "Yellow",
      digit: 7,
    }],
    hands: [
      // Player 0
      [{
        color: "Blue",
        digit: 5,
      }, {
        color: "Red",
        action: "Reverse",
      }, {
        color: "Blue",
        action: "Reverse",
      }],
      // Player 1
      [{
        color: "Red",
        digit: 1,
      }],
      // Player 2
      [{
        color: "Blue",
        digit: 2,
      }],
    ],
  });

  const game = new Game({ discardPile, drawPile, players });
  assert.strictEqual(game.play().name, players[1].name);
});