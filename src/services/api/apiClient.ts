import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ Direct config here or import from config.ts
const baseURL = "http://192.168.1.5:5000/api"; // change X.X to your LAN IP
const defaultTimeout = 15000; // 15s timeout

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
  }

  private async getHeaders(): Promise<HeadersInit> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const token = await AsyncStorage.getItem("auth_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;

    return headers;
  }

  async setToken(token: string) {
    await AsyncStorage.setItem("auth_token", token);
  }

  async clearToken() {
    await AsyncStorage.removeItem("auth_token");
  }

  async request<T = any>(
    endpoint: string,
    options: RequestInit = {},
    timeout = defaultTimeout
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
      const headers = await this.getHeaders();

      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout ?? 15000);

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(id);

      let responseData: any = {};
      try {
        responseData = await response.json();
      } catch {
        responseData = {};
      }

      if (response.status === 401) {
        await this.clearToken();
        return {
          success: false,
          message: responseData?.message || "Unauthorized. Please login again.",
        };
      }

      if (!response.ok) {
        return {
          success: false,
          message: responseData?.message || `HTTP ${response.status}`,
        };
      }

      return { success: true, data: responseData };
    } catch (error: any) {
      console.error("API Error:", error);
      return {
        success: false,
        message: error?.message || "Network error. Please check connection.",
      };
    }
  }

  get<T = any>(endpoint: string) {
    return this.request<T>(endpoint, { method: "GET" });
  }

  post<T = any>(endpoint: string, data?: any) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put<T = any>(endpoint: string, data?: any) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T = any>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient(baseURL);
