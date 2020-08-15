import * as types from '../types'

const initial = {}

type Payload = {
  [key: string]: string | Record<string, any>
}

type Action = {
  type: string
  id: string
  payload: Payload
}

const updatePageContent = (pageState: Payload, payload: Payload) => ({ ...pageState, ...payload })

const pages = (state = initial, action: Action) => {
  switch (action.type) {
    case types.ADD_PAGE:
      return { ...state, ...{ [action.id]: action.payload } }
    case types.UPDATE_PAGE:
      return {
        ...state,
        ...{
          [action.id]: updatePageContent(state[action.id], action.payload),
        },
      }
    default:
      return state
  }
}

export default pages
