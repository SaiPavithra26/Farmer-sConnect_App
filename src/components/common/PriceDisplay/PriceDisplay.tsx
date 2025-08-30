import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';

interface PriceDisplayProps {
  price: number;
  unit?: string;
  originalPrice?: number;
  size?: 'small' | 'medium' | 'large';
  showCurrency?: boolean;
}

export default function PriceDisplay({
  price,
  unit,
  originalPrice,
  size = 'medium',
  showCurrency = true,
}: PriceDisplayProps) {
  const formatPrice = (amount: number) => {
    if (showCurrency) {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
    return amount.toLocaleString('en-IN');
  };

  return (
    <View style={styles.container}>
      <View style={styles.priceRow}>
        <Text style={[styles.price, styles[`${size}Price`]]}>
          {formatPrice(price)}
          {unit && <Text style={styles.unit}>/{unit}</Text>}
        </Text>
        
        {originalPrice && originalPrice > price && (
          <Text style={[styles.originalPrice, styles[`${size}OriginalPrice`]]}>
            {formatPrice(originalPrice)}
          </Text>
        )}
      </View>
      
      {originalPrice && originalPrice > price && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  price: {
    fontFamily: fonts.primary.semiBold,
    color: colors.primary[600],
  },
  smallPrice: {
    fontSize: fonts.sizes.sm,
  },
  mediumPrice: {
    fontSize: fonts.sizes.md,
  },
  largePrice: {
    fontSize: fonts.sizes.lg,
  },
  unit: {
    fontFamily: fonts.primary.regular,
    color: colors.gray[600],
  },
  originalPrice: {
    fontFamily: fonts.primary.regular,
    color: colors.gray[500],
    textDecorationLine: 'line-through',
    marginLeft: spacing.sm,
  },
  smallOriginalPrice: {
    fontSize: fonts.sizes.xs,
  },
  mediumOriginalPrice: {
    fontSize: fonts.sizes.sm,
  },
  largeOriginalPrice: {
    fontSize: fonts.sizes.md,
  },
  discountBadge: {
    backgroundColor: colors.accent[500],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  discountText: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.xs,
    color: colors.white,
  },
});