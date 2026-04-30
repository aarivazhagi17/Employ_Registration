import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserAuth.css";

function UserAuth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

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

    const savedUser = JSON.parse(
      localStorage.getItem("userAccount")
    );

    // Register
    if (!isLogin) {
      if (savedUser) {
        alert("Already Registered. Please Login.");
        return;
      }

      localStorage.setItem(
        "userAccount",
        JSON.stringify(data)
      );

      alert("Registration Successful");
      setIsLogin(true);
      return;
    }

    // Login
    if (
      savedUser &&
      savedUser.username === data.username &&
      savedUser.password === data.password
    ) {
      localStorage.setItem("userLogin", "true");

      const userForm = localStorage.getItem("userForm");

      if (userForm) {
        navigate("/user-dashboard");
      } else {
        navigate("/user-form");
      }

    } else {
      alert("Invalid Login");
    }
  };

  return (
    <div className="userauth-page">
      <div className="userauth-box">

        <h1>
          {isLogin ? "User Login" : "User Register"}
        </h1>

        <p>
          {isLogin
            ? "Login to Continue"
            : "One Time Registration"}
        </p>

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
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

        <span
          className="switch-link"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New User? Register"
            : "Already Registered? Login"}
        </span>

      </div>
    </div>
  );
}

export default UserAuth;