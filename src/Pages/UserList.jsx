import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUsers } from "../store/usersSlice"
import UserCard from "../Components/UserCard"
import { useNavigate } from "react-router"

function UserList() {
  const userList = useSelector((state) => state.userList)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    if (userList.length === 0) {
      fetchUser()
    }
  }, [pageNumber])

  const fetchUser = async () => {
    try {
      const users = await axios.get(
        `https://reqres.in/api/users?page=${pageNumber}`
      )
      dispatch(addUsers(users?.data?.data))
    } catch (err) {
      console.log(err.message)
    }
  }

  const handlePageNumber = (page) => {
    dispatch(addUsers([]))
    setPageNumber(page)
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <section className="h-full py-6 px-4">
      <div className="flex flex-col ">
        <h2 className="text-3xl text-white md:text-4xl font-medium text-center my-4">
          Welcome to our site
        </h2>
        <button className="ml-auto py-2 px-4 bg-red-300 font-medium cursor-pointer my-3" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div className="max-w-7xl w-full  min-h-[calc(100vh-160px)] gap-4 grid grid-cols-[repeat(auto-fit,minmax(120px,260px))]  justify-center items-center mx-auto ">
        {userList.map((user) => (
          <UserCard key={user?.id} {...user} />
        ))}
      </div>
      <div className="max-w-7xl w-full mx-auto flex justify-center gap-2 mt-4">
        {[1, 2].map((page) => {
          return (
            <span
              key={page}
              className={`bg-blue-500 text-white font-medium w-7 flex justify-center items-center cursor-pointer ${
                page === pageNumber ? "border-3 border-yellow-300" : ""
              }`}
              onClick={() => handlePageNumber(page)}
            >
              {page}
            </span>
          )
        })}
      </div>
    </section>
  )
}

export default UserList
