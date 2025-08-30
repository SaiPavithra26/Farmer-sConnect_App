import { Dimensions } from 'react-native';
import { colors } from './colors';
import { fonts } from './fonts';
import { spacing } from './spacing';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const responsiveTheme = {
  // Breakpoints
  breakpoints: {
    small: 375,
    medium: 414,
    large: 768,
  },

  // Current screen dimensions
  screen: {
    width: screenWidth,
    height: screenHeight,
  },

  // Responsive utilities
  isSmallScreen: () => screenWidth < 375,
  isMediumScreen: () => screenWidth >= 375 && screenWidth < 414,
  isLargeScreen: () => screenWidth >= 414,
  isTallScreen: () => screenHeight > 812,

  // Responsive spacing
  spacing: {
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: spacing.xl,
    xxl: spacing.xxl,
    xxxl: spacing.xxxl,
  },

  // Responsive fonts
  fonts: {
    sizes: {
      xs: fonts.sizes.xs,
      sm: fonts.sizes.sm,
      md: fonts.sizes.md,
      lg: fonts.sizes.lg,
      xl: fonts.sizes.xl,
      xxl: fonts.sizes.xxl,
      xxxl: fonts.sizes.xxxl,
      huge: fonts.sizes.huge,
    },
    families: fonts,
  },

  // Responsive colors (same as base colors)
  colors,

  // Common responsive styles
  commonStyles: {
    container: {
      flex: 1,
      paddingHorizontal: screenWidth < 375 ? spacing.md : spacing.lg,
    },
    card: {
      backgroundColor: colors.white,
      borderRadius: 12,
      padding: screenWidth < 375 ? spacing.sm : spacing.md,
      marginBottom: spacing.md,
      shadowColor: colors.gray[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    button: {
      paddingVertical: screenWidth < 375 ? spacing.xs : spacing.sm,
      paddingHorizontal: screenWidth < 375 ? spacing.sm : spacing.md,
      borderRadius: 8,
    },
    text: {
      fontSize: screenWidth < 375 ? fonts.sizes.sm : fonts.sizes.md,
      lineHeight: screenWidth < 375 ? 20 : 22,
    },
  },

  // Layout helpers
  layout: {
    flexRow: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
    },
    flexColumn: {
      flexDirection: 'column' as const,
    },
    center: {
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
    spaceBetween: {
      justifyContent: 'space-between' as const,
    },
  },
};

// Helper functions for responsive values
export const getResponsiveValue = <T>(
  small: T,
  medium: T,
  large: T
): T => {
  if (screenWidth < 375) return small;
  if (screenWidth < 414) return medium;
  return large;
};

export const getResponsiveFontSize = (
  small: number,
  medium: number,
  large: number
): number => {
  return getResponsiveValue(small, medium, large);
};

export const getResponsiveSpacing = (
  small: number,
  medium: number,
  large: number
): number => {
  return getResponsiveValue(small, medium, large);
};

// Update dimensions on orientation change
export const updateResponsiveTheme = () => {
  const { width, height } = Dimensions.get('window');
  responsiveTheme.screen.width = width;
  responsiveTheme.screen.height = height;
};