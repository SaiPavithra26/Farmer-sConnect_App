import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Header from '@/src/components/common/Header/Header';
import Card from '@/src/components/common/Card/Card';
import Button from '@/src/components/common/Button/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Edit3, 
  Camera, 
  Star, 
  Award, 
  MapPin, 
  Calendar,
  Package,
  Users,
  TrendingUp,
} from 'lucide-react-native';

export default function FarmProfileScreen() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  
  if (!user || user.role !== 'farmer' || !user.farmerProfile) {
    return null;
  }

  const [stats] = useState({
    totalProducts: 12,
    totalOrders: 156,
    totalCustomers: 89,
    monthlyRevenue: 45000,
    rating: 4.8,
    reviews: 47,
  });

  return (
    <View style={styles.container}>
      <Header 
        title="Farm Profile" 
        showBackButton 
        onBackPress={() => router.back()}
        rightIcon="search"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient colors={[colors.primary[600], colors.primary[700]]} style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: user.profileImage || 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.farmerName}>{user.name}</Text>
          <Text style={styles.farmName}>{user.farmerProfile.farmName}</Text>
          
          {user.location && (
            <View style={styles.locationContainer}>
              <MapPin size={16} color={colors.primary[200]} />
              <Text style={styles.locationText}>{user.location.address}</Text>
            </View>
          )}

          <View style={styles.ratingContainer}>
            <Star size={18} color={colors.warning[400]} />
            <Text style={styles.rating}>{stats.rating}</Text>
            <Text style={styles.reviews}>({stats.reviews} reviews)</Text>
          </View>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <Card style={styles.statCard}>
              <Package size={24} color={colors.primary[600]} />
              <Text style={styles.statNumber}>{stats.totalProducts}</Text>
              <Text style={styles.statLabel}>Products</Text>
            </Card>
            
            <Card style={styles.statCard}>
              <Users size={24} color={colors.secondary[600]} />
              <Text style={styles.statNumber}>{stats.totalCustomers}</Text>
              <Text style={styles.statLabel}>Customers</Text>
            </Card>
          </View>

          <View style={styles.statsRow}>
            <Card style={styles.statCard}>
              <TrendingUp size={24} color={colors.accent[600]} />
              <Text style={styles.statNumber}>{stats.totalOrders}</Text>
              <Text style={styles.statLabel}>Total Orders</Text>
            </Card>
            
            <Card style={styles.statCard}>
              <TrendingUp size={24} color={colors.success[600]} />
              <Text style={styles.statNumber}>₹{stats.monthlyRevenue.toLocaleString()}</Text>
              <Text style={styles.statLabel}>This Month</Text>
            </Card>
          </View>
        </View>

        {/* Farm Details */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Farm Details</Text>
            <TouchableOpacity style={styles.editButton}>
              <Edit3 size={16} color={colors.primary[600]} />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          
          <Card style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Farm Size:</Text>
              <Text style={styles.detailValue}>{user.farmerProfile.farmSize}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Experience:</Text>
              <Text style={styles.detailValue}>{user.farmerProfile.experience}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Member Since:</Text>
              <Text style={styles.detailValue}>
                {new Date(user.createdAt).toLocaleDateString('en-IN')}
              </Text>
            </View>
          </Card>
        </View>

        {/* Specialization */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specialization</Text>
          <Card style={styles.specializationCard}>
            <View style={styles.specializationTags}>
              {user.farmerProfile.specialization.map((spec, index) => (
                <View key={index} style={styles.specializationTag}>
                  <Text style={styles.specializationText}>{spec}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Certifications */}
        {user.farmerProfile.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <Card style={styles.certificationsCard}>
              {user.farmerProfile.certifications.map((cert, index) => (
                <View key={index} style={styles.certificationItem}>
                  <Award size={20} color={colors.success[600]} />
                  <Text style={styles.certificationText}>{cert}</Text>
                </View>
              ))}
            </Card>
          </View>
        )}

        {/* Bio */}
        {user.farmerProfile.bio && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About My Farm</Text>
            <Card style={styles.bioCard}>
              <Text style={styles.bioText}>{user.farmerProfile.bio}</Text>
            </Card>
          </View>
        )}

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Card style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={styles.activityDot} />
              <Text style={styles.activityText}>Added 3 new products</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityDot} />
              <Text style={styles.activityText}>Received 5 new orders</Text>
              <Text style={styles.activityTime}>5 hours ago</Text>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityDot} />
              <Text style={styles.activityText}>Updated farm location</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.lg,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: colors.white,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary[500],
    borderRadius: 16,
    padding: spacing.sm,
  },
  farmerName: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xxl,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  farmName: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.md,
    color: colors.primary[200],
    marginBottom: spacing.sm,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  locationText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.primary[100],
    marginLeft: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.white,
    marginLeft: spacing.xs,
  },
  reviews: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.primary[200],
    marginLeft: spacing.xs,
  },
  statsContainer: {
    paddingHorizontal: spacing.lg,
    marginTop: -spacing.xl,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: spacing.md,
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
    textAlign: 'center',
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
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  editButtonText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
    marginLeft: spacing.xs,
  },
  detailsCard: {},
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  detailLabel: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  detailValue: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.gray[800],
  },
  specializationCard: {},
  specializationTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  specializationTag: {
    backgroundColor: colors.primary[100],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  specializationText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[700],
  },
  certificationsCard: {},
  certificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  certificationText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.md,
    color: colors.success[700],
    marginLeft: spacing.sm,
  },
  bioCard: {},
  bioText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.md,
    color: colors.gray[700],
    lineHeight: 22,
  },
  activityCard: {},
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary[600],
    marginRight: spacing.md,
  },
  activityText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[700],
    flex: 1,
  },
  activityTime: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[500],
  },
});