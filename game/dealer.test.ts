import assert from "node:assert";
import test from "node:test";
import { deal } from "./dealer.ts";
import { deck } from "./deck.ts";

test("Should deal cards properly", () => {
    const dealing = deal(3, deck.slice());
    assert.ok(dealing.discardPile.peekTop());
    assert.strictEqual(dealing.players.length, 3);
    assert.ok(dealing.drawPile.draw());
});