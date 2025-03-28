import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"

/**
 * A higher-order component that protects a route by checking if a user is authenticated.
 * It retrieves a token from localStorage to determine authentication status.
 * If the token is not present, it navigates to the home page.
 * If authenticated, it renders the child components.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to render if authenticated.
 * @returns {ReactElement|null} The children elements if authenticated, otherwise null.
 */

function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token") //retriving token from local Storage
    if (!token) {
      navigate("/")
    } else {
      setIsAuthenticated(true)
    }
  }, [navigate])

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
