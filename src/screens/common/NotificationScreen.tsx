import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Header from '@/src/components/common/Header/Header';
import Card from '@/src/components/common/Card/Card';
import { Bell, Package, MessageCircle, Star, TrendingUp, Gift, CircleAlert as AlertCircle, CircleCheck as CheckCircle } from 'lucide-react-native';

interface Notification {
  id: string;
  type: 'order' | 'message' | 'review' | 'promotion' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionData?: any;
  image?: string;
}

export default function NotificationScreen() {
  const router = useRouter();
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'New Order Received',
      message: 'Priya Sharma placed an order for Organic Tomatoes (5 kg)',
      timestamp: '2025-01-20T10:30:00',
      isRead: false,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'Rajesh Kumar sent you a message about Fresh Carrots',
      timestamp: '2025-01-20T09:15:00',
      isRead: false,
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      id: '3',
      type: 'review',
      title: 'New Review',
      message: 'You received a 5-star review for Green Leafy Vegetables',
      timestamp: '2025-01-19T18:45:00',
      isRead: true,
    },
    {
      id: '4',
      type: 'system',
      title: 'Payment Received',
      message: 'Payment of ₹450 has been credited to your account',
      timestamp: '2025-01-19T16:20:00',
      isRead: true,
    },
    {
      id: '5',
      type: 'promotion',
      title: 'Special Offer',
      message: 'Boost your sales with featured listings - 50% off this week!',
      timestamp: '2025-01-19T14:00:00',
      isRead: true,
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package size={24} color={colors.primary[600]} />;
      case 'message':
        return <MessageCircle size={24} color={colors.secondary[600]} />;
      case 'review':
        return <Star size={24} color={colors.warning[500]} />;
      case 'promotion':
        return <Gift size={24} color={colors.accent[600]} />;
      case 'system':
        return <TrendingUp size={24} color={colors.success[600]} />;
      default:
        return <Bell size={24} color={colors.gray[500]} />;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    // Navigate based on notification type
    switch (notification.type) {
      case 'order':
        router.push('/(tabs)/orders');
        break;
      case 'message':
        router.push('/(tabs)/chat');
        break;
      case 'review':
        router.push('/(tabs)/my-products');
        break;
      default:
        break;
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity onPress={() => handleNotificationPress(item)}>
      <Card style={[styles.notificationCard, !item.isRead && styles.unreadCard]}>
        <View style={styles.notificationContent}>
          <View style={styles.notificationIcon}>
            {getNotificationIcon(item.type)}
          </View>
          
          <View style={styles.notificationText}>
            <View style={styles.notificationHeader}>
              <Text style={[
                styles.notificationTitle,
                !item.isRead && styles.unreadTitle
              ]}>
                {item.title}
              </Text>
              {!item.isRead && <View style={styles.unreadDot} />}
            </View>
            
            <Text style={styles.notificationMessage}>{item.message}</Text>
            <Text style={styles.notificationTime}>
              {new Date(item.timestamp).toLocaleString('en-IN')}
            </Text>
          </View>

          {item.image && (
            <Image source={{ uri: item.image }} style={styles.notificationImage} />
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Notifications" 
        showBackButton 
        onBackPress={() => router.back()}
        subtitle={unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
      />

      {/* Quick Actions */}
      {unreadCount > 0 && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
            <CheckCircle size={16} color={colors.primary[600]} />
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.notificationsList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Bell size={64} color={colors.gray[300]} />
          <Text style={styles.emptyTitle}>No Notifications</Text>
          <Text style={styles.emptySubtitle}>
            You're all caught up! New notifications will appear here.
          </Text>
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
  actionsContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: colors.primary[50],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  markAllText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
    marginLeft: spacing.xs,
  },
  notificationsList: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  notificationCard: {
    marginBottom: spacing.sm,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary[600],
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    backgroundColor: colors.gray[50],
    borderRadius: 20,
    padding: spacing.sm,
    marginRight: spacing.md,
  },
  notificationText: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  notificationTitle: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[700],
    flex: 1,
  },
  unreadTitle: {
    color: colors.gray[800],
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary[600],
    marginLeft: spacing.sm,
  },
  notificationMessage: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  notificationTime: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[500],
  },
  notificationImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginLeft: spacing.sm,
  },
  emptyState: {
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
  },
});