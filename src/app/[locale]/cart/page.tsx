import { FC } from 'react';
import Cart from '@/components/Cart';
import { api } from '@/config/api';
import { cookies } from 'next/headers';

interface PageProps {
  params: { id: string };
}

async function fetchData(id: string) {
  try {
    const response = await api.getOrder(String(id));
    console.log(response);
    return {
      order: response.data,
    };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { products: {} };
  }
}

const CartPage: FC<PageProps> = async () => {
  const cookieStore = cookies();
  const orderNumber = (await cookieStore).get('order')?.value;
  // const { id } = await params;
  console.log(orderNumber);
  const { order } = await fetchData(String(orderNumber));

  if (!order) {
    return <div>Order not found</div>;
  }

  const fallbackOrder = {
    items: order.order_items,
    total: order.total_amount,
  };

  return (
    <div className='flex min-h-screen flex-col'>
      <main className='grow'>
        <Cart order={order || fallbackOrder} />
      </main>
    </div>
  );
};

export default CartPage;
