import { Card } from "./deck.ts";
import { discardable } from "./discardable.ts";

export default class DiscardPile {
  #cards: Card[];

  constructor(card: Card) {
    this.#cards = [card];
  }

  peekTop() {
    return this.#cards[this.#cards.length - 1];
  }

  discard(card: Card) {
    if (!discardable(card, this.peekTop())) {
      throw new Error(`Attempt to discard ${card} on top of ${this.peekTop()}`);
    }
    this.#cards.push(card);
  }

  reuse(): Card[] {
    return this.#cards.splice(0, this.#cards.length - 1);
  }
}