import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  color?: string;
  backgroundColor?: string;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

export default function ProgressBar({
  progress,
  height = 8,
  color = colors.primary[600],
  backgroundColor = colors.gray[200],
  showLabel = false,
  label,
  animated = true,
}: ProgressBarProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={styles.container}>
      {showLabel && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.percentage}>{Math.round(clampedProgress)}%</Text>
        </View>
      )}
      
      <View style={[styles.track, { height, backgroundColor }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress}%`,
              height,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[700],
  },
  percentage: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
  },
  track: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 4,
  },
});