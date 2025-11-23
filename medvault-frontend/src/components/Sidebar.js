// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  const menu = {
    PATIENT: [
      { label: "Dashboard", path: "/patient/profile" },
      { label: "Appointments", path: "/patient/appointments" },
      { label: "Medical Records", path: "/patient/records" },
    ],
    DOCTOR: [
      { label: "Dashboard", path: "/doctor/profile" },
      { label: "Appointments", path: "/doctor/appointments" },
      { label: "Patients", path: "/doctor/patients" },
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
