import assert from "node:assert";
import test from "node:test";
import { Card, deck } from "./deck.ts";

test("Deck should have 108 cards", () => {
    assert.equal(deck.length, 108);
});

function getBlue1(card: Card) {
    return "color" in card && card.color === "Blue" &&
        "digit" in card && card.digit === 1;
}

test("Card should have toString", () => {
    assert.equal(
        JSON.stringify(deck.find(getBlue1)),
        JSON.stringify({ color: "Blue", digit: 1 }),
    );
});

// test("A card should be equal to itself", () => {
//     assert.equal(deck.find(getBlue1), deck.findLast(getBlue1));
//     const isWildDraw4Card = (c: Card) => c instanceof WildDraw4Card;
//     assert.equal(deck.find(isWildDraw4Card), deck.findLast(isWildDraw4Card));
// });

// test("Should shuffle the deck", () => {
//     const shuffledDeck = getShuffledDeck();
//     assert.notEqual(deck, shuffledDeck);
// });
