export type Number = 0|1|2|3|3|4|6|7|8|9;

export enum Color {
    Blue = "Blue",
    Green = "Green",
    Red = "Red",
    Yellow = "Yellow",
}

export class Card {}

export class ColoredCard extends Card {

    #color: Color;

    constructor(color: Color) {
        super();
        this.#color = color;
    }

    toString() {
        return this.#color.toString();
    }
}

export class NumberedCard extends ColoredCard {

    #number: Number;

    constructor(color: Color, number: Number) {
        super(color);
        this.#number = number;
    }

    toString() {
        return `${super.toString()} ${this.#number}`;
    }
}

export class Draw2Card extends ColoredCard {
    constructor(color: Color) {
        super(color);
    }
}

export class ReverseCard extends ColoredCard {
    constructor(color: Color) {
        super(color);
    }
}

export class SkipCard extends ColoredCard {
    constructor(color: Color) {
        super(color);
    }
}

export class WildCard extends Card {
}

export class WildDraw4Card extends Card {
}

const allColors: Color[] = Object.keys(Color).map(color => Color[color as keyof typeof Color]);
const allNumbers: Number[] = [...Array(10).keys()].map(number => number as Number);
const nonZeroNumbers: Number[] = [...Array(9).keys()].map(number => (number + 1) as Number);

function coloredSpecialCards(color: Color) {
    return [new Draw2Card(color), new ReverseCard(color), new SkipCard(color)];
}

export const deck: Card[] =
    allColors.flatMap(color =>
        allNumbers.map(number => new NumberedCard(color, number) as Card)
    ).concat(
        allColors.flatMap(color =>
            nonZeroNumbers.map(number => new NumberedCard(color, number))
        ),
        allColors.flatMap(color => coloredSpecialCards(color)),
        allColors.flatMap(color => coloredSpecialCards(color)),
        Array(4).fill(new WildCard()),
        Array(4).fill(new WildDraw4Card()),
    );

console.log(deck.map(c => c.toString()));
