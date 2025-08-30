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
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { setUser } from '@/src/store/slices/authSlice';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Button from '@/src/components/common/Button/Button';
import Input from '@/src/components/common/Input/Input';
import { Sprout, Mail, Lock } from 'lucide-react-native';
import { AuthAPI } from '@/src/services/api/authAPI';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await AuthAPI.login({ email, password });

      if (response.success && response.data) {
        const { user } = response.data;

        // Dispatch user data to Redux store
        dispatch(setUser(user));

        // Navigate to main app
        router.replace('/(tabs)');

        Alert.alert('Success', `Welcome back, ${user.name}!`);
      } else {
        Alert.alert('Login Failed', response.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={[colors.primary[50], colors.white]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Sprout size={40} color={colors.primary[600]} />
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your FarmersConnect account</Text>
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
          
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            icon={<Lock size={20} color={colors.gray[400]} />}
          />

          <TouchableOpacity 
            style={styles.forgotPassword}
            onPress={() => router.push('/auth/forgot-password')}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={() => router.push('/auth/register')}>
              <Text style={styles.footerLink}>Sign Up</Text>
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
    paddingTop: 80,
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
  },
  form: {
    flex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
  },
  loginButton: {
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