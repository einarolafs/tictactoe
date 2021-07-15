export type User = 'x' | 'o'
export type BoardState = { id: number; checked?: User | null }

export interface ItemProps {
  id: number
  onClick: (id: number) => void
  selection?: BoardState['checked']
  checked: boolean
}

export enum USER {
  Ex = 'x',
  Circle = 'o',
}

export type MatchParams = { playerId: string }