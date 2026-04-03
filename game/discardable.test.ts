import assert from "node:assert";
import test from "node:test";
import { discardable } from "./discardable.ts";

test("Same digit discardable", () => {
  assert.ok(discardable({
    color: "Red",
    digit: 1,
  }, {
    color: "Blue",
    digit: 1,
  }));
});

test("Same color discardable for digit cards", () => {
  assert.ok(discardable({
    color: "Red",
    digit: 1,
  }, {
    color: "Red",
    digit: 2,
  }));
});

test("Different digits or colors not discardable", () => {
  assert.ok(
    !discardable({
      color: "Red",
      digit: 1,
    }, {
      color: "Blue",
      digit: 2,
    }),
  );
});

test("Same color discardable for action cards", () => {
  assert.ok(discardable({
    color: "Red",
    actionCard: "Draw2",
  }, {
    color: "Red",
    digit: 1,
  }));
});

test("Different color not discardable for action cards", () => {
  assert.ok(
    !discardable({
      color: "Red",
      actionCard: "Draw2",
    }, {
      color: "Blue",
      digit: 1,
    }),
  );
});

test("Same actionCard is discardable", () => {
  assert.ok(discardable({
    color: "Red",
    actionCard: "Draw2",
  }, {
    color: "Yellow",
    actionCard: "Draw2",
  }));
});

test("Different actionCard is not discardable", () => {
  assert.ok(
    !discardable({
      color: "Blue",
      actionCard: "Reverse",
    }, {
      color: "Red",
      actionCard: "Draw2",
    }),
  );
});

test("Wildcards are always discardable", () => {
  assert.ok(discardable({
    wildcard: "Wild",
  }, {
    color: "Red",
    digit: 1,
  }));
});
