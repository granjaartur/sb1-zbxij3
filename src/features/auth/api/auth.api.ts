import { LoginCredentials, AuthResponse } from '../types/auth.types';
import { api } from '../../../utils/api';

export const authApi = {
  login: (credentials: LoginCredentials): Promise<AuthResponse> => {
    return api.post('/auth/login', credentials);
  },
  
  logout: (): void => {
    // Add any cleanup API calls if needed
  }
};