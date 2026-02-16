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
    <div>
      <h3>Employee Attendance</h3>

      {attendance.map(att => (
        <div key={att._id}>
          {att.employeeID?.name} -
          {new Date(att.date).toDateString()} -
          {att.workingHours?.toFixed(2) || 0} hrs
        </div>
      ))}
    </div>
  );
}

export default AttendanceView;
