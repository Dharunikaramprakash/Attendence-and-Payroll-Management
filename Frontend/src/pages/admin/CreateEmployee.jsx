import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function CreateEmployee() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post("/admin/employee", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Employee created successfully!");
      navigate("/admin/employees");
    } catch (err) {
      console.error(err);
      alert("Failed to create employee");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Employee</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Name"
            required
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        <div>
          <input
            placeholder="Email"
            required
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <div>
          <select
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateEmployee;
