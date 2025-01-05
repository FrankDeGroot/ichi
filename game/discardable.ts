import { Card } from "./deck.ts";

export function discardable(card: Card, top: Card) {
  return "color" in top &&
      "color" in card &&
      top.color === card.color ||
      "digit" in top &&
      "digit" in card &&
      top.digit === card.digit ||
      "specialCard" in top &&
      "specialCard" in card &&
      top.specialCard === card.specialCard ||
      "wildcard" in card

}