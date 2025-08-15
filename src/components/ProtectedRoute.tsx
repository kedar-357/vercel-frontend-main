import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, isInitialized, checkAuthStatus } = useAuth();

  useEffect(() => {
    // Double-check authentication status when component mounts
    if (isInitialized && !isAuthenticated) {
      checkAuthStatus();
    }
  }, [isInitialized, isAuthenticated, checkAuthStatus]);

  // Show loading while authentication state is being determined
  if (!isInitialized) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute; 