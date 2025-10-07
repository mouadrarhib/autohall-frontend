// src/api/services/authService.js
import apiClient from '../client';

export const authService = {
  // POST /api/auth/register
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', {
      username: userData.username,
      email: userData.email,
      full_name: userData.full_name,
      password: userData.password,
      idUserSite: userData.idUserSite || null,
      actif: userData.actif ?? true,
    });
    return response.data; // { token, user, roles, permissions }
  },

  // POST /api/auth/login
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', {
      username: credentials.username,
      password: credentials.password,
    });
    return response.data; // { token, user }
  },

  // GET /api/auth/me
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // GET /api/auth/me/roles
  getCurrentUserRoles: async () => {
    const response = await apiClient.get('/auth/me/roles');
    return response.data;
  },

  // GET /api/auth/me/permissions
  getCurrentUserPermissions: async () => {
    const response = await apiClient.get('/auth/me/permissions');
    return response.data;
  },
};
