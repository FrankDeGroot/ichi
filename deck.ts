export type Number = 0 | 1 | 2 | 3 | 3 | 4 | 6 | 7 | 8 | 9;
const allNumbers: Number[] = [...Array(10).keys()].map((number) =>
    number as Number
);

export enum Color {
    Blue = "Blue",
    Green = "Green",
    Red = "Red",
    Yellow = "Yellow",
}
const allColors: Color[] = Object.keys(Color).map((color) =>
    Color[color as keyof typeof Color]
);

export abstract class Card {}

export abstract class ColoredCard extends Card {
    #color: Color;

    constructor(color: Color) {
        super();
        this.#color = color;
    }

    get color() {
        return this.#color;
    }

    toString(): string {
        return this.#color;
    }
}

export class NumberedCard extends ColoredCard {
    #number: Number;

    constructor(color: Color, number: Number) {
        super(color);
        this.#number = number;
    }

    get number() {
        return this.#number;
    }

    toString(): string {
        return `${super.toString()} ${this.#number}`;
    }
}

const allColoredNumberedCards = allColors.flatMap((color) =>
    allNumbers.map((number) => new NumberedCard(color, number))
);

const allColoredNonZeroNumberedCards = allColoredNumberedCards
    .filter((card) => card.number !== 0);

export class Draw2Card extends ColoredCard {
    constructor(color: Color) {
        super(color);
    }

    toString(): string {
        return `${super.toString()} Draw2Card`;
    }
}

export class ReverseCard extends ColoredCard {
    constructor(color: Color) {
        super(color);
    }

    toString(): string {
        return `${super.toString()} ReverseCard`;
    }
}

export class SkipCard extends ColoredCard {
    constructor(color: Color) {
        super(color);
    }

    toString(): string {
        return `${super.toString()} SkipCard`;
    }
}

function getColoredSpecialCards(color: Color) {
    return [new Draw2Card(color), new ReverseCard(color), new SkipCard(color)];
}

const allColoredSpecialCards = allColors.flatMap((color) =>
    getColoredSpecialCards(color)
);

export class WildCard extends Card {
    toString(): string {
        return "WildCard";
    }
}

export class WildDraw4Card extends Card {
    toString(): string {
        return "WildDraw4Card";
    }
}

export const deck: readonly Card[] = (allColoredNumberedCards as Card[])
    .concat(
        allColoredNonZeroNumberedCards,
        allColoredSpecialCards,
        allColoredSpecialCards,
        Array(4).fill(new WildCard()),
        Array(4).fill(new WildDraw4Card()),
    );

export function getShuffledDeck() {
    const shuffledDeck = deck.slice(0);
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
}
