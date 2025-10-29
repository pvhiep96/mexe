'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface Product {
  id: string | number;
  name: string;
  price: number;
  discountedPrice?: number;
  image: string;
  quantity: number;
  selectedColor?: string;
  // Variant information
  variant_id?: number;
  variant_name?: string;
  variant_value?: string;
  variant_sku?: string;
  variant_final_price?: number;
  full_payment_transfer: boolean;
  full_payment_discount_percentage: number;
  partial_advance_payment: boolean;
  advance_payment_percentage: number;
  advance_payment_discount_percentage: number;
}

interface Order {
  items: Product[];
  total: number;
  order_number?: string;
}

interface CartContextType {
  order: Order | null;
  addToCart: (
    product: Product,
    quantity: number,
    selectedColor?: string
  ) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  removeItem: (id: string | number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load cart from local storage on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    try {
      const savedOrder = localStorage.getItem('cart');
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);
        // Validate parsed order structure
        if (parsedOrder && Array.isArray(parsedOrder.items)) {
          setOrder(parsedOrder);
        }
      }
    } catch (error) {
      console.error('Failed to load cart from local storage:', error);
      localStorage.removeItem('cart'); // Clear invalid data
    }
  }, [mounted]);

  // Save cart to local storage on update
  useEffect(() => {
    if (!mounted || !order) return;

    try {
      localStorage.setItem('cart', JSON.stringify(order));
    } catch (error) {
      console.error('Failed to save cart to local storage:', error);
    }
  }, [order, mounted]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string,
    paymentOptions?: {
      full_payment_transfer?: boolean;
      full_payment_discount_percentage?: number;
      partial_advance_payment?: boolean;
      advance_payment_percentage?: number;
      advance_payment_discount_percentage?: number;
    }
  ) => {
    setOrder((prevOrder) => {
      const newItem = {
        ...product,
        quantity: quantity || 1,
        selectedColor: selectedColor || product.selectedColor,
        // Merge payment options with defaults
        full_payment_transfer: paymentOptions?.full_payment_transfer ?? product.full_payment_transfer ?? false,
        full_payment_discount_percentage: paymentOptions?.full_payment_discount_percentage ?? product.full_payment_discount_percentage ?? 0,
        partial_advance_payment: paymentOptions?.partial_advance_payment ?? product.partial_advance_payment ?? false,
        advance_payment_percentage: paymentOptions?.advance_payment_percentage ?? product.advance_payment_percentage ?? 0,
        advance_payment_discount_percentage: paymentOptions?.advance_payment_discount_percentage ?? product.advance_payment_discount_percentage ?? 0,
      };

      if (!prevOrder) {
        const itemPrice = product.variant_final_price || product.discountedPrice || product.price;
        const total = itemPrice * quantity;
        return { items: [newItem], total };
      }

      // Check if product already exists (considering variant_id if available)
      const existingItemIndex = prevOrder.items.findIndex((item) => {
        // If both items have variant_id, compare product id and variant id
        if (product.variant_id && item.variant_id) {
          return item.id === product.id && item.variant_id === product.variant_id;
        }
        // Fallback to color comparison for backward compatibility
        if (selectedColor && item.selectedColor) {
          return item.id === product.id && item.selectedColor === selectedColor;
        }
        // If no variant or color, just compare product id
        return item.id === product.id && !item.variant_id && !product.variant_id;
      });

      let updatedItems: Product[];

      if (existingItemIndex !== -1) {
        // Update existing item quantity
        updatedItems = [...prevOrder.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
      } else {
        // Add new item
        updatedItems = [...prevOrder.items, newItem];
      }

      const total = updatedItems.reduce(
        (sum, item) => {
          const itemPrice = item.variant_final_price || item.discountedPrice || item.price;
          return sum + itemPrice * item.quantity;
        },
        0
      );

      return { items: updatedItems, total };
    });
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    setOrder((prevOrder) => {
      if (!prevOrder) return prevOrder;

      if (quantity <= 0) {
        // Remove item if quantity is 0
        const updatedItems = prevOrder.items.filter((item) => item.id !== id);
        if (updatedItems.length === 0) {
          localStorage.removeItem('cart');
          return null;
        }
        const total = updatedItems.reduce(
          (sum, item) => {
            const itemPrice = item.variant_final_price || item.discountedPrice || item.price;
            return sum + itemPrice * item.quantity;
          },
          0
        );
        return { items: updatedItems, total };
      }

      const updatedItems = prevOrder.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      const total = updatedItems.reduce(
        (sum, item) => {
          const itemPrice = item.variant_final_price || item.discountedPrice || item.price;
          return sum + itemPrice * item.quantity;
        },
        0
      );

      return { items: updatedItems, total };
    });
  };

  const removeItem = (id: string | number) => {
    setOrder((prevOrder) => {
      if (!prevOrder) return prevOrder;

      const updatedItems = prevOrder.items.filter((item) => item.id !== id);
      if (updatedItems.length === 0) {
        localStorage.removeItem('cart');
        return null;
      }

      const total = updatedItems.reduce(
        (sum, item) => {
          const itemPrice = item.variant_final_price || item.discountedPrice || item.price;
          return sum + itemPrice * item.quantity;
        },
        0
      );

      return { items: updatedItems, total };
    });
  };

  const clearCart = () => {
    setOrder(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
  };

  const getCartItemCount = () => {
    if (!order || !order.items) return 0;
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ 
        order, 
        addToCart, 
        updateQuantity, 
        removeItem, 
        clearCart,
        getCartItemCount
      }}
    >
      {mounted ? children : null}
    </CartContext.Provider>
  );
}
