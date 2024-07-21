import { Card } from "./deck.ts";
import Hand from "./hand.ts";
import DiscardPile from "./discard_pile.ts";
import DrawPile from "./draw_pile.ts";

export class Player {
  #hand: Hand = new Hand();

  hand(cards: Card[]) {
    this.#hand.add(cards);
  }
}

export class Game {
  #players: Player[];
  #drawPile: DrawPile;
  #discardPile: DiscardPile;

  constructor(players: Player[], deck: Card[]) {
    this.#players = players;
    this.#deal(deck);
    this.#discardPile = new DiscardPile(deck.pop() as Card);
    this.#drawPile = new DrawPile(deck);
  }

  #deal(deck: Card[]) {
    for (const player of this.#players) {
      player.hand(deck.splice(0, 7));
    }
  }
}
