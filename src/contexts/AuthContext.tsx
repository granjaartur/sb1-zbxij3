import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/auth';
import { storage } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};