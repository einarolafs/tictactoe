import { ADD_PAGE } from '../types'

type AddPage = {
  id: string
  payload: Record<string, unknown>
}

const addPage = ({ id, payload }: AddPage) => ({
  type: ADD_PAGE,
  id,
  payload,
})

export { AddPage }
export default addPage
