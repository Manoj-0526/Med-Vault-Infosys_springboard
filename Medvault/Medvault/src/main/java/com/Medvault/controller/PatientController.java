package com.Medvault.controller;

import com.Medvault.dto.PatientProfileRequest;
import com.Medvault.entity.Patient;
import com.Medvault.entity.User;
import com.Medvault.repository.PatientRepository;
import com.Medvault.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patient")
public class PatientController {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public PatientController(PatientRepository patientRepository, UserRepository userRepository) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/{userId}/create-profile")
    public ResponseEntity<?> createProfile(@PathVariable Long userId,
                                           @RequestBody PatientProfileRequest req) {

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        Patient patient = new Patient();
        patient.setUser(user);
        patient.setDob(req.getDob());
        patient.setGender(req.getGender());
        patient.setBloodGroup(req.getBloodGroup());

        patientRepository.save(patient);

        return ResponseEntity.ok("Patient profile created");
    }
}
