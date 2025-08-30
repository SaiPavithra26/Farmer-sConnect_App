import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import { Clock, CheckCircle, Truck, XCircle, AlertCircle } from 'lucide-react-native';

interface StatusBadgeProps {
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  size?: 'small' | 'medium' | 'large';
}

export default function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock size={size === 'small' ? 14 : 16} color={colors.warning[600]} />,
          backgroundColor: colors.warning[50],
          textColor: colors.warning[700],
          text: 'Pending',
        };
      case 'confirmed':
        return {
          icon: <CheckCircle size={size === 'small' ? 14 : 16} color={colors.success[600]} />,
          backgroundColor: colors.success[50],
          textColor: colors.success[700],
          text: 'Confirmed',
        };
      case 'shipped':
        return {
          icon: <Truck size={size === 'small' ? 14 : 16} color={colors.primary[600]} />,
          backgroundColor: colors.primary[50],
          textColor: colors.primary[700],
          text: 'Shipped',
        };
      case 'delivered':
        return {
          icon: <CheckCircle size={size === 'small' ? 14 : 16} color={colors.success[600]} />,
          backgroundColor: colors.success[50],
          textColor: colors.success[700],
          text: 'Delivered',
        };
      case 'cancelled':
        return {
          icon: <XCircle size={size === 'small' ? 14 : 16} color={colors.error[600]} />,
          backgroundColor: colors.error[50],
          textColor: colors.error[700],
          text: 'Cancelled',
        };
      default:
        return {
          icon: <AlertCircle size={size === 'small' ? 14 : 16} color={colors.gray[600]} />,
          backgroundColor: colors.gray[50],
          textColor: colors.gray[700],
          text: 'Unknown',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[
      styles.badge,
      styles[size],
      { backgroundColor: config.backgroundColor }
    ]}>
      {config.icon}
      <Text style={[
        styles.text,
        styles[`${size}Text`],
        { color: config.textColor }
      ]}>
        {config.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  small: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  medium: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  large: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  text: {
    fontFamily: fonts.primary.medium,
    marginLeft: spacing.xs,
  },
  smallText: {
    fontSize: fonts.sizes.xs,
  },
  mediumText: {
    fontSize: fonts.sizes.sm,
  },
  largeText: {
    fontSize: fonts.sizes.md,
  },
});