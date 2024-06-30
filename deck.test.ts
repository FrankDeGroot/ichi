import assert from "node:assert";
import test from "node:test";
import { Card, Color, deck, NumberedCard, WildDraw4Card } from "./deck.ts";

test("Deck should have 108 cards", () => {
    assert.equal(deck.length, 108);
});

function getBlue1(c: Card) {
    return c instanceof NumberedCard &&
        c.color == Color.Blue &&
        c.number == 1;
}

test("Card should have toString", () => {
    assert.equal(deck.find(getBlue1), "Blue 1");
});

test("A card should be equal to itself", () => {
    assert.equal(deck.find(getBlue1), deck.findLast(getBlue1));
    const isWildDraw4Card = (c: Card) => c instanceof WildDraw4Card;
    assert.equal(deck.find(isWildDraw4Card), deck.findLast(isWildDraw4Card));
});
