import { toast } from 'react-hot-toast';

interface ApiError extends Error {
  status?: number;
  data?: any;
}

interface ApiClientConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL;
    this.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    // Handle empty response
    const text = await response.text();
    if (!text) {
      return {} as T;
    }

    // Parse JSON response
    const data = JSON.parse(text);

    if (!response.ok) {
      const error = new Error(data.message || 'An error occurred') as ApiError;
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  }

  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        ...options,
        headers: {
          ...this.headers,
          ...options?.headers,
        },
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error(message);
      throw error;
    }
  }

  async get<T>(url: string): Promise<T> {
    return this.request<T>(url);
  }

  async post<T>(url: string, data: any): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(url: string, data: any): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(url: string): Promise<T> {
    return this.request<T>(url, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient({
  baseURL: '/api',
});