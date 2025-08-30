import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { RootState } from '@/src/store';
import { setOfflineStatus } from '@/src/store/slices/appSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OfflineData {
  products: any[];
  orders: any[];
  messages: any[];
  lastSyncTimestamp: string;
}

export function useOffline() {
  const dispatch = useDispatch();
  const { isOffline } = useSelector((state: RootState) => state.app);
  const [offlineData, setOfflineData] = useState<OfflineData | null>(null);

  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      const isCurrentlyOffline = !state.isConnected;
      dispatch(setOfflineStatus(isCurrentlyOffline));
      
      if (!isCurrentlyOffline && isOffline) {
        // Just came back online, sync data
        syncOfflineData();
      }
    });

    // Load offline data on mount
    loadOfflineData();

    return () => {
      unsubscribe();
    };
  }, []);

  const loadOfflineData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('offline_data');
      if (storedData) {
        setOfflineData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading offline data:', error);
    }
  };

  const saveOfflineData = async (data: Partial<OfflineData>) => {
    try {
      const currentData = offlineData || {
        products: [],
        orders: [],
        messages: [],
        lastSyncTimestamp: new Date().toISOString(),
      };

      const updatedData = {
        ...currentData,
        ...data,
        lastSyncTimestamp: new Date().toISOString(),
      };

      await AsyncStorage.setItem('offline_data', JSON.stringify(updatedData));
      setOfflineData(updatedData);
    } catch (error) {
      console.error('Error saving offline data:', error);
    }
  };

  const syncOfflineData = async () => {
    if (!offlineData) return;

    try {
      console.log('Syncing offline data...');
      
      // Sync pending actions (orders, messages, etc.)
      // This would involve sending queued API calls
      
      // Clear offline data after successful sync
      await AsyncStorage.removeItem('offline_data');
      setOfflineData(null);
      
      console.log('Offline data synced successfully');
    } catch (error) {
      console.error('Error syncing offline data:', error);
    }
  };

  const queueApiCall = async (apiCall: {
    endpoint: string;
    method: string;
    data?: any;
    id: string;
  }) => {
    try {
      const queueData = await AsyncStorage.getItem('api_queue');
      const queue = queueData ? JSON.parse(queueData) : [];
      
      queue.push({
        ...apiCall,
        timestamp: new Date().toISOString(),
      });

      await AsyncStorage.setItem('api_queue', JSON.stringify(queue));
    } catch (error) {
      console.error('Error queueing API call:', error);
    }
  };

  const processApiQueue = async () => {
    try {
      const queueData = await AsyncStorage.getItem('api_queue');
      if (!queueData) return;

      const queue = JSON.parse(queueData);
      
      for (const apiCall of queue) {
        try {
          // Process each queued API call
          console.log(`Processing queued API call: ${apiCall.endpoint}`);
          // await apiClient.request(apiCall.endpoint, { method: apiCall.method, body: apiCall.data });
        } catch (error) {
          console.error(`Failed to process queued API call ${apiCall.id}:`, error);
        }
      }

      // Clear queue after processing
      await AsyncStorage.removeItem('api_queue');
    } catch (error) {
      console.error('Error processing API queue:', error);
    }
  };

  const cacheData = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(`cache_${key}`, JSON.stringify({
        data,
        timestamp: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error caching data:', error);
    }
  };

  const getCachedData = async (key: string, maxAge: number = 3600000): Promise<any | null> => {
    try {
      const cachedData = await AsyncStorage.getItem(`cache_${key}`);
      if (!cachedData) return null;

      const { data, timestamp } = JSON.parse(cachedData);
      const age = Date.now() - new Date(timestamp).getTime();

      if (age > maxAge) {
        // Cache expired
        await AsyncStorage.removeItem(`cache_${key}`);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error getting cached data:', error);
      return null;
    }
  };

  const clearCache = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith('cache_'));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  };

  return {
    isOffline,
    offlineData,
    saveOfflineData,
    syncOfflineData,
    queueApiCall,
    processApiQueue,
    cacheData,
    getCachedData,
    clearCache,
  };
}

export default useOffline;