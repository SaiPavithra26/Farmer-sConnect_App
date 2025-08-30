import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import { Star } from 'lucide-react-native';

interface RatingDisplayProps {
  rating: number;
  reviewCount?: number;
  size?: 'small' | 'medium' | 'large';
  showReviewCount?: boolean;
  onPress?: () => void;
  editable?: boolean;
  onRatingChange?: (rating: number) => void;
}

export default function RatingDisplay({
  rating,
  reviewCount,
  size = 'medium',
  showReviewCount = true,
  onPress,
  editable = false,
  onRatingChange,
}: RatingDisplayProps) {
  const starSize = size === 'small' ? 12 : size === 'large' ? 18 : 14;
  const maxStars = 5;

  const handleStarPress = (starIndex: number) => {
    if (editable && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  const renderStars = () => {
    return Array.from({ length: maxStars }, (_, index) => {
      const isFilled = index < Math.floor(rating);
      const isHalfFilled = index === Math.floor(rating) && rating % 1 !== 0;
      
      return (
        <TouchableOpacity
          key={index}
          onPress={() => handleStarPress(index)}
          disabled={!editable}
          style={styles.starButton}
        >
          <Star
            size={starSize}
            color={isFilled || isHalfFilled ? colors.warning[500] : colors.gray[300]}
            fill={isFilled ? colors.warning[500] : 'transparent'}
          />
        </TouchableOpacity>
      );
    });
  };

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component style={styles.container} onPress={onPress}>
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>
      
      <View style={styles.textContainer}>
        <Text style={[styles.ratingText, styles[`${size}Text`]]}>
          {rating.toFixed(1)}
        </Text>
        
        {showReviewCount && reviewCount !== undefined && (
          <Text style={[styles.reviewText, styles[`${size}ReviewText`]]}>
            ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
          </Text>
        )}
      </View>
    </Component>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: spacing.sm,
  },
  starButton: {
    marginRight: 2,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: fonts.primary.semiBold,
    color: colors.gray[700],
  },
  smallText: {
    fontSize: fonts.sizes.xs,
  },
  mediumText: {
    fontSize: fonts.sizes.sm,
  },
  largeText: {
    fontSize: fonts.sizes.md,
  },
  reviewText: {
    fontFamily: fonts.primary.regular,
    color: colors.gray[500],
    marginLeft: spacing.xs,
  },
  smallReviewText: {
    fontSize: fonts.sizes.xs,
  },
  mediumReviewText: {
    fontSize: fonts.sizes.sm,
  },
  largeReviewText: {
    fontSize: fonts.sizes.md,
  },
});