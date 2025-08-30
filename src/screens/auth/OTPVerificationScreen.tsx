import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Button from '@/src/components/common/Button/Button';
import { Sprout, ArrowLeft, Shield } from 'lucide-react-native';

export default function OTPVerificationScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      Alert.alert('Error', 'Please enter the complete OTP');
      return;
    }

    setLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'OTP verified successfully!', [
        { text: 'OK', onPress: () => router.push('/auth/login') }
      ]);
    }, 1000);
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setTimer(60);
    
    // Simulate resend OTP
    setTimeout(() => {
      setResendLoading(false);
      Alert.alert('OTP Sent', 'A new OTP has been sent to your email');
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
            <Shield size={40} color={colors.primary[600]} />
          </View>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit code to{'\n'}
            <Text style={styles.emailText}>{email}</Text>
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputRefs.current[index] = ref;
                }}
                style={[
                  styles.otpInput,
                  digit && styles.otpInputFilled
                ]}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          <Button
            title="Verify OTP"
            onPress={handleVerifyOTP}
            loading={loading}
            style={styles.verifyButton}
          />

          <View style={styles.resendContainer}>
            {timer > 0 ? (
              <Text style={styles.timerText}>
                Resend OTP in {timer} seconds
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResendOTP} disabled={resendLoading}>
                <Text style={styles.resendText}>
                  {resendLoading ? 'Sending...' : 'Resend OTP'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
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
  emailText: {
    fontFamily: fonts.primary.semiBold,
    color: colors.primary[600],
  },
  form: {
    flex: 1,
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    width: '100%',
    maxWidth: 300,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: colors.gray[300],
    borderRadius: 12,
    textAlign: 'center',
    fontSize: fonts.sizes.xl,
    fontFamily: fonts.primary.semiBold,
    color: colors.gray[800],
    backgroundColor: colors.white,
  },
  otpInputFilled: {
    borderColor: colors.primary[600],
    backgroundColor: colors.primary[50],
  },
  verifyButton: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  resendContainer: {
    alignItems: 'center',
  },
  timerText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[500],
  },
  resendText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
  },
});