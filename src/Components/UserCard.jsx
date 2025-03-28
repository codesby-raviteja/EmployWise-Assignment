import axios from "axios"
import React from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router"
import { handleDeleteUser } from "../store/userSlice"

/**
 * A React component that renders a user card with their avatar, name, and edit/delete functionality.
 * It dispatches an action to delete the user when the delete button is clicked, and navigates to the edit user page when the edit button is clicked.
 * @param {{ avatar: string, first_name: string, last_name: string, id: number, email: string }} props - The user details to be rendered
 * @returns {ReactElement} The user card component
 */
function UserCard({ avatar, first_name, last_name, id, email }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  /**
   * Deletes a user by dispatching an action to delete the user and navigating to the home page if the user is not authenticated.
   * It also alerts the user if there is an error during deletion.
   * since the user is not deleted in backend , removing the user on client-side so that the user can feel that the Object is deleted
   */
  const deleteUser = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/")
      return
    }
    try {
      const response = await axios.delete(`https://reqres.in/api/users/${id}`)
      dispatch(handleDeleteUser({ id }))
      alert("successfully deleted") // alerting user on successfull deletion
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="p-4 bg-purple-40 flex flex-col text-center bg-gray-200/50 rounded-lg">
      <img
        className="max-w-40 min-w-32 min-h-32 rounded-full mx-auto"
        src={avatar}
        alt={`${first_name} ${last_name}`}
      />
      <p className="text-xl font-semibold  my-3">
        {first_name} {last_name}
      </p>
      <div className="flex mt-4 justify-between">
        <button
          className=" font-medium bg-red-500/90 px-6 py-2 text-white cursor-pointer rounded"
          onClick={deleteUser}
        >
          Delete
        </button>
        <Link
          to={`/edituser/${id}`}
          state={{ avatar, first_name, last_name, id, email }}
        >
          <button className=" font-medium bg-green-400 px-6  py-2 cursor-pointer rounded">
            Edit
          </button>
        </Link>
      </div>
    </div>
  )
}

export default UserCard
