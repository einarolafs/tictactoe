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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.id = payload.id || state.id;
      state.role = payload.role || state.role;
    },
  },
})

export const { setUser } = userSlice.actions
export const userReducer = userSlice.reducer

export default userSlice