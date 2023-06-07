import React from 'react'

interface CardProps {
  card: string
  facingUp: boolean
}

const Card: React.FC<CardProps> = (props) => {
  const { card, facingUp } = props

  return (
    <div className='px-4 py-12 border rounded-lg shadow bg-slate-50 border-slate-200'>
      {facingUp ? <p>{card}</p> : <p>X</p>}
    </div>
  )
}

export default Card
