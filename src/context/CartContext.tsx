'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  discount?: number;
  quantity: number;
}
interface Order {
  items: Product[];
  total: number;
}

interface CartContextType {
  order: Order | null;
  addToCart: (product: Product) => void;
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

  // Load cart from local storage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedOrder = localStorage.getItem('cart');
      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    }
  }, []);

  // Save cart to local storage on update
  useEffect(() => {
    if (order && typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(order));
    }
  }, [order]);

  const addToCart = (product: Product) => {
    setOrder((prevOrder) => {
      // Initialize new order if none exists
      if (!prevOrder) {
        const newOrder: Order = {
          items: [{ ...product, quantity: product.quantity || 1 }],
          total: product.price * (product.quantity || 1),
        };
        return newOrder;
      }

      // Check if product exists in order
      const existingItem = prevOrder.items.find(
        (item) => item.id === product.id
      );
      let updatedItems: Product[];

      if (existingItem) {
        // Update quantity for existing product
        updatedItems = prevOrder.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        // Add new product to order
        updatedItems = [
          ...prevOrder.items,
          { ...product, quantity: product.quantity || 1 },
        ];
      }

      // Calculate new total
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity - (item.discount || 0),
        0
      );

      return { items: updatedItems, total: newTotal };
    });
  };

  return (
    <CartContext.Provider value={{ order, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
