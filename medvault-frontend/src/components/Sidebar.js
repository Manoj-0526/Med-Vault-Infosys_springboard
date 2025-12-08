// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  const menu = {
    PATIENT: [
      { label: "Dashboard", path: "/patient/profile" },
      { label: "Book Appointment", path: "/patient/book" },      // 👈 NEW
      { label: "Appointments", path: "/patient/appointments" },  // (for later)
      { label: "Medical Records", path: "/patient/records" },    // (for history)
      <li><Link to="/patient/appointments">My Appointments</Link></li>

    ],
    DOCTOR: [
      { label: "Dashboard", path: "/doctor/profile" },
      { label: "My Appointments", path: "/doctor/appointments" }, // 👈 doctor page
      { label: "Patients", path: "/doctor/patients" },            // (future)
    ],
    ADMIN: [
      { label: "Admin Dashboard", path: "/admin" },
      { label: "Pending Doctors", path: "/admin/doctors" },
      { label: "Users", path: "/admin/users" },
    ],
  };

  const items = menu[role] || [];

  return (
    <div
      style={{
        width: "220px",
        background: "#1A73E8",
        height: "100vh",
        padding: "20px",
        color: "#fff",
        fontSize: "16px",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ marginBottom: "24px", fontWeight: "bold", fontSize: "20px" }}>
        MedVault
      </h2>

      {items.map((item, idx) => (
        <div key={idx} style={{ marginBottom: "16px" }}>
          <Link
            to={item.path}
            style={{ textDecoration: "none", color: "#fff" }}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  );
}
