import assert from "node:assert";
import test from "node:test";
import { Game } from "./game.ts";
import { testDeal } from "./test-deal.ts";

test("A Skip on top of the discard pile should skip the first player's turn", () => {
  // Skip starts on top, so Player 0 is skipped and Player 1 plays and wins immediately.
  const { discardPile, drawPile, players } = testDeal({
    top: {
      color: "Red",
      action: "Skip",
    },
    draw: [],
    hands: [
      // Player 0
      [{
        color: "Red",
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
  assert.strictEqual(game.play().name, players[1].name);
});

test("Discarding a skip card should skip exactly one next turn", () => {
  // Player 0 discards Skip, Player 1 is skipped, and Player 2 plays next and wins.
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
        action: "Skip",
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

test("A skip card should not skip again when it stays on top after a draw", () => {
  // Player 0 plays Skip, Player 2 is skipped once after drawing, then Player 0 wins on next turn.
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
        color: "Red",
        action: "Skip",
      }, {
        color: "Blue",
        action: "Skip",
      }],
      // Player 1
      [{
        color: "Red",
        digit: 1,
      }],
      // Player 2
      [{
        color: "Green",
        digit: 2,
      }],
    ],
  });

  const game = new Game({ discardPile, drawPile, players });
  assert.strictEqual(game.play().name, players[0].name);
});

test("In a two-player game, discarding skip should make the same player play again", () => {
  // Player 0 discards Skip, Player 1 is skipped, and Player 0 takes the next turn and wins.
  const { discardPile, drawPile, players } = testDeal({
    top: {
      color: "Red",
      digit: 9,
    },
    draw: [],
    hands: [
      // Player 0
      [{
        color: "Red",
        action: "Skip",
      }, {
        color: "Blue",
        action: "Skip",
      }],
      // Player 1
      [{
        color: "Red",
        digit: 1,
      }],
    ],
  });

  const game = new Game({ discardPile, drawPile, players });
  assert.strictEqual(game.play().name, players[0].name);
});
