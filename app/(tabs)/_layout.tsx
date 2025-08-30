import { Tabs } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { colors } from '@/src/styles/colors';
import { Home, Package, ShoppingCart, MessageCircle, User } from 'lucide-react-native';

export default function TabLayout() {
  const { user } = useSelector((state: RootState) => state.auth);
  const isFarmer = user?.role === 'farmer';

  return (
    <Tabs
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
          fontFamily: 'Inter-Medium',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      
      {isFarmer ? (
        <Tabs.Screen
          name="my-products"
          options={{
            title: 'Products',
            tabBarIcon: ({ size, color }) => (
              <Package size={size} color={color} />
            ),
          }}
        />
      ) : (
        <Tabs.Screen
          name="marketplace"
          options={{
            title: 'Marketplace',
            tabBarIcon: ({ size, color }) => (
              <ShoppingCart size={size} color={color} />
            ),
          }}
        />
      )}

      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ size, color }) => (
            <Package size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: 'Messages',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}