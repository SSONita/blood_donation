import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { getToken, setToken, getStoredUser, setStoredUser, logout as clearSession } from '../../../lib/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setTokenState] = useState(getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const userData = getStoredUser();
      if (userData) {
        setCurrentUser(userData);
      } else {
        logout();
      }
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      const { token: newToken, user } = response.data;

      setToken(newToken);
      setStoredUser(user);

      setTokenState(newToken);
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await authService.register(userData);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearSession();
    setTokenState(null);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
