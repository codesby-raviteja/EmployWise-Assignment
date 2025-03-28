import React from "react"

function UserCard({ avatar, first_name, last_name }) {
  return (
    <div className="p-4 bg-purple-40 flex flex-col text-center bg-gray-200/50 rounded-lg">
      <img
        className="max-w-40 rounded-full mx-auto"
        src={avatar}
        alt={`${first_name} ${last_name}`}
      />
      <p className="text-xl font-semibold  my-3">
        {first_name} {last_name}
      </p>
      <div className="flex mt-4 justify-between">
        <button className=" font-medium bg-red-500/90 px-6 py-2 text-white cursor-pointer rounded">
          Delete
        </button>
        <button className=" font-medium bg-green-400 px-6  py-2 cursor-pointer rounded">
          Edit
        </button>
      </div>
    </div>
  )
}

export default UserCard
