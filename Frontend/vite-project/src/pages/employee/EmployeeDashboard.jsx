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
    <div style={{ padding: "20px" }}>
      <h2>Employee Panel</h2>

      <nav style={{ marginBottom: "20px" }}>
        <NavLink
          to="/employee/attendance"
          style={({ isActive }) => ({ marginRight: "10px", color: isActive ? "green" : "blue" })}
        > 
          Attendance
        </NavLink>
        <NavLink
          to="/employee/myattendance"
          style={({ isActive }) => ({ marginRight: "10px", color: isActive ? "green" : "blue" })}
        >
          My Attendance
        </NavLink>
        <NavLink
          to="/employee/mypayroll"
          style={({ isActive }) => ({ color: isActive ? "green" : "blue" })}
        >
          My Payroll
        </NavLink>
      </nav>

      {message && <p style={{ color: "red" }}>{message}</p>}

      <Routes>
        
        <Route path="attendance" element={
          <div>
            <h3>Mark Attendance</h3>
            <button onClick={login} style={{ marginRight: "10px" }}>Login</button>
            <button onClick={logout}>Logout</button>
          </div>
        } />
        <Route path="myattendance" element={<MyAttendance />} />
        <Route path="mypayroll" element={<MyPayroll />} />
      </Routes><br></br>
      <button onClick={emplogout}>Employee Logout</button>
    </div>
  );
}

export default EmployeeDashboard;
