package com.Medvault.controller;

import com.Medvault.entity.Doctor;
import com.Medvault.entity.VerificationStatus;
import com.Medvault.repository.DoctorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final DoctorRepository doctorRepository;

    public AdminController(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    // list all pending doctors
    @GetMapping("/doctors/pending")
    public List<Doctor> getPendingDoctors() {
        return doctorRepository.findByVerificationStatus(VerificationStatus.PENDING);
    }

    // approve doctor by USER ID
    @PostMapping("/doctors/user/{userId}/approve")
    public ResponseEntity<?> approveDoctorByUserId(@PathVariable Long userId) {
        var doctorOpt = doctorRepository.findByUser_Id(userId);
        if (doctorOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Doctor not found for this userId");
        }
        Doctor doctor = doctorOpt.get();
        doctor.setVerificationStatus(VerificationStatus.APPROVED);
        doctorRepository.save(doctor);
        return ResponseEntity.ok("Doctor approved");
    }

    // reject doctor by USER ID
    @PostMapping("/doctors/user/{userId}/reject")
    public ResponseEntity<?> rejectDoctorByUserId(@PathVariable Long userId) {
        var doctorOpt = doctorRepository.findByUser_Id(userId);
        if (doctorOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Doctor not found for this userId");
        }
        Doctor doctor = doctorOpt.get();
        doctor.setVerificationStatus(VerificationStatus.REJECTED);
        doctorRepository.save(doctor);
        return ResponseEntity.ok("Doctor rejected");
    }
}
