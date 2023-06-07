import React, { useState } from 'react'
import Dealer from './components/Dealer'
import Player from './components/Player'
import { DECK, IDeck } from './utils/deck'

const NUMBER_OF_PLAYERS = 4

const App: React.FC = () => {
  const players = []

  const [dealerCards, setDealerCards] = useState<IDeck[]>([])
  const [playerCards, setPlayerCards] = useState<IDeck[]>([])

  for (let i = 0; i < NUMBER_OF_PLAYERS; i++) {
    players.push(`Player ${i + 1}`)
  }

  const dealCards = () => {
    // deal 2 cards for the dealer
    const dealerCards: IDeck[] = DECK.sort(() => 0.5 - Math.random()).slice(
      0,
      2
    )
    console.log(dealerCards)
    setDealerCards(dealerCards)
  }

  return (
    <div className='flex flex-col items-center justify-between h-screen bg-slate-200'>
      <header className='flex items-center justify-center w-4/5 mb-10'>
        <Dealer cards={dealerCards} />
        <button
          className='absolute px-6 py-2 text-white rounded-lg bg-cyan-900 right-10 top-5 disabled:bg-slate-700'
          onClick={dealCards}
          disabled={
            dealerCards.length > 0 || playerCards.length > 0 ? true : false
          }
        >
          Deal cards
        </button>
      </header>
      <main className={`grid grid-cols-4 gap-4 mb-10 w-4/5`}>
        {players.map((player, index) => {
          return <Player key={index} name={player} cards={playerCards} />
        })}
      </main>
    </div>
  )
}

export default App
