/* eslint-disable @typescript-eslint/no-explicit-any */
// cartContext.tsx
'use client';
import { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';

const CartContext = createContext<{
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
}>({
  cart: [],
  setCart: () => {},
});


export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);
  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
