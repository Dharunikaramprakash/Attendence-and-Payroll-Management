import Navbar from "../../components/Navbar";
import { Routes, Route } from "react-router-dom";
import Employees from "./Employees";
import AttendanceView from "./AttendanceView";
import PayrollManagement from "./PayrollManagement";
import CreateEmployee from "./CreateEmployee";

function AdminDashboard() {
  return (
    <>
      <Navbar />

      <Routes>
  <Route index element={<Employees />} />
  <Route path="employees" element={<Employees />} />
  <Route path="attendance/:id" element={<AttendanceView />} />
  <Route path="payroll/:id" element={<PayrollManagement />} />
   <Route path="create-employee" element={<CreateEmployee />} />
</Routes>

    </>
  );
}

export default AdminDashboard;
