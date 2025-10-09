// src/stores/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      // State - NO TOKEN (stored in httpOnly cookie)
      user: null,
      roles: [],
      permissions: [],
      isAuthenticated: false,

      // Actions
      setAuth: (data) => {
        set({
          user: data.user,
          roles: data.roles || [],
          permissions: data.permissions || [],
          isAuthenticated: true,
        });
      },

      setUser: (user) => {
        set({ user });
      },

      setRoles: (roles) => {
        set({ roles });
      },

      setPermissions: (permissions) => {
        set({ permissions });
      },

      logout: () => {
        set({
          user: null,
          roles: [],
          permissions: [],
          isAuthenticated: false,
        });
      },

      // Helper to check if user has a specific permission
      hasPermission: (permission) => {
        const state = useAuthStore.getState();
        return state.permissions.includes(permission);
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        roles: state.roles,
        permissions: state.permissions,
        isAuthenticated: state.isAuthenticated,kkk
        // NO TOKEN in storage
      }),
    }
  )
);
