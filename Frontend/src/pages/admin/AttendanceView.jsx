// pages/admin/AttendanceView.jsx
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useParams } from "react-router-dom";

function AttendanceView() {
  const { id } = useParams();
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    API.get(`/admin/attendance/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setAttendance(res.data));
  }, [id]);

return (
  <div className="employee-container">
    <h2>Employee Attendance</h2>

    {attendance.length === 0 ? (
      <p>No attendance records found.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Working Hours</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((att) => (
            <tr key={att._id}>
              <td>{att.employeeID?.name}</td>
              <td>{new Date(att.date).toLocaleDateString()}</td>
              <td>{att.workingHours?.toFixed(2) || 0} hrs</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
}

export default AttendanceView;
