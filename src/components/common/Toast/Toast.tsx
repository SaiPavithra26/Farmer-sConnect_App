import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import { CircleCheck as CheckCircle, CircleAlert as AlertCircle, Info, X } from 'lucide-react-native';

interface ToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onHide: () => void;
  position?: 'top' | 'bottom';
}

export default function Toast({
  visible,
  message,
  type = 'info',
  duration = 3000,
  onHide,
  position = 'top',
}: ToastProps) {
  const translateY = useRef(new Animated.Value(position === 'top' ? -100 : 100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      hideToast();
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === 'top' ? -100 : 100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckCircle size={20} color={colors.success[600]} />,
          backgroundColor: colors.success[50],
          borderColor: colors.success[200],
          textColor: colors.success[800],
        };
      case 'error':
        return {
          icon: <AlertCircle size={20} color={colors.error[600]} />,
          backgroundColor: colors.error[50],
          borderColor: colors.error[200],
          textColor: colors.error[800],
        };
      case 'warning':
        return {
          icon: <AlertCircle size={20} color={colors.warning[600]} />,
          backgroundColor: colors.warning[50],
          borderColor: colors.warning[200],
          textColor: colors.warning[800],
        };
      default:
        return {
          icon: <Info size={20} color={colors.primary[600]} />,
          backgroundColor: colors.primary[50],
          borderColor: colors.primary[200],
          textColor: colors.primary[800],
        };
    }
  };

  const config = getToastConfig();

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        position === 'top' ? styles.topPosition : styles.bottomPosition,
        {
          transform: [{ translateY }],
          opacity,
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
        },
      ]}
    >
      {config.icon}
      <Text style={[styles.message, { color: config.textColor }]}>
        {message}
      </Text>
      <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
        <X size={16} color={config.textColor} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    zIndex: 1000,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  topPosition: {
    top: 60,
  },
  bottomPosition: {
    bottom: 100,
  },
  message: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    flex: 1,
    marginLeft: spacing.sm,
    lineHeight: 20,
  },
  closeButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
});