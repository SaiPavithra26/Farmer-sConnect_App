import * as Location from 'expo-location';
import * as Camera from 'expo-camera';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

export type Permission = 'location' | 'camera' | 'notifications' | 'photos';

export interface PermissionResult {
  granted: boolean;
  canAskAgain?: boolean;
}

export class PermissionService {
  static async requestLocationPermission(): Promise<PermissionResult> {
    try {
      const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      return {
        granted: status === 'granted',
        canAskAgain,
      };
    } catch (error) {
      // Silently handle location permission errors
      return { granted: false };
    }
  }

  static async requestCameraPermission(): Promise<PermissionResult> {
    try {
      // For newer Expo Camera versions, we need to use a different approach
      // This method should be called from within a React component that can use hooks
      // For now, we'll return a placeholder that indicates the method needs to be updated
      return { granted: false, canAskAgain: true };
    } catch (error) {
      // Silently handle camera permission errors
      return { granted: false };
    }
  }

  static async requestNotificationPermission(): Promise<PermissionResult> {
    try {
      const { status, canAskAgain } = await Notifications.requestPermissionsAsync();
      return {
        granted: status === 'granted',
        canAskAgain,
      };
    } catch (error) {
      // Silently handle notification permission errors
      return { granted: false };
    }
  }

  static async checkPermission(type: Permission): Promise<boolean> {
    try {
      switch (type) {
        case 'location':
          const locationStatus = await Location.getForegroundPermissionsAsync();
          return locationStatus.status === 'granted';
          
        case 'camera':
          // For newer Expo Camera versions, camera permissions need to be checked differently
          // This is a placeholder - actual implementation should use hooks in components
          return false;
          
        case 'notifications':
          const notificationStatus = await Notifications.getPermissionsAsync();
          return notificationStatus.status === 'granted';
          
        default:
          return false;
      }
    } catch (error) {
      // Silently handle permission checking errors
      return false;
    }
  }

  static async requestPermission(type: Permission): Promise<PermissionResult> {
    switch (type) {
      case 'location':
        return this.requestLocationPermission();
      case 'camera':
        return this.requestCameraPermission();
      case 'notifications':
        return this.requestNotificationPermission();
      default:
        return { granted: false };
    }
  }

  static async requestPermissionWithFallback(
    type: Permission,
    onDenied?: () => void
  ): Promise<boolean> {
    const result = await this.requestPermission(type);
    
    if (!result.granted) {
      const permissionName = type.charAt(0).toUpperCase() + type.slice(1);
      
      Alert.alert(
        `${permissionName} Permission Required`,
        `This app needs ${type} permission to function properly. Please enable it in your device settings.`,
        [
          { text: 'Cancel', onPress: onDenied },
          { 
            text: 'Settings', 
            onPress: () => {
              // Open app settings (implementation would depend on platform)
              onDenied?.();
            }
          }
        ]
      );
    }
    
    return result.granted;
  }

  static async requestMultiplePermissions(
    types: Permission[]
  ): Promise<Record<Permission, boolean>> {
    const results: Record<Permission, boolean> = {} as any;
    
    for (const type of types) {
      const result = await this.requestPermission(type);
      results[type] = result.granted;
    }
    
    return results;
  }
}

export default PermissionService;