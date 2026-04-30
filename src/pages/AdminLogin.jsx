import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      data.username === "admin" &&
      data.password === "admin123"
    ) {
      localStorage.setItem("adminLogin", "true");
      navigate("/admin-dashboard");
    } else {
      alert("Invalid Login");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-box">

        <h1>Admin Login</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default AdminLogin;