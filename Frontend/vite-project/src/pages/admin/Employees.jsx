// src/pages/admin/Employees.jsx
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";


function Employees() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);


  const handleEdit = (emp) => {
    setSelectedEmployee(emp);
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/admin/employee/${selectedEmployee._id}`,
        {
          name: selectedEmployee.name,
          email: selectedEmployee.email,
          role: selectedEmployee.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Employee updated successfully!");
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      setError("Failed to update employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div  class="employee-container">
      <h2>Employees List</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
    onClick={() => navigate("/admin/create-employee")}
    style={{
      padding: "8px 15px",
      backgroundColor: "#1976d2",
      color: "white",
      border: "none",
      cursor: "pointer",
      borderRadius: "4px",
      marginBottom:"20px",
      marginTop:"20px"
    }}
  >
     Create Employee
  </button>
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              <td>
  <button onClick={() => navigate(`/admin/attendance/${emp._id}`)} style={{ marginRight: "8px" }}>
    Attendance
  </button>

  <button onClick={() => navigate(`/admin/payroll/${emp._id}`)} style={{ marginRight: "8px" }}>
    Payroll
  </button>

  <button onClick={() => handleEdit(emp)}>
    Edit
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>

   
      {selectedEmployee && (
        <div style={{ marginTop: "30px" }}>
          <h3>Edit Employee</h3>

          <form onSubmit={handleUpdate}>
            <div>
              <label>Name: </label>
              <input
                type="text"
                value={selectedEmployee.name}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label>Email: </label>
              <input
                type="email"
                value={selectedEmployee.email}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label>Role: </label>
              <select
                value={selectedEmployee.role}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    role: e.target.value,
                  })
                }
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>

            <button
              type="button"
              onClick={() => setSelectedEmployee(null)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Employees;
