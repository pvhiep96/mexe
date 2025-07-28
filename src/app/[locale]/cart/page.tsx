'use client';
import Cart from '@/components/Cart';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { order } = useCart();

  // Fallback order if cart is empty
  const fallbackOrder = {
    items: [],
    total: 0,
  };
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='grow'>
        <Cart order={order || fallbackOrder} />
      </main>
    </div>
  );
}
