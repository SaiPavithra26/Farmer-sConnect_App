import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OrderStackParamList } from '@/src/types/navigation';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Header from '@/src/components/common/Header/Header';
import Card from '@/src/components/common/Card/Card';
import Input from '@/src/components/common/Input/Input';
import Button from '@/src/components/common/Button/Button';
import { MapPin, CreditCard, Calendar, Clock } from 'lucide-react-native';

type NavigationProp = StackNavigationProp<OrderStackParamList, 'Checkout'>;

export default function CheckoutScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [deliveryDate, setDeliveryDate] = useState('today');

  // Mock cart data
  const cartTotal = 320;
  const deliveryFee = 50;
  const platformFee = 20;
  const totalItems = 3; // Mock number of items
  const total = cartTotal + deliveryFee + platformFee;

  const paymentMethods = [
    { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
    { id: 'upi', name: 'UPI Payment', icon: '📱' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  ];

  const deliveryOptions = [
    { id: 'today', name: 'Today', time: '6 PM - 8 PM', fee: 50 },
    { id: 'tomorrow', name: 'Tomorrow', time: '10 AM - 6 PM', fee: 30 },
    { id: 'scheduled', name: 'Schedule Later', time: 'Choose date', fee: 20 },
  ];

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.pincode) {
      Alert.alert('Error', 'Please fill in all delivery address fields');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Order Placed!', 'Your order has been placed successfully.', [
        { text: 'OK', onPress: () => navigation.navigate('OrderHistory') }
      ]);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Checkout" 
        showBackButton 
        onBackPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color={colors.primary[600]} />
            <Text style={styles.sectionTitle}>Delivery Address</Text>
          </View>
          
          <Card style={styles.addressCard}>
            <Input
              label="Street Address"
              value={deliveryAddress.street}
              onChangeText={(value) => setDeliveryAddress(prev => ({ ...prev, street: value }))}
              placeholder="Enter your street address"
            />
            
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Input
                  label="City"
                  value={deliveryAddress.city}
                  onChangeText={(value) => setDeliveryAddress(prev => ({ ...prev, city: value }))}
                  placeholder="City"
                />
              </View>
              
              <View style={styles.halfWidth}>
                <Input
                  label="State"
                  value={deliveryAddress.state}
                  onChangeText={(value) => setDeliveryAddress(prev => ({ ...prev, state: value }))}
                  placeholder="State"
                />
              </View>
            </View>
            
            <Input
              label="PIN Code"
              value={deliveryAddress.pincode}
              onChangeText={(value) => setDeliveryAddress(prev => ({ ...prev, pincode: value }))}
              placeholder="Enter PIN code"
              keyboardType="numeric"
            />
          </Card>
        </View>

        {/* Delivery Options */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={20} color={colors.secondary[600]} />
            <Text style={styles.sectionTitle}>Delivery Options</Text>
          </View>
          
          <Card style={styles.deliveryCard}>
            {deliveryOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.deliveryOption,
                  deliveryDate === option.id && styles.deliveryOptionSelected
                ]}
                onPress={() => setDeliveryDate(option.id)}
              >
                <View style={[
                  styles.radioButton,
                  deliveryDate === option.id && styles.radioButtonSelected
                ]}>
                  {deliveryDate === option.id && <View style={styles.radioDot} />}
                </View>
                
                <View style={styles.deliveryInfo}>
                  <Text style={styles.deliveryName}>{option.name}</Text>
                  <Text style={styles.deliveryTime}>{option.time}</Text>
                </View>
                
                <Text style={styles.deliveryFee}>₹{option.fee}</Text>
              </TouchableOpacity>
            ))}
          </Card>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CreditCard size={20} color={colors.accent[600]} />
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          
          <Card style={styles.paymentCard}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentOption,
                  paymentMethod === method.id && styles.paymentOptionSelected
                ]}
                onPress={() => setPaymentMethod(method.id)}
              >
                <View style={[
                  styles.radioButton,
                  paymentMethod === method.id && styles.radioButtonSelected
                ]}>
                  {paymentMethod === method.id && <View style={styles.radioDot} />}
                </View>
                
                <Text style={styles.paymentIcon}>{method.icon}</Text>
                <Text style={styles.paymentName}>{method.name}</Text>
              </TouchableOpacity>
            ))}
          </Card>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <Card style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Cart Total</Text>
              <Text style={styles.summaryValue}>₹{cartTotal}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>
                ₹{deliveryOptions.find(d => d.id === deliveryDate)?.fee || 50}
              </Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Platform Fee</Text>
              <Text style={styles.summaryValue}>₹{platformFee}</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹{total}</Text>
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomSection}>
        <View style={styles.bottomTotal}>
          <Text style={styles.bottomTotalLabel}>Total: ₹{total}</Text>
          <Text style={styles.bottomTotalSubtext}>{totalItems} items</Text>
        </View>
        
        <Button
          title="Place Order"
          onPress={handlePlaceOrder}
          loading={loading}
          style={styles.placeOrderButton}
        />
      </View>
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.lg,
    color: colors.gray[800],
    marginLeft: spacing.sm,
  },
  addressCard: {},
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfWidth: {
    flex: 1,
  },
  deliveryCard: {},
  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  deliveryOptionSelected: {
    backgroundColor: colors.primary[50],
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray[300],
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: colors.primary[600],
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary[600],
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryName: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
  },
  deliveryTime: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  deliveryFee: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.primary[600],
  },
  paymentCard: {},
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  paymentOptionSelected: {
    backgroundColor: colors.primary[50],
  },
  paymentIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  paymentName: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.md,
    color: colors.gray[700],
    flex: 1,
  },
  summaryCard: {},
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
  bottomSection: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomTotal: {
    flex: 1,
  },
  bottomTotalLabel: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.lg,
    color: colors.gray[800],
  },
  bottomTotalSubtext: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  placeOrderButton: {
    flex: 1,
    marginLeft: spacing.md,
  },
});