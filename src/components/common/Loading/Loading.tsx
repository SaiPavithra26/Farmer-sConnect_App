import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
  overlay?: boolean;
}

export default function Loading({ 
  message = 'Loading...', 
  size = 'large',
  overlay = false 
}: LoadingProps) {
  return (
    <View style={[styles.container, overlay && styles.overlay]}>
      <ActivityIndicator size={size} color={colors.primary[600]} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
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
  message: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.md,
    color: colors.gray[600],
    marginTop: spacing.md,
    textAlign: 'center',
  },
});