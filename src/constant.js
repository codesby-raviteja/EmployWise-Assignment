
/**
 * Validates the edited user data
 * @param {Object} userDetails - The user data to be validated
 * @returns {Object} An object with keys as the fields that contain errors and the value as the error message
 */
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




/**
 * Validates the login data by checking the email format and password presence.
 * Returns an object containing error messages for each invalid field.
 *

 * @param {Object} userObj - The user object containing login details.
 * @returns {Object} An object with error messages for invalid email or missing password.
 */

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
