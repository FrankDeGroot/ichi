import { Card } from "./deck.ts";
import DrawPile from "./draw_pile.ts";
import Hand from "./hand.ts";

export default class Player {
  #hand: Hand = new Hand();

  hand(cards: Card[]) {
    this.#hand.add(cards);
  }

  turn(top: Card): Card {
    const discardable = this.#hand.discardable(top);
    if (discardable.length > 0) {
      return discardable[0];
    } else {
      throw new Error("Not yet implemented")
    }
  }

  draw(drawPile: DrawPile) {
  }
}