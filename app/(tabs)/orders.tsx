import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import OrderManagement from '@/src/screens/farmer/OrderManagement';
import OrderHistoryScreen from '@/src/screens/customer/OrderHistoryScreen';

export default function OrdersTab() {
  const { user } = useSelector((state: RootState) => state.auth);
  
  if (user?.role === 'farmer') {
    return <OrderManagement />;
  }
  
  return <OrderHistoryScreen />;
}