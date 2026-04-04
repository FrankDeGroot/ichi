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
    let skipNext = isActionCard(top) && top.action === "Skip";
    let drawNext = isActionCard(top) && top.action === "Draw2" ? 2 : 0;
    for (let i = 0;; i = (i + direction) % this.#players.length) {
      if (skipNext) {
        i = (i + direction) % this.#players.length;
        skipNext = false;
      }
      if (drawNext > 0) {
        const player = this.#players[i];
        for (let j = 0; j < drawNext; j++) {
          player.draw();
        }
        drawNext = 0;
        i = (i + direction) % this.#players.length;
      }
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
      if (
        currentTop !== previousTop &&
        isActionCard(currentTop) &&
        currentTop.action === "Skip"
      ) {
        skipNext = true;
      }
      if (
        currentTop !== previousTop &&
        isActionCard(currentTop) &&
        currentTop.action === "Draw2"
      ) {
        drawNext = 2;
      }
    }
  }
}
