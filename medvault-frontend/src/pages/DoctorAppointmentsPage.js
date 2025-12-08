import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function DoctorAppointmentsPage() {

  const user = JSON.parse(localStorage.getItem("medvaultUser"));
  const [appointments, setAppointments] = useState([]);
  const [msg, setMsg] = useState("");

  const loadAppointments = async () => {
    const res = await fetch(
      `http://localhost:8080/api/appointment/doctor/${user.userId}`
    );
    const data = await res.json();
    setAppointments(data);
  };

  const changeStatus = async (id, status) => {
    await fetch(
      `http://localhost:8080/api/appointment/${id}/update-status?status=${status}`,
      { method:"POST" }
    );

    setMsg("Status updated");
    loadAppointments();
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div style={{display:"flex"}}>
      <Sidebar role={user.role} />
      <div style={{padding:30}}>
        <h2>Appointments</h2>

        {msg && <p>{msg}</p>}

        {appointments.length === 0 ? (
          <p>No Appointments Found</p>
        ) : (
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(a => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.patient.user.fullName}</td>
                  <td>{a.appointmentTime}</td>
                  <td>{a.issueDescription}</td>
                  <td>{a.status}</td>
                  <td>
                    <button onClick={()=>changeStatus(a.id,"CONFIRMED")}>Confirm</button>
                    <button onClick={()=>changeStatus(a.id,"COMPLETED")}>Complete</button>
                    <button onClick={()=>changeStatus(a.id,"CANCELLED")}>Cancel</button>
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
