import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import AuthNavigator from './AuthNavigator';
import FarmerNavigator from './FarmerNavigator';
import CustomerNavigator from './CustomerNavigator';
import { RootStackParamList } from '@/src/types/navigation';
import { AppStackParamList } from '@/src/navigation/navigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : user?.role === 'farmer' ? (
          <Stack.Screen name="Main" component={FarmerNavigator} />
        ) : (
          <Stack.Screen name="Main" component={CustomerNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}