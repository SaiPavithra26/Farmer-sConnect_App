// API Configuration for different environments
export const API_CONFIG = {
  development: {
    baseURL: "http://localhost:5000/api",
    timeout: 10000,
  },
  staging: {
    baseURL: "https://api-staging.farmersconnect.com/api",
    timeout: 15000,
  },
  production: {
    baseURL: "https://api.farmersconnect.com/api",
    timeout: 20000,
  },
};

// Get current environment
export const getCurrentEnvironment = (): keyof typeof API_CONFIG => {
  return __DEV__ ? "development" : "production";
};

// Get current API config
// config.ts
export const getApiConfig = () => ({
  baseURL: "http://192.168.1.5:5000/api", // replace with your actual IP
  timeout: 15000,
});


// Backend API Endpoints
export const ENDPOINTS = {
  // 🔑 Authentication
  AUTH: {
    LOGIN: "/auth/login",               
    REGISTER: "/auth/register",         
    LOGOUT: "/auth/logout",             
    ME: "/auth/me",                     
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",  
    VERIFY_OTP: "/auth/verify-otp",          
    REFRESH_TOKEN: "/auth/refresh-token",    
  },

  // 👤 Users
  USERS: {
    PROFILE: "/users/profile",               
    UPDATE_PROFILE: "/users/profile",        
    CHANGE_PASSWORD: "/users/change-password", 
  },

  // 📦 Products
  PRODUCTS: {
    LIST: "/products",                    // GET
    CREATE: "/products",                  // POST
    DETAILS: (id: string) => `/products/${id}`, // GET
    UPDATE: (id: string) => `/products/${id}`, // PUT
    DELETE: (id: string) => `/products/${id}`, // DELETE
  },

  // 📑 Orders
  ORDERS: {
    LIST: "/orders",                        // GET
    CREATE: "/orders",                      // POST
    DETAILS: (id: string) => `/orders/${id}`, // GET
    UPDATE: (id: string) => `/orders/${id}`, // PUT
    CANCEL: (id: string) => `/orders/${id}/cancel`, // PUT
  },

  // 🏷️ Categories
  CATEGORIES: {
    LIST: "/categories",
  },

  // 👨‍🌾 Farmers
  FARMERS: {
    PROFILE: "/farmers/profile",
    PRODUCTS: "/farmers/products",
    ORDERS: "/farmers/orders",
  },

  // 🛒 Customers
  CUSTOMERS: {
    ORDERS: "/customers/orders",
    FAVORITES: "/customers/favorites",
  },
};
