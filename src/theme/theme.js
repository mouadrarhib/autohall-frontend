// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e', // Pink
    },
    success: {
      main: '#4caf50', // Green
    },
    error: {
      main: '#f44336', // Red
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none', // Disable uppercase buttons
    },
  },
  shape: {
    borderRadius: 8, // Rounded corners
  },
});
