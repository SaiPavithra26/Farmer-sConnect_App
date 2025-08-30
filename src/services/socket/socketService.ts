import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;

  connect(userId: string, token: string) {
    if (this.socket) {
      this.disconnect();
    }

    this.socket = io(process.env.EXPO_PUBLIC_SOCKET_URL || 'ws://localhost:3001', {
      auth: {
        token,
        userId,
      },
      transports: ['websocket'],
      upgrade: true,
      rememberUpgrade: true,
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.isConnected = true;
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.isConnected = false;
    });

    this.socket.on('reconnect_attempt', (attemptNumber) => {
      this.reconnectAttempts = attemptNumber;
      console.log(`Reconnection attempt ${attemptNumber}`);
    });

    this.socket.on('reconnect_failed', () => {
      console.log('Failed to reconnect after maximum attempts');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Chat Events
  joinChatRoom(chatId: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('join_chat', { chatId });
    }
  }

  leaveChatRoom(chatId: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leave_chat', { chatId });
    }
  }

  sendMessage(chatId: string, message: any) {
    if (this.socket && this.isConnected) {
      this.socket.emit('send_message', { chatId, message });
    }
  }

  onNewMessage(callback: (message: any) => void) {
    if (this.socket) {
      this.socket.on('new_message', callback);
    }
  }

  onMessageRead(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('message_read', callback);
    }
  }

  onTyping(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('user_typing', callback);
    }
  }

  onStoppedTyping(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('user_stopped_typing', callback);
    }
  }

  emitTyping(chatId: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('typing', { chatId });
    }
  }

  emitStoppedTyping(chatId: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('stopped_typing', { chatId });
    }
  }

  // Order Events
  onOrderUpdate(callback: (order: any) => void) {
    if (this.socket) {
      this.socket.on('order_update', callback);
    }
  }

  onNewOrder(callback: (order: any) => void) {
    if (this.socket) {
      this.socket.on('new_order', callback);
    }
  }

  // Location Updates (for delivery tracking)
  onLocationUpdate(callback: (location: any) => void) {
    if (this.socket) {
      this.socket.on('location_update', callback);
    }
  }

  updateLocation(orderId: string, location: { latitude: number; longitude: number }) {
    if (this.socket && this.isConnected) {
      this.socket.emit('update_location', { orderId, location });
    }
  }

  // Notification Events
  onNotification(callback: (notification: any) => void) {
    if (this.socket) {
      this.socket.on('notification', callback);
    }
  }

  // General utility methods
  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }

  removeListener(event: string, callback?: any) {
    if (this.socket) {
      if (callback) {
        this.socket.off(event, callback);
      } else {
        this.socket.off(event);
      }
    }
  }
}

export const socketService = new SocketService();
export default SocketService;