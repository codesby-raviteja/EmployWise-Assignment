import React, { useState } from "react"
import { Link, useLocation, useParams } from "react-router"
import { validateEditedData } from "../constant"
import axios from "axios"
import { useDispatch } from "react-redux"
import { editUser } from "../store/usersSlice"
import InputComponent from "../Components/InputComponent"

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

  const handleInput = async function (e) {
    const name = e.target.name
    const value = e.target.value
    setUserDetails((prev) => ({ ...prev, [name]: value }))
    if (inputErrors[name]) {
      setInputErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }
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
      dispatch(editUser(respose?.data))
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
