import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/src/store';
import { logout } from '@/src/store/slices/authSlice';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Card from '@/src/components/common/Card/Card';
import Button from '@/src/components/common/Button/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Edit3, 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut,
  Star,
  Award,
  MapPin,
  Phone,
  Mail,
  Calendar,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            router.replace('/');
          }
        },
      ]
    );
  };

  const menuItems = [
    { 
      id: 'edit-profile', 
      title: 'Edit Profile', 
      icon: <Edit3 size={20} color={colors.gray[600]} />,
      onPress: () => {},
    },
    { 
      id: 'settings', 
      title: 'Settings', 
      icon: <Settings size={20} color={colors.gray[600]} />,
      onPress: () => {},
    },
    { 
      id: 'notifications', 
      title: 'Notifications', 
      icon: <Bell size={20} color={colors.gray[600]} />,
      onPress: () => {},
    },
    { 
      id: 'help', 
      title: 'Help & Support', 
      icon: <HelpCircle size={20} color={colors.gray[600]} />,
      onPress: () => {},
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <LinearGradient colors={[colors.primary[600], colors.primary[700]]} style={styles.header}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: user?.profileImage || 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200' }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userRole}>
            {user?.role === 'farmer' ? '🌾 Farmer' : '🛒 Customer'}
          </Text>
          
          {user?.role === 'farmer' && (
            <>
              <Text style={styles.farmName}>{user?.farmerProfile?.farmName}</Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color={colors.warning[400]} />
                <Text style={styles.rating}>4.8</Text>
                <Text style={styles.reviews}>(47 reviews)</Text>
              </View>
            </>
          )}
        </View>
      </LinearGradient>

      {/* Profile Details */}
      <View style={styles.section}>
        <Card style={styles.detailsCard}>
          <View style={styles.detailItem}>
            <Mail size={20} color={colors.gray[500]} />
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{user?.email}</Text>
          </View>
          
          {user?.phone && (
            <View style={styles.detailItem}>
              <Phone size={20} color={colors.gray[500]} />
              <Text style={styles.detailLabel}>Phone</Text>
              <Text style={styles.detailValue}>{user?.phone}</Text>
            </View>
          )}
          
          {user?.location && (
            <View style={styles.detailItem}>
              <MapPin size={20} color={colors.gray[500]} />
              <Text style={styles.detailLabel}>Location</Text>
              <Text style={styles.detailValue}>{user?.location.address}</Text>
            </View>
          )}
          
          <View style={styles.detailItem}>
            <Calendar size={20} color={colors.gray[500]} />
            <Text style={styles.detailLabel}>Member Since</Text>
            <Text style={styles.detailValue}>
              {new Date(user?.createdAt || '').toLocaleDateString('en-IN')}
            </Text>
          </View>
        </Card>
      </View>

      {/* Farmer-specific stats */}
      {user?.role === 'farmer' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Farm Statistics</Text>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Award size={24} color={colors.primary[600]} />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Products Listed</Text>
            </Card>
            
            <Card style={styles.statCard}>
              <Star size={24} color={colors.warning[500]} />
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </Card>
            
            <Card style={styles.statCard}>
              <Calendar size={24} color={colors.secondary[600]} />
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </Card>
          </View>
        </View>
      )}

      {/* Farm Profile (Farmer only) */}
      {user?.role === 'farmer' && user?.farmerProfile && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Farm Profile</Text>
          <Card style={styles.farmCard}>
            <View style={styles.farmDetail}>
              <Text style={styles.farmDetailLabel}>Farm Size</Text>
              <Text style={styles.farmDetailValue}>{user.farmerProfile.farmSize}</Text>
            </View>
            <View style={styles.farmDetail}>
              <Text style={styles.farmDetailLabel}>Experience</Text>
              <Text style={styles.farmDetailValue}>{user.farmerProfile.experience}</Text>
            </View>
            <View style={styles.farmDetail}>
              <Text style={styles.farmDetailLabel}>Specialization</Text>
              <Text style={styles.farmDetailValue}>
                {user.farmerProfile.specialization.join(', ')}
              </Text>
            </View>
            {user.farmerProfile.bio && (
              <View style={styles.farmDetail}>
                <Text style={styles.farmDetailLabel}>About</Text>
                <Text style={styles.farmBio}>{user.farmerProfile.bio}</Text>
              </View>
            )}
          </Card>
        </View>
      )}

      {/* Menu Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <Card style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index < menuItems.length - 1 && styles.menuItemBorder
              ]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemContent}>
                {item.icon}
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Card>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <Button
          title="Logout"
          variant="danger"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
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
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.md,
    borderWidth: 4,
    borderColor: colors.white,
  },
  userName: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xxl,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  userRole: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.md,
    color: colors.primary[200],
    marginBottom: spacing.sm,
  },
  farmName: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.md,
    color: colors.primary[100],
    marginBottom: spacing.sm,
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
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.lg,
    color: colors.gray[800],
    marginBottom: spacing.md,
  },
  detailsCard: {},
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  detailLabel: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    marginLeft: spacing.md,
    width: 80,
  },
  detailValue: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[800],
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginHorizontal: spacing.xs,
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
  farmCard: {},
  farmDetail: {
    marginBottom: spacing.md,
  },
  farmDetailLabel: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  farmDetailValue: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
  },
  farmBio: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.md,
    color: colors.gray[700],
    lineHeight: 22,
  },
  menuCard: {
    paddingVertical: spacing.sm,
  },
  menuItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.md,
    color: colors.gray[700],
    marginLeft: spacing.md,
  },
  logoutButton: {
    marginTop: spacing.md,
  },
});