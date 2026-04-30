// pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});

  // Protect Page
  useEffect(() => {
    const adminLogin = localStorage.getItem("adminLogin");

    if (!adminLogin) {
      navigate("/admin-login", { replace: true });
    } else {
      const savedData = JSON.parse(
        localStorage.getItem("userForm")
      );

      setUserData(savedData || null);
      setEditData(savedData || {});
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("adminLogin");
    navigate("/admin-login", { replace: true });
  };

  const deleteData = () => {
    localStorage.removeItem("userForm");
    setUserData(null);
    alert("Deleted Successfully");
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const updateData = () => {
    localStorage.setItem(
      "userForm",
      JSON.stringify(editData)
    );

    setUserData(editData);
    setIsEdit(false);

    alert("Updated Successfully");
  };

  return (
    <div className="adminDash-page">
      <div className="adminDash-box">

        <h1>Admin Dashboard</h1>
        <p>User Submitted Details</p>

        {!userData ? (
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

            <textarea
              rows="4"
              name="message"
              value={editData.message}
              onChange={handleChange}
            ></textarea>

            <button onClick={updateData}>
              Save
            </button>

          </div>

        ) : (

          <div className="details-box">

            <div><strong>Name:</strong> {userData.fullName}</div>
            <div><strong>Email:</strong> {userData.email}</div>
            <div><strong>Phone:</strong> {userData.phone}</div>
            <div><strong>Address:</strong> {userData.address}</div>
            <div><strong>Course:</strong> {userData.course}</div>

          </div>

        )}

        {userData && !isEdit && (
          <>
            <button onClick={() => setIsEdit(true)}>
              Edit
            </button>

            <button onClick={deleteData}>
              Delete
            </button>
          </>
        )}

        <button onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default AdminDashboard;