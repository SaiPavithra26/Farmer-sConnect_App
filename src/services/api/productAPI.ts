import { apiClient } from './apiClient';
import { Product } from '@/src/types/product';

interface CreateProductData {
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

export class ProductAPI {
  static async getProducts(params?: {
    category?: string;
    location?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params?.category) queryParams.append('category', params.category);
    if (params?.location) queryParams.append('location', params.location);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const endpoint = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiClient.get<Product[]>(endpoint);
  }

  static async getProduct(id: string) {
    return apiClient.get<Product>(`/products/${id}`);
  }

  static async getMyProducts() {
    return apiClient.get<Product[]>('/products/my-products');
  }

  static async createProduct(productData: CreateProductData) {
    return apiClient.post<Product>('/products', productData);
  }

  static async updateProduct(id: string, productData: Partial<CreateProductData>) {
    return apiClient.put<Product>(`/products/${id}`, productData);
  }

  static async deleteProduct(id: string) {
    return apiClient.delete(`/products/${id}`);
  }

  static async getFeaturedProducts() {
    return apiClient.get<Product[]>('/products/featured');
  }

  static async getProductsByFarmer(farmerId: string) {
    return apiClient.get<Product[]>(`/products/farmer/${farmerId}`);
  }

  static async searchProducts(query: string, filters?: {
    category?: string;
    priceMin?: number;
    priceMax?: number;
    isOrganic?: boolean;
    location?: string;
  }) {
    return apiClient.post<Product[]>('/products/search', { query, filters });
  }

  static async getProductCategories() {
    return apiClient.get<{ id: string; name: string; icon: string }[]>('/products/categories');
  }

  static async rateProduct(productId: string, rating: number, review?: string) {
    return apiClient.post(`/products/${productId}/rating`, { rating, review });
  }

  static async uploadProductImages(images: string[]) {
    // This would handle image upload to cloud storage
    return apiClient.post<string[]>('/products/upload-images', { images });
  }
}

export default ProductAPI;