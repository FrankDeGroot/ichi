import { Card } from "./deck.ts";
import Hand from "./hand.ts";

/**
 * Naive = Just pick the first discardable card. 
 * Discarder = Strategy to pick a card to discard from a hand of cards.
 */
export function naiveDiscarder(hand: Hand, top: Card) {
  const discardable = hand.discardable(top);
  return discardable.length ? discardable[0][1]: null;
}
