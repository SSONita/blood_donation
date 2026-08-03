// Shared token/session helpers used across features (auth, navbar, etc.)

import { jwtDecode } from 'jwt-decode';

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

// Returns { token, user } where `user` is the full profile saved at login
// (first_name, last_name, email, ...), or null if there's no valid session.
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      logout();
      return null;
    }
    const user = getStoredUser() || decoded;
    return { token, user };
  } catch (err) {
    console.error('Token decode error:', err);
    return null;
  }
};
