import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export interface ResponsiveBreakpoints {
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  isTallScreen: boolean;
  screenWidth: number;
  screenHeight: number;
}

export const useResponsive = (): ResponsiveBreakpoints => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const { width: screenWidth, height: screenHeight } = dimensions;

  return {
    isSmallScreen: screenWidth < 375,
    isMediumScreen: screenWidth >= 375 && screenWidth < 414,
    isLargeScreen: screenWidth >= 414,
    isTallScreen: screenHeight > 812,
    screenWidth,
    screenHeight,
  };
};

// Utility functions for responsive values
export const getResponsiveValue = <T>(
  small: T,
  medium: T,
  large: T,
  screenWidth: number
): T => {
  if (screenWidth < 375) return small;
  if (screenWidth < 414) return medium;
  return large;
};

export const getResponsiveFontSize = (
  small: number,
  medium: number,
  large: number,
  screenWidth: number
): number => {
  return getResponsiveValue(small, medium, large, screenWidth);
};

export const getResponsiveSpacing = (
  small: number,
  medium: number,
  large: number,
  screenWidth: number
): number => {
  return getResponsiveValue(small, medium, large, screenWidth);
};