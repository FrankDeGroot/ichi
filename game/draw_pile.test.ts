import assert from "node:assert";
import { test } from "node:test";
import DrawPile from "./draw_pile.ts";

test("Should draw the top card of the pile", () => {
  const drawPile = new DrawPile([{
    color: "Red", digit: 1
  }, {
    color: "Blue", digit: 2
  }], () => []);
  assert.deepEqual(drawPile.draw(), {
    color: "Blue", digit: 2
  });
});

test("Should raise onEmpty when no more cards to draw", () => {
  const drawPile = new DrawPile([], () => [{
    color: "Red", digit: 1
  }, {
    color: "Blue", digit: 2
  }]);
  assert.deepEqual(drawPile.draw(), {
    color: "Blue", digit: 2
  });
})