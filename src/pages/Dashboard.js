import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Dashboard() {
  const { token, logout } = useContext(AuthContext);

  const testBackend = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/test",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data);
    } catch (error) {
      alert("Unauthorized");
    }
  };

  const handleCheckIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/attendance/check-in",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data); 
    } catch (error) {
      alert("Already checked in today ");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={testBackend}>
        Test Protected API
      </button>

      <br /><br />

      <button onClick={handleCheckIn}>
        Check In
      </button>

      <br /><br />

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
