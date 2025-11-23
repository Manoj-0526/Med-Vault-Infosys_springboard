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

      const text = await res.text();

      if (!res.ok) {
        setMessage(text || "Login failed");
        setLoading(false);
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        setMessage("Unexpected response from server");
        setLoading(false);
        return;
      }

      // Check if selected role matches actual role from backend
      if (data.role && data.role !== selectedRole) {
        setMessage(
          `Looks like you selected wrong role.`
        );
        setLoading(false);
        return;
      }

      setMessage(data.message || "Login successful");

      // store user info for dashboards
      localStorage.setItem("medvaultUser", JSON.stringify(data));

      // redirect by role
      if (data.role === "PATIENT") {
        navigate("/patient/profile");
      } else if (data.role === "DOCTOR") {
        navigate("/doctor/profile");
      } else if (data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setMessage("Cannot reach backend");
    } finally {
      setLoading(false);
    }
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
          select
          fullWidth
          label="Role"
          margin="normal"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
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
          sx={{ mt: 2 }}
          disabled={loading}
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
