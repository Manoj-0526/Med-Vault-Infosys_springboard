// src/pages/DoctorDashboard.js
import React from "react";
import Sidebar from "../components/Sidebar";

export default function DoctorDashboard() {
  const stored = localStorage.getItem("medvaultUser");
  const user = stored ? JSON.parse(stored) : null;

  if (!user) {
    return <p style={{ padding: 20 }}>Please login first.</p>;
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role={user.role} />

      <div style={{ padding: 30, flexGrow: 1 }}>
        <h2>Doctor Dashboard</h2>
        <p>
          Welcome, <strong>{user.name}</strong> (User ID: {user.userId}) – Role:{" "}
          {user.role}
        </p>

        <div style={{ marginTop: 20 }}>
          <h3>Your Overview</h3>
          <ul>
            <li>Profile: specialization & qualification details</li>
            <li>Appointments: upcoming patient appointments</li>
            <li>Patients: list of patients you’ve consulted (later)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
