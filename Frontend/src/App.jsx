// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import MyAttendance from "./pages/employee/MyAttendence";
import MyPayroll from "./pages/employee/MyPayroll";
import AdminDashboard from "./pages/admin/AdminDashboard";   // 🔥 ADD THIS
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin Panel */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Employee Panel */}
        <Route
  path="/employee/*"
  element={
    <PrivateRoute role="employee">
      <EmployeeDashboard />
    </PrivateRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
