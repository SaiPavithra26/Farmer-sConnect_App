import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import { Minus, Plus } from 'lucide-react-native';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  unit?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 999,
  unit = '',
  size = 'medium',
}: QuantitySelectorProps) {
  const increment = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <View style={[styles.container, styles[size]]}>
      <TouchableOpacity
        style={[styles.button, styles[`${size}Button`], quantity <= min && styles.buttonDisabled]}
        onPress={decrement}
        disabled={quantity <= min}
      >
        <Minus size={size === 'small' ? 14 : size === 'large' ? 20 : 16} color={
          quantity <= min ? colors.gray[400] : colors.primary[600]
        } />
      </TouchableOpacity>

      <View style={[styles.quantityContainer, styles[`${size}Container`]]}>
        <Text style={[styles.quantity, styles[`${size}Text`]]}>
          {quantity} {unit}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, styles[`${size}Button`], quantity >= max && styles.buttonDisabled]}
        onPress={increment}
        disabled={quantity >= max}
      >
        <Plus size={size === 'small' ? 14 : size === 'large' ? 20 : 16} color={
          quantity >= max ? colors.gray[400] : colors.primary[600]
        } />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    borderRadius: 12,
  },
  small: {
    height: 32,
  },
  medium: {
    height: 40,
  },
  large: {
    height: 48,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  smallButton: {
    width: 32,
    height: 32,
  },
  mediumButton: {
    width: 40,
    height: 40,
  },
  largeButton: {
    width: 48,
    height: 48,
  },
  buttonDisabled: {
    backgroundColor: colors.gray[100],
  },
  quantityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallContainer: {
    paddingHorizontal: spacing.sm,
  },
  mediumContainer: {
    paddingHorizontal: spacing.md,
  },
  largeContainer: {
    paddingHorizontal: spacing.lg,
  },
  quantity: {
    fontFamily: fonts.primary.semiBold,
    color: colors.gray[800],
  },
  smallText: {
    fontSize: fonts.sizes.sm,
  },
  mediumText: {
    fontSize: fonts.sizes.md,
  },
  largeText: {
    fontSize: fonts.sizes.lg,
  },
});