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
import { Sprout, Mail, ArrowLeft } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Reset Link Sent', 
        'We have sent a password reset link to your email address.',
        [{ text: 'OK', onPress: () => router.push('/auth/login') }]
      );
    }, 1000);
  };

  return (
    <LinearGradient colors={[colors.primary[50], colors.white]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.primary[600]} />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Sprout size={40} color={colors.primary[600]} />
          </View>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you a link to reset your password
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            icon={<Mail size={20} color={colors.gray[400]} />}
          />

          <Button
            title="Send Reset Link"
            onPress={handleResetPassword}
            loading={loading}
            style={styles.resetButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Remember your password?{' '}
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
  backButton: {
    alignSelf: 'flex-start',
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
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
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  resetButton: {
    marginTop: spacing.lg,
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