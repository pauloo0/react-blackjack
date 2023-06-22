import React, { useEffect, useState } from 'react'
import Dealer, { DealerProps } from './components/Dealer'
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
  dealerTurn: false,
  hasDoubled: false,
  hasRoundStarted: false,
}

const defaultDealer: DealerProps = {
  cards: [],
  score: 0,
  dealerTurn: false,
}

const App: React.FC = () => {
  const [gameStart, setGameStart] = useState<boolean>(false)
  const [roundStarted, setRoundStarted] = useState<boolean>(false)
  const [dealer, setDealer] = useState<DealerProps>(defaultDealer)
  const [player, setPlayer] = useState<PlayerProps>(defaultPlayer)
  const [playerName, setPlayerName] = useState<string>('Paulo')
  const [playerBet, setPlayerBet] = useState<number>(10)
  const [dealerTurn, setDealerTurn] = useState<boolean>(false)

  useEffect(() => {
    if (player.score > 21) {
      alert(`Bust!\n${computeWinner(player.score, dealer.score)}`)

      setGameStart(false)
    } else if (player.score === 21) {
      setDealerTurn(true)
    }
  }, [player.cards, player.score])

  useEffect(() => {
    if (dealerTurn) {
      if (dealer.score < 17) {
        alert('Dealer hits!')
        hit('dealer')
      } else if (17 < dealer.score && dealer.score < 21) {
        alert(`Dealer stands!\n${computeWinner(player.score, dealer.score)}`)
        setDealerTurn(false)
        setGameStart(false)
      } else if (dealer.score === 21) {
        alert(
          `Dealer blackjack!\n${computeWinner(player.score, dealer.score)}}`
        )
        setDealerTurn(false)
        setGameStart(false)
      } else if (dealer.score > 21) {
        alert(`Dealer bust!\n${computeWinner(player.score, dealer.score)}`)

        setDealerTurn(false)
        setGameStart(false)
      } else if (dealer.score === 17) {
        const foundAce = dealer.cards.find((card) => card.value === 'A')
        if (foundAce) {
          setDealer((prevDealer) => ({
            ...prevDealer,
            score: 7,
          }))
        }
      }
    }
  }, [dealerTurn, dealer.score])

  const startGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!playerName || !playerBet) {
      alert('Please enter your name and bet amount.')
      return false
    }

    const newPlayer: PlayerProps = {
      name: playerName,
      balance: player.balance - playerBet,
      bet: playerBet,
      score: 0,
      cards: [],
      actions: {
        hit,
        stand,
        double,
        surrender,
      },
      dealerTurn: false,
      hasDoubled: false,
      hasRoundStarted: false,
    }

    setPlayer(newPlayer)
    setDealer(defaultDealer)
    setGameStart(true)
    setRoundStarted(false)
  }

  const dealCards = () => {
    for (let i = 0; i < 4; i++) {
      const randomCard = shuffleDeck()
      if (i % 2 === 0) {
        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          cards: [...prevPlayer.cards, randomCard],
          score: computeScore(randomCard, prevPlayer.score),
        }))
      } else {
        setDealer((prevDealer) => ({
          ...prevDealer,
          cards: [...prevDealer.cards, randomCard],
          score: computeScore(randomCard, prevDealer.score),
        }))
      }
    }
  }

  const shuffleDeck = () => {
    return deck[Math.floor(Math.random() * deck.length)]
  }

  const hit = (who: string) => {
    if (who === 'player') {
      if (player.score < 21) {
        const randomCard = shuffleDeck()
        const computedScore = computeScore(randomCard, player.score)

        setPlayer((prevPlayer) => ({
          ...prevPlayer,
          cards: [...prevPlayer.cards, randomCard],
          score: computedScore,
        }))
      }
    } else {
      if (dealer.score < 21) {
        const randomCard = shuffleDeck()
        const computedScore = computeScore(randomCard, dealer.score)

        setDealer((prevDealer) => ({
          ...prevDealer,
          cards: [...prevDealer.cards, randomCard],
          score: computedScore,
        }))
      }
    }
  }

  const stand = () => {
    setDealerTurn(true)
  }

  const double = () => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      balance: prevPlayer.balance - playerBet * 2,
      bet: playerBet * 2,
      hasDoubled: true,
    }))
    hit('player')
  }

  const surrender = () => {
    alert(`${player.name} has surrendered!`)

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      balance: prevPlayer.balance + playerBet / 2,
    }))
    setDealer(defaultDealer)
    setGameStart(false)
    setRoundStarted(false)
  }

  const computeScore = (card: DeckCard, score: number) => {
    let points: number

    if (card.value === 'A' && score + 11 > 21) {
      points = 1
    } else if (card.value === 'A' && score + 11 <= 21) {
      points = 11
    } else {
      points = card.points
    }

    return (score += points)
  }

  const computeWinner = (playerScore: number, dealerScore: number) => {
    if (playerScore > 21) {
      return 'Dealer wins!'
    } else if (dealerScore > 21) {
      return 'Player wins!'
    } else if (playerScore > dealerScore) {
      return 'Player wins!'
    } else if (playerScore < dealerScore) {
      return 'Dealer wins!'
    } else if (playerScore === dealerScore) {
      return 'Draw!'
    }
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
            <label htmlFor='playerBet'>
              Your bet (Balance: {player.balance}€)
            </label>
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
            <Dealer
              cards={dealer.cards}
              score={dealer.score}
              dealerTurn={dealerTurn}
            />
          </header>
          {!roundStarted && (
            <button
              className='p-3 tracking-wide text-white bg-green-700 rounded-lg hover:bg-green-600'
              onClick={handleRound}
            >
              Start round
            </button>
          )}
          <main className='flex items-center justify-center w-4/5 mb-10'>
            <Player
              name={player.name}
              cards={player.cards}
              balance={player.balance}
              bet={playerBet}
              score={player.score}
              actions={{ hit, stand, double, surrender }}
              dealerTurn={!dealerTurn}
              hasDoubled={player.hasDoubled}
              hasRoundStarted={roundStarted}
            />
          </main>
        </>
      )}
    </div>
  )
}

export default App
