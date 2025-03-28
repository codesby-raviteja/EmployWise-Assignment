import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUsers } from "../store/usersSlice"
import UserCard from "./UserCard"

function UserList() {
  const userList = useSelector((state) => state.userList)
  const dispatch = useDispatch()

  console.log(userList)
  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const users = await axios.get("https://reqres.in/api/users")
      dispatch(addUsers(users?.data?.data))
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <section className="h-full py-6 px-4">
      <h2 className="text-3xl text-white md:text-4xl font-medium text-center my-4">Welcome to our site</h2>
      <div className="max-w-7xl w-full  min-h-[calc(100vh-100px)] gap-4 grid grid-cols-[repeat(auto-fit,minmax(120px,260px))]  justify-center items-center mx-auto ">
        {userList.map((user) => (
          <UserCard key={user?.id} {...user} />
        ))}
      </div>
    </section>
  )
}

export default UserList
