import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../types/user'

export interface UsersState {
  users: IUser[]
}

const initialState: UsersState = {
  users: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsersFromFetch: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload
    },

    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload)
    },

    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUsersFromFetch, addUser, deleteUser } = usersSlice.actions

export default usersSlice.reducer
