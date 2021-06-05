export interface ItemProps {
  id: Cells
  onClick: (id: Cells) => void
  children: string
  checked: boolean
}
export type Cells = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type User = 'x' | 'o'

export type BoardState = { id: Cells; checked: User | null }

export enum USER {
  Ex = 'x',
  Circle = 'o',
}

export type MatchParams = { playerId: string }

export interface PeerData {
  id?: string,
  player?: User,
  selected?: Cells,
  startGame?: boolean
}