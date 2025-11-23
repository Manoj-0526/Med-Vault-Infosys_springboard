// src/pages/PatientProfilePage.js
import React, { useState, useEffect } from "react";
import api from "../api";

function PatientProfilePage() {
  const [form, setForm] = useState({
    dob: "",
    gender: "",
    bloodGroup: "",
  });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("medvaultUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!user) {
      setMessage("Please login first");
      return;
    }
    try {
      const res = await api.post(`/patient/${user.userId}/create-profile`, form);
      setMessage(res.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data);
      } else {
        setMessage("Error creating profile");
      }
    }
  };

  return (
    <div>
      <h2>Patient Profile</h2>
      {user && <p>Logged in as: {user.name} ({user.role})</p>}
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>DOB:</label>
          <input name="dob" value={form.dob} onChange={handleChange} placeholder="YYYY-MM-DD" />
        </div>
        <div>
          <label>Gender:</label>
          <input name="gender" value={form.gender} onChange={handleChange} />
        </div>
        <div>
          <label>Blood Group:</label>
          <input name="bloodGroup" value={form.bloodGroup} onChange={handleChange} />
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default PatientProfilePage;
