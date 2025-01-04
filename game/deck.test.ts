import assert from "node:assert";
import test from "node:test";
import { Card, deck, getShuffledDeck } from "../game/deck.ts";

test("Deck should have 108 cards", () => {
  assert.equal(deck.length, 108);
});

function getBlue1(card: Card) {
  return "color" in card && card.color === "Blue" &&
    "digit" in card && card.digit === 1;
}

test("Digit card should have equivalent JSON", () => {
  assert.deepEqual(
    deck.find(getBlue1),
    { color: "Blue", digit: 1 },
  );
});

test("A digit card should be equal to itself", () => {
  assert.equal(deck.find(getBlue1), deck.findLast(getBlue1));
});

test("A wildcard should be equal to itself", () => {
  const isWildDraw4Card = (c: Card) =>
    "wildcard" in c && c.wildcard === "Draw4";
  assert.equal(deck.find(isWildDraw4Card), deck.findLast(isWildDraw4Card));
});

test("Should shuffle the deck", () => {
  const shuffledDeck = getShuffledDeck();
  assert.notEqual(deck, shuffledDeck);
});
