import assert from "node:assert";
import test from "node:test";
import { Game } from "./game.ts";
import DiscardPile from "./discard-pile.ts";
import DrawPile from "./draw-pile.ts";
import Player from "./player.ts";
import Hand from "./hand.ts";
import { naiveDiscarder } from "./naive-discarder.ts";

test("Should play normal game", () => {
  const discardPile = new DiscardPile({
    color: "Red",
    digit: 1,
  });
  const drawPile = new DrawPile([{
    color: "Red",
    digit: 2,
  }], discardPile);
  const players = [
    new Player(
      "0",
      new Hand([{
        color: "Red",
        digit: 3,
      }, {
        color: "Blue",
        digit: 9,
      }]),
      drawPile,
      discardPile,
      naiveDiscarder,
    ),
    new Player(
      "1",
      new Hand([{
        color: "Red",
        digit: 4,
      }, {
        color: "Blue",
        digit: 8,
      }]),
      drawPile,
      discardPile,
      naiveDiscarder,
    ),
    new Player(
      "2",
      new Hand([{
        color: "Red",
        digit: 5,
      }]),
      drawPile,
      discardPile,
      naiveDiscarder,
    ),
  ];
  const game = new Game({
    discardPile,
    drawPile,
    players,
  });
  assert.strictEqual(game.play(), players[2]);
});
