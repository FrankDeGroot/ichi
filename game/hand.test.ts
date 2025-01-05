import assert from "node:assert";
import test from "node:test";
import Hand from "./hand.ts";
test("Should add cards", () => {
  const hand = new Hand([{
    color: "Red", digit: 1
  }]);
  hand.add([{
    color: "Blue", digit: 1
  }]);
  assert.deepEqual(hand.discardable({
    color: "Blue", digit: 2
  }), [{
    color: "Blue", digit: 1
  }])
});