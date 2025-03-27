import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router"

function Login() {
  const [userDetails, setUserDetails] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleInput = async function (e) {
    const name = e.target.name
    const value = e.target.value
    setUserDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async function (e) {
    e.preventDefault()
    try {
      const response = await axios.post(
        "https://reqres.in/api/login",
        userDetails
      )
      localStorage.setItem("token", response?.data?.token)
      navigate("/userlist")
    } catch (err) {
      console.log(err?.response?.data?.error)
      setError(err?.response?.data?.error)
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center px-2">
      <div className="max-w-xl w-full mx-auto py-12 px-8 text-black  bg-blue-300/80">
        <div>
          <h1 className="text-2xl font-bold py-2  text-center">Sign In</h1>
        </div>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col py-2  ">
            <label className="py-2 font-medium" htmlFor="email">
              {" "}
              Email address
            </label>
            <input
              className="border-1 border-white text-white p-3 hover:bg-blue-500/80 active:bg-blue-500/80"
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col py-2 ">
            <label className="py-2 font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="border-1 border-white  p-3 hover:bg-blue-500 "
              type="password"
              id="password"
              name="password"
              value={userDetails.password}
              onChange={handleInput}
            />
          </div>

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
