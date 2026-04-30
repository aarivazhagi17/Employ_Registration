// pages/UserAuth.jsx
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

  const users = JSON.parse(
    localStorage.getItem("usersAccounts")
  ) || [];

  const validUser = users.find(
    (item) =>
      item.username === data.username
  );

  // Existing User
  if (validUser) {

    if (validUser.password !== data.password) {
      alert("Wrong Password");
      return;
    }

    localStorage.setItem(
      "userLogin",
      "true"
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(validUser)
    );

    navigate("/user-form");
    return;
  }

  // New User Auto Create
  users.push(data);

  localStorage.setItem(
    "usersAccounts",
    JSON.stringify(users)
  );

  localStorage.setItem(
    "userLogin",
    "true"
  );

  localStorage.setItem(
    "currentUser",
    JSON.stringify(data)
  );

  navigate("/user-form");
};

  return (
    <div className="userauth-page">
      <div className="userauth-box">

        <h1>
          {isLogin ? "User Login" : "User Register"}
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