import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router"
import Login from "./Pages/Login"
import EditUser from "./Pages/EditUser"
import UserList from "./Pages/UserList"
import ProtectedRoute from "./Components/ProtectedRoute"

function App() {
  return (
    <main className="bg-black/50 ">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route
              path="/userlist"
              element={
                <ProtectedRoute>
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edituser/:userid"
              element={
                <ProtectedRoute>
                  <EditUser />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
