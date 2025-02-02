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

test("Same color discardable for special cards", () => {
  assert.ok(discardable({
    color: "Red",
    specialCard: "Draw2",
  }, {
    color: "Red",
    digit: 1,
  }));
});

test("Different color not discardable for special cards", () => {
  assert.ok(
    !discardable({
      color: "Red",
      specialCard: "Draw2",
    }, {
      color: "Blue",
      digit: 1,
    }),
  );
});

test("Same specialCard is discardable", () => {
  assert.ok(discardable({
    color: "Red",
    specialCard: "Draw2",
  }, {
    color: "Yellow",
    specialCard: "Draw2",
  }));
});

test("Different specialCard is not discardable", () => {
  assert.ok(
    !discardable({
      color: "Blue",
      specialCard: "Reverse",
    }, {
      color: "Red",
      specialCard: "Draw2",
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
