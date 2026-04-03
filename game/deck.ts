const colors = ["Blue", "Green", "Red", "Yellow"] as const;
export type Color = (typeof colors)[number];
export type ColoredCard = { color: Color };
export function hasColor(card: Card) {
  return "color" in card;
}

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export type Digit = (typeof digits)[number];
export type DigitCard = ColoredCard & { digit: Digit };
export function hasDigit(card: Card) {
  return "digit" in card;
}
const allDigitCards = colors.flatMap((color) =>
  digits.map((digit) => ({ color, digit }))
);
const allNonZeroDigitCards = allDigitCards
  .filter((card) => card.digit !== 0);

const actionCards = ["Draw2", "Reverse", "Skip"] as const;
export type ActionCard = ColoredCard & {
  action: (typeof actionCards)[number];
};
export function isActionCard(card: Card) {
  return "action" in card;
}
const allColoredActionCards = colors.flatMap((color) =>
  actionCards.map((action) => ({ color, action }))
);

const wildcards = ["Wild", "Draw4"] as const;
export type Wildcard = { wildcard: (typeof wildcards)[number] };
export function isWildCard(card: Card) {
  return "wildcard" in card;
}
const allWildcards = wildcards.map((wildcard) => ({
  wildcard,
}));

export type Card = DigitCard | ActionCard | Wildcard;

function duplicate<T>(count: number, array: T[]) {
  return Array(count).fill(array).flatMap((o) => o);
}

export const deck: readonly Card[] = allDigitCards
  .concat(
    allNonZeroDigitCards,
    duplicate(2, allColoredActionCards),
    duplicate(4, allWildcards),
  );

export function getShuffledDeck() {
  const shuffledDeck = deck.slice(0);
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
}
