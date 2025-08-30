import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface NotificationData {
  title: string;
  body: string;
  data?: Record<string, any>;
  sound?: boolean;
  badge?: number;
}

export interface LocalNotificationData extends NotificationData {
  trigger?: {
    type: 'date' | 'timeInterval';
    date?: Date;
    seconds?: number;
    repeats?: boolean;
  };
}

class NotificationService {
  private static pushToken: string | null = null;

  static async initialize(): Promise<void> {
    try {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });

        // Create specific channels for different notification types
        await Notifications.setNotificationChannelAsync('orders', {
          name: 'Order Updates',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          sound: 'default',
        });

        await Notifications.setNotificationChannelAsync('messages', {
          name: 'Messages',
          importance: Notifications.AndroidImportance.DEFAULT,
          vibrationPattern: [0, 100, 100, 100],
          sound: 'default',
        });
      }

      // Request permissions
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        // Silently handle permission denial
        return;
      }

      // Get push token for remote notifications
      if (Device.isDevice) {
        this.pushToken = (await Notifications.getExpoPushTokenAsync()).data;

        // Store the token for later use
        await AsyncStorage.setItem('push_token', this.pushToken);
      } else {
        // Physical device required for push notifications
      }
    } catch (error) {
      // Silently handle initialization errors
    }
  }

  static async scheduleLocalNotification(notification: LocalNotificationData): Promise<string> {
    try {
      const trigger = notification.trigger || { seconds: 1 };

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: notification.title,
          body: notification.body,
          data: notification.data || {},
          sound: notification.sound !== false,
          badge: notification.badge,
        },
        trigger: trigger.seconds ? { type: SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: trigger.seconds } : null,
      });

      return notificationId;
    } catch (error) {
      // Silently handle scheduling errors
      throw error;
    }
  }

  static async showInstantNotification(notification: NotificationData): Promise<void> {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: notification.title,
          body: notification.body,
          data: notification.data || {},
          sound: notification.sound !== false,
          badge: notification.badge,
        },
        trigger: null, // Show immediately
      });
    } catch (error) {
      // Silently handle notification errors
    }
  }

  static async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      // Silently handle cancellation errors
    }
  }

  static async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      // Silently handle cancellation errors
    }
  }

  static async getBadgeCount(): Promise<number> {
    try {
      return await Notifications.getBadgeCountAsync();
    } catch (error) {
      // Silently handle badge count errors
      return 0;
    }
  }

  static async setBadgeCount(count: number): Promise<void> {
    try {
      await Notifications.setBadgeCountAsync(count);
    } catch (error) {
      // Silently handle badge setting errors
    }
  }

  static async clearBadge(): Promise<void> {
    try {
      await Notifications.setBadgeCountAsync(0);
    } catch (error) {
      // Silently handle badge clearing errors
    }
  }

  static getPushToken(): string | null {
    return this.pushToken;
  }

  static async getStoredPushToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('push_token');
    } catch (error) {
      // Silently handle token retrieval errors
      return null;
    }
  }

  // Notification listeners
  static addNotificationReceivedListener(
    listener: (notification: Notifications.Notification) => void
  ): Notifications.Subscription {
    return Notifications.addNotificationReceivedListener(listener);
  }

  static addNotificationResponseReceivedListener(
    listener: (response: Notifications.NotificationResponse) => void
  ): Notifications.Subscription {
    return Notifications.addNotificationResponseReceivedListener(listener);
  }

  static removeNotificationSubscription(subscription: Notifications.Subscription): void {
    Notifications.removeNotificationSubscription(subscription);
  }

  // Predefined notification templates
  static async notifyNewOrder(orderDetails: {
    orderId: string;
    customerName: string;
    amount: number;
  }): Promise<void> {
    await this.showInstantNotification({
      title: 'New Order Received! 🎉',
      body: `${orderDetails.customerName} placed an order worth ₹${orderDetails.amount}`,
      data: {
        type: 'new_order',
        orderId: orderDetails.orderId,
        screen: 'orders',
      },
    });
  }

  static async notifyOrderStatusUpdate(orderDetails: {
    orderId: string;
    status: string;
  }): Promise<void> {
    const statusMessages = {
      confirmed: 'Your order has been confirmed by the farmer',
      shipped: 'Your order is on the way! 🚚',
      delivered: 'Your order has been delivered successfully ✅',
      cancelled: 'Your order has been cancelled',
    };

    await this.showInstantNotification({
      title: 'Order Update',
      body: statusMessages[status as keyof typeof statusMessages] || `Order ${orderDetails.status}`,
      data: {
        type: 'order_update',
        orderId: orderDetails.orderId,
        screen: 'orders',
      },
    });
  }

  static async notifyNewMessage(messageDetails: {
    senderName: string;
    message: string;
    chatId: string;
  }): Promise<void> {
    await this.showInstantNotification({
      title: `New message from ${messageDetails.senderName}`,
      body: messageDetails.message,
      data: {
        type: 'new_message',
        chatId: messageDetails.chatId,
        screen: 'chat',
      },
    });
  }

  static async notifyPaymentReceived(amount: number): Promise<void> {
    await this.showInstantNotification({
      title: 'Payment Received! 💰',
      body: `₹${amount} has been credited to your account`,
      data: {
        type: 'payment',
        screen: 'earnings',
      },
    });
  }

  static async notifyLowStock(productName: string, stock: number): Promise<void> {
    await this.showInstantNotification({
      title: 'Low Stock Alert ⚠️',
      body: `${productName} has only ${stock} units left`,
      data: {
        type: 'low_stock',
        screen: 'products',
      },
    });
  }
}

export default NotificationService;