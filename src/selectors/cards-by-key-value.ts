import { createSelector } from 'reselect'

import { State } from '../store/types'

const selectCards = (state: State) => state.cards

const cardsByKeyValue = createSelector(selectCards, (cards) =>
  cards.reduce((acc, item) => {
    const { id, ...card } = item

    acc[id] = card

    return acc
  }, {})
)

export default cardsByKeyValue
