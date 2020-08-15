import { createSelector } from 'reselect'

import { CardsPageProps } from '../pages/cards-page/cards-page'
import { State, CardStatus } from '../store/types'

const selectCards = (state: State) => state.cards
const selectFilters = (state: State, props: { filters: CardsPageProps['filters'] }) => props.filters

const cardsByStatus = createSelector(selectCards, selectFilters, (cards, filters) => {
  const filteredCards = cards
    .filter(({ patientName }) => patientName.toLowerCase().includes(filters?.name ?? ''))
    .filter(({ arrhythmias }) => {
      if (filters?.arrhythmias && filters.arrhythmias.length) {
        return filters.arrhythmias.every((arrhythmia: string) => arrhythmias.includes(arrhythmia))
      }

      return true
    })

  const pending = filteredCards.filter(({ status }) => status === CardStatus.PENDING)
  const rejected = filteredCards.filter(({ status }) => status === CardStatus.REJECTED)
  const done = filteredCards.filter(({ status }) => status === CardStatus.DONE)

  return { pending, rejected, done }
})

export default cardsByStatus
