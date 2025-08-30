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
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Header from '@/src/components/common/Header/Header';
import Input from '@/src/components/common/Input/Input';
import Button from '@/src/components/common/Button/Button';
import CropSelector from '@/src/components/farmer/CropSelector/CropSelector';
import { Camera, Plus, X } from 'lucide-react-native';

export default function AddProductScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    unit: 'kg',
    category: '',
    stock: '',
    harvestDate: '',
    isOrganic: false,
    tags: [] as string[],
  });
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const units = ['kg', 'bunch', 'piece', 'liter', 'dozen'];

  const handleAddImage = () => {
    // In a real app, this would open camera/gallery
    const mockImageUrl = 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400';
    setImages([...images, mockImageUrl]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.stock || images.length === 0) {
      Alert.alert('Error', 'Please fill in all required fields and add at least one image');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Product added successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }, 1000);
  };

  const updateFormData = (field: string, value: any) => {
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
    <View style={styles.container}>
      <Header 
        title="Add New Product" 
        showBackButton 
        onBackPress={() => router.back()}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Images *</Text>
          <View style={styles.imagesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.imagesList}>
                {images.map((image, index) => (
                  <View key={index} style={styles.imageItem}>
                    <Image source={{ uri: image }} style={styles.productImage} />
                    <TouchableOpacity 
                      style={styles.removeImageButton}
                      onPress={() => removeImage(index)}
                    >
                      <X size={16} color={colors.white} />
                    </TouchableOpacity>
                  </View>
                ))}
                
                <TouchableOpacity 
                  style={styles.addImageButton}
                  onPress={handleAddImage}
                >
                  <Camera size={24} color={colors.gray[500]} />
                  <Text style={styles.addImageText}>Add Photo</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>

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

          <Input
            label="Available Stock *"
            value={formData.stock}
            onChangeText={(value) => updateFormData('stock', value)}
            placeholder="0"
            keyboardType="numeric"
          />

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
          title="Add Product"
          onPress={handleSubmit}
          loading={loading}
          style={styles.submitButton}
        />
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
  imagesContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
  },
  imagesList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageItem: {
    position: 'relative',
    marginRight: spacing.sm,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.error[500],
    borderRadius: 10,
    padding: 2,
  },
  addImageButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.gray[300],
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.xs,
    color: colors.gray[500],
    marginTop: spacing.xs,
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
  organicToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
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
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
});