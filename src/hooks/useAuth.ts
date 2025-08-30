import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/src/store';
import { setUser, logout, setLoading, setError } from '@/src/store/slices/authSlice';
import AuthAPI from '@/src/services/api/authAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: 'farmer' | 'customer';
}

export function useAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Check for existing session on app start
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      dispatch(setLoading(true));
      
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) {
        dispatch(setLoading(false));
        return;
      }

      const response = await AuthAPI.getCurrentUser();
      if (response.success && response.data) {
        dispatch(setUser(response.data));
      } else {
        // Token is invalid, clear it
        await AsyncStorage.removeItem('auth_token');
        dispatch(logout());
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      dispatch(logout());
    } finally {
      dispatch(setLoading(false));
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await AuthAPI.login(credentials);
      
      if (response.success && response.data) {
        dispatch(setUser(response.data.user));
        return { success: true };
      } else {
        const errorMessage = response.error || 'Login failed';
        dispatch(setError(errorMessage));
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await AuthAPI.register(userData);
      
      if (response.success && response.data) {
        dispatch(setUser(response.data.user));
        return { success: true };
      } else {
        const errorMessage = response.error || 'Registration failed';
        dispatch(setError(errorMessage));
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signOut = async () => {
    try {
      dispatch(setLoading(true));
      await AuthAPI.logout();
      dispatch(logout());
      return { success: true };
    } catch (error) {
      console.error('Error during logout:', error);
      // Still logout locally even if API call fails
      dispatch(logout());
      return { success: true };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await AuthAPI.forgotPassword(email);
      
      if (response.success) {
        return { success: true };
      } else {
        const errorMessage = response.error || 'Failed to send reset email';
        dispatch(setError(errorMessage));
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send reset email';
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateProfile = async (profileData: any) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await AuthAPI.updateProfile(profileData);
      
      if (response.success && response.data) {
        dispatch(setUser(response.data));
        return { success: true };
      } else {
        const errorMessage = response.error || 'Failed to update profile';
        dispatch(setError(errorMessage));
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    register,
    signOut,
    forgotPassword,
    updateProfile,
    checkAuthStatus,
  };
}

export default useAuth;