import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Card from '@/src/components/common/Card/Card';
import Button from '@/src/components/common/Button/Button';
import { Clock, CheckCircle, Truck, User, Phone, MapPin } from 'lucide-react-native';

export default function OrderManagement() {
  const [selectedTab, setSelectedTab] = useState('pending');
  
  const [orders] = useState([
    {
      id: '1',
      customerName: 'Priya Sharma',
      customerImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      products: [
        { name: 'Organic Tomatoes', quantity: 5, unit: 'kg', price: 90 },
        { name: 'Fresh Carrots', quantity: 2, unit: 'kg', price: 60 },
      ],
      totalAmount: 570,
      status: 'pending',
      orderDate: '2025-01-20T10:30:00',
      deliveryAddress: 'Koramangala, Bangalore',
      phone: '+91 98765 43210',
    },
    {
      id: '2',
      customerName: 'Rajesh Kumar',
      customerImage: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
      products: [
        { name: 'Green Leafy Vegetables', quantity: 3, unit: 'bundle', price: 40 },
      ],
      totalAmount: 120,
      status: 'confirmed',
      orderDate: '2025-01-20T08:15:00',
      deliveryAddress: 'Indiranagar, Bangalore',
      phone: '+91 87654 32109',
    },
  ]);

  const tabs = [
    { id: 'pending', name: 'Pending', count: 3 },
    { id: 'confirmed', name: 'Confirmed', count: 5 },
    { id: 'delivered', name: 'Delivered', count: 12 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} color={colors.warning[600]} />;
      case 'confirmed':
        return <CheckCircle size={16} color={colors.success[600]} />;
      case 'delivered':
        return <Truck size={16} color={colors.primary[600]} />;
      default:
        return <Clock size={16} color={colors.gray[500]} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return colors.warning[50];
      case 'confirmed':
        return colors.success[50];
      case 'delivered':
        return colors.primary[50];
      default:
        return colors.gray[50];
    }
  };

  const handleOrderAction = (orderId: string, action: string) => {
    // Handle order actions (confirm, reject, mark as delivered, etc.)
    console.log(`${action} order ${orderId}`);
  };

  const renderOrder = ({ item }: { item: any }) => (
    <Card style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.customerInfo}>
          <Image source={{ uri: item.customerImage }} style={styles.customerImage} />
          <View style={styles.customerDetails}>
            <Text style={styles.customerName}>{item.customerName}</Text>
            <Text style={styles.orderId}>Order #{item.id}</Text>
            <Text style={styles.orderDate}>
              {new Date(item.orderDate).toLocaleDateString('en-IN')} at{' '}
              {new Date(item.orderDate).toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </View>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          {getStatusIcon(item.status)}
          <Text style={styles.statusText}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
        </View>
      </View>

      <View style={styles.orderContent}>
        <Text style={styles.productsTitle}>Products:</Text>
        {item.products.map((product: any, index: number) => (
          <View key={index} style={styles.productItem}>
            <Text style={styles.productName}>
              {product.name} - {product.quantity} {product.unit}
            </Text>
            <Text style={styles.productPrice}>₹{product.price * product.quantity}</Text>
          </View>
        ))}
        
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalAmount}>₹{item.totalAmount}</Text>
        </View>

        <View style={styles.addressContainer}>
          <MapPin size={16} color={colors.gray[500]} />
          <Text style={styles.addressText}>{item.deliveryAddress}</Text>
        </View>

        <View style={styles.contactContainer}>
          <Phone size={16} color={colors.gray[500]} />
          <Text style={styles.phoneText}>{item.phone}</Text>
        </View>
      </View>

      {item.status === 'pending' && (
        <View style={styles.orderActions}>
          <Button
            title="Reject"
            variant="outline"
            size="small"
            onPress={() => handleOrderAction(item.id, 'reject')}
            style={styles.actionButton}
          />
          <Button
            title="Confirm"
            size="small"
            onPress={() => handleOrderAction(item.id, 'confirm')}
            style={styles.actionButton}
          />
        </View>
      )}

      {item.status === 'confirmed' && (
        <View style={styles.orderActions}>
          <Button
            title="Mark as Delivered"
            size="small"
            onPress={() => handleOrderAction(item.id, 'deliver')}
          />
        </View>
      )}
    </Card>
  );

  const renderTab = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.tab,
        selectedTab === item.id && styles.tabActive
      ]}
      onPress={() => setSelectedTab(item.id)}
    >
      <Text style={[
        styles.tabText,
        selectedTab === item.id && styles.tabTextActive
      ]}>
        {item.name}
      </Text>
      {item.count > 0 && (
        <View style={styles.tabBadge}>
          <Text style={styles.tabBadgeText}>{item.count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Order Management</Text>
      </View>

      {/* Tabs */}
      <FlatList
        data={tabs}
        renderItem={renderTab}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsList}
      />

      {/* Orders List */}
      <FlatList
        data={orders.filter(order => order.status === selectedTab)}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ordersList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    backgroundColor: colors.white,
    paddingTop: 50,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xxl,
    color: colors.gray[800],
  },
  tabsContainer: {
    backgroundColor: colors.white,
    maxHeight: 60,
  },
  tabsList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    backgroundColor: colors.gray[100],
  },
  tabActive: {
    backgroundColor: colors.primary[600],
  },
  tabText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  tabTextActive: {
    color: colors.white,
  },
  tabBadge: {
    backgroundColor: colors.primary[600],
    borderRadius: 10,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    marginLeft: spacing.xs,
    minWidth: 20,
    alignItems: 'center',
  },
  tabBadgeText: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.xs,
    color: colors.white,
  },
  ordersList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  orderCard: {
    marginBottom: spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  customerInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  customerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
  },
  orderId: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[500],
  },
  orderDate: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[500],
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  statusText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.xs,
    marginLeft: spacing.xs,
  },
  orderContent: {
    marginBottom: spacing.md,
  },
  productsTitle: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  productName: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  productPrice: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[700],
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  totalLabel: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.gray[700],
  },
  totalAmount: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.primary[600],
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  addressText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    marginLeft: spacing.sm,
    flex: 1,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  phoneText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
    marginLeft: spacing.sm,
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
});