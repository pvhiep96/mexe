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
    selectedColor?: string
  ) => {
    setOrder((prevOrder) => {
      const newItem = {
        ...product,
        quantity: quantity || 1,
        selectedColor: selectedColor || product.selectedColor,
      };

      if (!prevOrder) {
        const total = (product.discountedPrice || product.price) * quantity;
        return { items: [newItem], total };
      }

      // Check if product already exists (considering color if available)
      const existingItemIndex = prevOrder.items.findIndex((item) => {
        if (selectedColor && item.selectedColor) {
          return item.id === product.id && item.selectedColor === selectedColor;
        }
        return item.id === product.id;
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
        (sum, item) =>
          sum + (item.discountedPrice || item.price) * item.quantity,
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
          (sum, item) =>
            sum + (item.discountedPrice || item.price) * item.quantity,
          0
        );
        return { items: updatedItems, total };
      }

      const updatedItems = prevOrder.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      const total = updatedItems.reduce(
        (sum, item) =>
          sum + (item.discountedPrice || item.price) * item.quantity,
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
        (sum, item) =>
          sum + (item.discountedPrice || item.price) * item.quantity,
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
