import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import { Product } from '@/src/types/product';
import { Star, Package, Edit3, Eye, MoreHorizontal } from 'lucide-react-native';
import Card from '@/src/components/common/Card/Card';

interface ProductCardProps {
  product: Product;
  onEdit?: () => void;
  onView?: () => void;
  onMenu?: () => void;
}

export default function ProductCard({ 
  product, 
  onEdit, 
  onView, 
  onMenu 
}: ProductCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.images[0] }} style={styles.image} />
        {product.isOrganic && (
          <View style={styles.organicBadge}>
            <Text style={styles.organicText}>Organic</Text>
          </View>
        )}
        <View style={styles.stockBadge}>
          <Package size={12} color={colors.white} />
          <Text style={styles.stockText}>{product.stock}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{product.name}</Text>
          <TouchableOpacity onPress={onMenu} style={styles.menuButton}>
            <MoreHorizontal size={16} color={colors.gray[500]} />
          </TouchableOpacity>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{product.price}/{product.unit}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color={colors.warning[500]} />
            <Text style={styles.rating}>{product.rating}</Text>
            <Text style={styles.reviews}>({product.reviewCount})</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            onPress={onView} 
            style={[styles.actionButton, styles.viewButton]}
          >
            <Eye size={16} color={colors.primary[600]} />
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={onEdit} 
            style={[styles.actionButton, styles.editButton]}
          >
            <Edit3 size={16} color={colors.white} />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  organicBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.success[500],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  organicText: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.xs,
    color: colors.white,
  },
  stockBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.gray[800],
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  stockText: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.xs,
    color: colors.white,
    marginLeft: spacing.xs,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  name: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
    flex: 1,
  },
  menuButton: {
    padding: spacing.xs,
  },
  description: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  price: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.primary[600],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[700],
    marginLeft: spacing.xs,
  },
  reviews: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[500],
    marginLeft: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  viewButton: {
    backgroundColor: colors.primary[50],
  },
  editButton: {
    backgroundColor: colors.primary[600],
  },
  viewButtonText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
    marginLeft: spacing.xs,
  },
  editButtonText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.white,
    marginLeft: spacing.xs,
  },
});