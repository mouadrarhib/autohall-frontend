// src/pages/Auth/Login.jsx
import { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Alert,
  CircularProgress,
} from '@mui/material';
import { authService } from '../../api/services/authService';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login(formData);
      setAuth({
        token: response.token,
        user: response.user,
        roles: response.roles || [],
        permissions: response.permissions || [],
      });

      try {
        const permissions = await authService.getCurrentUserPermissions();
        useAuthStore.getState().setPermissions(permissions);
      } catch (err) {
        console.warn('Failed to fetch permissions:', err);
      }

      toast.success('Login successful!');
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Login to Autohall
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {/* Username Field */}
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              disabled={isLoading}
              margin="normal"
              autoComplete="username"
              autoFocus
            />

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              disabled={isLoading}
              margin="normal"
              autoComplete="current-password"
            />

            {/* Submit Error Alert */}
            {errors.submit && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errors.submit}
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Login'}
            </Button>

            {/* Register Link */}
            <Typography align="center" variant="body2">
              Don't have an account?{' '}
              <Link component={RouterLink} to="/register" underline="hover">
                Register here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
