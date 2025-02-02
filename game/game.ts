import { Dealing } from "./dealer.ts";
import { SpecialCard } from "./deck.ts";

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
    const direction = Object.hasOwn(top, "specialCard") &&
        (top as SpecialCard).specialCard === "Reverse"
      ? up
      : down;
    for (let i = 0;; i = (i + direction) % this.#players.length) {
      const player = this.#players[i];
      if (player.turn()) {
        console.debug("Player", player.name, "won!");
        return player;
      }
    }
  }
}
