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
    const up = 1;
    const down = this.#players.length - 1;
    const top = this.#discardPile.peekTop();
    const direction = "specialCard" in top &&
        top.specialCard === "Reverse"
      ? down
      : up;
    for (let i = 0;; i = (i + direction) % this.#players.length) {
      console.debug("Playing direction", direction === up ? "up" : "down");
      const player = this.#players[i];
      if (player.turn()) {
        console.debug("Player", player.name, "won!");
        return player;
      }
    }
  }
}
