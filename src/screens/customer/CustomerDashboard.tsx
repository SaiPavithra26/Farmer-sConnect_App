import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '@/src/store';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Card from '@/src/components/common/Card/Card';
import Input from '@/src/components/common/Input/Input';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Search, 
  Bell, 
  MapPin, 
  Star,
  ShoppingCart,
  Truck,
  Filter,
} from 'lucide-react-native';

export default function CustomerDashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const [categories] = useState([
    { id: '1', name: 'Vegetables', icon: '🥕', color: colors.primary[500] },
    { id: '2', name: 'Fruits', icon: '🍎', color: colors.accent[500] },
    { id: '3', name: 'Grains', icon: '🌾', color: colors.secondary[500] },
    { id: '4', name: 'Dairy', icon: '🥛', color: colors.warning[500] },
  ]);

  const [featuredProducts] = useState([
    {
      id: '1',
      name: 'Organic Tomatoes',
      price: 90,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
      farmerName: 'John Farmer',
      location: 'Bangalore',
      rating: 4.8,
      isOrganic: true,
    },
    {
      id: '2',
      name: 'Fresh Carrots',
      price: 60,
      unit: 'kg',
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
      farmerName: 'Maria Garcia',
      location: 'Mumbai',
      rating: 4.6,
      isOrganic: false,
    },
  ]);

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <LinearGradient 
        colors={[item.color, `${item.color}CC`]} 
        style={styles.categoryGradient}
      >
        <Text style={styles.categoryIcon}>{item.icon}</Text>
      </LinearGradient>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderFeaturedProduct = ({ item }: { item: any }) => (
    <Card style={styles.featuredCard} onPress={() => {}}>
      <Image source={{ uri: item.image }} style={styles.featuredImage} />
      {item.isOrganic && (
        <View style={styles.organicBadge}>
          <Text style={styles.organicText}>Organic</Text>
        </View>
      )}
      <View style={styles.featuredContent}>
        <Text style={styles.featuredName}>{item.name}</Text>
        <Text style={styles.featuredPrice}>₹{item.price}/{item.unit}</Text>
        
        <View style={styles.featuredInfo}>
          <View style={styles.farmerInfo}>
            <Text style={styles.farmerName}>{item.farmerName}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={12} color={colors.gray[500]} />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </View>
          
          <View style={styles.ratingContainer}>
            <Star size={14} color={colors.warning[500]} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={[colors.primary[600], colors.primary[700]]} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Good Morning!</Text>
            <Text style={styles.userName}>{user?.name}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={16} color={colors.primary[200]} />
              <Text style={styles.locationText}>
                {user?.location?.address || 'Set your location'}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color={colors.white} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
        
        {/* Search */}
        <View style={styles.searchContainer}>
          <Input
            label=""
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for fresh produce..."
            icon={<Search size={20} color={colors.gray[400]} />}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={colors.primary[600]} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shop by Category</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Quick Stats */}
      <View style={styles.section}>
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <ShoppingCart size={24} color={colors.primary[600]} />
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Items in Cart</Text>
            </View>
          </Card>
          
          <Card style={styles.statCard}>
            <View style={styles.statContent}>
              <Truck size={24} color={colors.secondary[600]} />
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Active Orders</Text>
            </View>
          </Card>
        </View>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Fresh from Local Farms</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={featuredProducts}
          renderItem={renderFeaturedProduct}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
        />
      </View>

      {/* Recommended for You */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended for You</Text>
        <Card style={styles.recommendedCard}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=600' }}
            style={styles.recommendedImage}
          />
          <View style={styles.recommendedContent}>
            <Text style={styles.recommendedTitle}>Fresh Seasonal Vegetables</Text>
            <Text style={styles.recommendedSubtitle}>
              Hand-picked selection from verified organic farms
            </Text>
            <TouchableOpacity style={styles.recommendedButton}>
              <Text style={styles.recommendedButtonText}>Explore Now</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.primary[100],
  },
  userName: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xl,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.primary[200],
    marginLeft: spacing.xs,
  },
  notificationButton: {
    position: 'relative',
    padding: spacing.sm,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent[500],
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  filterButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.lg,
    color: colors.gray[800],
  },
  sectionAction: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
  },
  categoriesList: {
    paddingRight: spacing.lg,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.xs,
    color: colors.gray[700],
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  statContent: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xl,
    color: colors.gray[800],
    marginVertical: spacing.sm,
  },
  statLabel: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  featuredList: {
    paddingRight: spacing.lg,
  },
  featuredCard: {
    width: 200,
    marginRight: spacing.md,
  },
  featuredImage: {
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
  featuredContent: {
    flex: 1,
  },
  featuredName: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
    marginBottom: spacing.xs,
  },
  featuredPrice: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
    marginBottom: spacing.sm,
  },
  featuredInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  farmerInfo: {
    flex: 1,
  },
  farmerName: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.xs,
    color: colors.gray[600],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.xs,
    color: colors.gray[600],
    marginLeft: spacing.xs,
  },
  recommendedCard: {
    flexDirection: 'row',
    padding: 0,
    overflow: 'hidden',
  },
  recommendedImage: {
    width: 120,
    height: 120,
  },
  recommendedContent: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  recommendedTitle: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
    marginBottom: spacing.xs,
  },
  recommendedSubtitle: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  recommendedButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary[600],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  recommendedButtonText: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.white,
  },
});