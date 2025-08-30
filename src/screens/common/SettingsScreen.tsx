import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/src/store';
import { setTheme, setLanguage } from '@/src/store/slices/appSlice';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Header from '@/src/components/common/Header/Header';
import Card from '@/src/components/common/Card/Card';
import { Bell, Moon, Globe, Shield, CircleHelp as HelpCircle, Mail, Star, ChevronRight, Smartphone, MapPin } from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme, language } = useSelector((state: RootState) => state.app);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [notifications, setNotifications] = useState({
    orders: true,
    messages: true,
    promotions: false,
    updates: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
  ];

  const handleLanguageChange = (langCode: string) => {
    dispatch(setLanguage(langCode));
    Alert.alert('Language Updated', 'App language has been changed successfully.');
  };

  const settingSections = [
    {
      title: 'Notifications',
      icon: <Bell size={20} color={colors.primary[600]} />,
      items: [
        {
          title: 'Order Updates',
          subtitle: 'Get notified about order status changes',
          type: 'toggle',
          value: notifications.orders,
          onToggle: () => toggleNotification('orders'),
        },
        {
          title: 'New Messages',
          subtitle: 'Receive notifications for new messages',
          type: 'toggle',
          value: notifications.messages,
          onToggle: () => toggleNotification('messages'),
        },
        {
          title: 'Promotions',
          subtitle: 'Get updates about offers and promotions',
          type: 'toggle',
          value: notifications.promotions,
          onToggle: () => toggleNotification('promotions'),
        },
        {
          title: 'App Updates',
          subtitle: 'Notifications about new features',
          type: 'toggle',
          value: notifications.updates,
          onToggle: () => toggleNotification('updates'),
        },
      ],
    },
    {
      title: 'Appearance',
      icon: <Moon size={20} color={colors.secondary[600]} />,
      items: [
        {
          title: 'Dark Mode',
          subtitle: 'Switch between light and dark theme',
          type: 'toggle',
          value: theme === 'dark',
          onToggle: () => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark')),
        },
      ],
    },
    {
      title: 'Language & Region',
      icon: <Globe size={20} color={colors.accent[600]} />,
      items: [
        {
          title: 'App Language',
          subtitle: `Currently: ${languages.find(l => l.code === language)?.name}`,
          type: 'navigation',
          onPress: () => {
            Alert.alert(
              'Select Language',
              'Choose your preferred language',
              languages.map(lang => ({
                text: lang.name,
                onPress: () => handleLanguageChange(lang.code),
              }))
            );
          },
        },
        {
          title: 'Location Services',
          subtitle: 'Manage location permissions',
          type: 'navigation',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Privacy & Security',
      icon: <Shield size={20} color={colors.success[600]} />,
      items: [
        {
          title: 'Privacy Policy',
          subtitle: 'Read our privacy policy',
          type: 'navigation',
          onPress: () => {},
        },
        {
          title: 'Terms of Service',
          subtitle: 'View terms and conditions',
          type: 'navigation',
          onPress: () => {},
        },
        {
          title: 'Data Management',
          subtitle: 'Manage your data and downloads',
          type: 'navigation',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Support',
      icon: <HelpCircle size={20} color={colors.warning[600]} />,
      items: [
        {
          title: 'Help Center',
          subtitle: 'Find answers to common questions',
          type: 'navigation',
          onPress: () => {},
        },
        {
          title: 'Contact Support',
          subtitle: 'Get help from our support team',
          type: 'navigation',
          onPress: () => {},
        },
        {
          title: 'Report a Bug',
          subtitle: 'Help us improve the app',
          type: 'navigation',
          onPress: () => {},
        },
        {
          title: 'Rate the App',
          subtitle: 'Share your feedback on app stores',
          type: 'navigation',
          onPress: () => {},
        },
      ],
    },
  ];

  const renderSettingItem = (item: any) => (
    <View key={item.title} style={styles.settingItem}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
      </View>
      
      {item.type === 'toggle' ? (
        <Switch
          value={item.value}
          onValueChange={item.onToggle}
          trackColor={{ false: colors.gray[300], true: colors.primary[200] }}
          thumbColor={item.value ? colors.primary[600] : colors.white}
        />
      ) : (
        <TouchableOpacity onPress={item.onPress} style={styles.navigationButton}>
          <ChevronRight size={16} color={colors.gray[400]} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Settings" 
        showBackButton 
        onBackPress={() => router.back()}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* App Info */}
        <Card style={styles.appInfoCard}>
          <View style={styles.appInfo}>
            <View style={styles.appIcon}>
              <Text style={styles.appIconText}>FC</Text>
            </View>
            <View style={styles.appDetails}>
              <Text style={styles.appName}>FarmersConnect</Text>
              <Text style={styles.appVersion}>Version 1.0.0</Text>
              <Text style={styles.userInfo}>
                Logged in as: {user?.name} ({user?.role})
              </Text>
            </View>
          </View>
        </Card>

        {/* Settings Sections */}
        {settingSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              {section.icon}
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            
            <Card style={styles.sectionCard}>
              {section.items.map((item, index) => (
                <View key={item.title}>
                  {renderSettingItem(item)}
                  {index < section.items.length - 1 && <View style={styles.separator} />}
                </View>
              ))}
            </Card>
          </View>
        ))}

        {/* App Credits */}
        <Card style={styles.creditsCard}>
          <Text style={styles.creditsTitle}>About FarmersConnect</Text>
          <Text style={styles.creditsText}>
            Connecting farmers directly with customers to support local agriculture 
            and provide fresh, quality produce. Built with love for the farming community.
          </Text>
          
          <View style={styles.creditsFooter}>
            <Text style={styles.creditsFooterText}>
              © 2025 FarmersConnect. All rights reserved.
            </Text>
          </View>
        </Card>
      </ScrollView>
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
  appInfoCard: {
    margin: spacing.lg,
    marginBottom: spacing.md,
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  appIconText: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xl,
    color: colors.white,
  },
  appDetails: {
    flex: 1,
  },
  appName: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.lg,
    color: colors.gray[800],
  },
  appVersion: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  userInfo: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
    marginTop: spacing.xs,
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
  sectionCard: {
    paddingVertical: spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
    marginBottom: spacing.xs,
  },
  settingSubtitle: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    lineHeight: 18,
  },
  navigationButton: {
    padding: spacing.xs,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray[100],
    marginLeft: spacing.sm,
  },
  creditsCard: {
    margin: spacing.lg,
    marginTop: 0,
  },
  creditsTitle: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
    marginBottom: spacing.sm,
  },
  creditsText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  creditsFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTop: spacing.md,
  },
  creditsFooterText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[500],
    textAlign: 'center',
  },
});