// src/pages/employee/EmployeeDashboard.jsx
import { useState } from "react";
import { Routes, Route, NavLink,useNavigate } from "react-router-dom";
import MyAttendance from "./MyAttendence";
import MyPayroll from "./MyPayroll";
import API from "../../api/axios";


function EmployeeDashboard() {
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const login = async () => {
    try {
      const res = await API.post("/attendence/login", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Login marked successfully");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Error marking login");
    }
  };

  const logout = async () => {
    try {
      const res = await API.post("/attendence/logout", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Logout marked successfully");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Error marking logout");
    }
  };
  const navigate = useNavigate();
    const emplogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
  <div className="dashboard-container">
    
    <div className="dashboard-header">
      <h2>Employee Dashboard</h2>
      <button className="logout-btn" onClick={emplogout}>
        Logout
      </button>
    </div>

    <div className="dashboard-card">
      
      <nav className="dashboard-nav">
        <NavLink to="/employee/attendance" className="nav-item">
          Mark Attendance
        </NavLink>

        <NavLink to="/employee/myattendance" className="nav-item">
          My Attendance
        </NavLink>

        <NavLink to="/employee/mypayroll" className="nav-item">
          My Payroll
        </NavLink>
      </nav>

      {message && <p className="message">{message}</p>}

      <Routes>
        <Route
          path="attendance"
          element={
            <div className="attendance-actions">
              <h3>Mark Attendance</h3>
              <div className="btn-group">
                <button onClick={login}>Login</button>
                <button onClick={logout}>Logout</button>
              </div>
            </div>
          }
        />
        <Route path="myattendance" element={<MyAttendance />} />
        <Route path="mypayroll" element={<MyPayroll />} />
      </Routes>

    </div>
  </div>
);
}

export default EmployeeDashboard;
