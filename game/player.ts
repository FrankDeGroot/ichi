import { Card } from "./deck.ts";
import DiscardPile from "./discard_pile.ts";
import DrawPile from "./draw_pile.ts";
import Hand from "./hand.ts";

export default class Player {
  #hand;
  #drawPile;
  #discardPile;

  constructor(hand: Hand, drawPile: DrawPile, discardPile: DiscardPile) {
    this.#hand = hand;
    this.#drawPile = drawPile;
    this.#discardPile = discardPile;
  }

  turn() {
    const top = this.#discardPile.peekTop();
    const discardable = this.#hand.discardable(top);
    if (discardable.length > 0) {
      this.#discardPile.discard(discardable[0]);
    } else {
      this.#hand.add(this.#drawPile.draw())
    }
  }
}