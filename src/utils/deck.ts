export enum Suit {
  Hearts,
  Diamonds,
  Clubs,
  Spades,
}

export interface DeckCard {
  suit: Suit
  value: string
  points: number
}

export const deck: DeckCard[] = [
  { suit: Suit.Hearts, value: 'A', points: 11 | 1 },
  { suit: Suit.Hearts, value: '2', points: 2 },
  { suit: Suit.Hearts, value: '3', points: 3 },
  { suit: Suit.Hearts, value: '4', points: 4 },
  { suit: Suit.Hearts, value: '5', points: 5 },
  { suit: Suit.Hearts, value: '6', points: 6 },
  { suit: Suit.Hearts, value: '7', points: 7 },
  { suit: Suit.Hearts, value: '8', points: 8 },
  { suit: Suit.Hearts, value: '9', points: 9 },
  { suit: Suit.Hearts, value: '10', points: 10 },
  { suit: Suit.Hearts, value: 'J', points: 10 },
  { suit: Suit.Hearts, value: 'Q', points: 10 },
  { suit: Suit.Hearts, value: 'K', points: 10 },
  { suit: Suit.Diamonds, value: 'A', points: 11 | 1 },
  { suit: Suit.Diamonds, value: '2', points: 2 },
  { suit: Suit.Diamonds, value: '3', points: 3 },
  { suit: Suit.Diamonds, value: '4', points: 4 },
  { suit: Suit.Diamonds, value: '5', points: 5 },
  { suit: Suit.Diamonds, value: '6', points: 6 },
  { suit: Suit.Diamonds, value: '7', points: 7 },
  { suit: Suit.Diamonds, value: '8', points: 8 },
  { suit: Suit.Diamonds, value: '9', points: 9 },
  { suit: Suit.Diamonds, value: '10', points: 10 },
  { suit: Suit.Diamonds, value: 'J', points: 10 },
  { suit: Suit.Diamonds, value: 'Q', points: 10 },
  { suit: Suit.Diamonds, value: 'K', points: 10 },
  { suit: Suit.Clubs, value: 'A', points: 11 | 1 },
  { suit: Suit.Clubs, value: '2', points: 2 },
  { suit: Suit.Clubs, value: '3', points: 3 },
  { suit: Suit.Clubs, value: '4', points: 4 },
  { suit: Suit.Clubs, value: '5', points: 5 },
  { suit: Suit.Clubs, value: '6', points: 6 },
  { suit: Suit.Clubs, value: '7', points: 7 },
  { suit: Suit.Clubs, value: '8', points: 8 },
  { suit: Suit.Clubs, value: '9', points: 9 },
  { suit: Suit.Clubs, value: '10', points: 10 },
  { suit: Suit.Clubs, value: 'J', points: 10 },
  { suit: Suit.Clubs, value: 'Q', points: 10 },
  { suit: Suit.Clubs, value: 'K', points: 10 },
  { suit: Suit.Spades, value: 'A', points: 11 | 1 },
  { suit: Suit.Spades, value: '2', points: 2 },
  { suit: Suit.Spades, value: '3', points: 3 },
  { suit: Suit.Spades, value: '4', points: 4 },
  { suit: Suit.Spades, value: '5', points: 5 },
  { suit: Suit.Spades, value: '6', points: 6 },
  { suit: Suit.Spades, value: '7', points: 7 },
  { suit: Suit.Spades, value: '8', points: 8 },
  { suit: Suit.Spades, value: '9', points: 9 },
  { suit: Suit.Spades, value: '10', points: 10 },
  { suit: Suit.Spades, value: 'J', points: 10 },
  { suit: Suit.Spades, value: 'Q', points: 10 },
  { suit: Suit.Spades, value: 'K', points: 10 },
]
