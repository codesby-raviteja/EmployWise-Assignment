import { configureStore } from "@reduxjs/toolkit"

import userList from "./usersSlice"

const store = configureStore({
  reducer: {
    userList: userList,
  },
})

export default store
