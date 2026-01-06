import { useState, useEffect } from "react";
import * as attendanceService from "../api/attendanceService";
import "./Attendance.css";

function Attendance() {
  const [todayStatus, setTodayStatus] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchTodayStatus();
    fetchHistory();
  }, []);

  const fetchTodayStatus = async () => {
    try {
      const response = await attendanceService.getTodayAttendance();
      setTodayStatus(response.data);
    } catch (error) {
      console.error("Error fetching today's status:", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await attendanceService.getAttendanceHistory(30);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      await attendanceService.checkIn(notes);
      setNotes("");
      fetchTodayStatus();
      fetchHistory();
      alert("Checked in successfully!");
    } catch (error) {
      console.error("Check-in error:", error);
      const errorMsg = error.response?.data?.message || error.response?.data || error.message || "Failed to check in";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      await attendanceService.checkOut(notes);
      setNotes("");
      fetchTodayStatus();
      fetchHistory();
      alert("Checked out successfully!");
    } catch (error) {
      alert(error.response?.data || "Failed to check out");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (datetime) => {
    if (!datetime) return "-";
    return new Date(datetime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="attendance-container">
      <h2>Attendance</h2>

      {/* Today's Status Card */}
      <div className="today-card">
        <h3>Today's Status</h3>
        {todayStatus ? (
          <div className="status-details">
            <div className="status-row">
              <span>Check-in:</span>
              <strong>{formatTime(todayStatus.checkInTime)}</strong>
              {todayStatus.isLate && <span className="late-badge">LATE</span>}
            </div>
            <div className="status-row">
              <span>Check-out:</span>
              <strong>{formatTime(todayStatus.checkOutTime)}</strong>
            </div>
            <div className="status-row">
              <span>Hours Worked:</span>
              <strong>{todayStatus.hoursWorked?.toFixed(2) || "0.00"} hrs</strong>
            </div>
            <div className="status-row">
              <span>Status:</span>
              <span className={`status-badge ${todayStatus.status?.toLowerCase()}`}>
                {todayStatus.status}
              </span>
            </div>
          </div>
        ) : (
          <p className="no-status">No check-in for today</p>
        )}

        {/* Check-in/out Buttons */}
        <div className="action-section">
          <input
            type="text"
            placeholder="Add notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="notes-input"
          />
          <div className="action-buttons">
            {!todayStatus ? (
              <button
                onClick={handleCheckIn}
                disabled={loading}
                className="btn-checkin"
              >
                Check In
              </button>
            ) : !todayStatus.checkOutTime ? (
              <button
                onClick={handleCheckOut}
                disabled={loading}
                className="btn-checkout"
              >
                Check Out
              </button>
            ) : (
              <p className="completed-msg">✓ Completed for today</p>
            )}
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="history-section">
        <h3>Attendance History (Last 30 Days)</h3>
        <div className="history-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.length > 0 ? (
                history.map((record) => (
                  <tr key={record.id}>
                    <td>{formatDate(record.date)}</td>
                    <td>
                      {formatTime(record.checkInTime)}
                      {record.isLate && <span className="late-badge-small">L</span>}
                    </td>
                    <td>{formatTime(record.checkOutTime)}</td>
                    <td>{record.hoursWorked?.toFixed(2) || "-"}</td>
                    <td>
                      <span className={`status-badge-small ${record.status?.toLowerCase()}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No attendance records
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
