import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "10px", background: "#eee" }}>
      
      {role === "admin" && (
        <>
          <Link to="/admin/employees">Employees</Link>
          
        </>
      )}

      {role === "employee" && (
        <>
          <Link to="/employee">Attendance</Link>
          <Link to="/employee/attendance">My Attendance</Link>
          <Link to="/employee/payroll">My Payroll</Link>
        </>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;
