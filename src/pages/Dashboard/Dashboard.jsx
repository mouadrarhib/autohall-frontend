// src/pages/Dashboard/Dashboard.jsx
import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
} from '@mui/material';
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
} from '@mui/icons-material';
import { useAuthStore } from '../../stores/authStore';

export default function Dashboard() {
  const { user } = useAuthStore();

  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: <People sx={{ fontSize: 40 }} />,
      color: 'primary.main',
    },
    {
      title: 'Revenue',
      value: '$45,678',
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      color: 'success.main',
    },
    {
      title: 'Orders',
      value: '567',
      icon: <ShoppingCart sx={{ fontSize: 40 }} />,
      color: 'warning.main',
    },
    {
      title: 'Growth',
      value: '+23%',
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: 'error.main',
    },
  ];

  return (
    <Box>
      {/* Welcome Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.full_name}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your business today.
        </Typography>
      </Paper>

      {/* Stats Cards - Using Flexbox (No Grid warnings!) */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        {stats.map((stat, index) => (
          <Box
            key={index}
            sx={{
              flex: {
                xs: '1 1 100%',      // Full width on mobile
                sm: '1 1 calc(50% - 12px)',  // 2 columns on small screens
                md: '1 1 calc(25% - 18px)',  // 4 columns on medium+ screens
              },
              minWidth: 0,
            }}
          >
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start' 
                  }}
                >
                  <Box>
                    <Typography color="text.secondary" gutterBottom variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ color: stat.color }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
