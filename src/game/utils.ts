import { User, BoardState, USER, Cells } from './type.d'

const CIRCLE = '\u2756'
const EX = '\u2717'

export const userIcon = (icon: User) => (icon === USER.Ex ? EX : CIRCLE)

export const createBoard = () => 
  new Array(9)
  .fill(null)
  .map((_, index): BoardState => ({
    id: index + 1 as Cells,
    checked: null,
  }))

export const checkLines = (lines: Cells[][], board: BoardState[], user: User): Cells[] | null => {
  for (const line of lines) {
    const isLineChecked = line.every((id) => board[id - 1].checked === user)

      if (isLineChecked) {
        return line;
      }
  }

  return null
}

export const getPlayingUser = (remote: boolean, user: User) => {
  if (remote) {
    return user === USER.Ex ? USER.Circle : USER.Ex
  }

  return user
}

export const gameCheck = {
  rows: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ] as Cells[][],

  columns: [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
  ] as Cells[][],

  cross: [
    [1, 5, 9],
    [3, 5, 7],
  ] as Cells[][],
}