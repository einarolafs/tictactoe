import { createSlice } from '@reduxjs/toolkit'
import { BoardState } from '../type.d';

interface BoardReducer {
  board: BoardState[]
}

const initialState: BoardReducer = {
  board: new Array(9)
    .fill(null)
    .map((_, index): BoardState => ({
      id: index + 1,
      checked: null,
    })),
}

export const boardSlice = createSlice({
  name: 'peer',
  initialState,
  reducers: {
    setBoard: (state, { payload }) => {
      console.log({state, payload});
      state.board = payload || state;
    },
  },
})

export const { setBoard } = boardSlice.actions
export const peerReducer = boardSlice.reducer

export default boardSlice