// src/pages/Profile/Profile.jsx
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  Divider,
  Chip,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  Email as EmailIcon,
  Person as PersonIcon,
  Badge as BadgeIcon,
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useAuthStore } from '../../stores/authStore';
import { authService } from '../../api/services/authService';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      
      // Fetch current user data
      const userData = await authService.getCurrentUser();
      setProfileData(userData);

      // Fetch roles
      const rolesData = await authService.getCurrentUserRoles();
      setRoles(rolesData);

      // Fetch permissions
      const permissionsData = await authService.getCurrentUserPermissions();
      setPermissions(permissionsData);

    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Profile Header Card */}
      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: 'primary.main',
                fontSize: '3rem',
              }}
            >
              {user?.full_name?.charAt(0) || 'U'}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              {user?.full_name || 'User Name'}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              @{user?.username}
            </Typography>
            <Box sx={{ mt: 2 }}>
              {user?.actif ? (
                <Chip
                  icon={<CheckCircleIcon />}
                  label="Active"
                  color="success"
                  size="small"
                />
              ) : (
                <Chip
                  icon={<CancelIcon />}
                  label="Inactive"
                  color="error"
                  size="small"
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1 }} /> Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemText
                    primary="Full Name"
                    secondary={user?.full_name || 'N/A'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Username"
                    secondary={user?.username || 'N/A'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Email Address"
                    secondary={user?.email || 'N/A'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="User ID"
                    secondary={user?.id || 'N/A'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Status"
                    secondary={user?.actif ? 'Active' : 'Inactive'}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Roles */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <BadgeIcon sx={{ mr: 1 }} /> Roles
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {roles && roles.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {roles.map((role, index) => (
                    <Chip
                      key={index}
                      label={role.name || role}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No roles assigned
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Permissions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <SecurityIcon sx={{ mr: 1 }} /> Permissions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {permissions && permissions.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {permissions.map((permission, index) => (
                    <Chip
                      key={index}
                      label={permission.name || permission}
                      color="secondary"
                      size="small"
                    />
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No permissions assigned
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={fetchProfileData}>
              Refresh Data
            </Button>
            <Button variant="contained" color="primary">
              Edit Profile
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
