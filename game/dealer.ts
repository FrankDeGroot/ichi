import { Card } from "./deck.ts";
import DiscardPile from "./discard-pile.ts";
import DrawPile from "./draw-pile.ts";
import Hand from "./hand.ts";
import { naiveDiscarder } from "./naive-discarder.ts";
import Player from "./player.ts";

export type Dealing = {
  discardPile: DiscardPile,
  drawPile: DrawPile,
  players: Player[],
}

export function deal(playerCount: number, deck: Card[]): Dealing {
  const initialCards = 7;
  const handedCards = deck.splice(0, playerCount * initialCards);
  const discardPile = new DiscardPile(deck.pop() as Card);
  const drawPile = new DrawPile(deck, discardPile);
  const players = Array.apply(null, Array(playerCount)).map((_, i) =>
    new Player(
      i.toString(),
      new Hand(handedCards.splice(0, initialCards)),
      drawPile,
      discardPile,
      naiveDiscarder,
    )
  );
  return {
    discardPile,
    drawPile,
    players
  };
}
