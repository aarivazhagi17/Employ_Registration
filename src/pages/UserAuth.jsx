import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserAuth.css";

function UserAuth() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [data, setData] = useState({
    username: "",
    password: ""
  });

  useEffect(() => {
    const savedUser = localStorage.getItem(
      "userAccount"
    );

    if (!savedUser) {
      setIsRegister(true); // first time
    }
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(
      localStorage.getItem("userAccount")
    );

    // Register
    if (isRegister) {
      localStorage.setItem(
        "userAccount",
        JSON.stringify(data)
      );

      alert("Registered Successfully");

      setIsRegister(false);
      setData({
        username: "",
        password: ""
      });

      return;
    }

    // Login
    if (
      savedUser &&
      savedUser.username === data.username &&
      savedUser.password === data.password
    ) {
      localStorage.setItem(
        "userLogin",
        "true"
      );

      navigate("/user-form");

    } else {
      alert("Invalid Login");
    }
  };

  return (
    <div className="userauth-page">
      <div className="userauth-box">

        <h1>
          {isRegister
            ? "User Register"
            : "User Login"}
        </h1>

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
            {isRegister
              ? "Register"
              : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default UserAuth;