import React from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutataions';
import { setToken } from '../utils/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Z_BEST_COMPRESSION } from 'node:zlib';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      setToken(data.login);
      console.log("hello chutiyo");
      
      navigate("/"); // Navigate to the home page after login
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (data: { username: string; password: string }) => {
    login({ variables: { username: data.username, password: data.password } });
  };

  return (
    <Container component="main" maxWidth="xs">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', marginTop: '1rem' }}>
            <TextField
              {...register('username')}
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ''}
            />
            <TextField
              {...register('password')}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>

          {/* Add Register Link here */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Don't have an account?{" "}
              <Button
                onClick={() => navigate("/signin")}
                variant="text"
                color="primary"
                sx={{ padding: 0 }}
              >
                Register
              </Button>
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Login;
