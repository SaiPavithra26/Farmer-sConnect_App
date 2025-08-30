import { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { socketService } from '@/src/services/socket/socketService';

export function useSocket() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const isConnected = useRef(false);

  useEffect(() => {
    if (isAuthenticated && user && !isConnected.current) {
      // Connect to socket when user is authenticated
      const token = 'mock_token'; // In real app, get from secure storage
      socketService.connect(user.id, token);
      isConnected.current = true;
    }

    return () => {
      if (isConnected.current) {
        socketService.disconnect();
        isConnected.current = false;
      }
    };
  }, [isAuthenticated, user]);

  const joinChatRoom = useCallback((chatId: string) => {
    socketService.joinChatRoom(chatId);
  }, []);

  const leaveChatRoom = useCallback((chatId: string) => {
    socketService.leaveChatRoom(chatId);
  }, []);

  const sendMessage = useCallback((chatId: string, message: any) => {
    socketService.sendMessage(chatId, message);
  }, []);

  const onNewMessage = useCallback((callback: (message: any) => void) => {
    socketService.onNewMessage(callback);
    
    return () => {
      socketService.removeListener('new_message', callback);
    };
  }, []);

  const onOrderUpdate = useCallback((callback: (order: any) => void) => {
    socketService.onOrderUpdate(callback);
    
    return () => {
      socketService.removeListener('order_update', callback);
    };
  }, []);

  const onNewOrder = useCallback((callback: (order: any) => void) => {
    socketService.onNewOrder(callback);
    
    return () => {
      socketService.removeListener('new_order', callback);
    };
  }, []);

  const onNotification = useCallback((callback: (notification: any) => void) => {
    socketService.onNotification(callback);
    
    return () => {
      socketService.removeListener('notification', callback);
    };
  }, []);

  const emitTyping = useCallback((chatId: string) => {
    socketService.emitTyping(chatId);
  }, []);

  const emitStoppedTyping = useCallback((chatId: string) => {
    socketService.emitStoppedTyping(chatId);
  }, []);

  const updateLocation = useCallback((orderId: string, location: { latitude: number; longitude: number }) => {
    socketService.updateLocation(orderId, location);
  }, []);

  const getConnectionStatus = useCallback(() => {
    return socketService.getConnectionStatus();
  }, []);

  return {
    isConnected: isConnected.current,
    joinChatRoom,
    leaveChatRoom,
    sendMessage,
    onNewMessage,
    onOrderUpdate,
    onNewOrder,
    onNotification,
    emitTyping,
    emitStoppedTyping,
    updateLocation,
    getConnectionStatus,
  };
}

export default useSocket;