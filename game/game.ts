import { Card } from "./deck.ts";
import DiscardPile from "./discard-pile.ts";
import DrawPile from "./draw-pile.ts";
import Hand from "./hand.ts";
import { naiveDiscarder } from "./naive-discarder.ts";
import Player from "./player.ts";

export class Game {
  #players;
  #drawPile;
  #discardPile;

  constructor(players: number, deck: Card[]) {
    const initialCards = 7;
    const handedCards = deck.splice(0, players * initialCards);
    this.#discardPile = new DiscardPile(deck.pop() as Card)
    this.#drawPile = new DrawPile(deck, this.#discardPile);
    this.#players = Array.apply(null, Array(players)).map(() =>
      new Player(new Hand(handedCards.splice(0, initialCards)),
        this.#drawPile, this.#discardPile, naiveDiscarder));
  }

  play() {
    
  }
}
