import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Button from '@/src/components/common/Button/Button';
import Input from '@/src/components/common/Input/Input';
import { Sprout, User, Mail, Lock, Phone, MapPin } from 'lucide-react-native';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'farmer' as 'farmer' | 'customer',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.push('/auth/login') }
      ]);
    }, 1000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <LinearGradient colors={[colors.primary[50], colors.white]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Sprout size={40} color={colors.primary[600]} />
          </View>
          <Text style={styles.title}>Join FarmersConnect</Text>
          <Text style={styles.subtitle}>Create your account to get started</Text>
        </View>

        <View style={styles.roleSelector}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              formData.role === 'farmer' && styles.roleButtonActive
            ]}
            onPress={() => updateFormData('role', 'farmer')}
          >
            <Text style={[
              styles.roleButtonText,
              formData.role === 'farmer' && styles.roleButtonTextActive
            ]}>
              I'm a Farmer
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.roleButton,
              formData.role === 'customer' && styles.roleButtonActive
            ]}
            onPress={() => updateFormData('role', 'customer')}
          >
            <Text style={[
              styles.roleButtonText,
              formData.role === 'customer' && styles.roleButtonTextActive
            ]}>
              I'm a Customer
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            value={formData.name}
            onChangeText={(value) => updateFormData('name', value)}
            placeholder="Enter your full name"
            icon={<User size={20} color={colors.gray[400]} />}
          />
          
          <Input
            label="Email Address"
            value={formData.email}
            onChangeText={(value) => updateFormData('email', value)}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            icon={<Mail size={20} color={colors.gray[400]} />}
          />

          <Input
            label="Phone Number"
            value={formData.phone}
            onChangeText={(value) => updateFormData('phone', value)}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            icon={<Phone size={20} color={colors.gray[400]} />}
          />
          
          <Input
            label="Password"
            value={formData.password}
            onChangeText={(value) => updateFormData('password', value)}
            placeholder="Create a password"
            secureTextEntry
            icon={<Lock size={20} color={colors.gray[400]} />}
          />

          <Input
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(value) => updateFormData('confirmPassword', value)}
            placeholder="Confirm your password"
            secureTextEntry
            icon={<Lock size={20} color={colors.gray[400]} />}
          />

          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.primary[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xxxl,
    color: colors.primary[800],
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.md,
    color: colors.gray[600],
    textAlign: 'center',
  },
  roleSelector: {
    flexDirection: 'row',
    backgroundColor: colors.gray[100],
    borderRadius: 12,
    padding: 4,
    marginBottom: spacing.lg,
  },
  roleButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: 8,
  },
  roleButtonActive: {
    backgroundColor: colors.primary[600],
  },
  roleButtonText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  roleButtonTextActive: {
    color: colors.white,
  },
  form: {
    flex: 1,
  },
  registerButton: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: spacing.xl,
  },
  footerText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  footerLink: {
    fontFamily: fonts.primary.medium,
    color: colors.primary[600],
  },
});