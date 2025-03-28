import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUsers } from "../store/usersSlice"
import UserCard from "../Components/UserCard"
import { useNavigate } from "react-router"

/**
 * The UserList component renders a list of users and a search bar. It
 * fetches the users from the server on page load and stores them in the
 * Redux store. It also handles page navigation and logout.
 *
 * @returns {JSX.Element} The UserList component
 */
function UserList() {
  const [pageNumber, setPageNumber] = useState(1)
  const [searchText, setSearchText] = useState("")
  const [filterSearchTerm, setFilterSearchTerm] = useState("")
  const userList = useSelector((state) => state.userList) // Getting the userList from Redux Store
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //filteredData returns filtered Data from list of users using the searchedTerm

  const filteredData = userList.filter(
    (user) =>
      user.first_name.toLowerCase().includes(filterSearchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(filterSearchTerm.toLowerCase())
  )

  /**
   * UseEffect to fetch userList once the component is mounted and ensures the to reload on pageChange and userlist has no user
   *
   */
  useEffect(() => {
    if (userList.length === 0) {
      fetchUser()
    }
  }, [pageNumber])

  /**
   * Fetches a list of users from the server using the current page number.
   * On success, it dispatches an action to add the users to the Redux store.
   * Logs an error message to the console if the request fails.
   */

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
    // Clear the user list
    dispatch(addUsers([]))
    // Update the page number in the state
    setPageNumber(page)
  }

  /**
   * Handles logout by clearing the local storage and navigating to the login page.
   */
  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <section className="h-full py-6 px-4">
      <h2 className="text-3xl text-white md:text-4xl font-medium text-center my-4">
        Welcome to our site
      </h2>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-2 my-4">
        <div className="border h-10 flex justify-center ">
          <input
            type="text"
            className="bg-gray-700 grow text-white px-2 placeholder:text-white "
            placeholder="search.."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-purple-400 px-4 cursor-pointer"
            onClick={() => setFilterSearchTerm(searchText)}
          >
            search
          </button>
        </div>
        <button
          className=" py-2 px-4 bg-red-300 font-medium cursor-pointer "
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
      <div className="max-w-7xl w-full  min-h-[calc(100vh-160px)] gap-4 grid grid-cols-[repeat(auto-fit,minmax(120px,260px))]  justify-center items-center mx-auto ">
        {filteredData.length == 0 ? (
          <p className="font-medium text-2xl text-white"> No User found</p>
        ) : (
          filteredData.map((user) => <UserCard key={user?.id} {...user} />)
        )}
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
