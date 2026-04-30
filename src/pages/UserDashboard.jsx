import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const userLogin = localStorage.getItem("userLogin");

    if (!userLogin) {
      navigate("/user-auth");
      return;
    }

    const allUsers = JSON.parse(
      localStorage.getItem("userForms")
    ) || [];

    if (allUsers.length === 0) {
      navigate("/user-form");
      return;
    }

    // show all submitted forms
    setForms(allUsers);

  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("userLogin");
    navigate("/", { replace: true });
  };

  if (forms.length === 0) return null;

  return (
    <div className="userdash-page">
      <div className="userdash-box">

        <h1>User Dashboard</h1>

        {forms.map((data, index) => (
          <div className="details-box" key={index}>

            <div>Name: {data.fullName}</div>
            <div>Email: {data.email}</div>
            <div>Phone: {data.phone}</div>
            <div>Address: {data.address}</div>
            <div>Course: {data.course}</div>

          </div>
        ))}

        <button onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default UserDashboard;