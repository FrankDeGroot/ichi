import assert from "node:assert";
import test from "node:test";
import { Game } from "./game.ts";
import DiscardPile from "./discard-pile.ts";
import DrawPile from "./draw-pile.ts";

test("Should play normal game", () => {
  const discardPile = new DiscardPile({
    color: "Red", digit: 1
  })
  const game = new Game({
    discardPile,
    drawPile: new DrawPile([{
      color: "Red", digit: 2
    }], discardPile),
    players: [
    ]
  });
  game.play();
});