import { Card, getShuffledDeck } from "./deck.ts";

export class Hand {
  #cards: Card[];

  constructor(cards: Card[]) {
    this.#cards = cards;
  }

  discardable(top: Card): Card[] {
    return this.#cards.filter(card =>
      "color" in top &&
      "color" in card &&
      top.color === card.color ||
      "digit" in top &&
      "digit" in card &&
      top.digit === card.digit ||
      "specialCard" in top &&
      "specialCard" in card &&
      top.specialCard == card.specialCard ||
      "wildcard" in card
    );
  }
}

export class DrawPile {
  #cards: Card[];

  constructor(cards: Card[]) {
    this.#cards = cards;
  }

  draw() {
    return this.#cards.pop();
  }
}

export class DiscardPile {
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

export class Player {
  #hand: Hand | undefined;

  constructor() {
  }

  hand(cards: Card[]) {
    this.#hand = new Hand(cards);
  }
}

export class Game {
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
