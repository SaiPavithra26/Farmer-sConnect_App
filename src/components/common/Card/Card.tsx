import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { colors } from '@/src/styles/colors';
import { spacing } from '@/src/styles/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
}

export default function Card({ 
  children, 
  style, 
  onPress, 
  variant = 'default' 
}: CardProps) {
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Component
      style={[styles.card, styles[variant], style]}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
    >
      {children}
    </Component>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: spacing.md,
    backgroundColor: colors.white,
  },
  default: {
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  elevated: {
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.gray[200],
    shadowColor: 'transparent',
    elevation: 0,
  },
});