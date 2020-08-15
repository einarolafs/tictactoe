import { all, fork } from 'redux-saga/effects'

import fetchCards from './fetch-cards'

export default function* rootSaga() {
  yield all([fork(fetchCards)])
}
