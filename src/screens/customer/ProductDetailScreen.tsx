import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Header from '@/src/components/common/Header/Header';
import Card from '@/src/components/common/Card/Card';
import Button from '@/src/components/common/Button/Button';
import FarmProfile from '@/src/components/farmer/FarmProfile/FarmProfile';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Package, 
  Heart,
  Share,
  MessageCircle,
  Minus,
  Plus,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data
  const product = {
    id: '1',
    name: 'Premium Organic Tomatoes',
    description: 'Fresh, juicy tomatoes grown using organic farming methods. Hand-picked at the perfect ripeness for maximum flavor and nutrition. These tomatoes are perfect for cooking, salads, and making fresh sauces.',
    price: 90,
    unit: 'kg',
    images: [
      'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    farmerName: 'John Farmer',
    farmLocation: 'Bangalore, Karnataka',
    stock: 50,
    rating: 4.8,
    reviewCount: 24,
    isOrganic: true,
    harvestDate: '2025-01-18',
    tags: ['Fresh', 'Local', 'Premium'],
  };

  const mockFarmer = {
    id: '1',
    name: 'John Farmer',
    email: 'john@example.com',
    role: 'farmer' as const,
    profileImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200',
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      address: 'Bangalore, Karnataka',
    },
    farmerProfile: {
      farmName: 'Green Valley Organic Farm',
      farmSize: '5 acres',
      experience: '10 years',
      specialization: ['Vegetables', 'Fruits'],
      certifications: ['Organic Certified', 'FSSAI Approved'],
      bio: 'Passionate about sustainable farming and providing fresh, healthy produce to our community.',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleAddToCart = () => {
    // Add to cart logic
    console.log(`Added ${quantity} ${product.unit} of ${product.name} to cart`);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Product Details" 
        showBackButton 
        onBackPress={() => router.back()}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product.images[selectedImageIndex] }} 
            style={styles.mainImage}
          />
          
          <View style={styles.imageActions}>
            <TouchableOpacity 
              style={[styles.actionButton, isFavorite && styles.favoriteActive]}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Heart size={20} color={isFavorite ? colors.white : colors.gray[600]} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Share size={20} color={colors.gray[600]} />
            </TouchableOpacity>
          </View>

          {product.isOrganic && (
            <View style={styles.organicBadge}>
              <Text style={styles.organicText}>Certified Organic</Text>
            </View>
          )}

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailContainer}
          >
            {product.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImageIndex(index)}
                style={[
                  styles.thumbnail,
                  selectedImageIndex === index && styles.thumbnailSelected
                ]}
              >
                <Image source={{ uri: image }} style={styles.thumbnailImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Product Information */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>₹{product.price} per {product.unit}</Text>
          
          <View style={styles.ratingRow}>
            <View style={styles.ratingContainer}>
              <Star size={16} color={colors.warning[500]} />
              <Text style={styles.rating}>{product.rating}</Text>
              <Text style={styles.reviews}>({product.reviewCount} reviews)</Text>
            </View>
            
            <View style={styles.stockContainer}>
              <Package size={16} color={colors.success[600]} />
              <Text style={styles.stockText}>{product.stock} {product.unit} available</Text>
            </View>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          {/* Product Details */}
          <Card style={styles.detailsCard}>
            <View style={styles.detailItem}>
              <Calendar size={20} color={colors.primary[600]} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Harvest Date</Text>
                <Text style={styles.detailValue}>
                  {new Date(product.harvestDate).toLocaleDateString('en-IN')}
                </Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <MapPin size={20} color={colors.secondary[600]} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Farm Location</Text>
                <Text style={styles.detailValue}>{product.farmLocation}</Text>
              </View>
            </View>
          </Card>

          {/* Tags */}
          {product.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              <Text style={styles.tagsTitle}>Features:</Text>
              <View style={styles.tags}>
                {product.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Farmer Profile */}
        <View style={styles.farmerSection}>
          <Text style={styles.sectionTitle}>About the Farmer</Text>
          <FarmProfile farmer={mockFarmer} showFullDetails={false} />
          
          <TouchableOpacity style={styles.chatButton}>
            <MessageCircle size={20} color={colors.secondary[600]} />
            <Text style={styles.chatButtonText}>Chat with Farmer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={decrementQuantity}
            >
              <Minus size={16} color={colors.primary[600]} />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{quantity} {product.unit}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={incrementQuantity}
            >
              <Plus size={16} color={colors.primary[600]} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <View style={styles.priceContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>₹{product.price * quantity}</Text>
          </View>
          
          <Button
            title="Add to Cart"
            onPress={handleAddToCart}
            style={styles.addToCartButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  mainImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  imageActions: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    gap: spacing.sm,
  },
  actionButton: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.sm,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteActive: {
    backgroundColor: colors.error[500],
  },
  organicBadge: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.md,
    backgroundColor: colors.success[500],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  organicText: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.white,
  },
  thumbnailContainer: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    maxWidth: 150,
  },
  thumbnail: {
    marginLeft: spacing.sm,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnailSelected: {
    borderWidth: 2,
    borderColor: colors.primary[600],
  },
  thumbnailImage: {
    width: 40,
    height: 40,
  },
  productInfo: {
    padding: spacing.lg,
  },
  productName: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xxl,
    color: colors.gray[800],
    marginBottom: spacing.sm,
  },
  productPrice: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.xl,
    color: colors.primary[600],
    marginBottom: spacing.md,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[700],
    marginLeft: spacing.xs,
  },
  reviews: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[500],
    marginLeft: spacing.xs,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.success[600],
    marginLeft: spacing.xs,
  },
  description: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.md,
    color: colors.gray[700],
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  detailsCard: {
    marginBottom: spacing.lg,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  detailContent: {
    marginLeft: spacing.md,
  },
  detailLabel: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  detailValue: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
  },
  tagsContainer: {
    marginBottom: spacing.lg,
  },
  tagsTitle: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: colors.primary[100],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  tagText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[700],
  },
  farmerSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.lg,
    color: colors.gray[800],
    marginBottom: spacing.md,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary[50],
    paddingVertical: spacing.md,
    borderRadius: 12,
    marginTop: spacing.md,
  },
  chatButtonText: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.secondary[700],
    marginLeft: spacing.sm,
  },
  bottomActions: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  quantitySection: {
    marginBottom: spacing.md,
  },
  quantityLabel: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    borderRadius: 12,
    paddingHorizontal: spacing.md,
  },
  quantityButton: {
    padding: spacing.md,
  },
  quantity: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.lg,
    color: colors.gray[800],
    marginHorizontal: spacing.lg,
    minWidth: 60,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  totalLabel: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  totalPrice: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.xl,
    color: colors.primary[600],
  },
  addToCartButton: {
    flex: 1,
    marginLeft: spacing.lg,
  },
});