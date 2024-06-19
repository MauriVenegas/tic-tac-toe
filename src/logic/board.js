import { WINNER_COMBOS } from '../constant.js'

// Revisa las combinaciones par aver si hay ganador
export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  return null
}

export const checkEndGaame = (board) => {
  // Si todas las posiciones del tablero están ocupadas el juego termino
  return board.every((squere) => squere !== null)
}
