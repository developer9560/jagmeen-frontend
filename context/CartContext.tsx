'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { cartApi, type CartSummary, type AddToCartResponse, type CartData } from '@/lib/api';
import { getToken } from '@/lib/auth-storage';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface CartContextType {
  cartSummary: CartSummary | null;
  isLoading: boolean;
  refreshCartSummary: () => Promise<void>;
  addToCart: (productId: number, quantity?: number) => Promise<boolean>;
  getCartItems: () => Promise<CartData | null>;
  removeItem: (itemId: number) => Promise<boolean>;
  updateItemQuantity: (itemId: number, quantity: number) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartSummary, setCartSummary] = useState<CartSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const refreshCartSummary = useCallback(async () => {
    if (!isAuthenticated) {
      setCartSummary(null);
      setIsLoading(false);
      return;
    }

    const token = getToken();
    if (!token) return;

    try {
      const summary = await cartApi.getSummary(token);
      setCartSummary(summary);
    } catch (error) {
      console.error('Failed to fetch cart summary:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshCartSummary();
  }, [refreshCartSummary]);

  const addToCart = async (productId: number, quantity: number = 1): Promise<boolean> => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add items to your cart.');
      return false;
    }

    const token = getToken();
    if (!token) return false;

    try {
      const response = await cartApi.addToCart(token, productId, quantity);
      if (response.success) {
        toast.success(response.message || 'Added to bag');
        if (response.cart_summary) {
          setCartSummary(response.cart_summary);
        } else {
          refreshCartSummary();
        }
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error(error.message || 'Failed to add to cart');
      return false;
    }
  };

  const getCartItems = async (): Promise<CartData | null> => {
    if (!isAuthenticated) return null;
    const token = getToken();
    if (!token) return null;

    try {
      return await cartApi.getCart(token);
    } catch (error) {
      console.error('Failed to get cart items:', error);
      return null;
    }
  };

  const removeItem = async (itemId: number): Promise<boolean> => {
    if (!isAuthenticated) return false;
    const token = getToken();
    if (!token) return false;

    try {
      await cartApi.removeItem(token, itemId);
      await refreshCartSummary();
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove item');
      return false;
    }
  };

  const updateItemQuantity = async (itemId: number, quantity: number): Promise<boolean> => {
    if (!isAuthenticated) return false;
    const token = getToken();
    if (!token) return false;

    try {
      await cartApi.updateItem(token, itemId, quantity);
      await refreshCartSummary();
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to update quantity');
      return false;
    }
  };

  const clearCart = async (): Promise<boolean> => {
    if (!isAuthenticated) return false;
    const token = getToken();
    if (!token) return false;

    try {
      await cartApi.clearCart(token);
      setCartSummary({ id: 0, total_items: 0, total_price: 0, updated_at: new Date().toISOString() });
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to clear cart');
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartSummary,
        isLoading,
        refreshCartSummary,
        addToCart,
        getCartItems,
        removeItem,
        updateItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
