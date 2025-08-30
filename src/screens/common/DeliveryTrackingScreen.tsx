import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { io, Socket } from 'socket.io-client';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Header from '@/src/components/common/Header/Header';
import Card from '@/src/components/common/Card/Card';
import OrderTracking from '@/src/components/customer/OrderTracking/OrderTracking';
import { Phone, MessageCircle, MapPin, Clock, Navigation, RefreshCw } from 'lucide-react-native';
import { getApiConfig } from '@/src/services/api/config';

export default function DeliveryTrackingScreen() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();
  const mapRef = useRef<MapView>(null);
  const socketRef = useRef<Socket | null>(null);

  const [orderData] = useState({
    id: orderId as string || '1',
    status: 'shipped',
    customerName: 'Priya Sharma',
    farmerName: 'John Farmer',
    farmerPhone: '+91 98765 43210',
    products: [
      {
        name: 'Organic Tomatoes',
        quantity: 5,
        unit: 'kg',
        image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
    ],
    totalAmount: 450,
    deliveryAddress: {
      street: '123 MG Road',
      city: 'Koramangala',
      state: 'Bangalore',
      pincode: '560034',
      coordinates: {
        latitude: 12.9352,
        longitude: 77.6245,
      }
    },
    estimatedDelivery: '2025-01-22T18:00:00',
    trackingId: 'FC123456789',
  });

  // Real-time location tracking state
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [deliveryAgentLocation, setDeliveryAgentLocation] = useState({
    latitude: 12.9500,
    longitude: 77.5800,
  });

  const [routeCoordinates, setRouteCoordinates] = useState([
    { latitude: 12.9500, longitude: 77.5800 }, // Agent starting point
    { latitude: 12.9352, longitude: 77.6245 }, // Delivery destination
  ]);

  const [isTracking, setIsTracking] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState<any>(null);

  const [trackingSteps] = useState([
    {
      id: '1',
      title: 'Order Confirmed',
      description: 'Your order has been confirmed by the farmer',
      timestamp: '2025-01-20T10:30:00',
      isCompleted: true,
      isActive: false,
    },
    {
      id: '2',
      title: 'Order Prepared',
      description: 'Fresh produce is being prepared for delivery',
      timestamp: '2025-01-21T08:00:00',
      isCompleted: true,
      isActive: false,
    },
    {
      id: '3',
      title: 'Out for Delivery',
      description: 'Your order is on the way to your location',
      timestamp: '2025-01-22T14:00:00',
      isCompleted: true,
      isActive: true,
    },
    {
      id: '4',
      title: 'Delivered',
      description: 'Order delivered successfully',
      isCompleted: false,
      isActive: false,
    },
  ]);

  const [deliveryAgent] = useState({
    name: 'Delivery Partner',
    phone: '+91 87654 32109',
    image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=100',
    vehicle: 'Two Wheeler',
  });

  // Initialize location tracking and Socket.io
  useEffect(() => {
    initializeLocationTracking();
    initializeSocketConnection();

    return () => {
      // Cleanup
      if (locationSubscription) {
        locationSubscription.remove();
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Initialize location tracking
  const initializeLocationTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required for delivery tracking');
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  // Initialize Socket.io connection
  const initializeSocketConnection = () => {
    const { baseURL } = getApiConfig();
    const socketUrl = baseURL.replace('/api', ''); // Remove /api to get base URL

    socketRef.current = io(socketUrl, {
      transports: ['websocket'],
      upgrade: false,
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to delivery tracking server');
      socketRef.current?.emit('join-delivery-room', orderData.id);
    });

    socketRef.current.on('delivery-location-update', (data) => {
      if (data.orderId === orderData.id) {
        setDeliveryAgentLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });

        // Update route coordinates
        setRouteCoordinates(prev => [
          { latitude: data.latitude, longitude: data.longitude },
          prev[1] // Keep destination
        ]);
      }
    });

    socketRef.current.on('delivery-status-update', (data) => {
      if (data.orderId === orderData.id) {
        // Update order status in real-time
        console.log('Delivery status updated:', data.status);
      }
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from delivery tracking server');
    });
  };

  // Start/stop location tracking
  const toggleTracking = async () => {
    if (isTracking) {
      if (locationSubscription) {
        locationSubscription.remove();
        setLocationSubscription(null);
      }
      setIsTracking(false);
    } else {
      try {
        const subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000, // Update every 5 seconds
            distanceInterval: 10, // Update every 10 meters
          },
          (location) => {
            const newLocation = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };

            // Send location update to server
            if (socketRef.current) {
              socketRef.current.emit('update-delivery-location', {
                orderId: orderData.id,
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

  // Fit map to show both locations
  const fitMapToLocations = () => {
    if (mapRef.current) {
      const coordinates = [
        {
          latitude: deliveryAgentLocation.latitude,
          longitude: deliveryAgentLocation.longitude,
        },
        {
          latitude: orderData.deliveryAddress.coordinates.latitude,
          longitude: orderData.deliveryAddress.coordinates.longitude,
        },
      ];

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Track Delivery"
        showBackButton
        onBackPress={() => router.back()}
        subtitle={`Order #${orderData.id}`}
      />

      {/* Google Maps View */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={currentLocation}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={false}
          onMapReady={fitMapToLocations}
        >
          {/* Delivery Agent Marker */}
          <Marker
            coordinate={deliveryAgentLocation}
            title="Delivery Agent"
            description="Your delivery partner"
            pinColor="blue"
          />

          {/* Destination Marker */}
          <Marker
            coordinate={{
              latitude: orderData.deliveryAddress.coordinates.latitude,
              longitude: orderData.deliveryAddress.coordinates.longitude,
            }}
            title="Delivery Address"
            description={orderData.deliveryAddress.street}
            pinColor="red"
          />

          {/* Route Polyline */}
          <Polyline
            coordinates={routeCoordinates}
            strokeColor={colors.primary[600]}
            strokeWidth={3}
          />
        </MapView>

        {/* Map Controls */}
        <View style={styles.mapControls}>
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
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Live Status */}
        <Card style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusIcon}>
              <Clock size={24} color={colors.primary[600]} />
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>Out for Delivery</Text>
              <Text style={styles.statusSubtitle}>
                Expected delivery: Today 6:00 PM - 8:00 PM
              </Text>
            </View>
          </View>
          
          <View style={styles.deliveryProgress}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.progressText}>75% Complete</Text>
          </View>
        </Card>

        {/* Delivery Agent */}
        <Card style={styles.agentCard}>
          <Text style={styles.cardTitle}>Delivery Partner</Text>
          <View style={styles.agentInfo}>
            <Image source={{ uri: deliveryAgent.image }} style={styles.agentImage} />
            <View style={styles.agentDetails}>
              <Text style={styles.agentName}>{deliveryAgent.name}</Text>
              <Text style={styles.agentVehicle}>{deliveryAgent.vehicle}</Text>
            </View>
            
            <View style={styles.agentActions}>
              <TouchableOpacity style={styles.contactButton}>
                <Phone size={18} color={colors.primary[600]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton}>
                <MessageCircle size={18} color={colors.secondary[600]} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Order Details */}
        <Card style={styles.orderCard}>
          <Text style={styles.cardTitle}>Order Details</Text>
          
          {orderData.products.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productQuantity}>
                  {product.quantity} {product.unit}
                </Text>
              </View>
            </View>
          ))}
          
          <View style={styles.orderTotal}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>₹{orderData.totalAmount}</Text>
          </View>
        </Card>

        {/* Delivery Address */}
        <Card style={styles.addressCard}>
          <Text style={styles.cardTitle}>Delivery Address</Text>
          <View style={styles.addressInfo}>
            <MapPin size={20} color={colors.primary[600]} />
            <Text style={styles.addressText}>
              {orderData.deliveryAddress.street}, {orderData.deliveryAddress.city}, 
              {orderData.deliveryAddress.state} - {orderData.deliveryAddress.pincode}
            </Text>
          </View>
        </Card>

        {/* Tracking Timeline */}
        <OrderTracking 
          orderId={orderData.id}
          status={orderData.status}
          trackingSteps={trackingSteps}
          estimatedDelivery={orderData.estimatedDelivery}
        />

        {/* Contact Farmer */}
        <Card style={styles.contactCard}>
          <Text style={styles.cardTitle}>Contact Farmer</Text>
          <View style={styles.farmerInfo}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100' }} 
              style={styles.farmerImage} 
            />
            <View style={styles.farmerDetails}>
              <Text style={styles.farmerName}>{orderData.farmerName}</Text>
              <Text style={styles.farmerRole}>Farmer</Text>
            </View>
            
            <View style={styles.farmerActions}>
              <TouchableOpacity style={styles.contactButton}>
                <Phone size={18} color={colors.primary[600]} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton}>
                <MessageCircle size={18} color={colors.secondary[600]} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  mapContainer: {
    height: Dimensions.get('window').height * 0.4,
    margin: spacing.lg,
    marginBottom: spacing.md,
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
  mapControls: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    flexDirection: 'column',
    gap: spacing.sm,
  },
  controlButton: {
    backgroundColor: colors.primary[600],
    borderRadius: 25,
    width: 50,
    height: 50,
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
  content: {
    flex: 1,
  },
  statusCard: {
    margin: spacing.lg,
    marginBottom: spacing.md,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statusIcon: {
    backgroundColor: colors.primary[50],
    borderRadius: 20,
    padding: spacing.sm,
    marginRight: spacing.md,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.lg,
    color: colors.gray[800],
    marginBottom: spacing.xs,
  },
  statusSubtitle: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  deliveryProgress: {
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.gray[200],
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    width: '75%',
    height: '100%',
    backgroundColor: colors.primary[600],
    borderRadius: 4,
  },
  progressText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
    textAlign: 'center',
  },
  agentCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  cardTitle: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
    marginBottom: spacing.md,
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.md,
  },
  agentDetails: {
    flex: 1,
  },
  agentName: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
  },
  agentVehicle: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  agentActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  contactButton: {
    backgroundColor: colors.gray[100],
    borderRadius: 20,
    padding: spacing.sm,
  },
  orderCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: spacing.md,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
  },
  productQuantity: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: spacing.md,
  },
  totalLabel: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[700],
  },
  totalAmount: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.primary[600],
  },
  addressCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  addressInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.md,
    color: colors.gray[700],
    marginLeft: spacing.sm,
    lineHeight: 20,
    flex: 1,
  },
  contactCard: {
    margin: spacing.lg,
  },
  farmerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  farmerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.md,
  },
  farmerDetails: {
    flex: 1,
  },
  farmerName: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
  },
  farmerRole: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  farmerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});