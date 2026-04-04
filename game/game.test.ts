import assert from "node:assert";
import test from "node:test";
import { Dealing } from "./dealer.ts";
import { Card } from "./deck.ts";
import DiscardPile from "./discard-pile.ts";
import DrawPile from "./draw-pile.ts";
import { Game } from "./game.ts";
import Hand from "./hand.ts";
import { naiveDiscarder } from "./naive-discarder.ts";
import Player from "./player.ts";

function testDeal({ top, draw, hands }: {
  top: Card;
  draw: Card[];
  hands: Card[][];
}): Dealing {
  const discardPile = new DiscardPile(top);
  const drawPile = new DrawPile(draw, discardPile);
  const players = Array.apply(null, Array(hands.length))
    .map((_, i) =>
      new Player(
        i.toString(),
        new Hand(hands[i]),
        drawPile,
        discardPile,
        naiveDiscarder,
      )
    );
  return {
    discardPile,
    drawPile,
    players,
  };
}

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
  // Arrange a state where the top card is not Reverse, so initial direction is normal.
  // Game proceeds as:
  // 1. Player 0 discards Reverse.
  // 2. Direction flips immediately.
  // 3. Player 2 takes the next turn and discards their only card to win.
  const { discardPile, drawPile, players } = testDeal({
    top: {
      color: "Red",
      digit: 9,
    },
    // No draw fallback: each turn outcome is driven only by the arranged hands.
    draw: [],
    // Player 0 must skip a non-discardable card first and then play Reverse.
    // Player 1 and 2 each have one discardable Red card.
    // If Reverse takes effect immediately when discarded, player 2 should play next and win.
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
  // Arrange a state where player 0 discards Reverse, then player 2 cannot discard.
  // Reverse stays on top because player 2 draws and keeps a non-discardable card.
  // Player 1 should still play next; player 0 would wrongly win next only if direction flipped again.
  // Game proceeds as:
  // 1. Player 0 discards Reverse.
  // 2. Direction flips and player 2 goes next.
  // 3. Player 2 cannot discard, so they draw and keep a card.
  // 4. Reverse remains on top, but direction must not flip again.
  // 5. Player 1 goes next and wins.
  const { discardPile, drawPile, players } = testDeal({
    top: {
      color: "Red",
      digit: 9,
    },
    // Draw order uses the end of the array first.
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
