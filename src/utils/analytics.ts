interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: string;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private userId: string | null = null;

  setUserId(userId: string) {
    this.userId = userId;
  }

  track(eventName: string, properties?: Record<string, any>) {
    const event: AnalyticsEvent = {
      name: eventName,
      properties,
      userId: this.userId || undefined,
      timestamp: new Date().toISOString(),
    };

    this.events.push(event);
    
    // In a real app, send to analytics service
    console.log('Analytics Event:', event);
  }

  // Predefined events for the app
  trackUserLogin(method: string) {
    this.track('user_login', { method });
  }

  trackUserRegister(role: string) {
    this.track('user_register', { role });
  }

  trackProductView(productId: string, productName: string) {
    this.track('product_view', { productId, productName });
  }

  trackProductAdd(productData: any) {
    this.track('product_add', productData);
  }

  trackOrderCreate(orderData: any) {
    this.track('order_create', {
      orderId: orderData.id,
      totalAmount: orderData.totalAmount,
      itemCount: orderData.products.length,
    });
  }

  trackOrderStatusUpdate(orderId: string, status: string) {
    this.track('order_status_update', { orderId, status });
  }

  trackSearchPerformed(query: string, filters?: any) {
    this.track('search_performed', { query, filters });
  }

  trackChatMessage(chatId: string, messageType: string) {
    this.track('chat_message_sent', { chatId, messageType });
  }

  trackAppOpen() {
    this.track('app_open');
  }

  trackAppBackground() {
    this.track('app_background');
  }

  trackScreenView(screenName: string) {
    this.track('screen_view', { screenName });
  }

  trackButtonPress(buttonName: string, screenName?: string) {
    this.track('button_press', { buttonName, screenName });
  }

  trackError(error: string, context?: string) {
    this.track('error_occurred', { error, context });
  }

  // Get analytics data for debugging
  getEvents(): AnalyticsEvent[] {
    return this.events;
  }

  clearEvents() {
    this.events = [];
  }

  // Export events (for sending to external analytics services)
  exportEvents(): string {
    return JSON.stringify(this.events, null, 2);
  }
}

export const analytics = new AnalyticsService();
export default AnalyticsService;