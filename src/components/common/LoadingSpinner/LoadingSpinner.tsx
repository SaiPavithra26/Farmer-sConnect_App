import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  overlay?: boolean;
}

export default function LoadingSpinner({
  size = 'large',
  color = colors.primary[600],
  text,
  overlay = false,
}: LoadingSpinnerProps) {
  return (
    <View style={[styles.container, overlay && styles.overlay]}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text style={styles.text}>{text}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 1000,
  },
  text: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.md,
    color: colors.gray[600],
    marginTop: spacing.md,
    textAlign: 'center',
  },
});