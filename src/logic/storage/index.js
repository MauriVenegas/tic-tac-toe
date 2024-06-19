export const saveGameToStorage = ({ board, turn }) => {
  // Guarda la partida en local storage
  // localStorage convierte los array en string por lo cual usamos JSON.stringify() para volver a convertirlo en array
  window.localStorage.setItem('board', JSON.stringify(board))
  window.localStorage.setItem('turn', turn)
}

export const resetGameToStorage = () => {
  window.localStorage.removeItem('board')
  window.localStorage.removeItem('turn')
}
