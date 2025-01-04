import assert from "node:assert";
import { test } from "node:test";
import DiscardPile from "./discard_pile.ts";

test("Should allow peek top card", () => {
  const pile = new DiscardPile({
    color: "Red", digit: 1
  });
  assert.deepEqual(pile.peekTop(), {
    color: "Red", digit: 1
  })
});

test("Should discard to top of pile", () => {
  const pile = new DiscardPile({
    color: "Red", digit: 1
  });
  pile.discard({
    color: "Red", digit: 2
  });
  assert.deepEqual(pile.peekTop(), {
    color: "Red", digit: 2
  })
});

test("Should reuse all cards except the top", () => {
  const pile = new DiscardPile({
    color: "Red", digit: 3
  });
  pile.discard({
    color: "Red", digit: 2
  });
  pile.discard({
    color: "Red", digit: 1
  });
  assert.deepEqual(pile.reuse(), [{
    color: "Red", digit: 3
  }, {
    color: "Red", digit: 2
  }])
});