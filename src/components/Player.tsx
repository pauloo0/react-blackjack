import React from 'react'
import { IDeck } from '../utils/deck'

interface PlayerProps {
  name: string
  cards: IDeck[]
}

const Player: React.FC<PlayerProps> = (props) => {
  return <div className='cols-span-1'>{props.name}</div>
}

export default Player
