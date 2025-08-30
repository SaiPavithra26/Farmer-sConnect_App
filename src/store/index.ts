import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import productSlice from './slices/productSlice';
import orderSlice from './slices/orderSlice';
import chatSlice from './slices/chatSlice';
import appSlice from './slices/appSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    orders: orderSlice,
    chat: chatSlice,
    app: appSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;