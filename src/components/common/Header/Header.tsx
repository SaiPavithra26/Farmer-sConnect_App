import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import { ArrowLeft, Bell, Search } from 'lucide-react-native';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightIcon?: 'bell' | 'search';
  onRightPress?: () => void;
  subtitle?: string;
}

export default function Header({
  title,
  showBackButton = false,
  onBackPress,
  rightIcon,
  onRightPress,
  subtitle,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {showBackButton ? (
          <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
            <ArrowLeft size={24} color={colors.gray[700]} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        {rightIcon ? (
          <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
            {rightIcon === 'bell' && <Bell size={24} color={colors.gray[700]} />}
            {rightIcon === 'search' && <Search size={24} color={colors.gray[700]} />}
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: 50,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: spacing.sm,
  },
  placeholder: {
    width: 40,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.lg,
    color: colors.gray[800],
  },
  subtitle: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    marginTop: 2,
  },
});