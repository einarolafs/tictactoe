import { createSlice } from '@reduxjs/toolkit'
import { User } from '../type.d';

interface UserState {
  id?: string
  role?: User
}

const initialState: UserState = {
  id: undefined,
  role: undefined,
}

export const peerSlice = createSlice({
  name: 'peer',
  initialState,
  reducers: {
    setPeer: (state, { payload }) => {
      state.id = payload.id || state.id;
      state.role = payload.role || state.role;
    },
  },
})

export const { setPeer } = peerSlice.actions
export const peerReducer = peerSlice.reducer

export default peerSlice