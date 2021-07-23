import { createSlice } from '@reduxjs/toolkit'
import { User } from '../type.d';

interface UserState {
  id?: string
  role?: User
  active: boolean
}

const initialState: UserState = {
  id: undefined,
  role: undefined,
  active: true,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.id = payload.id || state.id;
      state.role = payload.role || state.role;
      state.active = payload.active || state.active;
    },
  },
})

export const { setUser } = userSlice.actions
export const userReducer = userSlice.reducer

export default userSlice