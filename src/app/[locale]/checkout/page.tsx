'use client';
import Checkout from '@/components/Checkout';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { order } = useCart();

  // Fallback order if cart is empty
  const fallbackOrder = {
    items: [],
    total: 0,
  };
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='grow'>
        <Checkout order={order || fallbackOrder} />
      </main>
    </div>
  );
}
