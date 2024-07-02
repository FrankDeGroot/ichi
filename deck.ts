export type Card = {};

const colors = ["Blue", "Green", "Red", "Yellow"] as const;
export type Color = (typeof colors)[number];
export type ColoredCard = Card & { color: Color };

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export type Digit = (typeof digits)[number];
export type DigitCard = ColoredCard & { digit: Digit };
const allDigitCards = colors.flatMap((color) =>
    digits.map((digit) => ({ color, digit }))
);
const allNonZeroDigitCards = allDigitCards
    .filter((card) => card.digit !== 0);

const specialCards = ["Draw2", "Reverse", "Skip"] as const;
export type SpecialCard = (typeof specialCards)[number];
const allColoredSpecialCards = colors.flatMap((color) =>
    specialCards.map((special) => ({ color, special }))
);

const wildcards = ["Wild", "Draw4"] as const;
export type Wildcards = (typeof wildcards)[number];
const allWildcards = wildcards.map((wildcard) => ({
    wildcard,
}));

export const deck: readonly Card[] = (allDigitCards as Card[])
    .concat(
        allNonZeroDigitCards,
        allColoredSpecialCards,
        allColoredSpecialCards,
        Array(4).fill(allWildcards).flatMap((c) => c),
    );

export function getShuffledDeck() {
    const shuffledDeck = deck.slice(0);
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
}
