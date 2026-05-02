import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserForm.css";
import api from "../api";

function UserForm() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("userAccount")
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
    course: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/submit", formData);

      alert("Form Submitted Successfully");

      navigate("/user-dashboard");

    } catch (error) {
      alert("Submit Failed");
    }
  };

  return (
    <div className="userform-page">
      <div className="userform-box">

        <h1>Employ Application</h1>
        <p>Fill Your Details</p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Submit Form
          </button>

        </form>

      </div>
    </div>
  );
}

export default UserForm;