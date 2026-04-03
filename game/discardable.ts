import { Card, hasColor, hasDigit, isActionCard, isWildCard } from "./deck.ts";

export function discardable(card: Card, top: Card) {
  return (hasColor(top) && hasColor(card) && top.color === card.color) ||
    (hasDigit(top) && hasDigit(card) && top.digit === card.digit) ||
    (isActionCard(top) && isActionCard(card) && top.actionCard === card.actionCard) ||
    isWildCard(card);
}
