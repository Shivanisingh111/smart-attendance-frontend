import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <h2>Smart Attendance</h2>

      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />

        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
