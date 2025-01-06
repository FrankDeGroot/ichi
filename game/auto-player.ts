import DiscardPile from "./discard-pile.ts";
import DrawPile from "./draw-pile.ts";
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
    if (!discardable.length) {
      const drawn = this.#drawPile.draw()
      this.#hand.add(drawn)
      const discardable = this.#hand.discardable(top);
      if (discardable.length) {
        this.#discardPile.discard(discardable[0]);
      }
    } else {
      this.#discardPile.discard(discardable[0]);
    }
  }
}