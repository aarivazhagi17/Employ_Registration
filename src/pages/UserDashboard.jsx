import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import api from "../api";

function UserDashboard() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const userLogin = localStorage.getItem("userLogin");

    if (!userLogin) {
      navigate("/user-auth");
      return;
    }

    loadData();
  }, []);

  const loadData = async () => {
    const res = await api.get("/all");
    setForms(res.data);
  };

  const logout = () => {
    localStorage.removeItem("userLogin");
    navigate("/", { replace: true });
  };

  return (
    <div className="userdash-page">
      <div className="userdash-box">

        <h1>User Dashboard</h1>

        {forms.map((data) => (
          <div className="details-box" key={data._id}>

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