import { configureStore } from '@reduxjs/toolkit'
import peerSlice from './peerSlice'
import userSlice from './userSlice'
import boardSlice from './boardSlice'

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    peer: peerSlice.reducer,
    board: boardSlice.reducer,
  },
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>

export default store

export {
  userSlice,
  peerSlice,
  boardSlice,
}