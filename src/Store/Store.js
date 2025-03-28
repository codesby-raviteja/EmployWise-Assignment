import { configureStore } from "@reduxjs/toolkit"

import userList from "./userSlice"

const Store = configureStore({
  reducer: {
    userList: userList,
  },
})

export default Store
