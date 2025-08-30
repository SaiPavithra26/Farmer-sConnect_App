import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageService {
  // Generic methods
  static async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error setting item in AsyncStorage:', error);
      throw error;
    }
  }

  static async getItem<T = any>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error getting item from AsyncStorage:', error);
      return null;
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from AsyncStorage:', error);
      throw error;
    }
  }

  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      throw error;
    }
  }

  static async getAllKeys(): Promise<string[]> {
    try {
  const keys = await AsyncStorage.getAllKeys();
  return [...keys]; // ✅ makes it mutable
} catch (error) {
  console.error('Error getting all keys from AsyncStorage:', error);
  return [];
}
  }

  static async multiSet(keyValuePairs: [string, any][]): Promise<void> {
    try {
      const stringifiedPairs: [string, string][] = keyValuePairs.map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);
      await AsyncStorage.multiSet(stringifiedPairs);
    } catch (error) {
      console.error('Error setting multiple items in AsyncStorage:', error);
      throw error;
    }
  }

  static async multiGet<T = any>(keys: string[]): Promise<Record<string, T | null>> {
    try {
      const keyValuePairs = await AsyncStorage.multiGet(keys);
      const result: Record<string, T | null> = {};
      
      keyValuePairs.forEach(([key, value]) => {
        result[key] = value ? JSON.parse(value) : null;
      });
      
      return result;
    } catch (error) {
      console.error('Error getting multiple items from AsyncStorage:', error);
      return {};
    }
  }

  static async multiRemove(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error removing multiple items from AsyncStorage:', error);
      throw error;
    }
  }

  // App-specific methods
  static async setUserData(user: any): Promise<void> {
    await this.setItem('user_data', user);
  }

  static async getUserData(): Promise<any | null> {
    return this.getItem('user_data');
  }

  static async setAuthToken(token: string): Promise<void> {
    await this.setItem('auth_token', token);
  }

  static async getAuthToken(): Promise<string | null> {
    return this.getItem<string>('auth_token');
  }

  static async removeAuthToken(): Promise<void> {
    await this.removeItem('auth_token');
  }

  static async setAppSettings(settings: any): Promise<void> {
    await this.setItem('app_settings', settings);
  }

  static async getAppSettings(): Promise<any | null> {
    return this.getItem('app_settings');
  }

  static async setCachedData(key: string, data: any, ttl?: number): Promise<void> {
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl: ttl || 3600000, // 1 hour default
    };
    await this.setItem(`cache_${key}`, cacheData);
  }

  static async getCachedData<T = any>(key: string): Promise<T | null> {
    try {
      const cacheData = await this.getItem<{
        data: T;
        timestamp: number;
        ttl: number;
      }>(`cache_${key}`);

      if (!cacheData) return null;

      const isExpired = Date.now() - cacheData.timestamp > cacheData.ttl;
      if (isExpired) {
        await this.removeItem(`cache_${key}`);
        return null;
      }

      return cacheData.data;
    } catch (error) {
      console.error('Error getting cached data:', error);
      return null;
    }
  }

  static async clearCache(): Promise<void> {
    try {
      const keys = await this.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith('cache_'));
      await this.multiRemove(cacheKeys);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  static async setOfflineData(data: any): Promise<void> {
    await this.setItem('offline_data', data);
  }

  static async getOfflineData(): Promise<any | null> {
    return this.getItem('offline_data');
  }

  static async addToQueue(action: any): Promise<void> {
    try {
      const queue = await this.getItem<any[]>('action_queue') || [];
      queue.push({
        ...action,
        timestamp: Date.now(),
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      });
      await this.setItem('action_queue', queue);
    } catch (error) {
      console.error('Error adding to queue:', error);
    }
  }

  static async getQueue(): Promise<any[]> {
  return (await this.getItem<any[]>('action_queue')) ?? [];
}
  static async clearQueue(): Promise<void> {
    await this.removeItem('action_queue');
  }
}

export default AsyncStorageService;