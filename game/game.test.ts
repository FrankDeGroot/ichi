import assert from "node:assert";
import test from "node:test";
import { Hand } from "./game.ts";

test("Same color discardable", () => {
  const hand = new Hand([{
    color: "Red", digit: 1
  }, {
    color: "Blue", digit: 2
  }]);
  assert.deepEqual(hand.discardable({
    color: "Red", digit: 3
  }), [{
    color: "Red", digit: 1
  }]);
});

test("Same digit discardable", () => {
  const hand = new Hand([{
    color: "Red", digit: 1
  }, {
    color: "Blue", digit: 2
  }]);
  assert.deepEqual(hand.discardable({
    color: "Green", digit: 2
  }), [{
    color: "Blue", digit: 2
  }]);
});