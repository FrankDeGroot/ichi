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
    hands: [[{
      color: "Red",
      digit: 3,
    }, {
      color: "Blue",
      digit: 9,
    }], [{
      color: "Red",
      digit: 4,
    }, {
      color: "Blue",
      digit: 8,
    }], [{
      color: "Red",
      digit: 5,
    }]],
  });
  const game = new Game({ discardPile, drawPile, players });
  assert.strictEqual(game.play(), players[2]);
});

test("A Reverse on top of the discard pile should reverse turn direction", () => {
  const { discardPile, drawPile, players } = testDeal({
    top: {
      color: "Red",
      specialCard: "Reverse",
    },
    draw: [],
    hands: [[{
      color: "Red",
      digit: 1,
    }], [{
      color: "Red",
      digit: 2,
    }], [{
      color: "Red",
      digit: 3,
    }]],
  });
  const game = new Game({ discardPile, drawPile, players });
  assert.strictEqual(game.play().name, players[2].name);
});
