import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';

interface BadgeProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export default function Badge({
  text,
  variant = 'primary',
  size = 'medium',
  style,
}: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant], styles[size], style]}>
      <Text style={[styles.text, styles[`${variant}Text`], styles[`${size}Text`]]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  primary: {
    backgroundColor: colors.primary[100],
  },
  secondary: {
    backgroundColor: colors.secondary[100],
  },
  success: {
    backgroundColor: colors.success[50],
  },
  warning: {
    backgroundColor: colors.warning[50],
  },
  error: {
    backgroundColor: colors.error[50],
  },
  info: {
    backgroundColor: colors.gray[100],
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
  },
  primaryText: {
    color: colors.primary[700],
  },
  secondaryText: {
    color: colors.secondary[700],
  },
  successText: {
    color: colors.success[600],
  },
  warningText: {
    color: colors.warning[600],
  },
  errorText: {
    color: colors.error[600],
  },
  infoText: {
    color: colors.gray[700],
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