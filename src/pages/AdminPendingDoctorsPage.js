// src/pages/AdminPendingDoctorsPage.js
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const API_BASE_URL = "http://localhost:8080/api";

export default function AdminPendingDoctorsPage() {
  const stored = localStorage.getItem("medvaultUser");
  const user = stored ? JSON.parse(stored) : null;

  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");

  const loadPending = async () => {
    setMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/admin/doctors/pending`);
      if (!res.ok) {
        throw new Error("Failed to load pending doctors");
      }
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      setMessage(err.message);
    }
  };

  useEffect(() => {
    loadPending();
  }, []);

  const handleAction = async (userId, action) => {
    setMessage("");
    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/doctors/user/${userId}/${action}`,
        { method: "POST" }
      );
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Action failed");
      }
      setMessage(`Doctor ${action}d successfully`);
      loadPending();
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (!user) {
    return <p style={{ padding: 20 }}>Please login as admin first.</p>;
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role={user.role} />

      <div style={{ padding: 30, flexGrow: 1 }}>
        <h2>Pending Doctor Approvals</h2>
        {message && <p>{message}</p>}

        <button onClick={loadPending} style={{ marginBottom: 10 }}>
          Refresh
        </button>

        {doctors.length === 0 ? (
          <p>No pending doctors.</p>
        ) : (
          <table
            border="1"
            cellPadding="8"
            style={{ borderCollapse: "collapse", marginTop: 10 }}
          >
            <thead>
              <tr>
                <th>Doctor Table ID</th>
                <th>User ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Qualification</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.user && d.user.id}</td>
                  <td>{d.user && d.user.fullName}</td>
                  <td>{d.specialization}</td>
                  <td>{d.qualification}</td>
                  <td>{d.verificationStatus}</td>
                  <td>
                    <button
                      onClick={() => handleAction(d.user.id, "approve")}
                      style={{ marginRight: 8 }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(d.user.id, "reject")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
