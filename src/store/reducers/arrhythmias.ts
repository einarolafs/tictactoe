import * as types from '../types'

const initial: string[] = []

type Payload = string[]

type Action = {
  type: string
  payload: Payload
}
const arrhythmias = (state = initial, action: Action) => {
  switch (action.type) {
    case types.ADD_ARRHYTHMIAS:
      return action.payload
    default:
      return state
  }
}

export default arrhythmias
