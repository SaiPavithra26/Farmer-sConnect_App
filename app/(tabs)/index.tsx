import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import FarmerDashboard from '@/src/screens/farmer/FarmerDashboard';
import CustomerDashboard from '@/src/screens/customer/CustomerDashboard';

export default function HomeScreen() {
  const { user } = useSelector((state: RootState) => state.auth);
  
  if (user?.role === 'farmer') {
    return <FarmerDashboard />;
  }
  
  return <CustomerDashboard />;
}