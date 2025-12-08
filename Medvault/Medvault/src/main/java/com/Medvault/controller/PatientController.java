package com.Medvault.controller;

import com.Medvault.entity.Patient;
import com.Medvault.entity.User;
import com.Medvault.repository.PatientRepository;
import com.Medvault.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patient")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    private final PatientRepository patientRepo;
    private final UserRepository userRepo;

    public PatientController(PatientRepository patientRepo, UserRepository userRepo) {
        this.patientRepo = patientRepo;
        this.userRepo = userRepo;
    }

    @PostMapping("/create-profile/{userId}")
    public ResponseEntity<?> createProfile(@PathVariable Long userId) {

        User user = userRepo.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        Patient existing = patientRepo.findByUser_Id(userId);
        if (existing != null) {
            return ResponseEntity.ok("Patient profile already exists");
        }

        Patient patient = new Patient();
        patient.setUser(user);

        patientRepo.save(patient);

        return ResponseEntity.ok("Patient profile created");
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getProfile(@PathVariable Long userId) {
        Patient patient = patientRepo.findByUser_Id(userId);
        if (patient == null) {
            return ResponseEntity.badRequest().body("No profile found");
        }
        return ResponseEntity.ok(patient);
    }
}
