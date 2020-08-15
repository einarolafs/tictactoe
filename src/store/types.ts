import store from './'

const ADD_CARDS = 'ADD_CARDS'
const DATA_FETCH_FAILED = 'DATA_FETCH_FAILED'
const FETCH_CARDS_REQUESTED = 'FETCH_CARDS_REQUESTED'
const ADD_PAGE = 'ADD_PAGE'
const UPDATE_PAGE = 'UPDATE_PAGE'
const UPDATE_CARD_STATUS = 'UPDATE_CARD_STATUS'
const ADD_ARRHYTHMIAS = 'ADD_ARRHYTHMIAS'

type ReduxDispatch = typeof store.dispatch

enum CardStatus {
  PENDING = 'pending',
  REJECTED = 'rejected',
  DONE = 'done',
}

/* eslint-disable camelcase */
interface CardInterface {
  arrhythmias: string[]
  created_date: string
  id: number
  patient_name: string
  status: string
}

interface NormalizedCardInterface {
  arrhythmias: string[]
  createdDate: string
  id: number
  patientName: string
  status: string
}

interface State {
  cards: NormalizedCardInterface[]
  arrhythmias: string[]
  pages: {
    [key: string]: Record<string, any>
  }
}

export {
  ADD_CARDS,
  ADD_PAGE,
  DATA_FETCH_FAILED,
  FETCH_CARDS_REQUESTED,
  UPDATE_PAGE,
  UPDATE_CARD_STATUS,
  ADD_ARRHYTHMIAS,
  ReduxDispatch,
  CardInterface,
  NormalizedCardInterface,
  CardStatus,
  State,
}
