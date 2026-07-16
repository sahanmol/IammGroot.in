import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import { Loader2 } from 'lucide-react';

/**
 * Route protection wrapper component.
 * Checks authentication status and redirects to login with historical state on access denial.
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <Loader2 className="spinner" style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)', marginBottom: '16px' }} size={32} />
        <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Verifying access authorization...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page and keep the referring page state
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};
export default ProtectedRoute;
