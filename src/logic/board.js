import { WINNER_COMBOS } from "../constants"

export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[b] === boardToCheck[a] &&
      boardToCheck[c] === boardToCheck[a]
    ) {
      return boardToCheck[a]
    }
  }
  return null
}