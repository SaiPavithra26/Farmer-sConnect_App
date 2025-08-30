import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';

interface Crop {
  id: string;
  name: string;
  category: string;
  icon: string;
  season: string;
}

interface CropSelectorProps {
  selectedCrop?: string;
  onCropSelect: (crop: Crop) => void;
}

const CROPS: Crop[] = [
  { id: '1', name: 'Tomato', category: 'Vegetables', icon: '🍅', season: 'All Year' },
  { id: '2', name: 'Carrot', category: 'Vegetables', icon: '🥕', season: 'Winter' },
  { id: '3', name: 'Spinach', category: 'Leafy Greens', icon: '🥬', season: 'Winter' },
  { id: '4', name: 'Apple', category: 'Fruits', icon: '🍎', season: 'Winter' },
  { id: '5', name: 'Mango', category: 'Fruits', icon: '🥭', season: 'Summer' },
  { id: '6', name: 'Rice', category: 'Grains', icon: '🌾', season: 'Monsoon' },
  { id: '7', name: 'Wheat', category: 'Grains', icon: '🌾', season: 'Winter' },
  { id: '8', name: 'Potato', category: 'Vegetables', icon: '🥔', season: 'Winter' },
];

export default function CropSelector({ selectedCrop, onCropSelect }: CropSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Leafy Greens'];
  
  const filteredCrops = selectedCategory === 'All' 
    ? CROPS 
    : CROPS.filter(crop => crop.category === selectedCategory);

  const renderCrop = ({ item }: { item: Crop }) => (
    <TouchableOpacity
      style={[
        styles.cropItem,
        selectedCrop === item.id && styles.cropItemSelected
      ]}
      onPress={() => onCropSelect(item)}
    >
      <Text style={styles.cropIcon}>{item.icon}</Text>
      <Text style={[
        styles.cropName,
        selectedCrop === item.id && styles.cropNameSelected
      ]}>
        {item.name}
      </Text>
      <Text style={styles.cropSeason}>{item.season}</Text>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryTab,
        selectedCategory === item && styles.categoryTabActive
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[
        styles.categoryText,
        selectedCategory === item && styles.categoryTextActive
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Crop Type</Text>
      
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesList}
      />

      <FlatList
        data={filteredCrops}
        renderItem={renderCrop}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.cropsList}
        columnWrapperStyle={styles.cropsRow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.lg,
    color: colors.gray[800],
    marginBottom: spacing.md,
  },
  categoriesContainer: {
    maxHeight: 50,
    marginBottom: spacing.md,
  },
  categoriesList: {
    paddingRight: spacing.lg,
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
  categoryText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  categoryTextActive: {
    color: colors.white,
  },
  cropsList: {
    paddingBottom: spacing.xl,
  },
  cropsRow: {
    justifyContent: 'space-between',
  },
  cropItem: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: colors.gray[200],
  },
  cropItemSelected: {
    borderColor: colors.primary[600],
    backgroundColor: colors.primary[50],
  },
  cropIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  cropName: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[700],
    marginBottom: spacing.xs,
  },
  cropNameSelected: {
    color: colors.primary[700],
  },
  cropSeason: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[500],
  },
});