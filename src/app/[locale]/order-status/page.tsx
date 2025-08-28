'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MagnifyingGlassIcon, TruckIcon, CheckCircleIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import OrderStatusForm from '@/components/OrderStatusForm';
import OrderStatusDisplay from '@/components/OrderStatusDisplay';

export default function OrderStatusPage() {
  const t = useTranslations('order_status');
  const [orderNumber, setOrderNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckOrder = async (orderNumber: string) => {
    setIsLoading(true);
    setOrderNumber(orderNumber);
    
    // Simulate API call
    setTimeout(() => {
      // Mock order status data
      const mockStatus = {
        orderNumber: orderNumber,
        orderDate: '2024-01-15',
        customerName: 'Nguyễn Văn A',
        phone: '0123456789',
        email: 'nguyenvana@email.com',
        totalAmount: 2500000,
        status: 'shipping', // pending, confirmed, processing, shipping, delivered, cancelled
        statusText: 'Đang giao hàng',
        estimatedDelivery: '2024-01-20',
        items: [
          {
            id: 1,
            name: 'Ghế ngồi oto cao cấp',
            image: '/images/demo-products/product-1.png',
            quantity: 2,
            price: 1250000,
            total: 2500000
          }
        ],
        timeline: [
          {
            id: 1,
            status: 'confirmed',
            title: 'Đơn hàng đã được xác nhận',
            description: 'Đơn hàng của bạn đã được xác nhận và đang được xử lý',
            date: '2024-01-15 10:30',
            icon: CheckCircleIcon
          },
          {
            id: 2,
            status: 'processing',
            title: 'Đang chuẩn bị hàng',
            description: 'Hàng đang được đóng gói và chuẩn bị giao',
            date: '2024-01-16 14:20',
            icon: ClockIcon
          },
          {
            id: 3,
            status: 'shipping',
            title: 'Đang giao hàng',
            description: 'Đơn hàng đang được giao đến địa chỉ của bạn',
            date: '2024-01-17 09:15',
            icon: TruckIcon
          }
        ]
      };
      
      setOrderStatus(mockStatus);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <main className='min-h-screen bg-gray-50 py-8'>
      <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 sm:text-4xl'>
            {t('title')}
          </h1>
          <p className='mt-4 text-lg text-gray-600'>
            {t('subtitle')}
          </p>
        </div>

        {/* Order Status Form */}
        <OrderStatusForm onCheckOrder={handleCheckOrder} isLoading={isLoading} />

        {/* Order Status Display */}
        {orderStatus && (
          <OrderStatusDisplay orderStatus={orderStatus} />
        )}

        {/* Help Section */}
        <div className='mt-12 bg-white rounded-lg shadow-sm p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>
            {t('need_help')}
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex items-start space-x-3'>
              <div className='flex-shrink-0'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                  <TruckIcon className='w-5 h-5 text-blue-600' />
                </div>
              </div>
              <div>
                <h3 className='text-sm font-medium text-gray-900'>
                  {t('tracking_info')}
                </h3>
                <p className='text-sm text-gray-500 mt-1'>
                  {t('tracking_description')}
                </p>
              </div>
            </div>
            
            <div className='flex items-start space-x-3'>
              <div className='flex-shrink-0'>
                <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                  <CheckCircleIcon className='w-5 h-5 text-green-600' />
                </div>
              </div>
              <div>
                <h3 className='text-sm font-medium text-gray-900'>
                  {t('delivery_time')}
                </h3>
                <p className='text-sm text-gray-500 mt-1'>
                  {t('delivery_description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
