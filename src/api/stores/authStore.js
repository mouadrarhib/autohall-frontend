// src/stores/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      roles: [],
      permissions: [],
      isAuthenticated: false,

      // Actions
      setAuth: (data) => {
        // Store token in localStorage for axios interceptor
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        
        set({
          user: data.user,
          token: data.token,
          roles: data.roles || [],
          permissions: data.permissions || [],
          isAuthenticated: true,
        });
      },

      setPermissions: (permissions) => {
        set({ permissions });
      },

      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          token: null,
          roles: [],
          permissions: [],
          isAuthenticated: false,
        });
      },

      // Helper to check if user has a specific permission
      hasPermission: (permission) => {
        const state = get();
        return state.permissions.includes(permission);
      },
    }),
    {
      name: 'auth-storage', // Key in localStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        roles: state.roles,
        permissions: state.permissions,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
