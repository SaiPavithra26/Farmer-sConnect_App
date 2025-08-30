export interface Order {
  id: string;
  customerId: string;
  farmerId: string;
  products: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'prepared' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
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
  deliveryDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  unit: string;
}