import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fonts } from './fonts';
import { spacing } from './spacing';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  shadowLarge: {
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  textCenter: {
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  flex1: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexShrink: {
    flexShrink: 1,
  },
  // Margin utilities
  m0: { margin: 0 },
  m1: { margin: spacing.xs },
  m2: { margin: spacing.sm },
  m3: { margin: spacing.md },
  m4: { margin: spacing.lg },
  m5: { margin: spacing.xl },
  
  // Padding utilities
  p0: { padding: 0 },
  p1: { padding: spacing.xs },
  p2: { padding: spacing.sm },
  p3: { padding: spacing.md },
  p4: { padding: spacing.lg },
  p5: { padding: spacing.xl },
  
  // Horizontal margin
  mx1: { marginHorizontal: spacing.xs },
  mx2: { marginHorizontal: spacing.sm },
  mx3: { marginHorizontal: spacing.md },
  mx4: { marginHorizontal: spacing.lg },
  
  // Vertical margin
  my1: { marginVertical: spacing.xs },
  my2: { marginVertical: spacing.sm },
  my3: { marginVertical: spacing.md },
  my4: { marginVertical: spacing.lg },
  
  // Horizontal padding
  px1: { paddingHorizontal: spacing.xs },
  px2: { paddingHorizontal: spacing.sm },
  px3: { paddingHorizontal: spacing.md },
  px4: { paddingHorizontal: spacing.lg },
  
  // Vertical padding
  py1: { paddingVertical: spacing.xs },
  py2: { paddingVertical: spacing.sm },
  py3: { paddingVertical: spacing.md },
  py4: { paddingVertical: spacing.lg },
  
  // Border radius
  rounded: { borderRadius: 8 },
  roundedLg: { borderRadius: 12 },
  roundedXl: { borderRadius: 16 },
  roundedFull: { borderRadius: 9999 },
  
  // Background colors
  bgWhite: { backgroundColor: colors.white },
  bgGray50: { backgroundColor: colors.gray[50] },
  bgGray100: { backgroundColor: colors.gray[100] },
  bgPrimary: { backgroundColor: colors.primary[600] },
  bgSecondary: { backgroundColor: colors.secondary[500] },
  
  // Text colors
  textGray600: { color: colors.gray[600] },
  textGray700: { color: colors.gray[700] },
  textGray800: { color: colors.gray[800] },
  textPrimary: { color: colors.primary[600] },
  textWhite: { color: colors.white },
  
  // Typography
  textXs: { fontSize: fonts.sizes.xs },
  textSm: { fontSize: fonts.sizes.sm },
  textMd: { fontSize: fonts.sizes.md },
  textLg: { fontSize: fonts.sizes.lg },
  textXl: { fontSize: fonts.sizes.xl },
  
  fontRegular: { fontFamily: fonts.primary.regular },
  fontMedium: { fontFamily: fonts.primary.medium },
  fontSemiBold: { fontFamily: fonts.primary.semiBold },
  fontHeading: { fontFamily: fonts.heading.semiBold },
});

export default globalStyles;