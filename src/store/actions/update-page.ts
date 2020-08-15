import { UPDATE_PAGE } from '../types'

type UpdatePageProps = {
  id: string
  payload: Record<string, unknown>
}

const updatePage = ({ id, payload }: UpdatePageProps) => ({
  type: UPDATE_PAGE,
  id,
  payload,
})

export default updatePage
