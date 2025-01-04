import { Card } from "./deck.ts";

export default class Hand {
  #cards;

  constructor(cards: Card[]) {
    this.#cards = cards;
  }

  add(cards: Card[] | Card) {
    if (Array.isArray(cards)) {
      this.#cards.push(...cards);
    } else {
      this.#cards.push(cards);
    }
  }

  discardable(top: Card): Card[] {
    return this.#cards.filter(card =>
      "color" in top &&
      "color" in card &&
      top.color === card.color ||
      "digit" in top &&
      "digit" in card &&
      top.digit === card.digit ||
      "specialCard" in top &&
      "specialCard" in card &&
      top.specialCard === card.specialCard ||
      "wildcard" in card
    );
  }
}