// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("PATIENT");

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        setMessage(errorText || "Login failed");
        setLoading(false);
        return;
      }

      const data = await res.json();

      // validate role
      if (data.role !== selectedRole) {
        setMessage("Selected role does not match your account role.");
        setLoading(false);
        return;
      }

      setMessage("Login successful ✔");

      // Save basic user info
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email);
      localStorage.setItem("fullName", data.fullName);

      localStorage.setItem("medvaultUser", JSON.stringify(data));

      // IF PATIENT — fetch actual patient table ID and store it
      if (data.role === "PATIENT") {
        try {
          const res2 = await fetch(`http://localhost:8080/api/patient/by-user/${data.userId}`);
          
          if (res2.ok) {
            const patient = await res2.json();
            localStorage.setItem("patientId", patient.id);
            console.log("Stored patientId:", patient.id);
          }
        } catch (err) {
          console.log("Cannot fetch patient profile.");
        }
      }

      // REDIRECT based on role
      if (data.role === "PATIENT") navigate("/patient/profile");
      else if (data.role === "DOCTOR") navigate("/doctor/profile");
      else if (data.role === "ADMIN") navigate("/admin");
      else navigate("/");

    } catch (err) {
      setMessage("Cannot reach backend ❌");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom color="primary">
        MedVault Login
      </Typography>

      {message && (
        <Typography sx={{ mt: 1 }} color="error">
          {message}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          fullWidth
          label="Role"
          margin="normal"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          required
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
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Box>

      <Typography sx={{ mt: 2 }}>
        Don’t have an account?{" "}
        <Link component={RouterLink} to="/register" underline="hover">
          Register
        </Link>
      </Typography>
    </Container>
  );
}
