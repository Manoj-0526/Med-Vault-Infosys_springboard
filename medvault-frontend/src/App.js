// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPendingDoctorsPage from "./pages/AdminPendingDoctorsPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import DoctorAppointmentsPage from "./pages/DoctorAppointmentsPage";
import PatientAppointmentsPage from "./pages/PatientAppointmentsPage";

import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      {/* Simple top nav */}
      <nav
        style={{
          padding: "10px 20px",
          borderBottom: "1px solid #ddd",
          marginBottom: "20px",
        }}
      >
        <Link to="/login" style={{ marginRight: 15 }}>Login</Link>
        <Link to="/register" style={{ marginRight: 15 }}>Register</Link>
        <Link to="/patient/profile" style={{ marginRight: 15 }}>Patient Profile</Link>
        <Link to="/doctor/profile" style={{ marginRight: 15 }}>Doctor Profile</Link>
        <Link to="/admin" style={{ marginRight: 15 }}>Admin</Link>
      </nav>

      <Routes>

        {/* Basic Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Patient Pages */}
        <Route
          path="/patient/profile"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar role="PATIENT" />
              <PatientDashboard />
            </div>
          }
        />

        <Route
          path="/patient/book"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar role="PATIENT" />
              <BookAppointmentPage />
            </div>
          }
        />

        {/* Doctor Pages */}
        <Route
          path="/doctor/profile"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar role="DOCTOR" />
              <DoctorDashboard />
            </div>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar role="DOCTOR" />
              <DoctorAppointmentsPage />
            </div>
          }
        />

        {/* Admin Pages */}
        <Route
          path="/admin"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar role="ADMIN" />
              <AdminDashboard />
            </div>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar role="ADMIN" />
              <AdminPendingDoctorsPage />
            </div>
          }
        />
        <Route
          path="/patient/appointments"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar role="PATIENT" />
             <PatientAppointmentsPage />
            </div>
           }
        />


      </Routes>
    </Router>
  );
}

export default App;
