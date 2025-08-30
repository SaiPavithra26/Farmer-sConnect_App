import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Button from '@/src/components/common/Button/Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  actionTitle?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon,
  title,
  subtitle,
  actionTitle,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {actionTitle && onAction && (
        <Button
          title={actionTitle}
          onPress={onAction}
          style={styles.actionButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xl,
    color: colors.gray[700],
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.md,
    color: colors.gray[500],
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  actionButton: {
    marginTop: spacing.md,
  },
});