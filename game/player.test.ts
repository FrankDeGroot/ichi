import assert from "node:assert";
import test from "node:test";
import { Card } from "./deck.ts";
import Hand from "./hand.ts";
import Player from "./player.ts";

function newPlayer(cards: Card[]) {
  return new Player(new Hand(cards));
}

test("Should discard a card", () => {
  const player = newPlayer([{
    color: "Red", digit: 1
  }, {
    color: "Blue", digit: 3
  }]);
  assert.deepEqual(player.turn({
    color: "Red", digit: 2
  }), {
    color: "Red", digit: 1
  });
});

test("Should draw a card when none discardable", () => {
  const player = newPlayer([{
    color: "Blue", digit: 1
  }]);
  assert.throws(() => player.turn({
    color: "Red", digit: 2
  }));
});