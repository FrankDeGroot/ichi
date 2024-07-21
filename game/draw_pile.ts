import { Card } from "./deck.ts";

export default class DrawPile {
  #cards: Card[];

  constructor(cards: Card[]) {
    this.#cards = cards;
  }

  draw() {
    return this.#cards.pop();
  }
}
