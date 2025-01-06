import { Card } from "./deck.ts";
import DiscardPile from "./discard-pile.ts";

export default class DrawPile {
  #cards;
  #discardPile;

  constructor(cards: Card[], discardPile: DiscardPile) {
    this.#cards = cards;
    this.#discardPile = discardPile;
  }

  draw() {
    if (!this.#cards.length) {
      this.#cards = this.#discardPile.reuse();
    }
    return this.#cards.pop() as Card;
  }
}
