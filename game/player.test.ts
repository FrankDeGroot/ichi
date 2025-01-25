import assert from "node:assert";
import test from "node:test";
import Hand from "./hand.ts";
import Player from "./player.ts";
import DiscardPile from "./discard-pile.ts";
import DrawPile from "./draw-pile.ts";
import { naiveDiscarder } from "./naive-discarder.ts";

test("Should discard a card", () => {
  const hand = new Hand([{
    color: "Red", digit: 1
  }, {
    color: "Blue", digit: 3
  }]);
  const discardPile = new DiscardPile({
    color: "Red", digit: 2
  });
  const player = new Player(hand, new DrawPile([], discardPile), discardPile, naiveDiscarder);
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
  const drawPile = new DrawPile([{
    color: "Yellow", digit: 3
  }], discardPile)
  const player = new Player(hand, drawPile, discardPile, naiveDiscarder);
  player.turn();
  assert.deepEqual(hand.discardable({
    color: "Yellow", digit: 4
  }), [[{
    color: "Yellow", digit: 3
  }, 1]])
});

test("Should draw a card when none discardable and discard it if discardable", () => {
  const hand = new Hand([{
    color: "Blue", digit: 1
  }]);
  const discardPile = new DiscardPile({
    color: "Red", digit: 2
  });
  const drawPile = new DrawPile([{
    color: "Red", digit: 3
  }], discardPile)
  const player = new Player(hand, drawPile, discardPile, naiveDiscarder);
  player.turn();
  assert.deepEqual(discardPile.peekTop(), {
    color: "Red", digit: 3
  })
});