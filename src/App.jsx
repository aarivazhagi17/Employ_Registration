// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UserAuth from "./pages/UserAuth";
import UserForm from "./pages/UserForm";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="/user-auth" element={<UserAuth />} />
        <Route path="/user-form" element={<UserForm />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;