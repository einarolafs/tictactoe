import { UPDATE_CARD_STATUS } from '../types'

type ChangeCardStatusProps = {
  id: number
  status: string
}

const changeCardStatus = ({ id, status }: ChangeCardStatusProps) => ({
  type: UPDATE_CARD_STATUS,
  payload: {
    id,
    status,
  },
})

export default changeCardStatus
