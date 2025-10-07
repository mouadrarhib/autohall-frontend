// src/api/client.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - Add JWT token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle backend response format
apiClient.interceptors.response.use(
  (response) => {
    // Backend returns { success: true, message: '', data: {} }
    if (response.data?.success) {
      return response.data; // Return only the data
    }
    return response;
  },
  (error) => {
    // Backend returns { success: false, error: 'message' }
    const errorMessage = 
      error.response?.data?.error || 
      error.response?.data?.message || 
      'An error occurred';
    
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
    });
  }
);

export default apiClient;
