import assert from "node:assert";
import test from "node:test";
import { Hand } from "./game.ts";

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

test("Same color discardable for digit cards", () => {
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

test("Same color discardable for special cards", () => {
  const hand = new Hand([{
    color: "Red", specialCard: "Draw2"
  }, {
    color: "Blue", specialCard: "Reverse"
  }]);
  assert.deepEqual(hand.discardable({
    color: "Red", digit: 1
  }), [{
    color: "Red", specialCard: "Draw2"
  }])
});

test("Same specialCard", () => {
  const hand = new Hand([{
    color: "Red", specialCard: "Draw2"
  }, {
    color: "Blue", specialCard: "Reverse"
  }]);
  assert.deepEqual(hand.discardable({
    color: "Yellow", specialCard: "Draw2"
  }), [{
    color: "Red", specialCard: "Draw2"
  }])
});

test("Wildcards are always discardable", () => {
  const hand = new Hand([{
    color: "Red", specialCard: "Draw2"
  }, {
    wildcard: "Wild"
  }]);
  assert.deepEqual(hand.discardable({
    color: "Yellow", digit: 1
  }), [{
    wildcard: "Wild"
  }])
});