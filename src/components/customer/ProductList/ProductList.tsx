import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import { Product } from '@/src/types/product';
import Card from '@/src/components/common/Card/Card';
import { Star, MapPin, ShoppingCart } from 'lucide-react-native';

interface ProductListProps {
  products: Product[];
  onProductPress: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export default function ProductList({ 
  products, 
  onProductPress, 
  onAddToCart 
}: ProductListProps) {
  const renderProduct = ({ item }: { item: Product }) => (
    <Card style={styles.productCard} onPress={() => onProductPress(item)}>
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      {item.isOrganic && (
        <View style={styles.organicBadge}>
          <Text style={styles.organicText}>Organic</Text>
        </View>
      )}
      
      <View style={styles.productContent}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>₹{item.price}/{item.unit}</Text>
        
        <View style={styles.farmerInfo}>
          <Text style={styles.farmerName}>by {item.farmerName}</Text>
          <View style={styles.locationRow}>
            <MapPin size={12} color={colors.gray[500]} />
            <Text style={styles.locationText}>{item.farmLocation}</Text>
          </View>
        </View>
        
        <View style={styles.productFooter}>
          <View style={styles.ratingContainer}>
            <Star size={14} color={colors.warning[500]} />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewsText}>({item.reviewCount})</Text>
          </View>
          
          {onAddToCart && (
            <TouchableOpacity 
              style={styles.addToCartButton}
              onPress={() => onAddToCart(item)}
            >
              <ShoppingCart size={16} color={colors.primary[600]} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Card>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.productsList}
      columnWrapperStyle={styles.productsRow}
    />
  );
}

const styles = StyleSheet.create({
  productsList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  productsRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: spacing.md,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: spacing.sm,
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
  productContent: {
    flex: 1,
  },
  productName: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.gray[800],
    marginBottom: spacing.xs,
  },
  productPrice: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
    marginBottom: spacing.sm,
  },
  farmerInfo: {
    marginBottom: spacing.sm,
  },
  farmerName: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[600],
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[500],
    marginLeft: spacing.xs,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.xs,
    color: colors.gray[700],
    marginLeft: spacing.xs,
  },
  reviewsText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[500],
    marginLeft: 2,
  },
  addToCartButton: {
    backgroundColor: colors.primary[50],
    borderRadius: 6,
    padding: spacing.xs,
  },
});