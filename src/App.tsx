// import React, { useState } from 'react'
// import { DECK, IDeck } from './utils/deck'

// const NUMBER_OF_PLAYERS = 4

// const App: React.FC = () => {
//   const players = []

//   const [dealerCards, setDealerCards] = useState<IDeck[]>([])
//   const [playerCards, setPlayerCards] = useState<IDeck[]>([])

//   for (let i = 0; i < NUMBER_OF_PLAYERS; i++) {
//     players.push(`Player ${i + 1}`)
//   }

//   const dealCards = () => {
//     // deal 2 cards for the dealer
//     const dealerCards: IDeck[] = DECK.sort(() => 0.5 - Math.random()).slice(
//       0,
//       2
//     )
//     console.log(dealerCards)
//     setDealerCards(dealerCards)
//   }

//   return (
//     <div className='flex flex-col items-center justify-between h-screen bg-slate-200'>
//       <header className='flex items-center justify-center w-4/5 mb-10'>
//         <Dealer cards={dealerCards} />
//         <button
//           className='absolute px-6 py-2 text-white rounded-lg bg-cyan-900 right-10 top-5 disabled:bg-slate-700'
//           onClick={dealCards}
//           disabled={
//             dealerCards.length > 0 || playerCards.length > 0 ? true : false
//           }
//         >
//           Deal cards
//         </button>
//       </header>
//       <main className={`grid grid-cols-4 gap-4 mb-10 w-4/5`}>
//         {players.map((player, index) => {
//           return <Player key={index} name={player} cards={playerCards} />
//         })}
//       </main>
//     </div>
//   )
// }

// export default App

import React, { useState } from 'react'
import Dealer from './components/Dealer'
import Player from './components/Player'
import { PlayerProps } from './components/Player'
import { DeckCard, deck } from './utils/deck'

const App: React.FC = () => {
  const [gameStart, setGameStart] = useState<boolean>(false)
  const [playerName, setPlayerName] = useState<string>('Paulo')
  const [players, setPlayers] = useState<PlayerProps[]>([])
  const [dealerCards, setDealerCards] = useState<DeckCard[]>([])

  const startGame = () => {
    const newPlayers = [...players]
    newPlayers.push({
      id: 1,
      name: playerName,
      isCpu: false,
      cards: [],
      balance: 100,
    })
    for (let i = 0; i < 4 - (players.length + 1); i++) {
      newPlayers.push({
        id: i + 2,
        name: `CPU ${i + 1}`,
        isCpu: true,
        cards: [],
        balance: 100,
      })
    }
    setPlayers(newPlayers)
    setGameStart(true)

    for (let i = 0; i < 2; i++) {
      newPlayers.forEach((player) => {
        dealCards(player.id)
      })
      dealCards(-1) // Deal to dealer
    }
  }

  const dealCards = (playerId: number) => {
    const randomCard = shuffleDeck()

    if (playerId === -1) {
      setDealerCards((prevCards) => [...prevCards, randomCard])
    } else {
      setPlayers((prevPlayers) => {
        return prevPlayers.map((player) => {
          const playerCards = player.cards || []
          if (player.id === playerId) {
            return {
              ...player,
              cards: [...playerCards, randomCard],
            }
          }
          return player
        })
      })
    }
  }

  const shuffleDeck = () => {
    const randomCard = deck[Math.floor(Math.random() * deck.length)]
    return randomCard
  }

  return (
    <div className='flex flex-col items-center justify-between h-screen bg-slate-200'>
      {!gameStart ? (
        <div className='flex flex-col items-center justify-center h-screen'>
          <h1 className='mb-4 text-3xl font-bold'>Welcome to Blackjack!</h1>
          <input
            className='px-4 py-2 mb-4 border rounded-lg shadow border-slate-200'
            type='text'
            placeholder='Enter your name'
            onChange={(e) => setPlayerName(e.target.value)}
            value={playerName}
          />
          <button
            className='px-6 py-2 text-white rounded-lg bg-cyan-900 disabled:bg-slate-700'
            onClick={startGame}
          >
            Start game
          </button>
        </div>
      ) : (
        <>
          <header className='flex items-center justify-center w-4/5 mb-10'>
            <Dealer cards={dealerCards} />
          </header>
          <main className={`grid grid-cols-4 gap-4 mb-10 w-4/5`}>
            {players.map((player, index) => {
              return (
                <Player
                  key={index}
                  id={player.id}
                  name={player.name}
                  cards={player.cards}
                  isCpu={player.isCpu}
                  balance={player.balance}
                />
              )
            })}
          </main>
        </>
      )}
    </div>
  )
}

export default App
