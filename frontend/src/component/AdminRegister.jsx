import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "../css/adminRegister.css";

function AdminRegister() {
  const [formData, setFormData] = useState({
    adminName: "",
    email: "",
    password: "",
    phone: "",
    role: "admin",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!formData.adminName.trim()) {
      newErrors.adminName = "Admin name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (
      !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)
    ) {
      newErrors.password =
        "Password must contain uppercase, number and symbol";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid 10 digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/register",
        formData
      );

      toast.success(response.data.message || "Admin registered successfully");

      setFormData({
        adminName: "",
        email: "",
        password: "",
        phone: "",
        role: "admin",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Admin registration failed"
      );
    }
  };

  return (
    <div className="admin-register-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <form className="admin-register-form" onSubmit={handleSubmit}>
        <h2>Admin Registration</h2>

        <div className="form-group">
          <label>Admin Name</label>
          <input
            type="text"
            name="adminName"
            placeholder="Enter admin name"
            value={formData.adminName}
            onChange={handleChange}
          />
          {errors.adminName && <p>{errors.adminName}</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter admin email"
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
              placeholder="Enter strong password"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errors.password && <p>{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p>{errors.phone}</p>}
        </div>

        <div className="form-group">
          <label>Role</label>
          <input type="text" name="role" value={formData.role} readOnly />
        </div>

        <button type="submit" className="admin-submit-btn">
          Register Admin
        </button>
      </form>
    </div>
  );
}

export default AdminRegister;