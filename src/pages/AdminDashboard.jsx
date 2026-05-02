import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import api from "../api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const adminLogin = localStorage.getItem("adminLogin");

    if (!adminLogin) {
      navigate("/admin-login", { replace: true });
      return;
    }

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/all");
    setUsers(res.data);
  };

  const deleteData = async (id) => {
    await api.delete(`/delete/${id}`);
    fetchUsers();
  };

  const logout = () => {
    localStorage.removeItem("adminLogin");
    navigate("/", { replace: true });
  };

  return (
    <div className="adminDash-page">
      <div className="adminDash-box">

        <h1>Admin Dashboard</h1>

        {users.map((user) => (
          <div className="details-box" key={user._id}>

            <div>Name: {user.fullName}</div>
            <div>Email: {user.email}</div>
            <div>Phone: {user.phone}</div>
            <div>Address: {user.address}</div>
            <div>Course: {user.course}</div>

            <button
              onClick={() =>
                deleteData(user._id)
              }
            >
              Delete
            </button>

          </div>
        ))}

        <button onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default AdminDashboard;