// src/utils/auth.js
export const isAuthenticated = () => {
  return localStorage.getItem('adminAuthenticated') === 'true';
};