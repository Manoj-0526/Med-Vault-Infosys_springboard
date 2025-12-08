package com.Medvault.controller;

import com.Medvault.dto.AppointmentRequest;
import com.Medvault.entity.*;
import com.Medvault.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

    private final AppointmentRepository appointmentRepo;
    private final PatientRepository patientRepo;
    private final DoctorRepository doctorRepo;

    public AppointmentController(AppointmentRepository appointmentRepo,
                                 PatientRepository patientRepo,
                                 DoctorRepository doctorRepo) {
        this.appointmentRepo = appointmentRepo;
        this.patientRepo = patientRepo;
        this.doctorRepo = doctorRepo;
    }

    @PostMapping("/book")
    public ResponseEntity<?> book(@RequestBody AppointmentRequest req) {

        Patient patient = patientRepo.findById(req.getPatientId()).orElse(null);

        if (patient == null) {
            return ResponseEntity.badRequest().body("Patient not found");
        }


        Doctor doctor = doctorRepo.findById(req.getDoctorId()).orElse(null);
        if (doctor == null) {
            return ResponseEntity.badRequest().body("Doctor not found");
        }

        Appointment appt = new Appointment();
        appt.setPatient(patient);
        appt.setDoctor(doctor);
        appt.setIssueDescription(req.getIssueDescription());
        appt.setAppointmentTime(req.getAppointmentTime());
        appt.setStatus(AppointmentStatus.PENDING);

        appointmentRepo.save(appt);

        return ResponseEntity.ok("Appointment Booked");
    }
}
