import { LoginCredentials, AuthResponse } from '../../types/auth';
import { api } from '../api';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return api.post<AuthResponse>('/api/auth/login', credentials);
  },
};