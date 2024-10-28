import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  auth: {
      username: localStorage.getItem('username') || '',
      active: !!localStorage.getItem('token'), // Check if a token exists
      token: localStorage.getItem('token'),
  },
  setUsername: (name) => set((state) => {
      localStorage.setItem('username', name); // Store username
      return {
        auth: { ...state.auth, username: name, active: true }
      };
  }),
  setToken: (token) => set((state) => {
      localStorage.setItem('token', token); // Store token
      return {
        auth: { ...state.auth, token: token }
      };
  }),
  logout: () => set((state) => {
      localStorage.removeItem('token'); // Remove token from localStorage
      localStorage.removeItem('username'); // Remove username from localStorage
      return {
        auth: { username: '', active: false, token: null }
      };
  }),
}));


export const useAdminStore = create((set) => ({
  admin: {
    email: '',
    isAuthenticated: !!localStorage.getItem('admin_token'), // Initialize based on token
  },
  loginAdmin: (email) => set({ admin: { email, isAuthenticated: true } }),
  logoutAdmin: () => {
    localStorage.removeItem('admin_token'); // Clear token on logout
    set({ admin: { email: '', isAuthenticated: false } });
  },
}));