import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('adminUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(true);
  const [setupRequired, setSetupRequired] = useState(false);

  // Checks if the database is brand new and requires registration of a primary admin
  const checkSetupStatus = async () => {
    try {
      const res = await api.get('/auth/setup-status');
      setSetupRequired(res.data.setupRequired);
    } catch (err) {
      console.error('Error fetching admin setup status:', err);
    }
  };

  // Re-validates active session and loads complete user info
  const checkSession = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await api.get('/auth/me');
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem('adminUser', JSON.stringify(res.data.user));
      }
    } catch (err) {
      console.error('Session validation failed. Logging out.', err.message);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSetupStatus();
    checkSession();
  }, [token]);

  const handleLogin = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        const { token: userToken, user: userData } = res.data;
        localStorage.setItem('adminToken', userToken);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        setToken(userToken);
        setUser(userData);
        setSetupRequired(false);
        return { success: true };
      }
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      if (res.data.success) {
        const { token: userToken, user: userData } = res.data;
        localStorage.setItem('adminToken', userToken);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        setToken(userToken);
        setUser(userData);
        setSetupRequired(false);
        return { success: true };
      }
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setToken(null);
    setUser(null);
    checkSetupStatus();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        setupRequired,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        checkSetupStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
