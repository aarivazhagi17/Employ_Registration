// pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  // Protect Page
  useEffect(() => {
    const userLogin = localStorage.getItem("userLogin");

    if (!userLogin) {
      navigate("/user-auth", { replace: true });
    } else {
      const savedData = JSON.parse(
        localStorage.getItem("userForm")
      );

      if (!savedData) {
        navigate("/user-form", { replace: true });
      } else {
        setData(savedData);
      }
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("userLogin");
    navigate("/user-auth", { replace: true });
  };

  if (!data) return null;

  return (
    <div className="userdash-page">
      <div className="userdash-box">

        <h1>User Dashboard</h1>
        <p>Your Submitted Details</p>

        <div className="details-box">

          <div><strong>Name:</strong> {data.fullName}</div>

          <div><strong>Email:</strong> {data.email}</div>

          <div><strong>Phone:</strong> {data.phone}</div>

          <div><strong>Address:</strong> {data.address}</div>

          <div><strong>Course:</strong> {data.course}</div>

        </div>

        <button onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default UserDashboard;