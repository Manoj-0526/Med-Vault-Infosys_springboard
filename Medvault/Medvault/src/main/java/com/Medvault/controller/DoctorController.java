package com.Medvault.controller;

import com.Medvault.dto.DoctorProfileRequest;
import com.Medvault.entity.Doctor;
import com.Medvault.entity.User;
import com.Medvault.repository.DoctorRepository;
import com.Medvault.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;

    public DoctorController(DoctorRepository doctorRepository, UserRepository userRepository) {
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/{userId}/create-profile")
    public ResponseEntity<?> createProfile(@PathVariable Long userId,
                                           @RequestBody DoctorProfileRequest req) {

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        Doctor doctor = new Doctor();
        doctor.setUser(user);
        doctor.setSpecialization(req.getSpecialization());
        doctor.setQualification(req.getQualification());
        // verificationStatus stays PENDING by default

        doctorRepository.save(doctor);

        return ResponseEntity.ok("Doctor profile created — Pending Admin Approval");
    }
}
