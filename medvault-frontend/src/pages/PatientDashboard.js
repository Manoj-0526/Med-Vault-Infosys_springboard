// src/pages/PatientDashboard.js
import React from "react";
import Sidebar from "../components/Sidebar";

export default function PatientDashboard() {
  const stored = localStorage.getItem("medvaultUser");
  const user = stored ? JSON.parse(stored) : null;

  if (!user) {
    return <p style={{ padding: 20 }}>Please login first.</p>;
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role={user.role} />

      <div style={{ padding: 30, flexGrow: 1 }}>
        <h2>Patient Dashboard</h2>
        <p>
          Welcome, <strong>{user.name}</strong> (User ID: {user.userId}) – Role:{" "}
          {user.role}
        </p>

        <div style={{ marginTop: 20 }}>
          <h3>Your Overview</h3>
          <ul>
            <li>Profile: will show basic patient details</li>
            <li>Appointments: upcoming and past bookings</li>
            <li>Medical Records: uploaded reports & prescriptions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
