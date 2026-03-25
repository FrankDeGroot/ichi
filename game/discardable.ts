import { Card, hasColor, hasDigit, isSpecialCard, isWildCard } from "./deck.ts";

export function discardable(card: Card, top: Card) {
  return (hasColor(top) && hasColor(card) && top.color === card.color) ||
    (hasDigit(top) && hasDigit(card) && top.digit === card.digit) ||
    (isSpecialCard(top) && isSpecialCard(card) && top.specialCard === card.specialCard) ||
    isWildCard(card);
}
