// API Configuration for different environments
export const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
  },
  staging: {
    baseURL: 'https://api-staging.farmersconnect.com/api',
    timeout: 15000,
  },
  production: {
    baseURL: 'https://api.farmersconnect.com/api',
    timeout: 20000,
  },
};

// Get current environment
export const getCurrentEnvironment = (): keyof typeof API_CONFIG => {
  // You can use react-native-config or other environment detection
  // For now, we'll use __DEV__ flag
  return __DEV__ ? 'development' : 'production';
};

// Get current API config
export const getApiConfig = () => {
  const env = getCurrentEnvironment();
  return API_CONFIG[env];
};

// Backend API Endpoints
export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_OTP: '/auth/verify-otp',
    REFRESH_TOKEN: '/auth/refresh-token',
  },

  // Users
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
  },

  // Orders
  ORDERS: {
    LIST: '/orders',
    CREATE: '/orders',
    DETAILS: (id: string) => `/orders/${id}`,
    UPDATE: (id: string) => `/orders/${id}`,
    CANCEL: (id: string) => `/orders/${id}/cancel`,
  },

  // Products
  PRODUCTS: {
    LIST: '/products',
    CREATE: '/products',
    DETAILS: (id: string) => `/products/${id}`,
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
  },

  // Categories
  CATEGORIES: {
    LIST: '/categories',
  },

  // Farmers
  FARMERS: {
    PROFILE: '/farmers/profile',
    PRODUCTS: '/farmers/products',
    ORDERS: '/farmers/orders',
  },

  // Customers
  CUSTOMERS: {
    ORDERS: '/customers/orders',
    FAVORITES: '/customers/favorites',
  },
};