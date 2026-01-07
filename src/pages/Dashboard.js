import "./Dashboard.css";
import "./Background.css";
import "./Chart.css";
import "./Timeline.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [dark, setDark] = useState(true);

    useEffect(() => {
      document.body.className = dark ? "" : "light";
    }, [dark]);


  const [attendance, setAttendance] = useState(null);
  const [status, setStatus] = useState("LOADING");

  useEffect(() => {
    fetchTodayStatus();
  }, []);

  const fetchTodayStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/attendance/today",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data === "NOT_CHECKED_IN") {
        setStatus("NOT_CHECKED_IN");
        setAttendance(null);
      } else {
        setStatus("CHECKED_IN");
        setAttendance(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkIn = async () => {
    try {
      await axios.post(
        "http://localhost:8080/attendance/check-in",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTodayStatus();
    } catch (error) {
      alert("Already checked in today");
    }
  };

  const checkOut = async () => {
    try {
      await axios.post(
        "http://localhost:8080/attendance/check-out",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTodayStatus();
    } catch (error) {
      alert("Cannot check out");
    }
  };

  return (
    <>
  <div className="background">
    <div className="blob one"></div>
    <div className="blob two"></div>
  </div>

  <div className="dashboard-wrapper">
    <div className="glass-card">
      <h2> Attendance Portal</h2>

      <button onClick={() => setDark(!dark)}>
        {dark ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="status-chip">
        <b>Status:</b> {status}
      </div>

      {attendance && (
        <div className="status-chip">
          <p>🟢 In: {attendance.checkInTime}</p>
          <p>🔴 Out: {attendance.checkOutTime || "—"}</p>
          <p>
            ⏱ Hours:{" "}
            {attendance.workingMinutes
              ? (attendance.workingMinutes / 60).toFixed(2)
              : "—"}
          </p>

          <div className="chart">
            <p> Working Hours Today</p>
            <div
              className="bar"
              style={{
                width: `${Math.min(
                  (attendance.workingMinutes / 480) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              🟢 Checked in at {attendance.checkInTime}
            </div>

            {attendance.checkOutTime && (
              <div className="timeline-item">
                🔴 Checked out at {attendance.checkOutTime}
              </div>
            )}
          </div>

        </div>
      )}


      <button
          className="btn-in magnetic"
          onClick={checkIn}
          disabled={status !== "NOT_CHECKED_IN"}
        >
          Check In
        </button>

        <button
          className="btn-out magnetic"
          onClick={checkOut}
          disabled={!attendance || attendance.checkOutTime}
        >
          Check Out
        </button>

        <button
          className="btn-logout magnetic"
          onClick={logout}
        >
          Logout
        </button>

            </div>
          </div>
      </>

  );

}

export default Dashboard;
