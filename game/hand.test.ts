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

test("Should flag an empty hand", () => {
  const hand = new Hand([]);
  assert.equal(hand.empty(), true);
});

test("Should not flag a non-empty hand", () => {
  const hand = new Hand([{
    color: "Red", digit: 1
  }]);
  assert.equal(hand.empty(), false);
});