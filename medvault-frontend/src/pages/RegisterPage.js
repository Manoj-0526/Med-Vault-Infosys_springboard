// src/pages/RegisterPage.js

import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "PATIENT",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error when typing
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    // Email format check
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email (example@mail.com)";
      valid = false;
    }

    // Phone: only digits, length 10
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      newErrors.phone = "Mobile number must be 10 digits";
      valid = false;
    }

    // Password length: 8-30 characters
    if (form.password.length < 8 || form.password.length > 30) {
      newErrors.password = "Password must be between 8 and 30 characters";
      valid = false;
    }

    // Confirm password check
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // front-end validation before calling backend
    if (!validate()) {
      setMessage("Please fix the highlighted errors.");
      return;
    }

    setMessage("Registering...");

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await res.text(); // backend returns plain text

      if (!res.ok) {
        setMessage("Error: " + text);
        return;
      }

      setMessage(text || "Registration successful ✔");

      // Redirect to login after short delay
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage("Server error (cannot reach backend)");
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "50px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Create Account
      </Typography>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Full Name"
          name="fullName"
          margin="normal"
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          value={form.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
        />

        <TextField
          fullWidth
          label="Phone"
          name="phone"
          margin="normal"
          value={form.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone || "Enter 10-digit mobile number"}
          required
        />

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Password"
          name="password"
          margin="normal"
          value={form.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          type={showConfirmPassword ? "text" : "password"}
          label="Confirm Password"
          name="confirmPassword"
          margin="normal"
          value={form.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          fullWidth
          name="role"
          label="Role"
          margin="normal"
          value={form.role}
          onChange={handleChange}
        >
          <MenuItem value="PATIENT">Patient</MenuItem>
          <MenuItem value="DOCTOR">Doctor</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </TextField>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Register
        </Button>
      </Box>

      <Typography style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <Link href="/login" underline="hover">
          Login
        </Link>
      </Typography>
    </Container>
  );
}
