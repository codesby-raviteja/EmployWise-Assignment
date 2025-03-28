import React, { useState } from "react"
import { Link, useLocation, useParams } from "react-router"
import { validateEditedData } from "../constant"
import axios from "axios"
import { useDispatch } from "react-redux"
import { editUser } from "../store/usersSlice"
import InputComponent from "../Components/InputComponent"

/**
 * The EditUser component allows users to edit their details.
 * It fetches the current user information from the location state and displays it in a form.
 * Users can update their first name, last name, and email address.
 * The component validates the input data and shows error messages for invalid inputs.
 * Upon successful validation, it sends the updated data to the server and updates the Redux store.
 * It navigates back to the user list page on successful update or when the user chooses to go back.
 *
 * @returns {JSX.Element} A form for editing user details.
 */

function EditUser() {
  let data = useLocation().state
  const { userid } = useParams()

  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState("")
  const [userDetails, setUserDetails] = useState(data)

  const [inputErrors, setInputErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
  })

  /**
   * Handles input changes in the edit user form.
   * It updates the userDetails state with the changed input value
   * and clears the input error message for the changed input field
   * if there is an error associated with it.
   * @param {Object} e - The event object from the input change event.
   */
  const handleInput = async function (e) {
    const name = e.target.name
    const value = e.target.value
    setUserDetails((prev) => ({ ...prev, [name]: value }))
    if (inputErrors[name]) {
      setInputErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }
/**
 * Handles the form submission for editing user details.
 * It prevents the default form submission behavior, validates the input data,
 * and sets input errors if validation fails. If validation passes, it clears 
 * previous error messages and makes an API request to update the user data 
 * on the server. Upon a successful server response, it dispatches an action 
 * to update the user details in the Redux store, resets the form fields, 
 * and alerts the user of a successful update. If an error occurs during 
 * the API request, it sets the error message state.
 *
 * @param {Object} e - The event object from the form submission.
 */

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errorObj = validateEditedData(userDetails)

    if (Object.keys(errorObj).length !== 0) {
      setInputErrors(errorObj)
      return
    }
    setErrorMessage("")
    try {
      const respose = await axios.post(
        `https://reqres.in/api/users/${userid}`,
        userDetails
      )
      dispatch(editUser(respose?.data)) // dispatching the updated user to display the updated details on UI
      setUserDetails({ email: "", first_name: "", last_name: "" })
      alert("successfully updated")
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        className="w-full max-w-lg bg-[#81fff9b0] rounded p-4"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center text-xl font-semibold ">
          Edit the user Details
        </h3>

        <InputComponent
          type={"text"}
          title={"First Name"}
          id={"firstname"}
          name={"first_name"}
          action={handleInput}
          errorMessage={inputErrors.first_name}
          value={userDetails.first_name}
          hover_color={"bg-green-500/40"}
        />

        <InputComponent
          type={"text"}
          title={"Last Name"}
          id={"lastname"}
          name={"last_name"}
          action={handleInput}
          errorMessage={inputErrors.last_name}
          value={userDetails.last_name}
          hover_color={"bg-green-500/40"}
        />
        <InputComponent
          type={"email"}
          title={"Email Address"}
          id={"email"}
          name={"email"}
          action={handleInput}
          errorMessage={inputErrors.email}
          value={userDetails.email}
          hover_color={"bg-green-500/40"}
        />

        <button className="border text-lg  bg-[#ecb981] w-full p-3 my-2 transition-all duration-200 ease-in-out  font-medium cursor-pointer">
          Save
        </button>
        <Link to={"/userlist"} className=" ">
          <button className="border    bg-[#81b8ec]  px-4 py-1 my-2 transition-all duration-200 ease-in-out  font-medium cursor-pointer">
            Go back
          </button>
        </Link>
        {errorMessage && (
          <p className="text-red-600 text-center text-xl font-medium">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  )
}

export default EditUser
