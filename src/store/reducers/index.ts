import { combineReducers } from 'redux'

import cards from './cards'
import pages from './pages'
import arrhythmias from './arrhythmias'

export default combineReducers({
  cards,
  pages,
  arrhythmias,
})
