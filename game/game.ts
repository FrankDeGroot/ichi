import { Dealing } from "./dealer.ts";

export class Game {
  #discardPile;
  #drawPile;
  #players;

  constructor(dealing: Dealing) {
    this.#discardPile = dealing.discardPile;
    this.#drawPile = dealing.drawPile;
    this.#players = dealing.players;
  }

  play() {
    for(let i = 0; i < this.#players.length; i++) {
      this.#players[i].turn();
    }
  }
}
