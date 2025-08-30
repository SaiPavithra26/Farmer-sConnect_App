import * as SecureStore from 'expo-secure-store';

export class SecureStorageService {
  static async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error setting secure item:', error);
      throw error;
    }
  }

  static async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Error getting secure item:', error);
      return null;
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing secure item:', error);
      throw error;
    }
  }

  static async setObject(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await this.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error setting secure object:', error);
      throw error;
    }
  }

  static async getObject<T = any>(key: string): Promise<T | null> {
    try {
      const jsonValue = await this.getItem(key);
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error getting secure object:', error);
      return null;
    }
  }

  // App-specific secure storage methods
  static async setAuthToken(token: string): Promise<void> {
    await this.setItem('auth_token', token);
  }

  static async getAuthToken(): Promise<string | null> {
    return this.getItem('auth_token');
  }

  static async removeAuthToken(): Promise<void> {
    await this.removeItem('auth_token');
  }

  static async setRefreshToken(token: string): Promise<void> {
    await this.setItem('refresh_token', token);
  }

  static async getRefreshToken(): Promise<string | null> {
    return this.getItem('refresh_token');
  }

  static async removeRefreshToken(): Promise<void> {
    await this.removeItem('refresh_token');
  }

  static async setBiometricKey(key: string): Promise<void> {
    await this.setItem('biometric_key', key);
  }

  static async getBiometricKey(): Promise<string | null> {
    return this.getItem('biometric_key');
  }

  static async setUserCredentials(credentials: {
    email: string;
    encryptedPassword: string;
  }): Promise<void> {
    await this.setObject('user_credentials', credentials);
  }

  static async getUserCredentials(): Promise<{
    email: string;
    encryptedPassword: string;
  } | null> {
    return this.getObject('user_credentials');
  }

  static async removeUserCredentials(): Promise<void> {
    await this.removeItem('user_credentials');
  }

  static async setDeviceId(deviceId: string): Promise<void> {
    await this.setItem('device_id', deviceId);
  }

  static async getDeviceId(): Promise<string | null> {
    return this.getItem('device_id');
  }

  static async setPushToken(token: string): Promise<void> {
    await this.setItem('push_token', token);
  }

  static async getPushToken(): Promise<string | null> {
    return this.getItem('push_token');
  }

  static async setEncryptionKey(key: string): Promise<void> {
    await this.setItem('encryption_key', key);
  }

  static async getEncryptionKey(): Promise<string | null> {
    return this.getItem('encryption_key');
  }

  static async clearAllSecureData(): Promise<void> {
    const secureKeys = [
      'auth_token',
      'refresh_token',
      'biometric_key',
      'user_credentials',
      'push_token',
      'encryption_key',
    ];

    await Promise.all(
      secureKeys.map(key => this.removeItem(key))
    );
  }
}

export default SecureStorageService;