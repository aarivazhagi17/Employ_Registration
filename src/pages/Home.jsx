import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-box">

        <h1>Welcome our Application</h1>
        <p>Select Login</p>

        <button onClick={() => navigate("/admin-login")}>
          Admin Login
        </button>

        <button onClick={() => navigate("/user-auth")}>
          User Login / Register
        </button>

      </div>  
    </div>
  );
}

export default Home;