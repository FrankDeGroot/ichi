import assert from "node:assert";
import test from "node:test";
import { Game } from "./game.ts";
import { testDeal } from "./test-deal.ts";

test("Should play normal game", () => {
  const { discardPile, drawPile, players } = testDeal({
    top: {
      color: "Red",
      digit: 1,
    },
    draw: [{
      color: "Red",
      digit: 2,
    }],
    hands: [
      // Player 0
      [{
        color: "Red",
        digit: 3,
      }, {
        color: "Blue",
        digit: 9,
      }],
      // Player 1
      [{
        color: "Red",
        digit: 4,
      }, {
        color: "Blue",
        digit: 8,
      }],
      // Player 2
      [{
        color: "Red",
        digit: 5,
      }],
    ],
  });
  const game = new Game({ discardPile, drawPile, players });
  assert.strictEqual(game.play(), players[2]);
});
