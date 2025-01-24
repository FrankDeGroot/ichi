import { Card } from "./deck.ts";
import { discardable } from "./discardable.ts";

export default class Hand {
  #cards;

  constructor(cards: Card[]) {
    this.#cards = cards;
  }

  empty() {
    return this.#cards.length === 0;
  }

  add(cards: Card[] | Card) {
    if (Array.isArray(cards)) {
      this.#cards.push(...cards);
    } else {
      this.#cards.push(cards);
    }
  }

  discardable(top: Card): [Card, number][] {
    const indexedCards: [Card, number][] = this.#cards.map((card, index) => [card, index])
    return indexedCards.filter(([card, _]) => discardable(card, top));
  }

  discard(index: number): Card {
    const discarded = this.#cards.splice(index, 1)
    return discarded[0]
  }
}