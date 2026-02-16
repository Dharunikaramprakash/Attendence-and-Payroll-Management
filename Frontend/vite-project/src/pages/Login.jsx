import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "employee"
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/login", form);

      if (!res.data.token) {
        alert("Login failed: check email/password/role");
        return;
      }

      // Save token & role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", form.role);

      // Navigate based on role
      if (form.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>Attendence and Pay roll system</h2><br></br>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e)=>setForm({...form,email:e.target.value})}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e)=>setForm({...form,password:e.target.value})}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <select
          value={form.role}
          onChange={(e)=>setForm({...form,role:e.target.value})}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
