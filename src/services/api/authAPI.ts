import { apiClient } from "./apiClient";
import { ENDPOINTS } from "./config";
import { User } from "@/src/types/user";

interface LoginCredentials {
  emailOrPhone: string; // ✅ match backend
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string; // optional if backend supports
  role: "farmer" | "customer";
}

interface AuthResponse {
  user: User;
  token: string;
}


export class AuthAPI {
  
  // 🔑 LOGIN
  static async login(credentials: { email: string; password: string }) {
  const payload = {
    email: credentials.email,
    password: credentials.password,
  };

  console.log("🔍 LOGIN payload:", payload);  // <-- Debug log

  const response = await apiClient.post<AuthResponse>(
    ENDPOINTS.AUTH.LOGIN,
    payload
  );

  if (response.success && response.data?.token) {
    await apiClient.setToken(response.data.token);
  }

  console.log("✅ LOGIN response:", response); // <-- Debug response

  return response;
}




    // 📝 REGISTER
  static async register(userData: RegisterData) {
    const response = await apiClient.post<AuthResponse>(
      ENDPOINTS.AUTH.REGISTER,
      userData
    );

    if (response.success && response.data?.token) {
      await apiClient.setToken(response.data.token);
    }

    return response;
  }

  // 🚪 LOGOUT (local only, backend optional)
  static async logout() {
    await apiClient.clearToken();
    return { success: true, message: "Logged out locally" };
  }

  // 👤 GET CURRENT USER
  static async getCurrentUser() {
    return apiClient.get<User>(ENDPOINTS.AUTH.ME);
  }

  // 🔑 PASSWORD FLOW
  static async forgotPassword(email: string) {
    return apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  }

  static async resetPassword(token: string, newPassword: string) {
    return apiClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      newPassword,
    });
  }

  // 📩 OTP FLOW (only if your backend has this)
  static async verifyOTP(email: string, otp: string) {
    return apiClient.post(ENDPOINTS.AUTH.VERIFY_OTP, { email, otp });
  }

  // ✏️ PROFILE UPDATE
  static async updateProfile(userData: Partial<User>) {
    return apiClient.put<User>(ENDPOINTS.USERS.UPDATE_PROFILE, userData);
  }

  // 🔒 CHANGE PASSWORD
  static async changePassword(currentPassword: string, newPassword: string) {
    return apiClient.put(ENDPOINTS.USERS.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    });
  }
}

export default AuthAPI;
