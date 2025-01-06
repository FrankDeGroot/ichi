import { Card } from "./deck.ts";
import DiscardPile from "./discard-pile.ts";
import DrawPile from "./draw-pile.ts";
import Player from "./auto-player.ts";

// export class Game {
//   #players: Player[];
//   #drawPile: DrawPile;
//   #discardPile: DiscardPile;

//   constructor(players: Player[], deck: Card[]) {
//     this.#players = players;
//     this.#deal(deck);
//     this.#discardPile = new DiscardPile(deck.pop() as Card);
//     this.#drawPile = new DrawPile(deck, this.#onDrawPileEmpty);
//   }

//   #deal(deck: Card[]) {
//     for (const player of this.#players) {
//       player.hand(deck.splice(0, 7));
//     }
//   }

//   #onDrawPileEmpty() {
//     return [];
//   }
// }
