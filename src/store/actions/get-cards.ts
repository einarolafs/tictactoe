import config from '../../config'
import { FETCH_CARDS_REQUESTED } from '../types'

const getCards = () => ({
  type: FETCH_CARDS_REQUESTED,
  url: `${config.urls.base}/cards`,
})

export default getCards
