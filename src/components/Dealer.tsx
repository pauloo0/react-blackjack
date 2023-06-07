import React from 'react'
import Card from './Card'
import { IDeck } from '../utils/deck'

interface DealerProps {
  cards: IDeck[]
}

const Dealer: React.FC<DealerProps> = (props) => {
  const { cards } = props

  return (
    <div className='text-center'>
      <h1 className='py-4 mb-4 text-3xl font-bold'>Dealer</h1>
      <section className='flex flex-row items-center justify-center space-x-3'>
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card.name}
            facingUp={index === 0 ? true : false}
          />
        ))}
      </section>
    </div>
  )
}

export default Dealer
