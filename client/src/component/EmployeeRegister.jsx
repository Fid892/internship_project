import React, { useState } from "react";
import "../css/employeeRegister.css";

function EmployeeRegister() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    number: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState("");

  const validate = () => {
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)
    ) {
      newErrors.password =
        "Password must contain uppercase, number and symbol";
    }

    if (!formData.number.trim()) {
      newErrors.number = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.number)) {
      newErrors.number = "Enter 10 digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setToast("Employee registered successfully ✅");
        setFormData({
          username: "",
          email: "",
          password: "",
          number: "",
        });
        setErrors({});
      } else {
        setToast(data.message || "Registration failed ❌");
      }

      setTimeout(() => setToast(""), 3000);
    } catch (error) {
      setToast("Server error. Try again later ❌");
      setTimeout(() => setToast(""), 3000);
    }
  };

  return (
    <div className="register-container">
      {toast && <div className="toast">{toast}</div>}

      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Employee Registration</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="number"
            placeholder="Enter phone number"
            value={formData.number}
            onChange={handleChange}
          />
          {errors.number && <p>{errors.number}</p>}
        </div>

        <button className="submit-btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default EmployeeRegister;