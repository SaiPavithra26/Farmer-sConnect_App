import { apiClient } from './apiClient';
import { Order, OrderItem } from '@/src/types/order';

interface CreateOrderData {
  products: OrderItem[];
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  deliveryDate?: string;
  notes?: string;
}

export class OrderAPI {
  static async createOrder(orderData: CreateOrderData) {
    return apiClient.post<Order>('/orders', orderData);
  }

  static async getMyOrders(status?: string) {
    const endpoint = status ? `/orders/my-orders?status=${status}` : '/orders/my-orders';
    return apiClient.get<Order[]>(endpoint);
  }

  static async getFarmerOrders(status?: string) {
    const endpoint = status ? `/orders/farmer-orders?status=${status}` : '/orders/farmer-orders';
    return apiClient.get<Order[]>(endpoint);
  }

  static async getOrder(id: string) {
    return apiClient.get<Order>(`/orders/${id}`);
  }

  static async updateOrderStatus(id: string, status: string) {
    return apiClient.put<Order>(`/orders/${id}/status`, { status });
  }

  static async acceptOrder(id: string) {
    return apiClient.put<Order>(`/orders/${id}/accept`);
  }

  static async rejectOrder(id: string, reason?: string) {
    return apiClient.put<Order>(`/orders/${id}/reject`, { reason });
  }

  static async markAsShipped(id: string, trackingInfo?: any) {
    return apiClient.put<Order>(`/orders/${id}/shipped`, { trackingInfo });
  }

  static async markAsDelivered(id: string) {
    return apiClient.put<Order>(`/orders/${id}/delivered`);
  }

  static async cancelOrder(id: string, reason: string) {
    return apiClient.put<Order>(`/orders/${id}/cancel`, { reason });
  }

  static async trackOrder(id: string) {
    return apiClient.get<any>(`/orders/${id}/tracking`);
  }

  static async getOrderAnalytics(farmerId?: string) {
    const endpoint = farmerId ? `/orders/analytics?farmerId=${farmerId}` : '/orders/analytics';
    return apiClient.get<any>(endpoint);
  }

  static async rateOrder(orderId: string, rating: number, review?: string) {
    return apiClient.post(`/orders/${orderId}/rating`, { rating, review });
  }
}

export default OrderAPI;