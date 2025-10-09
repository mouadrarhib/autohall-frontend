// src/api/client.js
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import toast from 'react-hot-toast';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true, // ✅ CRITICAL: Send cookies with requests
});

// Request interceptor - No need to manually add token (cookies are automatic)
apiClient.interceptors.request.use(
  (config) => {
    // Cookies are sent automatically by browser
    // No need to add Authorization header
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle authentication errors
apiClient.interceptors.response.use(
  (response) => {
    // Backend returns { success: true, message: '', data: {} }
    if (response.data?.success) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const errorMessage = 
      error.response?.data?.error || 
      error.response?.data?.message || 
      'An error occurred';
    
    const statusCode = error.response?.status;

    // Handle 401 Unauthorized (Cookie expired or invalid)
    if (statusCode === 401) {
      const authStore = useAuthStore.getState();
      authStore.logout();
      
      toast.error('Session expired. Please login again.');
      window.location.href = '/login';
      
      return Promise.reject({
        message: 'Session expired',
        status: 401,
      });
    }

    // Handle other errors
    switch (statusCode) {
      case 403:
        toast.error('You do not have permission for this action');
        break;
      case 404:
        toast.error('Resource not found');
        break;
      case 409:
        toast.error(errorMessage);
        break;
      case 500:
        toast.error('Server error. Please try again later.');
        break;
      default:
        if (errorMessage) {
          toast.error(errorMessage);
        }
    }

    return Promise.reject({
      message: errorMessage,
      status: statusCode,
    });
  }
);

export default apiClient;
