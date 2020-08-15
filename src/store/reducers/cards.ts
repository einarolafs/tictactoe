import { NormalizedCardInterface, ADD_CARDS, UPDATE_CARD_STATUS, DATA_FETCH_FAILED } from '../types'

const initial: NormalizedCardInterface[] = []

type Action = {
  type: string
  payload: NormalizedCardInterface[] | NormalizedCardInterface
}

const updateCardStatus = (cards: NormalizedCardInterface[], payload: NormalizedCardInterface) =>
  cards.map((card) => {
    if (card.id === payload.id) {
      return { ...card, status: payload.status }
    }

    return card
  })

const cards = (state = initial, action: Action) => {
  switch (action.type) {
    case ADD_CARDS:
      if (action.payload instanceof Array) {
        return [...state, ...action.payload]
      }
      break
    case UPDATE_CARD_STATUS:
      if (!(action.payload instanceof Array)) {
        return updateCardStatus(state, action.payload)
      }
      break
    case DATA_FETCH_FAILED:
      return { ...action.payload }
    default:
      return state
  }
}

export default cards
