import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { MainTabParamList, HomeStackParamList, ProductStackParamList } from '@/src/types/navigation';

// Screens
import FarmerDashboard from '@/src/screens/farmer/FarmerDashboard';
import MyProductsScreen from '@/src/screens/farmer/MyProductsScreen';
import AddProductScreen from '@/src/screens/farmer/AddProductScreen';
import OrderManagement from '@/src/screens/farmer/OrderManagement';
import ChatListScreen from '@/src/screens/common/ChatListScreen';
import ChatScreen from '@/src/screens/common/ChatScreen';
import ProfileScreen from '@/src/screens/common/ProfileScreen';
import SettingsScreen from '@/src/screens/common/SettingsScreen';
import NotificationScreen from '@/src/screens/common/NotificationScreen';
import FarmProfileScreen from '@/src/screens/farmer/FarmProfileScreen';

// Icons
import { Home, Package, ShoppingCart, MessageCircle, User } from 'lucide-react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const ProductStack = createStackNavigator<ProductStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Dashboard" component={FarmerDashboard} />
      <HomeStack.Screen name="Notifications" component={NotificationScreen} />
      <HomeStack.Screen name="Settings" component={SettingsScreen} />
    </HomeStack.Navigator>
  );
}

function ProductStackNavigator() {
  return (
    <ProductStack.Navigator screenOptions={{ headerShown: false }}>
      <ProductStack.Screen name="ProductList" component={MyProductsScreen} />
      <ProductStack.Screen name="AddProduct" component={AddProductScreen} />
      <ProductStack.Screen name="EditProduct" component={AddProductScreen} />
    </ProductStack.Navigator>
  );
}

export default function FarmerNavigator() {
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
          title: 'Dashboard',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Products"
        component={ProductStackNavigator}
        options={{
          title: 'Products',
          tabBarIcon: ({ size, color }) => (
            <Package size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Orders"
        component={OrderManagement}
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