const colors = ["Blue", "Green", "Red", "Yellow"] as const;
export type Color = (typeof colors)[number];
export type ColoredCard = { color: Color };

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export type Digit = (typeof digits)[number];
export type DigitCard = ColoredCard & { digit: Digit };
const allDigitCards = colors.flatMap((color) =>
  digits.map((digit) => ({ color, digit }))
);
const allNonZeroDigitCards = allDigitCards
  .filter((card) => card.digit !== 0);

const specialCards = ["Draw2", "Reverse", "Skip"] as const;
export type SpecialCard = ColoredCard & {
  specialCard: (typeof specialCards)[number];
};
const allColoredSpecialCards = colors.flatMap((color) =>
  specialCards.map((specialCard) => ({ color, specialCard }))
);

const wildcards = ["Wild", "Draw4"] as const;
export type Wildcard = { wildcard: (typeof wildcards)[number] };
const allWildcards = wildcards.map((wildcard) => ({
  wildcard,
}));

export type Card = DigitCard | SpecialCard | Wildcard;

function duplicate<T>(count: number, array: T[]) {
  return Array(count).fill(array).flatMap((o) => o);
}

export const deck: readonly Card[] = allDigitCards
  .concat(
    allNonZeroDigitCards,
    duplicate(2, allColoredSpecialCards),
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