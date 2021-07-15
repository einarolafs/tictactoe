import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    role: null,
  },
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