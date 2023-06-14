import React, { useState } from 'react'
import Dealer from './components/Dealer'
import Player, { PlayerProps } from './components/Player'
import { DeckCard, deck } from './utils/deck'

const App: React.FC = () => {
  const [gameStart, setGameStart] = useState<boolean>(false)
  const [playerName, setPlayerName] = useState<string>('Paulo')
  const [playerBet, setPlayerBet] = useState<number>(0)
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
      bet: playerBet,
      actions: {
        hit,
        stand,
        double,
        split,
        surrender,
      },
    })
    for (let i = 0; i < 4 - (players.length + 1); i++) {
      newPlayers.push({
        id: i + 2,
        name: `CPU ${i + 1}`,
        isCpu: true,
        cards: [],
        balance: 100,
        bet: Math.floor(Math.random() * 100) + 1,
        actions: {
          hit,
          stand,
          double,
          split,
          surrender,
        },
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

  const hit = (id: number) => {
    const player = players.find((p) => p.id === id)
    if (!player) return false

    if (computeScore(player.cards) < 21) {
      dealCards(id)
    }
  }

  const stand = (id: number) => {
    console.log('stand', id)
  }

  const double = (id: number) => {
    console.log('double', id)
  }

  const split = (id: number) => {
    console.log('split', id)
  }

  const surrender = (id: number) => {
    console.log('surrender', id)
  }

  const computeScore = (cards: DeckCard[] = []) => {
    let score = 0

    cards.forEach((card) => {
      if (card.value === 'A' && score + 11 > 21) {
        score += 1
      } else if (card.value === 'A' && score + 11 <= 21) {
        score += 11
      } else {
        score += card.points
      }
    })

    return score
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
          <input
            type='text'
            pattern='[0-9]*'
            value={playerBet}
            onChange={(e) =>
              setPlayerBet(Number(e.target.value.replace(/[^0-9]/g, '')))
            }
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
                <div
                  key={index}
                  className='flex flex-col items-start justify-between w-full'
                >
                  <Player
                    key={player.id}
                    id={player.id}
                    name={player.name}
                    cards={player.cards}
                    isCpu={player.isCpu}
                    balance={player.balance}
                    bet={player.bet}
                    actions={{ hit, stand, double, split, surrender }}
                  />
                </div>
              )
            })}
          </main>
        </>
      )}
    </div>
  )
}

export default App
