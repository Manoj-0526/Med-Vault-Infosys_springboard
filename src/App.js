// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPendingDoctorsPage from "./pages/AdminPendingDoctorsPage";

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
        <Link to="/login" style={{ marginRight: 15 }}>
          Login
        </Link>
        <Link to="/register" style={{ marginRight: 15 }}>
          Register
        </Link>
        <Link to="/patient/profile" style={{ marginRight: 15 }}>
          Patient Profile
        </Link>
        <Link to="/doctor/profile" style={{ marginRight: 15 }}>
          Doctor Profile
        </Link>
        <Link to="/admin" style={{ marginRight: 15 }}>
          Admin
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/patient/profile" element={<PatientDashboard />} />
        <Route path="/doctor/profile" element={<DoctorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/doctors" element={<AdminPendingDoctorsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
