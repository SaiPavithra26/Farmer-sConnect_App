import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '@/src/types/navigation';
import LoginScreen from '@/src/screens/auth/LoginScreen';
import RegisterScreen from '@/src/screens/auth/RegisterScreen';
import ForgotPasswordScreen from '@/src/screens/auth/ForgotPasswordScreen';
import OTPVerificationScreen from '@/src/screens/auth/OTPVerificationScreen';

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      
    </Stack.Navigator>
  );
}