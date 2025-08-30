import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Card from '@/src/components/common/Card/Card';
import Button from '@/src/components/common/Button/Button';
import { Plus, Edit3, Eye, Star, Package } from 'lucide-react-native';

export default function MyProductsScreen() {
  const router = useRouter();
  
  // Mock products data
  const [products] = useState([
    {
      id: '1',
      name: 'Organic Tomatoes',
      price: 90,
      unit: 'kg',
      stock: 50,
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviews: 24,
      status: 'active',
    },
    {
      id: '2',
      name: 'Fresh Carrots',
      price: 60,
      unit: 'kg',
      stock: 30,
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      reviews: 18,
      status: 'active',
    },
    {
      id: '3',
      name: 'Green Leafy Vegetables',
      price: 40,
      unit: 'bundle',
      stock: 20,
      image: 'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviews: 31,
      status: 'active',
    },
  ]);

  const renderProduct = ({ item }: { item: any }) => (
    <Card style={styles.productCard}>
      <View style={styles.productContent}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>₹{item.price}/{item.unit}</Text>
          
          <View style={styles.productStats}>
            <View style={styles.statItem}>
              <Package size={14} color={colors.gray[500]} />
              <Text style={styles.statText}>{item.stock} {item.unit}</Text>
            </View>
            <View style={styles.statItem}>
              <Star size={14} color={colors.warning[500]} />
              <Text style={styles.statText}>{item.rating} ({item.reviews})</Text>
            </View>
          </View>
          
          <View style={styles.productActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Eye size={16} color={colors.primary[600]} />
              <Text style={styles.actionText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Edit3 size={16} color={colors.secondary[600]} />
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Products</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/farmer/add-product' as any)}
        >
          <Plus size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Product Overview</Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{products.length}</Text>
              <Text style={styles.summaryLabel}>Total Products</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{products.filter(p => p.stock > 0).length}</Text>
              <Text style={styles.summaryLabel}>In Stock</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>4.8</Text>
              <Text style={styles.summaryLabel}>Avg Rating</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Products List */}
      <View style={styles.productsContainer}>
        {products.length > 0 ? (
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        ) : (
          <View style={styles.emptyState}>
            <Package size={64} color={colors.gray[300]} />
            <Text style={styles.emptyTitle}>No Products Yet</Text>
            <Text style={styles.emptySubtitle}>
              Start by adding your first product to the marketplace
            </Text>
            <Button
              title="Add Your First Product"
              onPress={() => router.push('/farmer/add-product' as any)}
              style={styles.emptyButton}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: 50,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xxl,
    color: colors.gray[800],
  },
  addButton: {
    backgroundColor: colors.primary[600],
    borderRadius: 20,
    padding: spacing.sm,
  },
  summary: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  summaryCard: {},
  summaryTitle: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
    marginBottom: spacing.md,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xl,
    color: colors.primary[600],
  },
  summaryLabel: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[600],
    marginTop: spacing.xs,
  },
  productsContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  productsList: {
    paddingBottom: spacing.xl,
  },
  productCard: {
    marginBottom: spacing.md,
  },
  productContent: {
    flexDirection: 'row',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: spacing.md,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
    marginBottom: spacing.xs,
  },
  productPrice: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
    marginBottom: spacing.sm,
  },
  productStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[600],
    marginLeft: spacing.xs,
  },
  productActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  actionText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.xs,
    color: colors.gray[700],
    marginLeft: spacing.xs,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xl,
    color: colors.gray[700],
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.md,
    color: colors.gray[500],
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  emptyButton: {
    marginTop: spacing.md,
  },
});