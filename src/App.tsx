import React, { useState } from 'react'
import Dealer from './components/Dealer'
import Player, { PlayerProps } from './components/Player'
import { DeckCard, deck } from './utils/deck'

const defaultPlayer: PlayerProps = {
  name: '',
  balance: 100,
  bet: 0,
  score: 0,
  cards: [],
  actions: {
    hit: () => {
      console.log('hit')
    },
    stand: () => {
      console.log('stand')
    },
    double: () => {
      console.log('double')
    },
    surrender: () => {
      console.log('surrender')
    },
  },
}

const App: React.FC = () => {
  const [gameStart, setGameStart] = useState<boolean>(false)
  const [roundStarted, setRoundStarted] = useState<boolean>(false)
  const [player, setPlayer] = useState<PlayerProps>(defaultPlayer)
  const [playerName, setPlayerName] = useState<string>('Paulo')
  const [playerBet, setPlayerBet] = useState<number>(0)
  const [dealerCards, setDealerCards] = useState<DeckCard[]>([])

  const startGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!playerName || !playerBet) {
      alert('Please enter your name and bet amount.')
      return false
    }

    const newPlayer: PlayerProps = {
      name: playerName,
      balance: 100 - playerBet,
      bet: playerBet,
      score: 0,
      cards: [],
      actions: {
        hit,
        stand,
        double,
        surrender,
      },
    }

    setPlayer(newPlayer)
    setGameStart(true)
  }

  const dealCards = () => {
    for (let i = 0; i < 4; i++) {
      const randomCard = shuffleDeck()
      if (i % 2 === 0) {
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          cards: [...prevPlayer.cards, randomCard],
        }))
        computeScore(player.cards, player.score)
      } else {
        setDealerCards((prevState) => [...prevState, randomCard])
      }
    }
  }

  const shuffleDeck = () => {
    return deck[Math.floor(Math.random() * deck.length)]
  }

  const hit = () => {
    if (player.score < 21) {
      const randomCard = shuffleDeck()
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        cards: [...prevPlayer.cards, randomCard],
      }))
    }
  }

  const stand = () => {
    console.log('stand')
  }

  const double = () => {
    console.log('double')
  }

  const surrender = () => {
    console.log('surrender')
  }

  const computeScore = (cards: DeckCard[] = [], score: number) => {
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

  const handleRound = () => {
    dealCards()
    setRoundStarted(true)
  }

  return (
    <div className='flex flex-col items-center justify-between h-screen bg-slate-200'>
      {!gameStart ? (
        <form
          className='flex flex-col items-center justify-center h-screen'
          onSubmit={(e) => startGame(e)}
        >
          <h1 className='mb-4 text-3xl font-bold'>Welcome to Blackjack!</h1>
          <div className='flex flex-col items-start justify-center'>
            <label htmlFor='playerName'>Name</label>
            <input
              className='px-3 py-1 mb-2 border rounded-lg shadow border-slate-200'
              type='text'
              name='playerName'
              id='playerName'
              placeholder='Enter your name'
              onChange={(e) => setPlayerName(e.target.value)}
              onFocus={(e) => e.target.select()}
              value={playerName}
            />
          </div>
          <div className='flex flex-col items-start justify-center'>
            <label htmlFor='playerBet'>Your bet</label>
            <input
              className='px-3 py-1 mb-4 border rounded-lg shadow border-slate-200'
              type='text'
              name='playerBet'
              id='playerBet'
              pattern='[0-9]*'
              value={playerBet}
              onChange={(e) =>
                setPlayerBet(Number(e.target.value.replace(/[^0-9]/g, '')))
              }
              onFocus={(e) => e.target.select()}
            />
          </div>
          <button
            type='submit'
            className='px-6 py-2 text-white rounded-lg bg-cyan-900 disabled:bg-slate-700'
          >
            Start game
          </button>
        </form>
      ) : (
        <>
          <header className='flex items-center justify-center w-4/5 mb-10'>
            <Dealer cards={dealerCards} />
          </header>
          {!roundStarted && (
            <button
              className='p-3 tracking-wide text-white bg-green-700 rounded-lg hover:bg-green-600'
              onClick={handleRound}
            >
              Start round
            </button>
          )}
          <main className='grid w-4/5 grid-cols-2 gap-2 mb-10'>
            <Player
              name={player.name}
              cards={player.cards}
              balance={player.balance}
              bet={playerBet}
              score={player.score}
              actions={{ hit, stand, double, surrender }}
            />
          </main>
        </>
      )}
    </div>
  )
}

export default App
