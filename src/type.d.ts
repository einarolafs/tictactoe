export interface ItemProps {
  id: number
  onClick: (id: number) => void
  children: string
  checked: boolean
}

export type User = 'x' | 'o'
export type BoardState = { id: number; checked: User | null }

export enum USER {
  Ex = 'x',
  Circle = 'o',
}

export type MatchParams = { playerId: string }