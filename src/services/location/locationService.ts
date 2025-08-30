import * as Location from 'expo-location';

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

export interface LocationAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  formattedAddress: string;
}

export class LocationService {
  static async requestPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }

  static async getCurrentLocation(): Promise<LocationCoords | null> {
    try {
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        throw new Error('Location permission not granted');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }

  static async reverseGeocode(coords: LocationCoords): Promise<LocationAddress | null> {
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      if (result.length > 0) {
        const location = result[0];
        return {
          street: location.street || '',
          city: location.city || '',
          state: location.region || '',
          country: location.country || '',
          postalCode: location.postalCode || '',
          formattedAddress: `${location.street}, ${location.city}, ${location.region}`,
        };
      }

      return null;
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return null;
    }
  }

  static async geocode(address: string): Promise<LocationCoords | null> {
    try {
      const result = await Location.geocodeAsync(address);
      
      if (result.length > 0) {
        return {
          latitude: result[0].latitude,
          longitude: result[0].longitude,
        };
      }

      return null;
    } catch (error) {
      console.error('Error geocoding address:', error);
      return null;
    }
  }

  static calculateDistance(point1: LocationCoords, point2: LocationCoords): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(point2.latitude - point1.latitude);
    const dLon = this.toRadians(point2.longitude - point1.longitude);

    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(point1.latitude)) * Math.cos(this.toRadians(point2.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  static async watchPosition(
    callback: (location: LocationCoords) => void,
    errorCallback?: (error: string) => void
  ): Promise<() => void> {
    try {
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        errorCallback?.('Location permission not granted');
        return () => {};
      }

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          callback({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      );

      return () => subscription.remove();
    } catch (error) {
      console.error('Error watching position:', error);
      errorCallback?.(error instanceof Error ? error.message : 'Unknown error');
      return () => {};
    }
  }
}

export default LocationService;