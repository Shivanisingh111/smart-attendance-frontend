import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Dashboard</h3>
      <p>You are logged in 🎉</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
