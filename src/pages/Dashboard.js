import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h3>Dashboard</h3>
      <p>You are logged in 🎉</p>

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <button
          onClick={() => navigate("/attendance")}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Go to Attendance
        </button>

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
