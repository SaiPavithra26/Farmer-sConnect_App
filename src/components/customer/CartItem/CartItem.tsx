import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

interface CartItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
  farmerName: string;
}

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemComponent({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}: CartItemProps) {
  const incrementQuantity = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.farmer}>by {item.farmerName}</Text>
        <Text style={styles.price}>₹{item.price}/{item.unit}</Text>
        
        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={decrementQuantity}
            >
              <Minus size={16} color={colors.primary[600]} />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{item.quantity}</Text>
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={incrementQuantity}
            >
              <Plus size={16} color={colors.primary[600]} />
            </TouchableOpacity>
          </View>

          <Text style={styles.total}>₹{item.price * item.quantity}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => onRemove(item.id)}
      >
        <Trash2 size={18} color={colors.error[500]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  name: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
    marginBottom: spacing.xs,
  },
  farmer: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  price: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    borderRadius: 8,
    paddingHorizontal: spacing.xs,
  },
  quantityButton: {
    padding: spacing.sm,
  },
  quantity: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
    marginHorizontal: spacing.sm,
  },
  total: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.primary[600],
  },
  removeButton: {
    padding: spacing.sm,
    marginLeft: spacing.sm,
  },
});