import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { colors } from '@/src/styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Sprout, Users, ShoppingCart } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, user]);

  return (
    <LinearGradient colors={[colors.primary[50], colors.primary[100]]} style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Sprout size={48} stroke={colors.primary[600]} />

        </View>
        <Text style={styles.title}>FarmersConnect</Text>
        <Text style={styles.subtitle}>
          Connecting farms to tables, supporting local agriculture
        </Text>
      </View>

      
        
        <View style={styles.features}>
          <View style={styles.feature}>
            <Users size={32} color={colors.secondary[600]} />
            <Text style={styles.featureText}>Direct farmer-customer connection</Text>
          </View>
          <View style={styles.feature}>
            <ShoppingCart size={32} color={colors.secondary[600]} />
            <Text style={styles.featureText}>Fresh produce marketplace</Text>
          </View>
          <View style={styles.feature}>
            <Sprout size={32} color={colors.secondary[600]} />
            <Text style={styles.featureText}>Support local agriculture</Text>
          </View>
       
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => router.push('/auth/login')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.push('/auth/register')}
        >
          <Text style={styles.secondaryButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 40,
  },
  iconContainer: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.primary[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 32,
    color: colors.primary[800],
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.primary[600],
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 32,
  },
  features: {
    gap: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    shadowColor: colors.primary[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.gray[700],
    marginLeft: 16,
    flex: 1,
  },
  footer: {
    paddingBottom: 40,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: colors.primary[600],
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 16,
    color: colors.white,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary[200],
  },
  secondaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.primary[600],
  },
});