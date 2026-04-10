// src/pages/employee/MyAttendance.jsx
import { useState } from "react";
import API from "../../api/axios";

function MyAttendance() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    setLoading(true);
    try {
      // Set current month and year dynamically
      const now = new Date();
      const month = now.getMonth() + 1;
      const year = now.getFullYear();

      const res = await API.get(`/attendence/my?month=${month}&year=${year}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setData(res.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error fetching attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>My Attendance</h3>
      <button onClick={fetchData}>Load Attendance</button>

      {loading && <p>Loading...</p>}

      {data.length > 0 ? (
        <table border="1" style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Login Time</th>
              <th>Logout Time</th>
              <th>Working Hours</th>
            </tr>
          </thead>
          <tbody>
            {data.map(att => (
              <tr key={att._id}>
                <td>{new Date(att.date).toLocaleDateString()}</td>
                <td>{att.loginTime ? new Date(att.loginTime).toLocaleTimeString() : "-"}</td>
                <td>{att.logoutTime ? new Date(att.logoutTime).toLocaleTimeString() : "-"}</td>
                <td>{att.workingHours?.toFixed(2) || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No attendance data found</p>
      )}
    </div>
  );
}

export default MyAttendance;
