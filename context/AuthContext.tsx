'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import type { User, LoginPayload, SignupPayload, ProfileUpdatePayload } from '@/types/auth';
import { authApi, userApi, ApiError } from '@/lib/api';
import { getToken, setToken, removeToken } from '@/lib/auth-storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (payload: ProfileUpdatePayload) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refreshUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const response = await userApi.getMe(token);
      if (response.data) setUser(response.data);
    } catch {
      removeToken();
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false));
  }, [refreshUser]);

  const login = async (payload: LoginPayload) => {
    const response = await authApi.login(payload);
    if (!response.access_token) {
      throw new ApiError('No access token received', 500);
    }
    setToken(response.access_token);
    await refreshUser();
    router.push('/account/profile');
  };

  const signup = async (payload: SignupPayload) => {
    await authApi.signup(payload);
    await login({ email: payload.email, password: payload.password });
  };

  const logout = async () => {
    const token = getToken();
    if (token) {
      try {
        await authApi.logout(token);
      } catch {
        // Clear local session even if API call fails
      }
    }
    removeToken();
    setUser(null);
    router.push('/login');
  };

  const updateProfile = async (payload: ProfileUpdatePayload) => {
    const token = getToken();
    if (!token) throw new ApiError('Not authenticated', 401);

    const response = await userApi.updateProfile(token, payload);
    if (response.data) setUser(response.data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
