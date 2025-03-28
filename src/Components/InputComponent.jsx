import React from "react"

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
