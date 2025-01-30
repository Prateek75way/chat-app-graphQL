import React from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../graphql/mutataions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ✅ Validation Schema using Yup
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Register: React.FC = () => {
  const navigate = useNavigate();

  // ✅ React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Signup Mutation
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      console.log("Signup successful:", data);
      navigate("/login"); // Redirect to login page after successful signup
    },
    onError: (err) => {
      console.error("Signup error:", err);
    },
  });

  const onSubmit = (data: { username: string; password: string }) => {
    signup({ variables: { username: data.username, password: data.password } });
  };

  return (
    <Container component="main" maxWidth="xs">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", marginTop: "1rem" }}>
            <TextField
              {...register("username")}
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ""}
            />
            <TextField
              {...register("password")}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error.message}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? "Signing up..." : "Register"}
            </Button>
          </form>

          {/* Add Login Link here */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Already have an account?{" "}
              <Button
                onClick={() => navigate("/login")}
                variant="text"
                color="primary"
                sx={{ padding: 0 }}
              >
                Login
              </Button>
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Register;
