import { createSlice } from '@reduxjs/toolkit'
import { BoardState, User } from '../type.d';

interface BoardReducer {
  board: BoardState[]
  lineChecked: (number | null)[]
  gameOver: boolean
}

const initialState: BoardReducer = {
  board: new Array(9)
    .fill(null)
    .map((_, index): BoardState => ({
      id: index + 1,
      checked: null,
    })),
  lineChecked: [null, null, null],
  gameOver: false,
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, { payload }: { payload: {index: number, player: User}}) => {
      const { index, player } = payload;
  
      const newBoardState = state.board.map(item => ({...item}))

      newBoardState[index - 1].checked = player;

      console.log({payload})
      state.board = newBoardState || state;
    },
    setLineChecked: (state, { payload }: {payload: BoardReducer['lineChecked']}) => {
      state.lineChecked = payload || state;
      state.gameOver = payload.every((cell) => cell !== null)
    },
  },
})

export const { setBoard } = boardSlice.actions
export const peerReducer = boardSlice.reducer

export default boardSlice