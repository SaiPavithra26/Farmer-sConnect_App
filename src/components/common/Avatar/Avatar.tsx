import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import { User } from 'lucide-react-native';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  onPress?: () => void;
  showOnlineStatus?: boolean;
  isOnline?: boolean;
}

export default function Avatar({
  uri,
  name,
  size = 'medium',
  onPress,
  showOnlineStatus = false,
  isOnline = false,
}: AvatarProps) {
  const sizeConfig = {
    small: { width: 32, height: 32, borderRadius: 16, fontSize: 12 },
    medium: { width: 48, height: 48, borderRadius: 24, fontSize: 16 },
    large: { width: 64, height: 64, borderRadius: 32, fontSize: 20 },
    xlarge: { width: 80, height: 80, borderRadius: 40, fontSize: 24 },
  };

  const config = sizeConfig[size];

  const getInitials = (fullName?: string) => {
    if (!fullName) return '';
    return fullName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      style={[styles.container, { width: config.width, height: config.height }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.image, { width: config.width, height: config.height, borderRadius: config.borderRadius }]}
        />
      ) : (
        <View style={[
          styles.placeholder,
          { 
            width: config.width, 
            height: config.height, 
            borderRadius: config.borderRadius 
          }
        ]}>
          {name ? (
            <Text style={[styles.initials, { fontSize: config.fontSize }]}>
              {getInitials(name)}
            </Text>
          ) : (
            <User size={config.width * 0.5} color={colors.gray[400]} />
          )}
        </View>
      )}

      {showOnlineStatus && (
        <View style={[
          styles.onlineIndicator,
          styles[`${size}Indicator`],
          { backgroundColor: isOnline ? colors.success[500] : colors.gray[400] }
        ]} />
      )}
    </Component>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    resizeMode: 'cover',
  },
  placeholder: {
    backgroundColor: colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontFamily: fonts.primary.semiBold,
    color: colors.gray[600],
  },
  onlineIndicator: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 50,
  },
  smallIndicator: {
    width: 10,
    height: 10,
    bottom: 0,
    right: 0,
  },
  mediumIndicator: {
    width: 12,
    height: 12,
    bottom: 2,
    right: 2,
  },
  largeIndicator: {
    width: 16,
    height: 16,
    bottom: 2,
    right: 2,
  },
  xlargeIndicator: {
    width: 20,
    height: 20,
    bottom: 4,
    right: 4,
  },
});