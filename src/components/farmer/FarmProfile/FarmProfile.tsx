import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import { User } from '@/src/types/user';
import Card from '@/src/components/common/Card/Card';
import { MapPin, Award, Calendar, Star } from 'lucide-react-native';

interface FarmProfileProps {
  farmer: User;
  showFullDetails?: boolean;
}

export default function FarmProfile({ farmer, showFullDetails = false }: FarmProfileProps) {
  if (!farmer.farmerProfile) return null;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Image 
          source={{ uri: farmer.profileImage || 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200' }}
          style={styles.farmerImage}
        />
        <View style={styles.farmerInfo}>
          <Text style={styles.farmerName}>{farmer.name}</Text>
          <Text style={styles.farmName}>{farmer.farmerProfile.farmName}</Text>
          
          {farmer.location && (
            <View style={styles.locationContainer}>
              <MapPin size={14} color={colors.gray[500]} />
              <Text style={styles.locationText}>{farmer.location.address}</Text>
            </View>
          )}

          <View style={styles.ratingContainer}>
            <Star size={16} color={colors.warning[500]} />
            <Text style={styles.rating}>4.8</Text>
            <Text style={styles.reviews}>(47 reviews)</Text>
          </View>
        </View>
      </View>

      {showFullDetails && (
        <View style={styles.details}>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Award size={20} color={colors.primary[600]} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Farm Size</Text>
                <Text style={styles.detailValue}>{farmer.farmerProfile.farmSize}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Calendar size={20} color={colors.secondary[600]} />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Experience</Text>
                <Text style={styles.detailValue}>{farmer.farmerProfile.experience}</Text>
              </View>
            </View>
          </View>

          <View style={styles.specializationContainer}>
            <Text style={styles.specializationLabel}>Specialization:</Text>
            <View style={styles.specializationTags}>
              {farmer.farmerProfile.specialization.map((spec, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{spec}</Text>
                </View>
              ))}
            </View>
          </View>

          {farmer.farmerProfile.certifications.length > 0 && (
            <View style={styles.certificationsContainer}>
              <Text style={styles.certificationsLabel}>Certifications:</Text>
              <View style={styles.certificationTags}>
                {farmer.farmerProfile.certifications.map((cert, index) => (
                  <View key={index} style={styles.certificationTag}>
                    <Award size={12} color={colors.success[600]} />
                    <Text style={styles.certificationText}>{cert}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {farmer.farmerProfile.bio && (
            <View style={styles.bioContainer}>
              <Text style={styles.bioLabel}>About the Farm:</Text>
              <Text style={styles.bioText}>{farmer.farmerProfile.bio}</Text>
            </View>
          )}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {},
  header: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  farmerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing.md,
  },
  farmerInfo: {
    flex: 1,
  },
  farmerName: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
    marginBottom: 2,
  },
  farmName: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
    marginBottom: spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  locationText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    marginLeft: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: fonts.primary.semiBold,
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
  details: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: spacing.md,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  detailContent: {
    marginLeft: spacing.sm,
  },
  detailLabel: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[600],
  },
  detailValue: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.gray[800],
  },
  specializationContainer: {
    marginBottom: spacing.md,
  },
  specializationLabel: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  specializationTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: colors.primary[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  tagText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.xs,
    color: colors.primary[700],
  },
  certificationsContainer: {
    marginBottom: spacing.md,
  },
  certificationsLabel: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  certificationTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  certificationTag: {
    backgroundColor: colors.success[100],
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  certificationText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.xs,
    color: colors.success[700],
    marginLeft: spacing.xs,
  },
  bioContainer: {},
  bioLabel: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.sm,
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  bioText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    lineHeight: 20,
  },
});