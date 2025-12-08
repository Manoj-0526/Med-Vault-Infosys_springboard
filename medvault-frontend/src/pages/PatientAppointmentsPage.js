import React, { useEffect, useState } from "react";

export default function PatientAppointmentsPage() {
  const [items, setItems] = useState([]);
  const patientId = localStorage.getItem("userId");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/appointment/patient/${patientId}`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.log("Error loading appointments");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>My Appointments</h2>

      {items.length === 0 && <p>No appointments found.</p>}

      {items.map(a => (
        <div key={a.id}
          style={{
            border: "1px solid #ddd",
            marginBottom: 10,
            padding: 12,
            borderRadius: 6
          }}>
          
          <b>Doctor:</b> {a.doctor?.user?.fullName}<br/>
          <b>Specialization:</b> {a.doctor?.specialization}<br/>
          <b>Time:</b> {a.appointmentTime}<br/>
          <b>Status:</b> {a.status}<br/>
        </div>
      ))}
    </div>
  );
}
