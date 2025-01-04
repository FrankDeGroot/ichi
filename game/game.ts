import { Card } from "./deck.ts";
import DiscardPile from "./discard_pile.ts";
import DrawPile from "./draw_pile.ts";
import Player from "./player.ts";

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
