import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "usersList",
  initialState: [],
  reducers: {
    addUsers(state, action) {
      return action.payload
    },
    handleDeleteUser(state, action) {
      const index = state.findIndex((user) => user.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    editUser(state, action) {
      const index = state.findIndex((user) => user.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
  },
})

export const { addUsers, editUser, handleDeleteUser } = userSlice.actions

export default userSlice.reducer
