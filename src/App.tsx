import React from 'react'
import Dealer from './components/Dealer'
import Player from './components/Player'

const App: React.FC = () => {
  const players = []
  const NUMBER_OF_PLAYERS = 4

  for (let i = 0; i < NUMBER_OF_PLAYERS; i++) {
    players.push(`Player ${i + 1}`)
  }

  return (
    <div className='flex flex-col items-center justify-between h-screen bg-slate-200'>
      <header className=''>
        <Dealer />
      </header>
      <main className={`grid grid-cols-4 gap-4 mb-10 w-4/5`}>
        {players.map((player, index) => {
          return <Player key={index} name={player} />
        })}
      </main>
    </div>
  )
}

export default App
