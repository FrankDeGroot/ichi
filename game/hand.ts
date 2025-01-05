import { Card } from "./deck.ts";
import { discardable } from "./discardable.ts";

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
    return this.#cards.filter(card => discardable(card, top));
  }
}