import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Modal from '@/src/components/common/Modal/Modal';
import Button from '@/src/components/common/Button/Button';

interface FilterOptions {
  category: string;
  priceRange: [number, number];
  isOrganic: boolean;
  location: string;
  rating: number;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
}

export default function FilterModal({
  visible,
  onClose,
  filters,
  onApplyFilters,
}: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'grains', name: 'Grains' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'herbs', name: 'Herbs' },
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'bangalore', name: 'Bangalore' },
    { id: 'mumbai', name: 'Mumbai' },
    { id: 'delhi', name: 'Delhi' },
    { id: 'chennai', name: 'Chennai' },
    { id: 'hyderabad', name: 'Hyderabad' },
  ];

  const priceRanges = [
    { id: 'all', name: 'Any Price', min: 0, max: 1000 },
    { id: 'low', name: '₹0 - ₹50', min: 0, max: 50 },
    { id: 'medium', name: '₹50 - ₹150', min: 50, max: 150 },
    { id: 'high', name: '₹150+', min: 150, max: 1000 },
  ];

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setLocalFilters({
      category: 'all',
      priceRange: [0, 1000],
      isOrganic: false,
      location: 'all',
      rating: 0,
    });
  };

  const applyFilters = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose} title="Filter Products">
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Category</Text>
          <View style={styles.optionsGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.optionButton,
                  localFilters.category === category.id && styles.optionButtonSelected
                ]}
                onPress={() => updateFilter('category', category.id)}
              >
                <Text style={[
                  styles.optionText,
                  localFilters.category === category.id && styles.optionTextSelected
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Price Range */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Price Range</Text>
          <View style={styles.optionsGrid}>
            {priceRanges.map((range) => (
              <TouchableOpacity
                key={range.id}
                style={[
                  styles.optionButton,
                  localFilters.priceRange[0] === range.min && 
                  localFilters.priceRange[1] === range.max && 
                  styles.optionButtonSelected
                ]}
                onPress={() => updateFilter('priceRange', [range.min, range.max])}
              >
                <Text style={[
                  styles.optionText,
                  localFilters.priceRange[0] === range.min && 
                  localFilters.priceRange[1] === range.max && 
                  styles.optionTextSelected
                ]}>
                  {range.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Organic Filter */}
        <View style={styles.filterSection}>
          <TouchableOpacity 
            style={styles.organicToggle}
            onPress={() => updateFilter('isOrganic', !localFilters.isOrganic)}
          >
            <View style={[
              styles.checkbox,
              localFilters.isOrganic && styles.checkboxSelected
            ]}>
              {localFilters.isOrganic && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.organicLabel}>Organic products only</Text>
          </TouchableOpacity>
        </View>

        {/* Location Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Location</Text>
          <View style={styles.optionsGrid}>
            {locations.map((location) => (
              <TouchableOpacity
                key={location.id}
                style={[
                  styles.optionButton,
                  localFilters.location === location.id && styles.optionButtonSelected
                ]}
                onPress={() => updateFilter('location', location.id)}
              >
                <Text style={[
                  styles.optionText,
                  localFilters.location === location.id && styles.optionTextSelected
                ]}>
                  {location.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rating Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Minimum Rating</Text>
          <View style={styles.ratingContainer}>
            {[0, 3, 4, 4.5].map((rating) => (
              <TouchableOpacity
                key={rating}
                style={[
                  styles.ratingButton,
                  localFilters.rating === rating && styles.ratingButtonSelected
                ]}
                onPress={() => updateFilter('rating', rating)}
              >
                <Text style={[
                  styles.ratingText,
                  localFilters.rating === rating && styles.ratingTextSelected
                ]}>
                  {rating === 0 ? 'Any' : `${rating}+ ⭐`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Actions */}
      <View style={styles.actions}>
        <Button
          title="Reset"
          variant="outline"
          onPress={resetFilters}
          style={styles.actionButton}
        />
        <Button
          title="Apply Filters"
          onPress={applyFilters}
          style={styles.actionButton}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    maxHeight: 400,
  },
  filterSection: {
    marginBottom: spacing.lg,
  },
  filterTitle: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
    marginBottom: spacing.md,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  optionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.gray[100],
    marginBottom: spacing.xs,
  },
  optionButtonSelected: {
    backgroundColor: colors.primary[600],
  },
  optionText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  optionTextSelected: {
    color: colors.white,
  },
  organicToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    padding: spacing.md,
    borderRadius: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.gray[300],
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.success[500],
    borderColor: colors.success[500],
  },
  checkmark: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fonts.primary.semiBold,
  },
  organicLabel: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.md,
    color: colors.gray[700],
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  ratingButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
  },
  ratingButtonSelected: {
    backgroundColor: colors.warning[100],
  },
  ratingText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  ratingTextSelected: {
    color: colors.warning[700],
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actionButton: {
    flex: 1,
  },
});