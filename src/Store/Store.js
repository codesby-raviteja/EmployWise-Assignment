import { configureStore } from "@reduxjs/toolkit"

import userList from "./userSlice"

export const Store = configureStore({
  reducer: {
    userList: userList,
  },
})

