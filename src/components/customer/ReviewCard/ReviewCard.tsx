import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Card from '@/src/components/common/Card/Card';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react-native';

interface Review {
  id: string;
  customerName: string;
  customerImage?: string;
  rating: number;
  comment: string;
  date: string;
  productName: string;
  helpful: number;
  isHelpful?: boolean;
}

interface ReviewCardProps {
  review: Review;
  onHelpful?: (reviewId: string) => void;
  onReply?: (reviewId: string) => void;
}

export default function ReviewCard({ review, onHelpful, onReply }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        color={index < rating ? colors.warning[500] : colors.gray[300]}
        fill={index < rating ? colors.warning[500] : 'transparent'}
      />
    ));
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.customerInfo}>
          <Image 
            source={{ 
              uri: review.customerImage || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100' 
            }} 
            style={styles.customerImage} 
          />
          <View style={styles.customerDetails}>
            <Text style={styles.customerName}>{review.customerName}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(review.rating)}
              <Text style={styles.ratingText}>{review.rating}.0</Text>
            </View>
            <Text style={styles.productName}>for {review.productName}</Text>
          </View>
        </View>
        <Text style={styles.date}>
          {new Date(review.date).toLocaleDateString('en-IN')}
        </Text>
      </View>

      <Text style={styles.comment}>{review.comment}</Text>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.helpfulButton, review.isHelpful && styles.helpfulButtonActive]}
          onPress={() => onHelpful?.(review.id)}
        >
          <ThumbsUp 
            size={16} 
            color={review.isHelpful ? colors.primary[600] : colors.gray[500]} 
          />
          <Text style={[
            styles.helpfulText,
            review.isHelpful && styles.helpfulTextActive
          ]}>
            Helpful ({review.helpful})
          </Text>
        </TouchableOpacity>

        {onReply && (
          <TouchableOpacity 
            style={styles.replyButton}
            onPress={() => onReply(review.id)}
          >
            <MessageCircle size={16} color={colors.secondary[600]} />
            <Text style={styles.replyText}>Reply</Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  customerInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  customerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  ratingText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[700],
    marginLeft: spacing.xs,
  },
  productName: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  date: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[500],
  },
  comment: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.md,
    color: colors.gray[700],
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  helpfulButtonActive: {
    backgroundColor: colors.primary[50],
  },
  helpfulText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    marginLeft: spacing.xs,
  },
  helpfulTextActive: {
    color: colors.primary[600],
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary[50],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  replyText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.secondary[600],
    marginLeft: spacing.xs,
  },
});