import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '@/src/store';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Card from '@/src/components/common/Card/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Plus, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Bell,
  Star,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function FarmerDashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  // Mock data for dashboard
  const [stats] = useState({
    totalProducts: 12,
    activeOrders: 8,
    monthlyEarnings: 25000,
    rating: 4.8,
  });

  const [recentOrders] = useState([
    {
      id: '1',
      customerName: 'Priya Sharma',
      product: 'Organic Tomatoes',
      quantity: '5 kg',
      amount: 450,
      status: 'pending',
      time: '2 hours ago',
    },
    {
      id: '2',
      customerName: 'Rajesh Kumar',
      product: 'Fresh Carrots',
      quantity: '3 kg',
      amount: 180,
      status: 'confirmed',
      time: '4 hours ago',
    },
  ]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={[colors.primary[600], colors.primary[700]]} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <Image 
              source={{ uri: user?.profileImage || 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150' }}
              style={styles.profileImage}
            />
            <View style={styles.userText}>
              <Text style={styles.greeting}>Good Morning!</Text>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.farmName}>{user?.farmerProfile?.farmName}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color={colors.white} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <Package size={24} color={colors.primary[600]} />
              <Text style={styles.statNumber}>{stats.totalProducts}</Text>
              <Text style={styles.statLabel}>Products</Text>
            </View>
          </Card>
          
          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <ShoppingCart size={24} color={colors.secondary[600]} />
              <Text style={styles.statNumber}>{stats.activeOrders}</Text>
              <Text style={styles.statLabel}>Active Orders</Text>
            </View>
          </Card>
        </View>

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <DollarSign size={24} color={colors.accent[600]} />
              <Text style={styles.statNumber}>₹{stats.monthlyEarnings.toLocaleString()}</Text>
              <Text style={styles.statLabel}>This Month</Text>
            </View>
          </Card>
          
          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <Star size={24} color={colors.warning[500]} />
              <Text style={styles.statNumber}>{stats.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </Card>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/farmer/add-product' as any)}
          >
            <LinearGradient 
              colors={[colors.primary[500], colors.primary[600]]} 
              style={styles.actionButtonGradient}
            >
              <Plus size={24} color={colors.white} />
              <Text style={styles.actionButtonText}>Add Product</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/farmer/orders' as any)}
          >
            <LinearGradient 
              colors={[colors.secondary[500], colors.secondary[600]]} 
              style={styles.actionButtonGradient}
            >
              <ShoppingCart size={24} color={colors.white} />
              <Text style={styles.actionButtonText}>View Orders</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Orders */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.ordersList}>
          {recentOrders.map((order) => (
            <Card key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.customerName}>{order.customerName}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: order.status === 'confirmed' ? colors.success[50] : colors.warning[50] }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: order.status === 'confirmed' ? colors.success[600] : colors.warning[600] }
                  ]}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Text>
                </View>
              </View>
              <Text style={styles.orderProduct}>{order.product} - {order.quantity}</Text>
              <View style={styles.orderFooter}>
                <Text style={styles.orderAmount}>₹{order.amount}</Text>
                <Text style={styles.orderTime}>{order.time}</Text>
              </View>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    paddingTop: 50,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing.md,
  },
  userText: {
    flex: 1,
  },
  greeting: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.primary[100],
  },
  userName: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.lg,
    color: colors.white,
    marginBottom: 2,
  },
  farmName: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.primary[200],
  },
  notificationButton: {
    position: 'relative',
    padding: spacing.sm,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent[500],
  },
  statsContainer: {
    paddingHorizontal: spacing.lg,
    marginTop: -20,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  statCard: {
    width: (width - spacing.lg * 3) / 2,
  },
  statContent: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xl,
    color: colors.gray[800],
    marginVertical: spacing.sm,
  },
  statLabel: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.lg,
    color: colors.gray[800],
  },
  sectionAction: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  actionButtonGradient: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.white,
    marginTop: spacing.xs,
  },
  ordersList: {
    gap: spacing.sm,
  },
  orderCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary[600],
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  customerName: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  statusText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.xs,
  },
  orderProduct: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    marginBottom: spacing.sm,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderAmount: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.primary[600],
  },
  orderTime: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[500],
  },
});