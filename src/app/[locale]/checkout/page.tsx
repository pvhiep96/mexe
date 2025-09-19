'use client';

import Checkout from '@/components/Checkout';
import { createPaymentUrl } from '@/app/actions/payment';
import { useRouter } from '@/i18n/navigation';
import { useEffect, useState } from 'react';

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  image: string;
}

interface CheckoutOrder {
  items: OrderItem[];
  total: number;
  orderNumber: string;
  createdAt: string;
  status: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const [order, setOrder] = useState<CheckoutOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Đọc order từ localStorage
    const savedOrder = localStorage.getItem('currentOrder');
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setOrder(parsedOrder);
      } catch (error) {
        console.error('Error parsing order:', error);
        router.push('/cart');
      }
    } else {
      // Không có order, chuyển về cart
      router.push('/cart');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600'></div>
          <p className='mt-4 text-gray-600'>Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900'>
            Không tìm thấy đơn hàng
          </h1>
          <p className='mt-2 text-gray-600'>
            Vui lòng quay lại giỏ hàng để tạo đơn hàng mới
          </p>
          <button
            onClick={() => router.push('/cart')}
            className='mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          >
            Quay lại giỏ hàng
          </button>
        </div>
      </div>
    );
  }

  // Kiểm tra xem order có items không
  if (!order.items || order.items.length === 0) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900'>Đơn hàng trống</h1>
          <p className='mt-2 text-gray-600'>Đơn hàng không có sản phẩm nào</p>
          <button
            onClick={() => router.push('/cart')}
            className='mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          >
            Quay lại giỏ hàng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <main className='grow'>
        <Checkout order={order} checkout={createPaymentUrl} />
      </main>
    </div>
  );
};

export default CheckoutPage;
