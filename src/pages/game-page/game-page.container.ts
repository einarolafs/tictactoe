/* eslint-disable filenames/match-regex */

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { State } from '../../store/types'
import { getCards, addPage, updatePage, changeCardStatus } from '../../store/actions'
import { cardsByStatus, cardsByKeyValue } from '../../selectors'

import CardsPage from './game-page'

const mapStateToProps = (state: State) => {
  const { filters, dragging } = state.pages?.cards ?? {}

  return {
    cardsByStatus: cardsByStatus(state, { filters }),
    cards: cardsByKeyValue(state),
    dragging,
    arrhythmias: state.arrhythmias,
    filters,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ getCards, addPage, updatePage, changeCardStatus }, dispatch),
})

/* @ts-ignore */
export default connect(mapStateToProps, mapDispatchToProps)(CardsPage)
