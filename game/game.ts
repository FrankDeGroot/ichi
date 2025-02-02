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
    for (const player of this.#players) {
      if (player.turn()) {
        console.debug("Player", player.name, "won!");
        return player;
      }
    }
  }
}
