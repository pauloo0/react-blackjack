import React from 'react'
import { DeckCard } from '../utils/deck'
import Card from './Card'

interface PlayerActions {
  hit: (id: number) => void
  stand: (id: number) => void
  double: (id: number) => void
  split: (id: number) => void
  surrender: (id: number) => void
}

export interface PlayerProps {
  id: number
  name: string
  cards?: DeckCard[]
  isCpu: boolean
  balance: number
  actions: PlayerActions
}

const Player: React.FC<PlayerProps> = (props) => {
  const { hit, stand, double, split, surrender } = props.actions

  return (
    <div className='cols-span-1 flex items-center justify-between w-full space-x-4'>
      <section
        className={`${
          props.isCpu && 'hidden'
        } grid grid-cols-1 gap-1 text-white cols-span-1`}
      >
        <button
          className='rounded-full w-8 h-8 bg-cyan-900 hover:bg-cyan-800'
          onClick={() => hit(props.id)}
        >
          +
        </button>
        <button
          className='rounded-full w-8 h-8 bg-cyan-900 hover:bg-cyan-800'
          onClick={() => stand(props.id)}
        >
          |
        </button>
        <button
          className='rounded-full w-8 h-8 bg-cyan-900 hover:bg-cyan-800'
          onClick={() => double(props.id)}
        >
          x2
        </button>
        <button
          className='rounded-full w-8 h-8 bg-cyan-900 hover:bg-cyan-800'
          onClick={() => split(props.id)}
        >
          /
        </button>
        <button
          className='rounded-full w-8 h-8 bg-cyan-900 hover:bg-cyan-800'
          onClick={() => surrender(props.id)}
        >
          FF
        </button>
      </section>
      <section className='flex-grow'>
        <div className='flex flex-row items-center justify-start space-x-2'>
          {props.cards?.map((card, index) => (
            <Card key={index} card={card.value} facingUp={true} />
          ))}
        </div>
        <h1>{props.name}</h1>
        <p>{props.balance} €</p>
      </section>
    </div>
  )
}

export default Player
