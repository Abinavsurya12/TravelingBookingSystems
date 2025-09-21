import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Admin.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🟢 Clear auth data (if any stored)
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    // 🔥 Redirect to Home page
    navigate("/home");
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Admin Panel</h2>
        <nav>
          <NavLink to="/admin/add-item" className="nav-link">
            Add Package
          </NavLink>
          <NavLink to="/admin/library" className="nav-link">
            All Packages
          </NavLink>
        </nav>

          <NavLink to="/admin/bookings" className="nav-link">
    All Bookings
  </NavLink> 
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="card">
          <Outlet /> {/* CHILD ROUTES render here */}
        </div>
      </main>
    </div>
  );
}
