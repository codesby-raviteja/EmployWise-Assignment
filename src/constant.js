import { use } from "react"

export const validateEditedData = (userDetails) => {
  const errorObj = {}
  if (!userDetails.first_name) {
    errorObj.first_name = "Please enter first Name"
  }
  if (!userDetails.last_name) {
    errorObj.last_name = "Please enter last Name"
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)) {
    errorObj.email = "Please enter a valid email address"
  }
  return errorObj
}

export const validateLoginData = (userObj) => {
  const errorObj = {}

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userObj.email)) {
    errorObj.email = "Please enter a valid email address"
  }
  if (!userObj.password) {
    errorObj.password = "Please enter password"
  }
  return errorObj
}
