import assert from "node:assert";
import test from "node:test";
import { Card } from "./deck.ts";
import Hand from "./hand.ts";
import Player from "./player.ts";
import DiscardPile from "./discard_pile.ts";
import DrawPile from "./draw_pile.ts";

function newPlayer(cards: Card[], drawPile: DrawPile, discardPile: DiscardPile) {
  return new Player(new Hand(cards), drawPile, discardPile);
}

test("Should discard a card", () => {
  const discardPile = new DiscardPile({
    color: "Red", digit: 2
  });
  const player = newPlayer([{
    color: "Red", digit: 1
  }, {
    color: "Blue", digit: 3
  }], new DrawPile([], discardPile), discardPile);
  player.turn();
  assert.deepEqual(discardPile.peekTop(), {
    color: "Red", digit: 1
  });
});

test("Should draw a card when none discardable", () => {
  const hand = new Hand([{
    color: "Blue", digit: 1
  }]);
  const discardPile = new DiscardPile({
    color: "Red", digit: 2
  });
  const player = new Player(hand, new DrawPile([{
    color: "Blue", digit: 3
  }], discardPile), discardPile);
  player.turn();
  console.log(discardPile.peekTop());
  assert.deepEqual(hand.discardable(discardPile.peekTop()), [{
    color: "Blue", digit: 1
  }]);
});