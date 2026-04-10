import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

return (
  <div className="navbar">
    
    <div className="nav-links">
      {role === "admin" && (
        <>
          <Link to="/admin/employees">Employees</Link>
        </>
      )}

      {role === "employee" && (
        <>
          <Link to="/employee">Attendance</Link>
          <Link to="/employee/myattendance">My Attendance</Link>
          <Link to="/employee/mypayroll">My Payroll</Link>
        </>
      )}
    </div>

    <button className="logout-btn" onClick={logout}>
      Logout
    </button>
  </div>
);
}

export default Navbar;
