import { useState } from 'react';
import './App.css';
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import { TURNS } from './constants';
import { checkWinner } from './logic/board';
import WinnerModal from './components/WinnerModal';
import Board from './components/Board';

function App() {
  const [turn, setTurn] = useState(() => {
      const turnFromStorage = window.localStorage.getItem('turn')
      
      if (turnFromStorage) return turnFromStorage
      return TURNS.X 
    })
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [winner, setWinner] = useState(null) //No winner, false = draw

  const updateBoard = (index) => {

    //To avoid updating the square all the time.
    if (board[index] || winner) return
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (!newBoard.includes(null)) {
      setWinner(false)
    }
    //Save the game
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
  }
  const restartGame = () => {
    setTurn(TURNS.X)
    setBoard(Array(9).fill(null))
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  } 

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={restartGame}>Restart Game</button>
      <Board board={board} updateBoard={updateBoard} />
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal restartGame={restartGame} winner={winner} />
    </main>
  );
}

export default App;
