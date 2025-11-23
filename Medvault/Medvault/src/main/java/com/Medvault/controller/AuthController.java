package com.Medvault.controller;
import java.util.HashMap;
import java.util.Map;
import com.Medvault.dto.RegisterRequest;
import com.Medvault.entity.Role;
import com.Medvault.entity.User;
import com.Medvault.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.Medvault.dto.LoginRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
        user.setRole(Role.valueOf(req.getRole())); // PATIENT / DOCTOR
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
        response.put("name", user.getFullName());
        response.put("role", user.getRole().toString());

        return ResponseEntity.ok(response);
    }

}