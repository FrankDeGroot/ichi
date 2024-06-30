import { Card, getShuffledDeck } from "./deck.ts";

class Hand {
    #cards: Card[];

    constructor(cards: Card[]) {
        this.#cards = cards;
    }

    //TODO filter discardable cards.
}

class DrawPile {
    #cards: Card[];

    constructor(cards: Card[]) {
        this.#cards = cards;
    }

    draw() {
        return this.#cards.pop();
    }
}

class DiscardPile {
    #cards: Card[];

    constructor(card: Card) {
        this.#cards = [card];
    }

    peekTop() {
        return this.#cards[this.#cards.length - 1];
    }

    discard(card: Card) {
        this.#cards.push(card);
    }
}

class Player {
    #hand: Hand | undefined;

    constructor() {
    }

    hand(cards: Card[]) {
        this.#hand = new Hand(cards);
    }
}

class Game {
    #players: Player[];
    #drawPile: DrawPile;
    #discardPile: DiscardPile;

    constructor(players: Player[]) {
        this.#players = players;
        const shuffledDeck = getShuffledDeck();
        this.#deal(shuffledDeck);
        this.#discardPile = new DiscardPile(shuffledDeck.pop() as Card);
        this.#drawPile = new DrawPile(shuffledDeck);
    }

    #deal(shuffledDeck: Card[]) {
        for (const player of this.#players) {
            player.hand(shuffledDeck.splice(0, 7));
        }
    }
}
