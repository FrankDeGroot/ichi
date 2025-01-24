import { Card } from "./deck.ts";
import DiscardPile from "./discard-pile.ts";
import { discardable } from "./discardable.ts";
import DrawPile from "./draw-pile.ts";
import Hand from "./hand.ts";

export default class Player {
  #hand;
  #drawPile;
  #discardPile;
  #discarder;

  constructor(hand: Hand, drawPile: DrawPile, discardPile: DiscardPile, discarder: (hand: Hand, top: Card) => number | null) {
    this.#hand = hand;
    this.#drawPile = drawPile;
    this.#discardPile = discardPile;
    this.#discarder = discarder;
  }

  turn() {
    const top = this.#discardPile.peekTop();
    const discarded = this.#discarder(this.#hand, top);
    if (discarded !== null) {
      this.#discardPile.discard(this.#hand.discard(discarded));
    } else {
      const drawn = this.#drawPile.draw()
      if (discardable(drawn, top)) {
        this.#discardPile.discard(drawn);
      } else {
        this.#hand.add(drawn);
      }
    }
  }
}