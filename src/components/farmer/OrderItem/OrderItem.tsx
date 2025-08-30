import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import { Order } from '@/src/types/order';
import Card from '@/src/components/common/Card/Card';
import Button from '@/src/components/common/Button/Button';
import { User, Phone, MapPin, Clock, CheckCircle, Truck } from 'lucide-react-native';
import { useResponsive } from '@/src/hooks/useResponsive';

interface OrderItemProps {
  order: Order;
  onAccept?: () => void;
  onReject?: () => void;
  onMarkDelivered?: () => void;
  onChat?: () => void;
}

export default function OrderItem({
  order,
  onAccept,
  onReject,
  onMarkDelivered,
  onChat
}: OrderItemProps) {
  const { isSmallScreen } = useResponsive();

  const getStyles = () => StyleSheet.create({
    card: {
      marginBottom: spacing.md,
      marginHorizontal: isSmallScreen ? spacing.xs : spacing.sm,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.md,
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    customerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: isSmallScreen ? 1 : undefined,
    },
    orderId: {
      fontFamily: fonts.primary.semiBold,
      fontSize: isSmallScreen ? fonts.sizes.xs : fonts.sizes.sm,
      color: colors.gray[700],
      marginLeft: spacing.sm,
      flex: 1,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: isSmallScreen ? spacing.xs : spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    statusText: {
      fontFamily: fonts.primary.medium,
      fontSize: fonts.sizes.xs,
      marginLeft: spacing.xs,
    },
    content: {
      marginBottom: spacing.md,
    },
    customerName: {
      fontFamily: fonts.primary.semiBold,
      fontSize: isSmallScreen ? fonts.sizes.sm : fonts.sizes.md,
      color: colors.gray[800],
      marginBottom: spacing.sm,
    },
    addressRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: spacing.md,
    },
    address: {
      fontFamily: fonts.primary.regular,
      fontSize: isSmallScreen ? fonts.sizes.xs : fonts.sizes.sm,
      color: colors.gray[600],
      marginLeft: spacing.sm,
      flex: 1,
      lineHeight: isSmallScreen ? 18 : 20,
    },
    productsContainer: {
      marginBottom: spacing.md,
    },
    productsTitle: {
      fontFamily: fonts.primary.semiBold,
      fontSize: isSmallScreen ? fonts.sizes.xs : fonts.sizes.sm,
      color: colors.gray[700],
      marginBottom: spacing.sm,
    },
    productItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
      backgroundColor: colors.gray[50],
      padding: isSmallScreen ? spacing.xs : spacing.sm,
      borderRadius: 8,
      ...Platform.select({
        ios: {
          shadowColor: colors.gray[900],
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    productImage: {
      width: isSmallScreen ? 35 : 40,
      height: isSmallScreen ? 35 : 40,
      borderRadius: 8,
      marginRight: spacing.sm,
    },
    productDetails: {
      flex: 1,
    },
    productName: {
      fontFamily: fonts.primary.medium,
      fontSize: isSmallScreen ? fonts.sizes.xs : fonts.sizes.sm,
      color: colors.gray[700],
      marginBottom: 2,
    },
    productQuantity: {
      fontFamily: fonts.primary.regular,
      fontSize: fonts.sizes.xs,
      color: colors.gray[600],
    },
    productTotal: {
      fontFamily: fonts.primary.semiBold,
      fontSize: isSmallScreen ? fonts.sizes.xs : fonts.sizes.sm,
      color: colors.primary[600],
      minWidth: 60,
      textAlign: 'right',
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: colors.gray[200],
      marginTop: spacing.sm,
    },
    totalLabel: {
      fontFamily: fonts.primary.semiBold,
      fontSize: isSmallScreen ? fonts.sizes.sm : fonts.sizes.md,
      color: colors.gray[700],
    },
    totalAmount: {
      fontFamily: fonts.primary.semiBold,
      fontSize: isSmallScreen ? fonts.sizes.md : fonts.sizes.lg,
      color: colors.primary[600],
    },
    notesContainer: {
      marginTop: spacing.md,
      padding: isSmallScreen ? spacing.xs : spacing.sm,
      backgroundColor: colors.primary[50],
      borderRadius: 8,
    },
    notesLabel: {
      fontFamily: fonts.primary.semiBold,
      fontSize: isSmallScreen ? fonts.sizes.xs : fonts.sizes.sm,
      color: colors.primary[700],
      marginBottom: spacing.xs,
    },
    notes: {
      fontFamily: fonts.primary.regular,
      fontSize: isSmallScreen ? fonts.sizes.xs : fonts.sizes.sm,
      color: colors.gray[700],
      lineHeight: isSmallScreen ? 18 : 20,
    },
    actions: {
      flexDirection: isSmallScreen ? 'column' : 'row',
      gap: spacing.sm,
    },
    actionButton: {
      flex: isSmallScreen ? undefined : 1,
      width: isSmallScreen ? '100%' : undefined,
    },
    fullWidthButton: {
      width: '100%',
    },
    chatButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.secondary[50],
      paddingVertical: isSmallScreen ? spacing.xs : spacing.sm,
      paddingHorizontal: isSmallScreen ? spacing.sm : spacing.md,
      borderRadius: 8,
      marginTop: spacing.sm,
    },
    chatButtonText: {
      fontFamily: fonts.primary.medium,
      fontSize: isSmallScreen ? fonts.sizes.xs : fonts.sizes.sm,
      color: colors.secondary[700],
      marginLeft: spacing.xs,
    },
  });

  const styles = getStyles();

  const getStatusIcon = () => {
    switch (order.status) {
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

  const getStatusColor = () => {
    switch (order.status) {
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

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.customerInfo}>
          <User size={20} color={colors.primary[600]} />
          <Text style={styles.orderId}>Order #{order.id}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          {getStatusIcon()}
          <Text style={styles.statusText}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.customerName}>Customer: {order.customerId}</Text>
        
        <View style={styles.addressRow}>
          <MapPin size={16} color={colors.gray[500]} />
          <Text style={styles.address}>
            {order.deliveryAddress.street}, {order.deliveryAddress.city}
          </Text>
        </View>

        <View style={styles.productsContainer}>
          <Text style={styles.productsTitle}>Products:</Text>
          {order.products.map((item, index) => (
            <View key={index} style={styles.productItem}>
              <Image source={{ uri: item.productImage }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.productName}</Text>
                <Text style={styles.productQuantity}>
                  {item.quantity} {item.unit} × ₹{item.price}
                </Text>
              </View>
              <Text style={styles.productTotal}>
                ₹{item.quantity * item.price}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalAmount}>₹{order.totalAmount}</Text>
        </View>

        {order.notes && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Customer Notes:</Text>
            <Text style={styles.notes}>{order.notes}</Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        {order.status === 'pending' && (
  <>
    <Button
      title="Reject"
      variant="outline"
      size="small"
      onPress={onReject ?? (() => {})} // ✅ fallback
      style={styles.actionButton}
    />
    <Button
      title="Accept"
      size="small"
      onPress={onAccept ?? (() => {})} // ✅ fallback
      style={styles.actionButton}
    />
  </>
)}

{order.status === 'confirmed' && (
  <Button
    title="Mark as Delivered"
    size="small"
    onPress={onMarkDelivered ?? (() => {})} // ✅ fixed typo + fallback
    style={styles.fullWidthButton}
  />
)}

<TouchableOpacity onPress={onChat ?? (() => {})} style={styles.chatButton}>
  <Phone size={16} color={colors.secondary[600]} />
  <Text style={styles.chatButtonText}>Contact Customer</Text>
</TouchableOpacity>
      </View>
    </Card>
  );
}
