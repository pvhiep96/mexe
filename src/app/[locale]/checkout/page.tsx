// 'use client';
import Checkout from '@/components/Checkout';
// import { useCart } from '@/context/CartContext';
import { createPaymentUrl } from '@/app/actions/payment';
import { api } from '@/config/api';
import { cookies } from 'next/headers';

// interface PageProps {}

async function fetchData(id: string) {
  try {
    const response = await api.getOrder(String(id));
    return {
      order: response.data,
    };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { products: {} };
  }
}

const CheckoutPage = async () => {
  const cookieStore = cookies();
  const orderNumber = (await cookieStore).get('order')?.value;
  const { order } = await fetchData(String(orderNumber));

  if (!order) {
    return <div>Order not found</div>;
  }
  // Fallback order if cart is empty
  const fallbackOrder = {
    items: order.order_items,
    total: order.total_amount,
    orderNumber: order.order_number,
  };

  return (
    <div className='flex min-h-screen flex-col'>
      <main className='grow'>
        <Checkout order={fallbackOrder} checkout={createPaymentUrl} />
      </main>
    </div>
  );
};

export default CheckoutPage;
