import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "usersList",
  initialState: [],
  reducers: {
    addUsers(state, action) {
      return action.payload
    },
    deleteUser(state, action) {
      return state.filter((user) => !(action.payload === user.id))
    },
    editUser(state, action) {
      const index = state.findIndex((user) => user.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
  },
})

export const { addUsers, editUser, deleteUser } = userSlice.actions

export default userSlice.reducer
