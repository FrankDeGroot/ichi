import { Dealing } from "./dealer.ts";
import { isActionCard } from "./deck.ts";

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
    const top = this.#discardPile.peek();
    let direction = isActionCard(top) &&
        top.action === "Reverse"
      ? down
      : up;
    for (let i = 0;; i = (i + direction) % this.#players.length) {
      console.debug("Playing direction", direction === up ? "up" : "down");
      const player = this.#players[i];
      const previousTop = this.#discardPile.peek();
      if (player.turn()) {
        console.debug("Player", player.name, "won!");
        return player;
      }

      const currentTop = this.#discardPile.peek();
      if (
        currentTop !== previousTop &&
        isActionCard(currentTop) &&
        currentTop.action === "Reverse"
      ) {
        direction = direction === up ? down : up;
      }
    }
  }
}
