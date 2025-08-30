import { apiClient } from './apiClient';
import { ENDPOINTS } from './config';
import { User } from '@/src/types/user';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'farmer' | 'customer';
}

interface AuthResponse {
  user: User;
  token: string;
}

export class AuthAPI {
  static async login(credentials: LoginCredentials) {
    const response = await apiClient.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, credentials);

    if (response.success && response.data) {
      await apiClient.setToken(response.data.token);
    }

    return response;
  }

  static async register(userData: RegisterData) {
    const response = await apiClient.post<AuthResponse>(ENDPOINTS.AUTH.REGISTER, userData);

    if (response.success && response.data) {
      await apiClient.setToken(response.data.token);
    }

    return response;
  }

  static async logout() {
    const response = await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
    await apiClient.clearToken();
    return response;
  }

  static async getCurrentUser() {
    return apiClient.get<User>(ENDPOINTS.AUTH.ME);
  }

  static async forgotPassword(email: string) {
    return apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  }

  static async resetPassword(token: string, newPassword: string) {
    return apiClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword });
  }

  static async verifyOTP(email: string, otp: string) {
    return apiClient.post(ENDPOINTS.AUTH.VERIFY_OTP, { email, otp });
  }

  static async updateProfile(userData: Partial<User>) {
    return apiClient.put<User>(ENDPOINTS.USERS.UPDATE_PROFILE, userData);
  }

  static async changePassword(currentPassword: string, newPassword: string) {
    return apiClient.put(ENDPOINTS.USERS.CHANGE_PASSWORD, {
      currentPassword,
      newPassword
    });
  }
}

export default AuthAPI;