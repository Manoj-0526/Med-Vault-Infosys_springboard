package com.Medvault.controller;

import java.util.HashMap;
import java.util.Map;

import com.Medvault.dto.RegisterRequest;
import com.Medvault.dto.LoginRequest;
import com.Medvault.entity.Role;
import com.Medvault.entity.User;
import com.Medvault.entity.Patient;
import com.Medvault.entity.Doctor;
import com.Medvault.repository.UserRepository;
import com.Medvault.repository.PatientRepository;
import com.Medvault.repository.DoctorRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PatientRepository patientRepo;
    private final DoctorRepository doctorRepo;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          PatientRepository patientRepo,
                          DoctorRepository doctorRepo) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.patientRepo = patientRepo;
        this.doctorRepo = doctorRepo;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {

        if (userRepository.existsByEmail(req.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        if (!req.getPassword().equals(req.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match");
        }

        User user = new User();
        user.setFullName(req.getFullName());
        user.setEmail(req.getEmail());
        user.setPhone(req.getPhone());
        user.setRole(Role.valueOf(req.getRole()));
        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));

        userRepository.save(user);

        return ResponseEntity.ok("Registration successful");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        var userOptional = userRepository.findByEmail(req.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Email not found");
        }

        var user = userOptional.get();

        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            return ResponseEntity.badRequest().body("Incorrect password");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("userId", user.getId());
        response.put("fullName", user.getFullName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole().toString());

        // Return Patient table ID for patient users
        if (user.getRole().toString().equals("PATIENT")) {
            Patient patient = patientRepo.findByUser_Id(user.getId()) ;//.orElse(null);

            if (patient != null) {
                response.put("patientId", patient.getId());
            }
        }

        // Return Doctor table ID for doctor users
        if (user.getRole().toString().equals("DOCTOR")) {
            Doctor doctor = doctorRepo.findByUser_Id(user.getId()).orElse(null);

            if (doctor != null) {
                response.put("doctorId", doctor.getId());
            }
        }

        return ResponseEntity.ok(response);
    }

}
