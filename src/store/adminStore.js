import { create } from 'zustand';

// Use environment variable VITE_API_URL or default to localhost:5000/api
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useAdminStore = create((set, get) => ({
  adminToken: localStorage.getItem('sattvashtha_admin_token') || null,
  adminUser: JSON.parse(localStorage.getItem('sattvashtha_admin_user')) || null,
  isAdminAuthenticated: !!localStorage.getItem('sattvashtha_admin_token'),
  isLoading: false,
  error: null,

  loginAdmin: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('sattvashtha_admin_token', data.token);
      localStorage.setItem('sattvashtha_admin_user', JSON.stringify(data.admin));

      set({
        adminToken: data.token,
        adminUser: data.admin,
        isAdminAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return { success: true };
    } catch (err) {
      console.error('Admin login error:', err.message);
      set({ isLoading: false, error: err.message });
      return { success: false, message: err.message };
    }
  },

  logoutAdmin: () => {
    localStorage.removeItem('sattvashtha_admin_token');
    localStorage.removeItem('sattvashtha_admin_user');
    set({
      adminToken: null,
      adminUser: null,
      isAdminAuthenticated: false,
      error: null,
    });
  },

  setupDefaultAdmin: async () => {
    try {
      const response = await fetch(`${API_URL}/admin/setup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Admin setup error:', err.message);
      return { success: false, message: err.message };
    }
  }
}));
