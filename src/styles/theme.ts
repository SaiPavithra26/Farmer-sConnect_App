import { colors } from './colors';
import { fonts } from './fonts';
import { spacing } from './spacing';

export interface Theme {
  colors: typeof colors;
  fonts: typeof fonts;
  spacing: typeof spacing;
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  shadows: {
    sm: object;
    md: object;
    lg: object;
  };
}

export const lightTheme: Theme = {
  colors,
  fonts,
  spacing,
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: colors.gray[900],
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: colors.gray[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: colors.gray[900],
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...colors,
    // Override colors for dark theme
    white: '#1F2937',
    gray: {
      50: '#1F2937',
      100: '#374151',
      200: '#4B5563',
      300: '#6B7280',
      400: '#9CA3AF',
      500: '#D1D5DB',
      600: '#E5E7EB',
      700: '#F3F4F6',
      800: '#F9FAFB',
      900: '#FFFFFF',
    },
  },
};

export const getTheme = (isDark: boolean): Theme => {
  return isDark ? darkTheme : lightTheme;
};

export default lightTheme;