import { NormalizedCardInterface } from '../../store/types'

export type CardsPageProps = {
  cards: NormalizedCardInterface[]
  cardsByStatus: {
    pending: NormalizedCardInterface[]
    rejected: NormalizedCardInterface[]
    done: NormalizedCardInterface[]
  }
  actions: {
    getCards: () => void
    addPage: ({ id, payload }: { id: string; payload: Record<string, unknown> }) => void
    updatePage: ({ id, payload }: { id: string; payload: Record<string, unknown> }) => void
    changeCardStatus: ({ id, status }: { id: number; status: string }) => void
  }
  dragging?: number
  status: string
  filters: { name?: string; arrhythmias?: string[] }
  arrhythmias: string[]
}

export type UpdatePagePayloadType = {
  dragging?: CardsPageProps['dragging'] | null
  filters?: CardsPageProps['filters']
}
