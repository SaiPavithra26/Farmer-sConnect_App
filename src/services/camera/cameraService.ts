import { CameraView } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export interface CameraOptions {
  allowsEditing?: boolean;
  aspect?: [number, number];
  quality?: number;
}

export interface ImageResult {
  uri: string;
  width: number;
  height: number;
  type?: string;
}

export class CameraService {
  static async requestPermission(): Promise<boolean> {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      return false;
    }
  }

  static async requestCameraPermission(): Promise<boolean> {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      return false;
    }
  }

  static async takePhoto(options: CameraOptions = {}): Promise<ImageResult | null> {
    try {
      const hasPermission = await this.requestCameraPermission();
      if (!hasPermission) {
        throw new Error('Camera permission not granted');
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: options.allowsEditing ?? true,
        aspect: options.aspect ?? [1, 1],
        quality: options.quality ?? 0.8,
      });

      if (result.canceled || !result.assets?.[0]) {
        return null;
      }

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type,
      };
    } catch (error) {
      console.error('Error taking photo:', error);
      throw error;
    }
  }

  static async pickImage(options: CameraOptions = {}): Promise<ImageResult | null> {
    try {
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        throw new Error('Media library permission not granted');
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: options.allowsEditing ?? true,
        aspect: options.aspect ?? [1, 1],
        quality: options.quality ?? 0.8,
      });

      if (result.canceled || !result.assets?.[0]) {
        return null;
      }

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type,
      };
    } catch (error) {
      console.error('Error picking image:', error);
      throw error;
    }
  }

  static async pickMultipleImages(options: CameraOptions = {}): Promise<ImageResult[]> {
    try {
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        throw new Error('Media library permission not granted');
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        allowsEditing: options.allowsEditing ?? false,
        quality: options.quality ?? 0.8,
      });

      if (result.canceled || !result.assets) {
        return [];
      }

      return result.assets.map(asset => ({
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type,
      }));
    } catch (error) {
      console.error('Error picking multiple images:', error);
      throw error;
    }
  }

  static async showImagePicker(options: CameraOptions = {}): Promise<ImageResult | null> {
    try {
      // Show action sheet to choose between camera and gallery
      // For now, we'll default to gallery
      return this.pickImage(options);
    } catch (error) {
      console.error('Error showing image picker:', error);
      throw error;
    }
  }

  static async resizeImage(
    uri: string, 
    targetWidth: number, 
    targetHeight: number
  ): Promise<string> {
    try {
      // Image manipulation would go here
      // For now, return the original URI
      return uri;
    } catch (error) {
      console.error('Error resizing image:', error);
      throw error;
    }
  }

  static async uploadImage(uri: string): Promise<string> {
    try {
      // Image upload logic would go here
      // This would typically upload to cloud storage like AWS S3, Cloudinary, etc.
      // For now, return the local URI
      return uri;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }
}

export default CameraService;