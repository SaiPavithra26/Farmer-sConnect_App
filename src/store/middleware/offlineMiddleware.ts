import { Middleware } from '@reduxjs/toolkit';
import AsyncStorageService from '@/src/services/storage/asyncStorage';
import { setOfflineStatus } from '@/src/store/slices/appSlice';

// Actions that should be queued when offline
const QUEUEABLE_ACTIONS = [
  'products/addProduct',
  'products/updateProduct',
  'orders/createOrder',
  'orders/updateOrderStatus',
  'chat/sendMessage',
  'auth/updateProfile',
];

// Actions that should be cached
const CACHEABLE_ACTIONS = [
  'products/setProducts',
  'orders/setOrders',
  'chat/setConversations',
  'auth/setUser',
];

export const offlineMiddleware: Middleware = (store) => (next) => async (action: any) => {
  const state = store.getState();
  const isOffline = state.app?.isOffline;

  // Handle queueable actions when offline
  if (isOffline && QUEUEABLE_ACTIONS.includes(action.type)) {
    try {
      // Queue the action for later execution
      await AsyncStorageService.addToQueue({
        type: action.type,
        payload: action.payload,
        timestamp: Date.now(),
      });

      // Still dispatch the action for optimistic updates
      return next(action);
    } catch (error) {
      // Silently handle queuing errors
      return next(action);
    }
  }

  // Cache important data when online
  if (!isOffline && CACHEABLE_ACTIONS.includes(action.type)) {
    try {
      await AsyncStorageService.setCachedData(
        action.type.replace('/', '_'),
        action.payload
      );
    } catch (error) {
      // Silently handle caching errors
    }
  }

  return next(action);
};

export default offlineMiddleware;