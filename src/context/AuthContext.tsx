'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { apiClient } from '@/services/api';
import { useFlashTooltip } from '@/context/FlashTooltipContext';
import { TokenDebugger } from '@/utils/tokenDebugger';
import type {
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: any) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showTooltip } = useFlashTooltip();

  // Periodic health check
  useEffect(() => {
    if (!user) return;

    const healthCheck = setInterval(() => {
      // If user is set but token is missing, something went wrong
      if (user && !apiClient.isAuthenticated()) {
        console.error(
          '🚨 CRITICAL: User is set but token is missing from localStorage!'
        );
        TokenDebugger.logTokenState();

        // Try to restore from backup or clear user state
        const token = apiClient.getToken();
        if (!token) {
          console.warn('🔄 No token found, clearing user state');
          setUser(null);
          showTooltip(
            'Phiên đăng nhập bị mất, vui lòng đăng nhập lại',
            'warning'
          );
        }
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(healthCheck);
  }, [user, showTooltip]);

  // Initialize authentication state on mount
  useEffect(() => {
    // Start token monitoring in development
    if (process.env.NODE_ENV === 'development') {
      TokenDebugger.startMonitoring();
    }

    initializeAuth();

    // Cleanup on unmount
    return () => {
      if (process.env.NODE_ENV === 'development') {
        TokenDebugger.stopMonitoring();
      }
    };
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);

      // Check if user has a valid token
      if (!apiClient.isAuthenticated()) {
        console.log('🔒 No valid token found during initialization');
        setUser(null);
        return;
      }

      console.log('🔑 Valid token found, verifying with server...');

      // Verify token with server
      const response = await apiClient.getProfile();
      if (response.success && response.user) {
        console.log(
          '✅ Token verified, user authenticated:',
          response.user.email
        );
        setUser(response.user);
      } else {
        console.warn('⚠️ Token verification failed');
        setUser(null);
      }
    } catch (error: any) {
      console.error('❌ Failed to initialize auth:', error);

      // Only clear state for clear authentication failures
      if (error.status === 401 || error.status === 403) {
        console.warn('🔒 Authentication failed, clearing user state');
        showTooltip('Phiên đăng nhập đã hết hạn', 'warning');
        setUser(null);
      } else if (error.status === 0) {
        // Network error - keep token, don't set user
        console.warn('🌐 Network error during auth check, keeping token');
        setUser(null);
      } else {
        // Other errors - be conservative
        console.warn('⚠️ Unknown error during auth check, keeping token');
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      const response: AuthResponse = await apiClient.login(credentials);

      if (response.success && response.user) {
        setUser(response.user);
        showTooltip(response.message || 'Đăng nhập thành công!', 'success');
      } else {
        throw new Error(response.message || 'Đăng nhập thất bại');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      showTooltip(error.message || 'Đăng nhập thất bại', 'error');
      throw error;
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      const response: AuthResponse = await apiClient.register(userData);

      if (response.success && response.user) {
        setUser(response.user);
        showTooltip(response.message || 'Đăng ký thành công!', 'success');
      } else {
        throw new Error(response.message || 'Đăng ký thất bại');
      }
    } catch (error: any) {
      console.error('Registration failed:', error);
      const errorMessage =
        error.errors?.[0] || error.message || 'Đăng ký thất bại';
      showTooltip(errorMessage, 'error');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
      setUser(null);
      showTooltip('Đăng xuất thành công!', 'success');
    } catch (error: any) {
      console.error('Logout error:', error);
      // Even if logout fails on server, clear user state
      setUser(null);
      showTooltip('Đăng xuất thành công!', 'success');
    }
  };

  const updateProfile = async (userData: any) => {
    try {
      const response = await apiClient.updateProfile(userData);

      if (response.success && response.user) {
        setUser(response.user);
        showTooltip(
          response.message || 'Cập nhật thông tin thành công!',
          'success'
        );
      } else {
        throw new Error(response.message || 'Cập nhật thông tin thất bại');
      }
    } catch (error: any) {
      console.error('Profile update failed:', error);
      const errorMessage =
        error.errors?.[0] || error.message || 'Cập nhật thông tin thất bại';
      showTooltip(errorMessage, 'error');
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      if (!apiClient.isAuthenticated()) {
        setUser(null);
        return;
      }

      const response = await apiClient.getProfile();
      if (response.success && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error: any) {
      console.error('Failed to refresh user:', error);

      // Only logout on authentication errors
      if (error.status === 401 || error.status === 403) {
        await logout();
      }
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
