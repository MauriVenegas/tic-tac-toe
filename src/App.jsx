import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS } from './constant.js'
import { checkWinnerFrom, checkEndGaame } from './logic/board.js'
import WinnerModal from './components/WinnerModal.jsx'
import { resetGameToStorage, saveGameToStorage } from './logic/storage/index.js'

function App() {
  // El useState no puede estar dentro de un if por lo cual si es necesario usar un if se hace de la siguiente manera
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    // || para false y ?? para null o undefined
    return turnFromStorage ?? TURNS.X
  })

  // null: no hay ganador, false: empate, X ó O: hay ganador
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameToStorage()
  }

  const updateBoard = (index) => {
    // No actualiza si ya posee algo
    if (board[index] || winner) return

    // Actualiza tablero y cambia de turno
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameToStorage({ board: newBoard, turn: newTurn })

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGaame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>

      <section className="game">
        {board.map((square, index) => {
          return (
            <div className="cell" key={index}>
              <span className="cell_content">
                <Square key={index} index={index} updateBoard={updateBoard}>
                  {square}
                </Square>
              </span>
            </div>
          )
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
