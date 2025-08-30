import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Input from '@/src/components/common/Input/Input';
import Button from '@/src/components/common/Button/Button';
import ImagePicker from '@/src/components/common/ImagePicker/ImagePicker';
import { Plus, X } from 'lucide-react-native';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  unit: string;
  category: string;
  stock: string;
  harvestDate: string;
  isOrganic: boolean;
  tags: string[];
  images: string[];
}

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  loading?: boolean;
  submitButtonText?: string;
}

export default function ProductForm({
  initialData,
  onSubmit,
  loading = false,
  submitButtonText = 'Add Product',
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    unit: 'kg',
    category: 'vegetables',
    stock: '',
    harvestDate: '',
    isOrganic: false,
    tags: [],
    images: [],
    ...initialData,
  });

  const units = ['kg', 'bunch', 'piece', 'liter', 'dozen'];
  const categories = ['vegetables', 'fruits', 'grains', 'dairy', 'herbs'];

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.stock || formData.images.length === 0) {
      Alert.alert('Error', 'Please fill in all required fields and add at least one image');
      return;
    }

    onSubmit(formData);
  };

  const updateFormData = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(t => t !== tag) 
    }));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Product Images */}
      <ImagePicker
        images={formData.images}
        onImagesChange={(images) => updateFormData('images', images)}
        label="Product Images"
        required
      />

      {/* Basic Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product Details</Text>
        
        <Input
          label="Product Name *"
          value={formData.name}
          onChangeText={(value) => updateFormData('name', value)}
          placeholder="e.g., Organic Tomatoes"
        />

        <Input
          label="Description"
          value={formData.description}
          onChangeText={(value) => updateFormData('description', value)}
          placeholder="Describe your product..."
          multiline
          numberOfLines={3}
        />

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Input
              label="Price *"
              value={formData.price}
              onChangeText={(value) => updateFormData('price', value)}
              placeholder="0"
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Unit *</Text>
            <View style={styles.unitSelector}>
              {units.map((unit) => (
                <TouchableOpacity
                  key={unit}
                  style={[
                    styles.unitOption,
                    formData.unit === unit && styles.unitOptionSelected
                  ]}
                  onPress={() => updateFormData('unit', unit)}
                >
                  <Text style={[
                    styles.unitText,
                    formData.unit === unit && styles.unitTextSelected
                  ]}>
                    {unit}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Category *</Text>
            <View style={styles.categorySelector}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryOption,
                    formData.category === category && styles.categoryOptionSelected
                  ]}
                  onPress={() => updateFormData('category', category)}
                >
                  <Text style={[
                    styles.categoryText,
                    formData.category === category && styles.categoryTextSelected
                  ]}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.halfWidth}>
            <Input
              label="Available Stock *"
              value={formData.stock}
              onChangeText={(value) => updateFormData('stock', value)}
              placeholder="0"
              keyboardType="numeric"
            />
          </View>
        </View>

        <Input
          label="Harvest Date"
          value={formData.harvestDate}
          onChangeText={(value) => updateFormData('harvestDate', value)}
          placeholder="DD/MM/YYYY"
        />
      </View>

      {/* Organic Certification */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certification</Text>
        <TouchableOpacity 
          style={styles.organicToggle}
          onPress={() => updateFormData('isOrganic', !formData.isOrganic)}
        >
          <View style={[
            styles.checkbox,
            formData.isOrganic && styles.checkboxSelected
          ]}>
            {formData.isOrganic && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.organicLabel}>This is an organic product</Text>
        </TouchableOpacity>
      </View>

      {/* Tags */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tags (Optional)</Text>
        <View style={styles.tagsContainer}>
          {formData.tags.map((tag, index) => (
            <View key={index} style={styles.tagItem}>
              <Text style={styles.tagText}>{tag}</Text>
              <TouchableOpacity onPress={() => removeTag(tag)}>
                <X size={14} color={colors.primary[600]} />
              </TouchableOpacity>
            </View>
          ))}
          
          <TouchableOpacity 
            style={styles.addTagButton}
            onPress={() => addTag('Fresh')}
          >
            <Plus size={16} color={colors.gray[500]} />
            <Text style={styles.addTagText}>Add Tag</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.suggestedTags}>
          {['Fresh', 'Local', 'Premium', 'Seasonal'].map((tag) => (
            <TouchableOpacity
              key={tag}
              style={styles.suggestedTag}
              onPress={() => addTag(tag)}
            >
              <Text style={styles.suggestedTagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Button
        title={submitButtonText}
        onPress={handleSubmit}
        loading={loading}
        style={styles.submitButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.lg,
    color: colors.gray[800],
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  unitSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  unitOption: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    backgroundColor: colors.gray[100],
  },
  unitOptionSelected: {
    backgroundColor: colors.primary[600],
  },
  unitText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  unitTextSelected: {
    color: colors.white,
  },
  categorySelector: {
    gap: spacing.sm,
  },
  categoryOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.gray[100],
    marginBottom: spacing.xs,
  },
  categoryOptionSelected: {
    backgroundColor: colors.primary[600],
  },
  categoryText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    textAlign: 'center',
  },
  categoryTextSelected: {
    color: colors.white,
  },
  organicToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  tagItem: {
    backgroundColor: colors.primary[100],
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  tagText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[700],
    marginRight: spacing.xs,
  },
  addTagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    backgroundColor: colors.gray[100],
  },
  addTagText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    marginLeft: spacing.xs,
  },
  suggestedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  suggestedTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    backgroundColor: colors.gray[100],
  },
  suggestedTagText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  submitButton: {
    marginBottom: spacing.xl,
  },
});