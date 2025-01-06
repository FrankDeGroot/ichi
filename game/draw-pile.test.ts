import assert from "node:assert";
import { test } from "node:test";
import DrawPile from "./draw-pile.ts";
import DiscardPile from "./discard-pile.ts";

test("Should draw the top card of the pile", () => {
  const drawPile = new DrawPile([{
    color: "Red", digit: 1
  }, {
    color: "Blue", digit: 2
  }], new DiscardPile({ color: "Red", digit: 3}));
  assert.deepEqual(drawPile.draw(), {
    color: "Blue", digit: 2
  });
});

test("Should reuse cards from discard pile when empty", () => {
  const discardPile = new DiscardPile({
    color: "Red", digit: 1
  });
  discardPile.discard({
    color: "Red", digit: 2
  });
  discardPile.discard({
    color: "Red", digit: 3
  });
  const drawPile = new DrawPile([], discardPile);
  assert.deepEqual(drawPile.draw(), {
    color: "Red", digit: 2
  });
})