import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, CircularProgress, Container, Link, TextField, Typography } from "@mui/material";
import gsap from "gsap";
import img from "./123.jpg";
import "../styles/RegisterPage.css";
import { message } from "antd";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);  // Reference for the container

  // Form submit handler
  const submitHandler = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      setLoading(true);
      await axios.post("/api/v1/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  // Prevent logged-in user from accessing register page
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  // Animation on mount
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      containerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );
  }, []);

  return (
    <Container 
      component="main" 
      maxWidth="md" 
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      ref={containerRef}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {loading && <CircularProgress />}
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Expense Management System - MERN STACK
        </Typography>
        <Box
          component="form"
          onSubmit={submitHandler}
          noValidate
          sx={{ mt: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%' }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2,
            }}
          >
            <img src={img} alt="register-img" style={{ borderRadius: '8px', width: '100%', maxWidth: '400px' }} />
          </Box>
          <Box sx={{ flex: 1, padding: 2 }}>
            <Typography component="h1" variant="h5">
              Register Form
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Link href="/login" variant="body2">
                Already registered? Login here!
              </Link>
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
