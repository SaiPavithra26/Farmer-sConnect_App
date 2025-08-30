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
import { Package, Star, MapPin, Clock, CheckCircle, Truck } from 'lucide-react-native';

export default function OrderHistoryScreen() {
  const [selectedTab, setSelectedTab] = useState('active');
  
  const [orders] = useState([
    {
      id: '1',
      farmerName: 'John Farmer',
      farmImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      products: [
        { 
          name: 'Organic Tomatoes', 
          quantity: 5, 
          unit: 'kg', 
          price: 90,
          image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
      ],
      totalAmount: 450,
      status: 'shipped',
      orderDate: '2025-01-20T10:30:00',
      expectedDelivery: '2025-01-22',
      trackingId: 'FC123456789',
    },
    {
      id: '2',
      farmerName: 'Maria Garcia',
      farmImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      products: [
        { 
          name: 'Fresh Carrots', 
          quantity: 3, 
          unit: 'kg', 
          price: 60,
          image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
        { 
          name: 'Green Leafy Vegetables', 
          quantity: 2, 
          unit: 'bundle', 
          price: 40,
          image: 'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=100'
        },
      ],
      totalAmount: 260,
      status: 'delivered',
      orderDate: '2025-01-18T14:20:00',
      deliveredDate: '2025-01-20',
      rating: null,
    },
  ]);

  const tabs = [
    { id: 'active', name: 'Active', count: 2 },
    { id: 'delivered', name: 'Delivered', count: 8 },
    { id: 'cancelled', name: 'Cancelled', count: 1 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} color={colors.warning[600]} />;
      case 'confirmed':
        return <CheckCircle size={16} color={colors.success[600]} />;
      case 'shipped':
        return <Truck size={16} color={colors.primary[600]} />;
      case 'delivered':
        return <CheckCircle size={16} color={colors.success[600]} />;
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
      case 'shipped':
        return colors.primary[50];
      case 'delivered':
        return colors.success[50];
      default:
        return colors.gray[50];
    }
  };

  const renderOrder = ({ item }: { item: any }) => (
    <Card style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.farmerInfo}>
          <Image source={{ uri: item.farmImage }} style={styles.farmerImage} />
          <View style={styles.farmerDetails}>
            <Text style={styles.farmerName}>{item.farmerName}</Text>
            <Text style={styles.orderId}>Order #{item.id}</Text>
            <Text style={styles.orderDate}>
              {new Date(item.orderDate).toLocaleDateString('en-IN')}
            </Text>
          </View>
        </View>
        
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          {getStatusIcon(item.status)}
          <Text style={styles.statusText}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
        </View>
      </View>

      <View style={styles.productsContainer}>
        {item.products.map((product: any, index: number) => (
          <View key={index} style={styles.productRow}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productQuantity}>{product.quantity} {product.unit}</Text>
            </View>
            <Text style={styles.productPrice}>₹{product.price * product.quantity}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Amount:</Text>
        <Text style={styles.totalAmount}>₹{item.totalAmount}</Text>
      </View>

      {item.status === 'shipped' && (
        <View style={styles.trackingContainer}>
          <Text style={styles.trackingLabel}>Expected Delivery:</Text>
          <Text style={styles.trackingDate}>{new Date(item.expectedDelivery).toLocaleDateString('en-IN')}</Text>
        </View>
      )}

      <View style={styles.orderActions}>
        {item.status === 'delivered' && !item.rating ? (
          <Button
            title="Rate & Review"
            variant="outline"
            size="small"
            onPress={() => {}}
            style={styles.actionButton}
          />
        ) : null}
        
        <TouchableOpacity style={styles.chatButton}>
          <Text style={styles.chatButtonText}>Chat with Farmer</Text>
        </TouchableOpacity>
        
        {item.status === 'shipped' && (
          <Button
            title="Track Order"
            size="small"
            onPress={() => {}}
            style={styles.actionButton}
          />
        )}
      </View>
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

  const filteredOrders = orders.filter(order => {
    if (selectedTab === 'active') {
      return ['pending', 'confirmed', 'shipped'].includes(order.status);
    }
    return order.status === selectedTab;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
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
        data={filteredOrders}
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
  farmerInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  farmerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  farmerDetails: {
    flex: 1,
  },
  farmerName: {
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
  productsContainer: {
    marginBottom: spacing.md,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: spacing.sm,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[700],
  },
  productQuantity: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[500],
  },
  productPrice: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    marginBottom: spacing.md,
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
  trackingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  trackingLabel: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[700],
  },
  trackingDate: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  chatButton: {
    flex: 1,
    backgroundColor: colors.secondary[500],
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  chatButtonText: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.white,
  },
});