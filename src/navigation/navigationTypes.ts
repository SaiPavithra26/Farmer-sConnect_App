// src/navigation/navigationTypes.ts

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type AppStackParamList = {
  FarmerDashboard: { userId: string };
  CustomerHome: { userId: string };
  Home: { userId: string }; // optional fallback
  // other screens...
};

export type FarmerStackParamList = {
  FarmerDashboard: undefined;
  AddProduct: undefined;
  MyProducts: undefined;
  OrderManagement: undefined;
  FarmProfile: undefined;
};

export type CustomerStackParamList = {
  CustomerDashboard: undefined;
  ProductCatalog: undefined;
  ProductDetail: { productId: string };
  Cart: undefined;
  Checkout: undefined;
  OrderHistory: undefined;
};