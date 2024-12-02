import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../utils/storage';
import type { User, AuthContextType } from '../types/auth.types';
import { authApi } from '../api/auth.api';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = storage.getUser();
    return storedUser ? storedUser : null;
  });
  const navigate = useNavigate();

  const login = (token: string, user: User) => {
    storage.setToken(token);
    storage.setUser(user);
    setUser(user);
  };

  const logout = () => {
    authApi.logout();
    storage.clearAuth();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};