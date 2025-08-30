import type { NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';

// Root Stack Navigator
export type RootStackParamList = {
  Welcome: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// Auth Stack Navigator
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  OTPVerification: { email: string };
};

// Main Tab Navigator
export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Products: NavigatorScreenParams<ProductStackParamList>;
  Orders: NavigatorScreenParams<OrderStackParamList>;
  Chat: NavigatorScreenParams<ChatStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

// Individual Stack Navigators for each tab
export type HomeStackParamList = {
  Dashboard: undefined;
  Notifications: undefined;
  Settings: undefined;
};

export type ProductStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: string };
  AddProduct: undefined;
  EditProduct: { productId: string };
  ProductCatalog: undefined;
};

export type OrderStackParamList = {
  OrderList: undefined;
  OrderDetail: { orderId: string };
  OrderManagement: undefined;
  OrderHistory: undefined;
  DeliveryTracking: { orderId: string };
  Checkout: undefined;
  Cart: undefined;
};

export type ChatStackParamList = {
  ChatList: undefined;
  ChatDetail: { chatId: string; otherUserId?: string };
  CreateChat: undefined;
};

export type ProfileStackParamList = {
  ProfileView: undefined;
  EditProfile: undefined;
  FarmProfile: undefined;
  Settings: undefined;
  Help: undefined;
  About: undefined;
};

// Screen Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  StackScreenProps<RootStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = 
  StackScreenProps<AuthStackParamList, T>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = 
  StackScreenProps<HomeStackParamList, T>;

export type ProductStackScreenProps<T extends keyof ProductStackParamList> = 
  StackScreenProps<ProductStackParamList, T>;

export type OrderStackScreenProps<T extends keyof OrderStackParamList> = 
  StackScreenProps<OrderStackParamList, T>;

export type ChatStackScreenProps<T extends keyof ChatStackParamList> = 
  StackScreenProps<ChatStackParamList, T>;

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> = 
  StackScreenProps<ProfileStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}