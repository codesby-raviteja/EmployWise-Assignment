import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router"
import { validateLoginData } from "../constant"
import InputComponent from "../Components/InputComponent"

function Login() {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" })
  const [formErrors, setFormErrors] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleInput = async function (e) {
    const name = e.target.name
    const value = e.target.value
    setUserDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async function (e) {
    e.preventDefault()

    const errorObj = validateLoginData(userDetails)
    if (Object.keys(errorObj).length !== 0) {
      setFormErrors(errorObj)
      return
    }
    try {
      const response = await axios.post(
        "https://reqres.in/api/login",
        userDetails
      )
      localStorage.setItem("token", response?.data?.token)
      navigate("/userlist")
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
