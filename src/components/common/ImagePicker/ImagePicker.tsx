import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import { Camera, Image as ImageIcon, X, Plus } from 'lucide-react-native';

interface ImagePickerProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  label?: string;
  required?: boolean;
}

export default function ImagePicker({
  images,
  onImagesChange,
  maxImages = 5,
  label = 'Product Images',
  required = false,
}: ImagePickerProps) {
  const [loading, setLoading] = useState(false);

  const handleAddImage = () => {
    if (images.length >= maxImages) {
      Alert.alert('Limit Reached', `You can only add up to ${maxImages} images`);
      return;
    }

    Alert.alert(
      'Select Image',
      'Choose how you want to add an image',
      [
        { text: 'Camera', onPress: () => takePhoto() },
        { text: 'Gallery', onPress: () => pickFromGallery() },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const takePhoto = async () => {
    setLoading(true);
    // Simulate camera capture - in real app, use expo-image-picker
    setTimeout(() => {
      const mockImageUrl = `https://images.pexels.com/photos/${1327838 + images.length}/pexels-photo-${1327838 + images.length}.jpeg?auto=compress&cs=tinysrgb&w=400`;
      onImagesChange([...images, mockImageUrl]);
      setLoading(false);
    }, 1000);
  };

  const pickFromGallery = async () => {
    setLoading(true);
    // Simulate gallery pick - in real app, use expo-image-picker
    setTimeout(() => {
      const mockImageUrl = `https://images.pexels.com/photos/${143133 + images.length}/pexels-photo-${143133 + images.length}.jpeg?auto=compress&cs=tinysrgb&w=400`;
      onImagesChange([...images, mockImageUrl]);
      setLoading(false);
    }, 1000);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      
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
            
            {images.length < maxImages && (
              <TouchableOpacity 
                style={styles.addImageButton}
                onPress={handleAddImage}
                disabled={loading}
              >
                {loading ? (
                  <Text style={styles.loadingText}>Adding...</Text>
                ) : (
                  <>
                    <Camera size={24} color={colors.gray[500]} />
                    <Text style={styles.addImageText}>Add Photo</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
      
      <Text style={styles.helperText}>
        {images.length}/{maxImages} images • Tap to add from camera or gallery
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  required: {
    color: colors.error[500],
  },
  imagesContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray[200],
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
  loadingText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.xs,
    color: colors.primary[600],
  },
  helperText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[500],
    marginTop: spacing.sm,
  },
});