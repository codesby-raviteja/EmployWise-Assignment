import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "usersList",
  initialState: [],
  reducers: {
    // Replacing the inital state with userList
    addUsers(state, action) {
      return action.payload
    },

     //Deleting the user from the State r
    handleDeleteUser(state, action) {
      const index = state.findIndex((user) => user.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },

    //Updating the State with edited details of user
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
