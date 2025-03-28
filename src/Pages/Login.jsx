import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router"
import { validateLoginData } from "../constant"
import InputComponent from "../Components/InputComponent"

/**
 * Handles the login functionality, it validates the input values and makes an API call
 * to the server to authenticate the user. If the user is authenticated, it stores the
 * returned token in localStorage and navigates to the userlist page.
 *
 * @function Login
 * @returns {ReactElement} A jsx element representing the login form
 */
function Login() {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" })
  const [formErrors, setFormErrors] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  //handleInput: is used to update the userDetails such as (email and passsword)
  // a clean way of handling input changes
  const handleInput = async function (e) {
    const name = e.target.name
    const value = e.target.value
    setUserDetails((prev) => ({ ...prev, [name]: value }))
  }

  // handleLogin:Handles signIn of the user
  const handleLogin = async function (e) {
    e.preventDefault()

    const errorObj = validateLoginData(userDetails) //validates the email and password and returns a Object with empty values validations passed else return key-values with errors
    if (Object.keys(errorObj).length !== 0) {
      // is contains any errors goes in and sets Error object
      setFormErrors(errorObj)
      return
    }
    //making an API call in [try-catch block] to server to authenticate the use and storing the returned token in localStorage
    try {
      const response = await axios.post(
        "https://reqres.in/api/login",
        userDetails
      )
      localStorage.setItem("token", response?.data?.token) // Saving the token in Local storage
      navigate("/userlist") //navigates to userlist Page once user is authenticated
    } catch (err) {
      setError(err?.response?.data?.error)
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center px-2">
      <div className="max-w-xl w-full mx-auto py-12 px-8 text-black  bg-blue-400/60">
        <div>
          <h1 className="text-2xl font-bold py-2 text-white  text-center">
            Sign In
          </h1>
        </div>
        <form onSubmit={handleLogin}>
          <InputComponent
            type={"text"}
            title={"Email Address"}
            id={"email"}
            name={"email"}
            action={handleInput}
            value={userDetails.email}
            errorMessage={formErrors.email}
            hover_color={"bg-blue-500/40"}
          />

          <InputComponent
            type={"password"}
            title={"Password"}
            id={"password"}
            name={"password"}
            action={handleInput}
            value={userDetails.password}
            errorMessage={formErrors.password}
            hover_color={"bg-blue-500/40"}
          />

          <button className="border text-lg bg-yellow-500/80 hover:bg-yellow-500 w-full p-3 my-2 transition-all duration-200 ease-in-out text-white font-medium cursor-pointer">
            Sign in
          </button>
          {error && <p className="text-red-600 text-xl font-medium">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
