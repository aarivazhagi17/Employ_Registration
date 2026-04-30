// pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  // Protect Page
  useEffect(() => {
    const adminLogin = localStorage.getItem("adminLogin");

    if (!adminLogin) {
      navigate("/admin-login", { replace: true });
    } else {
      const savedUsers = JSON.parse(
        localStorage.getItem("userForms")
      ) || [];

      setUsers(savedUsers);
    }
  }, [navigate]);

  // Logout
  const logout = () => {
    localStorage.removeItem("adminLogin");
    navigate("/admin-login", { replace: true });
  };

  // Delete User
  const deleteData = (index) => {
    const updatedUsers = users.filter(
      (_, i) => i !== index
    );

    setUsers(updatedUsers);

    localStorage.setItem(
      "userForms",
      JSON.stringify(updatedUsers)
    );

    alert("Deleted Successfully");
  };

  // Edit User
  const startEdit = (index) => {
    setIsEdit(true);
    setEditIndex(index);
    setEditData(users[index]);
  };

  // Input Change
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  // Save Update
  const updateData = () => {
    const updatedUsers = [...users];

    updatedUsers[editIndex] = editData;

    setUsers(updatedUsers);

    localStorage.setItem(
      "userForms",
      JSON.stringify(updatedUsers)
    );

    setIsEdit(false);
    setEditIndex(null);

    alert("Updated Successfully");
  };

  return (
    <div className="adminDash-page">
      <div className="adminDash-box">

        <h1>Admin Dashboard</h1>
        <p>All User Submitted Details</p>

        {users.length === 0 ? (
          <h3 className="nodata">No Data Found</h3>

        ) : isEdit ? (

          <div className="edit-box">

            <input
              type="text"
              name="fullName"
              value={editData.fullName}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              value={editData.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              value={editData.address}
              onChange={handleChange}
            />

            <input
              type="text"
              name="course"
              value={editData.course}
              onChange={handleChange}
            />

            <button onClick={updateData}>
              Save
            </button>

          </div>

        ) : (

          users.map((user, index) => (
            <div className="details-box" key={index}>

              <div><strong>Name:</strong> {user.fullName}</div>
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Phone:</strong> {user.phone}</div>
              <div><strong>Address:</strong> {user.address}</div>
              <div><strong>Course:</strong> {user.course}</div>

              <button onClick={() => startEdit(index)}>
                Edit
              </button>

              <button onClick={() => deleteData(index)}>
                Delete
              </button>

            </div>
          ))

        )}

        <button onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default AdminDashboard;