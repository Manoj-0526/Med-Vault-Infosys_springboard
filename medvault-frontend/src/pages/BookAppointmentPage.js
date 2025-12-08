import React, { useEffect, useState } from "react";

export default function BookAppointmentPage() {
  const [doctors, setDoctors] = useState([]);
  const [patientTableId, setPatientTableId] = useState(null);

  const [form, setForm] = useState({
    doctorId: "",
    appointmentTime: "",
    issueDescription: "",
  });

  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadApprovedDoctors();
    loadPatientTableId();
  }, []);

  // 🔥 LOAD ACTUAL PATIENT TABLE ID
  const loadPatientTableId = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/patient/by-user/${userId}`);
      const data = await res.json();
      console.log("Patient DB:", data);
      setPatientTableId(data.id); // SET ACTUAL PATIENT ID
    } catch (err) {
      console.log("Patient reference missing");
    }
  };

  const loadApprovedDoctors = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/doctor/approved");
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.log("Error loading doctors");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 SUBMIT FIXED
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientTableId) {
      setMessage("Patient profile not found!");
      return;
    }

    setMessage("Booking appointment...");

    const payload = {
      patientId: patientTableId,        // correct patient table id
      doctorId: form.doctorId,         // correct doctor ID
      appointmentTime: form.appointmentTime + ":00",
      issueDescription: form.issueDescription,
    };

    console.log("SENDING PAYLOAD:", payload);

    try {
      const res = await fetch("http://localhost:8080/api/appointment/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();

      if (res.ok) {
        setMessage("Appointment booked successfully ✔");
      } else {
        setMessage(text);
      }
    } catch {
      setMessage("Server not reachable");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Book Appointment</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label>Choose Doctor</label>
        <select
          name="doctorId"
          value={form.doctorId}
          onChange={handleChange}
          required
          style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
        >
          <option>Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.user?.fullName} ({d.specialization})
            </option>
          ))}
        </select>

        <label>Appointment Time</label>
        <input
          type="datetime-local"
          name="appointmentTime"
          value={form.appointmentTime}
          onChange={handleChange}
          required
          style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
        />

        <label>Problem Description</label>
        <textarea
          name="issueDescription"
          value={form.issueDescription}
          onChange={handleChange}
          required
          rows={3}
          style={{ padding: "10px", width: "100%" }}
        />

        <button type="submit" style={{ marginTop: "10px", width: "100%", padding: "10px" }}>
          Book Appointment
        </button>
      </form>

      <p style={{ marginTop: "15px", fontWeight: "bold" }}>{message}</p>
    </div>
  );
}
