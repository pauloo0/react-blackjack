import React from 'react'

interface PlayerProps {
  name: string
}

const Player: React.FC<PlayerProps> = (props) => {
  return <div className='cols-span-1'>{props.name}</div>
}

export default Player
