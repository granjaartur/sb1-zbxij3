import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from './useAuth';
import { authApi } from '../api/auth.api';
import type { LoginCredentials } from '../types/auth.types';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await authApi.login(credentials);
      
      if (!response.token || !response.user) {
        throw new Error('Invalid response from server');
      }

      login(response.token, response.user);
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
};