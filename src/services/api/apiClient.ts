import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiConfig } from './config';

const { baseURL, timeout } = getApiConfig();

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.loadToken();
  }

  private async loadToken() {
    try {
      this.token = await AsyncStorage.getItem('auth_token');
    } catch (error) {
      // Silently handle token loading errors
    }
  }

  private async getHeaders(): Promise<HeadersInit> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  async setToken(token: string) {
    this.token = token;
    try {
      await AsyncStorage.setItem('auth_token', token);
    } catch (error) {
      // Silently handle token saving errors
    }
  }

  async clearToken() {
    this.token = null;
    try {
      await AsyncStorage.removeItem('auth_token');
    } catch (error) {
      // Silently handle token removal errors
    }
  }

  async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers = await this.getHeaders();

      const response = await fetch(url, {
        headers,
        ...options,
      });

      // Handle different response status codes
      if (response.status === 401) {
        // Token expired or invalid
        await this.clearToken();
        return {
          success: false,
          error: 'Authentication failed. Please login again.',
          message: 'Token expired'
        };
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API Request Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred',
        message: 'Please check your internet connection and try again'
      };
    }
  }

  async get<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(baseURL);
export default ApiClient;