import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Card from '@/src/components/common/Card/Card';
import Input from '@/src/components/common/Input/Input';
import { Search, Filter, Star, MapPin, ShoppingCart } from 'lucide-react-native';

export default function ProductCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const [products] = useState([
    {
      id: '1',
      name: 'Organic Tomatoes',
      price: 90,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
      farmerName: 'John Farmer',
      farmLocation: 'Bangalore, Karnataka',
      rating: 4.8,
      reviews: 24,
      isOrganic: true,
      category: 'vegetables',
    },
    {
      id: '2',
      name: 'Fresh Carrots',
      price: 60,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
      farmerName: 'Maria Garcia',
      farmLocation: 'Mumbai, Maharashtra',
      rating: 4.6,
      reviews: 18,
      isOrganic: false,
      category: 'vegetables',
    },
    {
      id: '3',
      name: 'Green Leafy Vegetables',
      price: 40,
      unit: 'bundle',
      image: 'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=400',
      farmerName: 'Suresh Patel',
      farmLocation: 'Delhi',
      rating: 4.9,
      reviews: 31,
      isOrganic: true,
      category: 'vegetables',
    },
    {
      id: '4',
      name: 'Fresh Apples',
      price: 120,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
      farmerName: 'Ram Kumar',
      farmLocation: 'Himachal Pradesh',
      rating: 4.7,
      reviews: 42,
      isOrganic: true,
      category: 'fruits',
    },
  ]);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'grains', name: 'Grains' },
    { id: 'dairy', name: 'Dairy' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderProduct = ({ item }: { item: any }) => (
    <Card style={styles.productCard} onPress={() => {}}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
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
            <Text style={styles.reviewsText}>({item.reviews})</Text>
          </View>
          
          <TouchableOpacity style={styles.addToCartButton}>
            <ShoppingCart size={16} color={colors.primary[600]} />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryTab,
        selectedCategory === item.id && styles.categoryTabActive
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text style={[
        styles.categoryTabText,
        selectedCategory === item.id && styles.categoryTabTextActive
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Fresh Marketplace</Text>
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Input
              label=""
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search products..."
              icon={<Search size={20} color={colors.gray[400]} />}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={colors.primary[600]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories */}
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesList}
      />

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
        columnWrapperStyle={styles.productsRow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    backgroundColor: colors.white,
    paddingTop: 50,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xxl,
    color: colors.gray[800],
    marginBottom: spacing.md,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  searchContainer: {
    flex: 1,
  },
  filterButton: {
    backgroundColor: colors.primary[50],
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  categoriesContainer: {
    maxHeight: 60,
    backgroundColor: colors.white,
  },
  categoriesList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  categoryTab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    backgroundColor: colors.gray[100],
  },
  categoryTabActive: {
    backgroundColor: colors.primary[600],
  },
  categoryTabText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  categoryTabTextActive: {
    color: colors.white,
  },
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