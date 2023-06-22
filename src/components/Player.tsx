import React from 'react'
import { DeckCard } from '../utils/deck'
import Card from './Card'

interface PlayerActions {
  hit: (who: string) => void
  stand: () => void
  double: () => void
  surrender: () => void
}

export interface PlayerProps {
  name: string
  cards: DeckCard[]
  balance: number
  bet: number
  score: number
  actions: PlayerActions
  dealerTurn: boolean
  hasDoubled: boolean
  hasRoundStarted: boolean
}

const Player: React.FC<PlayerProps> = (props) => {
  const { hit, stand, double, surrender } = props.actions

  return (
    <div className='flex flex-col-reverse items-center justify-center w-full space-x-4'>
      <section className='flex mt-4 space-x-4 text-white'>
        <button
          className='w-10 h-10 rounded-full bg-cyan-900 hover:bg-cyan-800 disabled:bg-slate-700'
          onClick={() => hit('player')}
          disabled={!props.dealerTurn || !props.hasRoundStarted}
        >
          +
        </button>
        <button
          className='w-10 h-10 rounded-full bg-cyan-900 hover:bg-cyan-800 disabled:bg-slate-700'
          onClick={stand}
          disabled={!props.dealerTurn || !props.hasRoundStarted}
        >
          |
        </button>
        <button
          className='w-10 h-10 rounded-full bg-cyan-900 hover:bg-cyan-800 disabled:bg-slate-700'
          onClick={double}
          disabled={
            !props.dealerTurn || props.hasDoubled || !props.hasRoundStarted
          }
        >
          x2
        </button>
        <button
          className='w-10 h-10 rounded-full bg-cyan-900 hover:bg-cyan-800 disabled:bg-slate-700'
          onClick={surrender}
          disabled={
            !props.dealerTurn || props.hasDoubled || !props.hasRoundStarted
          }
        >
          FF
        </button>
      </section>
      <section>
        <div className='flex items-center justify-start space-x-2'>
          {props.cards?.map((card, index) => (
            <Card key={index} card={card.value} facingUp={true} />
          ))}
        </div>
        <h1>
          {props.name}{' '}
          <span>
            ({props.score === 21 ? 'Blackjack' : `${props.score} points`})
          </span>
        </h1>
        <div className='flex items-center justify-start w-full space-x-4'>
          <p className='text-sm'>{props.balance}€</p>
          <p className='grid w-8 h-8 text-sm font-bold text-white bg-red-700 rounded-full place-items-center line'>
            {props.bet}
          </p>
        </div>
      </section>
    </div>
  )
}

export default Player
