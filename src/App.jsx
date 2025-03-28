import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router"
import Login from "./Pages/Login"
import EditUser from "./Pages/EditUser"
import UserList from "./Pages/UserList"
import ProtectedRoute from "./Components/ProtectedRoute"

/**
 * The App component sets up the main application structure and routing.
 * It uses React Router to manage navigation between different pages.
 * The main routes include:
 * - "/" which renders the Login component.
 * - "/userlist" which renders the UserList component wrapped in a ProtectedRoute, ensuring authentication.
 * - "/edituser/:userid" which renders the EditUser component also wrapped in a ProtectedRoute for authentication.
 * The main element is styled with a semi-transparent black background.
 *
 * @returns {JSX.Element} The main application structure with routing.
 */

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
