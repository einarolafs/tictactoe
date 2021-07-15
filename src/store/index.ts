import { configureStore } from '@reduxjs/toolkit'
import userSlice, { userReducer } from './userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>

export default store

export {
  userSlice
}