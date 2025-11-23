// src/pages/AdminDashboard.js
import React from "react";
import Sidebar from "../components/Sidebar";

export default function AdminDashboard() {
  const stored = localStorage.getItem("medvaultUser");
  const user = stored ? JSON.parse(stored) : null;

  if (!user) {
    return <p style={{ padding: 20 }}>Please login first.</p>;
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role={user.role} />

      <div style={{ padding: 30, flexGrow: 1 }}>
        <h2>Admin Dashboard</h2>
        <p>
          Welcome, <strong>{user.name}</strong> (User ID: {user.userId}) – Role:{" "}
          {user.role}
        </p>

        <div style={{ marginTop: 20 }}>
          <h3>Admin Actions</h3>
          <ul>
            <li>View pending doctors (will connect to /admin/doctors)</li>
            <li>Approve / reject doctor accounts</li>
            <li>View system users (later)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
