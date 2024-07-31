import assert from "node:assert";
import test from "node:test";
import Player from "./player.ts";

test("Should discard a card", () => {
  const player = new Player();
  player.hand([{
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
  const player = new Player();
  player.hand([{
    color: "Blue", digit: 1
  }]);
  assert.throws(() => player.turn({
    color: "Red", digit: 2
  }));
});