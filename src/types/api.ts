
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  field?: string;
  details?: Record<string, any>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams extends PaginationParams {
  query?: string;
  filters?: Record<string, any>;
}

export interface LocationParams {
  latitude?: number;
  longitude?: number;
  radius?: number;
  address?: string;
  city?: string;
  state?: string;
}

export interface DateRangeParams {
  startDate?: string;
  endDate?: string;
}

// Authentication API types
export interface LoginRequest {
  email: string;
  password: string;
  deviceId?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'farmer' | 'customer';
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export interface AuthResponse {
  user: any; // User type from user.ts
  token: string;
  refreshToken?: string;
}

// Product API types
export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  images: string[];
  stock: number;
  isOrganic: boolean;
  harvestDate: string;
  tags: string[];
}

export interface ProductSearchParams extends SearchParams {
  category?: string;
  isOrganic?: boolean;
  priceMin?: number;
  priceMax?: number;
  location?: LocationParams;
  harvestDateRange?: DateRangeParams;
}

// Order API types
export interface CreateOrderRequest {
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  paymentMethod: string;
  deliveryDate?: string;
  notes?: string;
}

export interface OrderSearchParams extends SearchParams {
  status?: string;
  farmerId?: string;
  customerId?: string;
  dateRange?: DateRangeParams;
}

// Chat API types
export interface SendMessageRequest {
  chatId: string;
  text: string;
  type?: 'text' | 'image' | 'file';
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
}

export interface CreateChatRequest {
  participants: string[];
  type?: 'direct' | 'group';
  title?: string;
}

// Upload types
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

export interface FileUploadRequest {
  file: any; // File object
  folder?: string;
  public?: boolean;
}