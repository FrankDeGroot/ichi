import { Card } from "./deck.ts";

export default class DiscardPile {
  #cards: Card[];

  constructor(card: Card) {
    this.#cards = [card];
  }

  peekTop() {
    return this.#cards[this.#cards.length - 1];
  }

  discard(card: Card) {
    this.#cards.push(card);
  }
}