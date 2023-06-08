import React from 'react'
import { DeckCard } from '../utils/deck'
import Card from './Card'

export interface PlayerProps {
  id: number
  name: string
  cards?: DeckCard[]
  isCpu: boolean
  balance: number
}

const Player: React.FC<PlayerProps> = (props) => {
  return (
    <div className='cols-span-1 flex flex-col justify-center items-start'>
      <section className='flex flex-row items-center justify-center space-x-3'>
        {props.cards?.map((card, index) => (
          <Card key={index} card={card.value} facingUp={true} />
        ))}
      </section>
      <h1>{props.name}</h1>
      <p>{props.balance} €</p>
    </div>
  )
}

export default Player
