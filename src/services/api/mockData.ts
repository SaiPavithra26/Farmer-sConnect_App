import { User } from '@/src/types/user';
import { Order } from '@/src/types/order';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'farmer@example.com',
    name: 'Rajesh Kumar',
    phone: '+91 9876543210',
    role: 'farmer',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      address: 'Delhi, India'
    },
    farmerProfile: {
      farmName: 'Green Valley Farms',
      farmSize: '50 acres',
      experience: '15 years',
      specialization: ['Rice', 'Wheat', 'Vegetables'],
      certifications: ['Organic Farming', 'GAP Certified'],
      bio: 'Passionate farmer committed to sustainable agriculture and providing fresh, organic produce to the community.'
    },
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    email: 'customer@example.com',
    name: 'Priya Sharma',
    phone: '+91 9876543211',
    role: 'customer',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      address: 'Delhi, India'
    },
    createdAt: '2023-02-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customerId: '2',
    farmerId: '1',
    products: [
      {
        productId: 'P001',
        productName: 'Organic Rice',
        productImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200',
        quantity: 5,
        price: 80,
        unit: 'kg'
      },
      {
        productId: 'P002',
        productName: 'Fresh Tomatoes',
        productImage: 'https://images.unsplash.com/photo-1546470427-e9e826f7d9e7?w=200',
        quantity: 2,
        price: 40,
        unit: 'kg'
      }
    ],
    totalAmount: 480,
    status: 'confirmed',
    paymentStatus: 'paid',
    deliveryAddress: {
      street: '123 Main Street, Connaught Place',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      coordinates: {
        latitude: 28.6139,
        longitude: 77.2090
      }
    },
    deliveryDate: '2024-01-25',
    notes: 'Please deliver in the evening',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-22T14:30:00Z'
  },
  {
    id: 'ORD002',
    customerId: '2',
    farmerId: '1',
    products: [
      {
        productId: 'P003',
        productName: 'Fresh Milk',
        productImage: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200',
        quantity: 2,
        price: 60,
        unit: 'liters'
      }
    ],
    totalAmount: 120,
    status: 'pending',
    paymentStatus: 'pending',
    deliveryAddress: {
      street: '456 Park Avenue, South Extension',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110049',
      coordinates: {
        latitude: 28.6139,
        longitude: 77.2090
      }
    },
    notes: 'Morning delivery preferred',
    createdAt: '2024-01-22T08:00:00Z',
    updatedAt: '2024-01-22T08:00:00Z'
  }
];

// Mock API responses
export const mockApiResponses = {
  login: (credentials: { email: string; password: string }) => {
    const user = mockUsers.find(u => u.email === credentials.email);
    if (user && credentials.password === 'password') {
      return {
        success: true,
        data: {
          user,
          token: 'mock-jwt-token-' + user.id
        }
      };
    }
    return {
      success: false,
      message: 'Invalid credentials'
    };
  },

  getCurrentUser: (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    return {
      success: true,
      data: user
    };
  },

  getOrders: (userId: string, role: 'farmer' | 'customer') => {
    const orders = role === 'farmer'
      ? mockOrders.filter(o => o.farmerId === userId)
      : mockOrders.filter(o => o.customerId === userId);

    return {
      success: true,
      data: orders
    };
  },

  updateOrderStatus: (orderId: string, status: Order['status']) => {
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      return {
        success: true,
        data: order
      };
    }
    return {
      success: false,
      message: 'Order not found'
    };
  },

  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockOrders.unshift(newOrder);
    return {
      success: true,
      data: newOrder
    };
  },

  getOrderById: (orderId: string) => {
    const order = mockOrders.find(o => o.id === orderId);
    return {
      success: !!order,
      data: order
    };
  }
};