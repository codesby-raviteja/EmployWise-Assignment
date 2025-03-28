
import "./App.css"
import { BrowserRouter, Outlet, Route, Routes } from "react-router"
import Login from "./Components/Login"
import UserList from "./Components/UserList"
import EditUser from "./Components/EditUser"

function App() {
  return (
    <main className="bg-black/50 w-screen h-">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index  element={<Login />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/edituser" element={<EditUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
