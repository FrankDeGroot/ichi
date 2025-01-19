import { Card } from "./deck.ts";
import DiscardPile from "./discard-pile.ts";
import DrawPile from "./draw-pile.ts";
import Hand from "./hand.ts";

export default class Player {
  #hand;
  #drawPile;
  #discardPile;
  #discarder;

  constructor(hand: Hand, drawPile: DrawPile, discardPile: DiscardPile, discarder: (hand: Hand, top: Card) => Card | null) {
    this.#hand = hand;
    this.#drawPile = drawPile;
    this.#discardPile = discardPile;
    this.#discarder = discarder;
  }

  turn() {
    const top = this.#discardPile.peekTop();
    const discarded = this.#discarder(this.#hand, top);
    // TODO Remove the card from the hand while discarding
    if (discarded) {
      this.#discardPile.discard(discarded);
    } else {
      const drawn = this.#drawPile.draw()
      // TODO Don't add this to the hand, check if it is discardable immediately and if so, discard it. Otherwise add it to the hand.
      // this.#hand.add(drawn)
      // const discard = this.#discarder(this.#hand, top);
      // if (discard) {
      //   this.#discardPile.discard(discard);
      // }
    }
  }
}