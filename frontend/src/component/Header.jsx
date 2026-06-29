import React, { useState } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaUserPlus,
  FaSignInAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "../css/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <h2>EmployeeHub</h2>
      </div>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <nav className={menuOpen ? "nav-links active" : "nav-links"}>
        <a href="/">
          <FaHome /> Home
        </a>

        <a href="/about">
          <FaInfoCircle /> About
        </a>

        <a href="/register">
          <FaUserPlus /> Employee Register
        </a>

        <a href="/login">
          <FaSignInAlt /> Login
        </a>
      </nav>
    </header>
  );
}

export default Header;