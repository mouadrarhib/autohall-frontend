// src/components/auth/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  // Check if user is authenticated (cookie is checked automatically by backend)
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
