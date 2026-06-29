import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.role) {
      alert("Please fill all fields");
      return;
    }

    if (formData.role === "admin") {
      navigate("/admin");
    } else if (formData.role === "employee") {
      navigate("/employee");
    }
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;