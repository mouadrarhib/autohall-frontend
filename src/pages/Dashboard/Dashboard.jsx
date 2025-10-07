// src/pages/Dashboard/Dashboard.jsx
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person,
  Settings,
  ExitToApp,
} from '@mui/icons-material';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Dashboard
          </Typography>
          <Button
            variant="contained"
            color="error"
            startIcon={<ExitToApp />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>

        {/* Welcome Card */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Welcome, {user?.full_name || 'User'}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            You are logged in as <strong>{user?.username}</strong>
          </Typography>
        </Paper>

        {/* Stats Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <div>
                    <Typography variant="h6">Username</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.username}
                    </Typography>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Settings sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
                  <div>
                    <Typography variant="h6">Email</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user?.email}
                    </Typography>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
