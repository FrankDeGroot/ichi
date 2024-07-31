import { Card } from "./deck.ts";

export default class DrawPile {
  #cards: Card[];
  #onEmpty: () => Card[];

  constructor(cards: Card[], onEmpty: () => Card[]) {
    this.#cards = cards;
    this.#onEmpty = onEmpty;
  }

  draw() {
    let card = this.#cards.pop();
    while (!card) {
      this.#cards = this.#onEmpty();
      card = this.#cards.pop();
    }
    return card;
  }
}
