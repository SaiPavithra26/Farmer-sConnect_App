import { useState, useEffect } from 'react';
import LocationService, { LocationCoords, LocationAddress } from '@/src/services/location/locationService';

export function useLocation() {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [address, setAddress] = useState<LocationAddress | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const coords = await LocationService.getCurrentLocation();
      if (coords) {
        setLocation(coords);
        
        // Get address for the coordinates
        const addressData = await LocationService.reverseGeocode(coords);
        if (addressData) {
          setAddress(addressData);
        }
        
        return { success: true, location: coords, address: addressData };
      } else {
        const errorMessage = 'Could not get location';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Location error';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getAddressFromCoords = async (coords: LocationCoords) => {
    try {
      setLoading(true);
      setError(null);
      
      const addressData = await LocationService.reverseGeocode(coords);
      if (addressData) {
        setAddress(addressData);
        return { success: true, address: addressData };
      } else {
        const errorMessage = 'Could not get address';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Geocoding error';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getCoordsFromAddress = async (addressString: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const coords = await LocationService.geocode(addressString);
      if (coords) {
        setLocation(coords);
        return { success: true, location: coords };
      } else {
        const errorMessage = 'Could not find location';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Geocoding error';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (point1: LocationCoords, point2: LocationCoords): number => {
    return LocationService.calculateDistance(point1, point2);
  };

  const watchLocation = (
    callback: (location: LocationCoords) => void,
    errorCallback?: (error: string) => void
  ) => {
    return LocationService.watchPosition(callback, errorCallback);
  };

  return {
    location,
    address,
    loading,
    error,
    getCurrentLocation,
    getAddressFromCoords,
    getCoordsFromAddress,
    calculateDistance,
    watchLocation,
  };
}

export default useLocation;