import { Dealing } from "./dealer.ts";
import { Card } from "./deck.ts";
import DiscardPile from "./discard-pile.ts";
import DrawPile from "./draw-pile.ts";
import Hand from "./hand.ts";
import { naiveDiscarder } from "./naive-discarder.ts";
import Player from "./player.ts";

export function testDeal({ top, draw, hands }: {
  top: Card;
  draw: Card[];
  hands: Card[][];
}): Dealing {
  const discardPile = new DiscardPile(top);
  const drawPile = new DrawPile(draw, discardPile);
  const players = Array.apply(null, Array(hands.length))
    .map((_, i) =>
      new Player(
        i.toString(),
        new Hand(hands[i]),
        drawPile,
        discardPile,
        naiveDiscarder,
      )
    );

  return {
    discardPile,
    drawPile,
    players,
  };
}