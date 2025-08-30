import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isOffline: boolean;
  notifications: any[];
  theme: 'light' | 'dark';
  language: string;
}

const initialState: AppState = {
  isOffline: false,
  notifications: [],
  theme: 'light',
  language: 'en',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOfflineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffline = action.payload;
    },
    addNotification: (state, action: PayloadAction<any>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { 
  setOfflineStatus, 
  addNotification, 
  removeNotification, 
  setTheme, 
  setLanguage 
} = appSlice.actions;
export default appSlice.reducer;