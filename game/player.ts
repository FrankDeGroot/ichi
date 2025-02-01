import { Card } from "./deck.ts";
import DiscardPile from "./discard-pile.ts";
import { discardable } from "./discardable.ts";
import DrawPile from "./draw-pile.ts";
import Hand from "./hand.ts";

export default class Player {
  #name;
  #hand;
  #drawPile;
  #discardPile;
  #discarder;

  constructor(
    name: string,
    hand: Hand,
    drawPile: DrawPile,
    discardPile: DiscardPile,
    discarder: (hand: Hand, top: Card) => [Card, number] | null
  ) {
    this.#name = name;
    this.#hand = hand;
    this.#drawPile = drawPile;
    this.#discardPile = discardPile;
    this.#discarder = discarder;
  }

  turn() {
    console.debug("Player", this.#name, "'s turn")
    const top = this.#discardPile.peekTop();
    console.debug("Player", this.#name, "discards on top of", top)
    const discarded = this.#discarder(this.#hand, top);
    if (discarded !== null) {
      const [ card, index ] = discarded;
      console.debug("Player", this.#name, "discarding", card);
      this.#discardPile.discard(this.#hand.discard(index));
    } else {
      const drawn = this.#drawPile.draw()
      console.debug("Player", this.#name, "drawing", drawn);
      if (discardable(drawn, top)) {
        console.debug("Player", this.#name, "discards", drawn);
        this.#discardPile.discard(drawn);
      } else {
        console.debug("Player", this.#name, "keeps", drawn);
        this.#hand.add(drawn);
      }
    }
  }
}