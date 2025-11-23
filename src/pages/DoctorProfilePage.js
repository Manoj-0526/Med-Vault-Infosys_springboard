// src/pages/DoctorProfilePage.js
import React, { useState, useEffect } from "react";
import api from "../api";

function DoctorProfilePage() {
  const [form, setForm] = useState({
    specialization: "",
    qualification: "",
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
      const res = await api.post(`/doctor/${user.userId}/create-profile`, form);
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
      <h2>Doctor Profile</h2>
      {user && <p>Logged in as: {user.name} ({user.role})</p>}
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Specialization:</label>
          <input name="specialization" value={form.specialization} onChange={handleChange} />
        </div>
        <div>
          <label>Qualification:</label>
          <input name="qualification" value={form.qualification} onChange={handleChange} />
        </div>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default DoctorProfilePage;
