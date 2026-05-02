import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserAuth.css";

function UserAuth() {
  const navigate = useNavigate();

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

    const foundUser = users.find(
      (item) => item.username === data.username
    );

    if (foundUser) {
      if (foundUser.password !== data.password) {
        alert("Wrong Password");
        return;
      }
    } else {
      users.push(data);

      localStorage.setItem(
        "usersAccounts",
        JSON.stringify(users)
      );
    }

    localStorage.setItem("userLogin", "true");

    localStorage.setItem(
      "currentUser",
      JSON.stringify(data)
    );

    navigate("/user-form");
  };

  return (
    <div className="userauth-page">
      <div className="userauth-box">

        <h1>User Login</h1>

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
            Continue
          </button>

        </form>

      </div>
    </div>
  );
}

export default UserAuth;