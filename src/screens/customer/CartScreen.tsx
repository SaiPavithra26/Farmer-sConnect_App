import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Header from '@/src/components/common/Header/Header';
import Card from '@/src/components/common/Card/Card';
import Button from '@/src/components/common/Button/Button';
import CartItem from '@/src/components/customer/CartItem/CartItem';
import { ShoppingCart, Tag } from 'lucide-react-native';

export default function CartScreen() {
  const router = useRouter();
  
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Organic Tomatoes',
      price: 90,
      unit: 'kg',
      quantity: 2,
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
      farmerName: 'John Farmer',
    },
    {
      id: '2',
      name: 'Fresh Carrots',
      price: 60,
      unit: 'kg',
      quantity: 1,
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
      farmerName: 'Maria Garcia',
    },
  ]);

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderCartItem = ({ item }: { item: any }) => (
    <CartItem
      item={item}
      onUpdateQuantity={updateQuantity}
      onRemove={removeItem}
    />
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Shopping Cart" 
        showBackButton 
        onBackPress={() => router.back()}
        subtitle={`${totalItems} items`}
      />
      
      <View style={styles.content}>
        {cartItems.length > 0 ? (
          <>
            <FlatList
              data={cartItems}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.cartList}
            />

            {/* Promo Code */}
            <View style={styles.promoSection}>
              <Card style={styles.promoCard}>
                <View style={styles.promoHeader}>
                  <Tag size={20} color={colors.accent[600]} />
                  <Text style={styles.promoTitle}>Have a promo code?</Text>
                </View>
                <Button 
                  title="Apply Code" 
                  variant="outline" 
                  size="small"
                  onPress={() => {}}
                />
              </Card>
            </View>

            {/* Order Summary */}
            <View style={styles.summarySection}>
              <Card style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Order Summary</Text>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal ({totalItems} items)</Text>
                  <Text style={styles.summaryValue}>₹{totalAmount}</Text>
                </View>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery Fee</Text>
                  <Text style={styles.summaryValue}>₹50</Text>
                </View>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Platform Fee</Text>
                  <Text style={styles.summaryValue}>₹20</Text>
                </View>
                
                <View style={[styles.summaryRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalValue}>₹{totalAmount + 70}</Text>
                </View>
              </Card>
            </View>
          </>
        ) : (
          <View style={styles.emptyCart}>
            <ShoppingCart size={64} color={colors.gray[300]} />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>
              Browse our fresh produce and add items to your cart
            </Text>
            <Button
              title="Start Shopping"
              onPress={() => router.push('/(tabs)/marketplace')}
              style={styles.shopButton}
            />
          </View>
        )}
      </View>

      {cartItems.length > 0 && (
        <View style={styles.checkoutSection}>
          <Button
            title="Proceed to Checkout"
            onPress={() => router.push('/customer/checkout' as any)}
            style={styles.checkoutButton}
          />
        </View>
      )}
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
  cartList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  promoSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  promoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  promoTitle: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.md,
    color: colors.gray[700],
    marginLeft: spacing.sm,
  },
  summarySection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  summaryCard: {},
  summaryTitle: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.lg,
    color: colors.gray[800],
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.md,
    color: colors.gray[600],
  },
  summaryValue: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.md,
    color: colors.gray[700],
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: spacing.md,
    marginTop: spacing.md,
  },
  totalLabel: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.lg,
    color: colors.gray[800],
  },
  totalValue: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.lg,
    color: colors.primary[600],
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xl,
    color: colors.gray[700],
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.md,
    color: colors.gray[500],
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  shopButton: {
    marginTop: spacing.md,
  },
  checkoutSection: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  checkoutButton: {},
});