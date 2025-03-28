import React from "react"

/**
 * InputComponent is a reusable component that renders a input field with a label and error message
 * This component is used in the login form to render input fields for email and password
 *
 * @param {Object} props - The component props
 * @prop {string} title - The title of the input field
 * @prop {string} type - The type of the input field (e.g. text, email, password)
 * @prop {string} name - The name of the input field
 * @prop {string} id - The id of the input field
 * @prop {string} value - The value of the input field
 * @prop {function} action - The function to be called when the input value changes
 * @prop {string} errorMessage - The error message to be displayed if the input is invalid
 * @prop {string} hover_color - The color of the input field when hovered
 * @returns {ReactElement} The input component
 */
function InputComponent({
  title,
  type,
  name,
  id,
  value,
  action,
  errorMessage,
  hover_color,
}) {
  return (
    <div className="flex flex-col py-2 ">
      <label className="py-2 font-medium" htmlFor={id}>
        {title}
      </label>
      <input
        className={`border-1  border-black  p-3 ${hover_color}`}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={action}
      />
      <p className="text-red-700/90 font-medium">{errorMessage}</p>
    </div>
  )
}

export default InputComponent
