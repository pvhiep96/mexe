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
    selectedColor: string
  ) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  removeItem: (id: string | number) => void;
  clearCart: () => void;
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

  const addToCart = async (
    product: Product,
    quantity: number,
    selectedColor: string
  ) => {
    try {
      // Make API call to create order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: quantity || 1,
          variant_id: selectedColor,
          order_number: order?.order_number,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      const responseData = await response.json();
      console.log(responseData);
      // Update local state after successful API call

      setOrder((prevOrder) => {
        const quantity = product.quantity || 1;
        const newItem = {
          ...product,
          quantity,
        };
        const order_number = responseData.order.order_number;
        if (!prevOrder) {
          const total = (product.discountedPrice || product.price) * quantity;
          return { items: [newItem], total };
        }

        const existingItem = prevOrder.items.find(
          (item) => item.id === product.id
        );
        let updatedItems: Product[];

        if (existingItem) {
          updatedItems = prevOrder.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          updatedItems = [...prevOrder.items, newItem];
        }

        const total = updatedItems.reduce(
          (sum, item) =>
            sum + (item.discountedPrice || item.price) * item.quantity,
          0
        );

        return { items: updatedItems, total, order_number };
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Optionally, you could show a user-friendly error message here
    }
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

  return (
    <CartContext.Provider
      value={{ order, addToCart, updateQuantity, removeItem, clearCart }}
    >
      {mounted ? children : null}
    </CartContext.Provider>
  );
}
