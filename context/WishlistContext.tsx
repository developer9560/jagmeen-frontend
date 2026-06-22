'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { wishlistApi, type WishlistSummary, type WishlistData } from '@/lib/api';
import { getToken } from '@/lib/auth-storage';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface WishlistContextType {
  wishlistSummary: WishlistSummary | null;
  isLoading: boolean;
  refreshWishlistSummary: () => Promise<void>;
  toggleWishlist: (productId: number) => Promise<boolean>;
  getWishlistItems: () => Promise<WishlistData | null>;
  checkIsWishlisted: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistSummary, setWishlistSummary] = useState<WishlistSummary | null>(null);
  const [wishlistData, setWishlistData] = useState<WishlistData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const refreshWishlistSummary = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlistSummary(null);
      setWishlistData(null);
      setIsLoading(false);
      return;
    }

    const token = getToken();
    if (!token) return;

    try {
      const data = await wishlistApi.getWishlist(token);
      setWishlistData(data);
      setWishlistSummary({
        id: data.id,
        total_items: data.total_items,
        updated_at: data.updated_at
      });
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshWishlistSummary();
  }, [refreshWishlistSummary]);

  const toggleWishlist = useCallback(async (productId: number): Promise<boolean> => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to your wishlist.');
      return false;
    }

    const token = getToken();
    if (!token) return false;

    try {
      const response = await wishlistApi.toggleItem(token, productId);
      if (response.success) {
        toast.success(response.message);
        // Refresh full list to keep isWishlisted status in sync
        refreshWishlistSummary();
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error(error.message || 'Failed to update wishlist');
      return false;
    }
  }, [isAuthenticated, refreshWishlistSummary]);

  const getWishlistItems = useCallback(async (): Promise<WishlistData | null> => {
    if (!isAuthenticated) return null;
    const token = getToken();
    if (!token) return null;

    try {
      const data = await wishlistApi.getWishlist(token);
      setWishlistData(data);
      return data;
    } catch (error) {
      console.error('Failed to get wishlist items:', error);
      return null;
    }
  }, [isAuthenticated]);

  const checkIsWishlisted = useCallback((productId: number): boolean => {
    if (!wishlistData) return false;
    return wishlistData.items.some(item => item.product_id === productId);
  }, [wishlistData]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistSummary,
        isLoading,
        refreshWishlistSummary,
        toggleWishlist,
        getWishlistItems,
        checkIsWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
