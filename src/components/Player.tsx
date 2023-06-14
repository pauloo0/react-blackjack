import React from 'react'
import { DeckCard } from '../utils/deck'
import Card from './Card'

interface PlayerActions {
  hit: (id: number) => void
  stand: (id: number) => void
  double: (id: number) => void
  surrender: (id: number) => void
}

export interface PlayerProps {
  id: number
  name: string
  cards?: DeckCard[]
  isCpu: boolean
  balance: number
  bet: number
  actions: PlayerActions
}

const Player: React.FC<PlayerProps> = (props) => {
  const { hit, stand, double, surrender } = props.actions

  return (
    <div className='flex items-center justify-between w-full space-x-4 cols-span-1'>
      <section
        className={`${
          props.isCpu && 'hidden'
        } grid grid-cols-1 gap-1 text-white cols-span-1`}
      >
        <button
          className='w-8 h-8 rounded-full bg-cyan-900 hover:bg-cyan-800'
          onClick={() => hit(props.id)}
        >
          +
        </button>
        <button
          className='w-8 h-8 rounded-full bg-cyan-900 hover:bg-cyan-800'
          onClick={() => stand(props.id)}
        >
          |
        </button>
        <button
          className='w-8 h-8 rounded-full bg-cyan-900 hover:bg-cyan-800'
          onClick={() => double(props.id)}
        >
          x2
        </button>
        <button
          className='w-8 h-8 rounded-full bg-cyan-900 hover:bg-cyan-800'
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
        <div className='flex items-center justify-start w-full space-x-4'>
          <p className='text-sm'>{props.balance} €</p>
          <p className='p-2 text-sm font-bold text-white bg-red-700 rounded-full'>
            {props.bet}
          </p>
        </div>
      </section>
    </div>
  )
}

export default Player
