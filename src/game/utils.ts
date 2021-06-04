import { User, BoardState, USER } from './type.d'

const CIRCLE = '\u2756'
const EX = '\u2717'

export const userIcon = (icon: User) => (icon === USER.Ex ? EX : CIRCLE)

export const checkLines = (
  lines: number[][],
  board: BoardState[],
  user: User
): number[] | null => {
  
  let foundLine: number[] | null = null

  lines.forEach((line) => {
    const isLineChecked = line.every((id) => board[id - 1].checked === user)

    if (isLineChecked) {
      foundLine = line
    }
  })

  return foundLine
}

export const getPlayingUser = (remote: boolean, user: User) => {
  if (remote) {
    return user === USER.Ex ? USER.Circle : USER.Ex
  }

  return user
}