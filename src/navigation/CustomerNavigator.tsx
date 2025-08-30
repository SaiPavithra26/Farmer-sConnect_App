import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { MainTabParamList, HomeStackParamList, ProductStackParamList, OrderStackParamList } from '@/src/types/navigation';

// Screens
import CustomerDashboard from '@/src/screens/customer/CustomerDashboard';
import ProductCatalog from '@/src/screens/customer/ProductCatalog';
import ProductDetailScreen from '@/src/screens/customer/ProductDetailScreen';
import CartScreen from '@/src/screens/customer/CartScreen';
import CheckoutScreen from '@/src/screens/customer/CheckoutScreen';
import OrderHistoryScreen from '@/src/screens/customer/OrderHistoryScreen';
import ChatListScreen from '@/src/screens/common/ChatListScreen';
import ChatScreen from '@/src/screens/common/ChatScreen';
import ProfileScreen from '@/src/screens/common/ProfileScreen';
import SettingsScreen from '@/src/screens/common/SettingsScreen';
import NotificationScreen from '@/src/screens/common/NotificationScreen';
import DeliveryTrackingScreen from '@/src/screens/common/DeliveryTrackingScreen';

// Icons
import { Home, Search, ShoppingCart, MessageCircle, User } from 'lucide-react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const ProductStack = createStackNavigator<ProductStackParamList>();
const OrderStack = createStackNavigator<OrderStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Dashboard" component={CustomerDashboard} />
      <HomeStack.Screen name="Notifications" component={NotificationScreen} />
      <HomeStack.Screen name="Settings" component={SettingsScreen} />
    </HomeStack.Navigator>
  );
}

function ProductStackNavigator() {
  return (
    <ProductStack.Navigator screenOptions={{ headerShown: false }}>
      <ProductStack.Screen name="ProductCatalog" component={ProductCatalog} />
      <ProductStack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </ProductStack.Navigator>
  );
}

function OrderStackNavigator() {
  return (
    <OrderStack.Navigator screenOptions={{ headerShown: false }}>
      <OrderStack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <OrderStack.Screen name="Cart" component={CartScreen} />
      <OrderStack.Screen name="Checkout" component={CheckoutScreen} />
      <OrderStack.Screen name="DeliveryTracking" component={DeliveryTrackingScreen} />
    </OrderStack.Navigator>
  );
}

export default function CustomerNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.gray[200],
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: fonts.primary.medium,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Products"
        component={ProductStackNavigator}
        options={{
          title: 'Marketplace',
          tabBarIcon: ({ size, color }) => (
            <Search size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          title: 'Orders',
          tabBarIcon: ({ size, color }) => (
            <ShoppingCart size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatListScreen}
        options={{
          title: 'Messages',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}