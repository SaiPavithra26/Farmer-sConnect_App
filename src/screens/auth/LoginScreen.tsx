import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { setUser } from '@/src/store/slices/authSlice';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Button from '@/src/components/common/Button/Button';
import Input from '@/src/components/common/Input/Input';
import { RootStackParamList, MainTabParamList } from '@/src/types/navigation';
import { Sprout, Mail, Lock } from 'lucide-react-native';
import { AuthAPI } from '@/src/services/api/authAPI';
import { useResponsive } from '@/src/hooks/useResponsive';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const { isSmallScreen, isTallScreen } = useResponsive();

  const getStyles = () =>
    StyleSheet.create({
      container: {
        flex: 1,
      },
      scrollContent: {
        flexGrow: 1,
        paddingHorizontal: isSmallScreen ? spacing.md : spacing.lg,
        paddingTop: isTallScreen ? 100 : 80,
        paddingBottom: isSmallScreen ? spacing.md : spacing.lg,
      },
      header: {
        alignItems: 'center',
        marginBottom: isSmallScreen ? spacing.xl : spacing.xxxl,
      },
      iconContainer: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: isSmallScreen ? spacing.sm : spacing.md,
        marginBottom: spacing.md,
        shadowColor: colors.primary[900],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
      title: {
        fontFamily: fonts.heading.semiBold,
        fontSize: isSmallScreen ? fonts.sizes.xxl : fonts.sizes.xxxl,
        color: colors.primary[800],
        marginBottom: spacing.sm,
        textAlign: 'center',
      },
      subtitle: {
        fontFamily: fonts.primary.regular,
        fontSize: isSmallScreen ? fonts.sizes.sm : fonts.sizes.md,
        color: colors.gray[600],
        textAlign: 'center',
        lineHeight: isSmallScreen ? 20 : 22,
        paddingHorizontal: isSmallScreen ? spacing.sm : 0,
      },
      form: {
        flex: 1,
        justifyContent: 'center',
      },
      forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: isSmallScreen ? spacing.md : spacing.lg,
      },
      forgotPasswordText: {
        fontFamily: fonts.primary.medium,
        fontSize: isSmallScreen ? fonts.sizes.xs : fonts.sizes.sm,
        color: colors.primary[600],
      },
      loginButton: {
        marginBottom: isSmallScreen ? spacing.md : spacing.lg,
      },
      footer: {
        alignItems: 'center',
        paddingBottom: isSmallScreen ? spacing.md : spacing.xl,
      },
      footerText: {
        fontFamily: fonts.primary.regular,
        fontSize: isSmallScreen ? fonts.sizes.xs : fonts.sizes.sm,
        color: colors.gray[600],
        textAlign: 'center',
      },
      footerLink: {
        fontFamily: fonts.primary.medium,
        color: colors.primary[600],
      },
    });

  const styles = getStyles();

  const getInitialTabForRole = (
    role: 'farmer' | 'customer'
  ): keyof MainTabParamList => {
    switch (role) {
      case 'farmer':
        return 'Home';
      case 'customer':
        return 'Home';
      default:
        return 'Home';
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    // ✅ FIXED: pass only { email, password }
    const response = await AuthAPI.login({ email, password });

    if (response.success && response.data) {
      const { user } = response.data;

      dispatch(setUser(user));
      setLoading(false);

      const initialTab = getInitialTabForRole(user.role);

      navigation.replace('Main', {
        screen: 'Home',
        params: { screen: 'Dashboard' },
      });
    } else {
      setLoading(false);
      Alert.alert('Login Failed', response.message || 'Invalid credentials');
    }
  };

  return (
    <LinearGradient
      colors={[colors.primary[50], colors.white]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Sprout size={40} color={colors.primary[600]} />
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Sign in to your FarmersConnect account
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
            onPress={() =>
              navigation.navigate('Auth', { screen: 'ForgotPassword' })
            }
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
            Don&apos;t have an account?{' '}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Auth', { screen: 'Register' })
              }
            >
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
