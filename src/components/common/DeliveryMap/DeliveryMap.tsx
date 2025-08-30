import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { io, Socket } from 'socket.io-client';
import { colors } from '@/src/styles/colors';
import { spacing } from '@/src/styles/spacing';
import { Navigation, RefreshCw, Phone } from 'lucide-react-native';
import { getApiConfig } from '@/src/services/api/config';

interface DeliveryMapProps {
  orderId: string;
  destination: {
    latitude: number;
    longitude: number;
    address: string;
  };
  deliveryAgent?: {
    name: string;
    phone: string;
    image: string;
  };
  height?: number;
  showControls?: boolean;
  onCallAgent?: () => void;
}

export default function DeliveryMap({
  orderId,
  destination,
  deliveryAgent,
  height = 200,
  showControls = true,
  onCallAgent
}: DeliveryMapProps) {
  const mapRef = useRef<MapView>(null);
  const socketRef = useRef<Socket | null>(null);

  const [currentLocation, setCurrentLocation] = useState({
    latitude: destination.latitude,
    longitude: destination.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [deliveryAgentLocation, setDeliveryAgentLocation] = useState({
    latitude: destination.latitude - 0.005,
    longitude: destination.longitude - 0.005,
  });

  const [routeCoordinates, setRouteCoordinates] = useState([
    { latitude: deliveryAgentLocation.latitude, longitude: deliveryAgentLocation.longitude },
    { latitude: destination.latitude, longitude: destination.longitude },
  ]);

  const [isTracking, setIsTracking] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState<any>(null);

  useEffect(() => {
    initializeSocketConnection();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const initializeSocketConnection = () => {
    const { baseURL } = getApiConfig();
    const socketUrl = baseURL.replace('/api', '');

    socketRef.current = io(socketUrl, {
      transports: ['websocket'],
      upgrade: false,
    });

    socketRef.current.on('connect', () => {
      socketRef.current?.emit('join-delivery-room', orderId);
    });

    socketRef.current.on('delivery-location-update', (data) => {
      if (data.orderId === orderId) {
        setDeliveryAgentLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });

        setRouteCoordinates(prev => [
          { latitude: data.latitude, longitude: data.longitude },
          prev[1]
        ]);
      }
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from delivery tracking server');
    });
  };

  const toggleTracking = async () => {
    if (isTracking) {
      if (locationSubscription) {
        locationSubscription.remove();
        setLocationSubscription(null);
      }
      setIsTracking(false);
    } else {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location permission is required for delivery tracking');
          return;
        }

        const subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 10000,
            distanceInterval: 50,
          },
          (location) => {
            const newLocation = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };

            if (socketRef.current) {
              socketRef.current.emit('update-delivery-location', {
                orderId,
                latitude: newLocation.latitude,
                longitude: newLocation.longitude,
              });
            }
          }
        );

        setLocationSubscription(subscription);
        setIsTracking(true);
      } catch (error) {
        console.error('Error starting location tracking:', error);
        Alert.alert('Error', 'Failed to start location tracking');
      }
    }
  };

  const fitMapToLocations = () => {
    if (mapRef.current) {
      const coordinates = [
        {
          latitude: deliveryAgentLocation.latitude,
          longitude: deliveryAgentLocation.longitude,
        },
        {
          latitude: destination.latitude,
          longitude: destination.longitude,
        },
      ];

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  return (
    <View style={[styles.container, { height }]}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={currentLocation}
        showsUserLocation={true}
        showsMyLocationButton={false}
        followsUserLocation={false}
      >
        {/* Delivery Agent Marker */}
        <Marker
          coordinate={deliveryAgentLocation}
          title={deliveryAgent?.name || "Delivery Agent"}
          description="Your delivery partner"
          pinColor="blue"
        />

        {/* Destination Marker */}
        <Marker
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
          }}
          title="Delivery Address"
          description={destination.address}
          pinColor="red"
        />

        {/* Route Polyline */}
        <Polyline
          coordinates={routeCoordinates}
          strokeColor={colors.primary[600]}
          strokeWidth={3}
        />
      </MapView>

      {showControls && (
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={fitMapToLocations}
          >
            <Navigation size={20} color={colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, isTracking && styles.trackingActive]}
            onPress={toggleTracking}
          >
            <RefreshCw size={20} color={colors.white} />
          </TouchableOpacity>

          {deliveryAgent && onCallAgent && (
            <TouchableOpacity
              style={[styles.controlButton, styles.callButton]}
              onPress={onCallAgent}
            >
              <Phone size={20} color={colors.white} />
            </TouchableOpacity>
          )}
        </View>
      )}

      {isTracking && (
        <View style={styles.trackingIndicator}>
          <Text style={styles.trackingText}>Live Tracking Active</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  map: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    flexDirection: 'column',
    gap: spacing.sm,
  },
  controlButton: {
    backgroundColor: colors.primary[600],
    borderRadius: 25,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  trackingActive: {
    backgroundColor: colors.success[600],
  },
  callButton: {
    backgroundColor: colors.secondary[600],
  },
  trackingIndicator: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.success[600],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  trackingText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});