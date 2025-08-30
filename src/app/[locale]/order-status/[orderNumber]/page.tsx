'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import OrderStatusDisplay from '@/components/OrderStatusDisplay';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('order_status');
  const [orderStatus, setOrderStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const orderNumber = params.orderNumber as string;
    
    if (!orderNumber) {
      setError(t('order_not_found'));
      setIsLoading(false);
      return;
    }

    // Simulate API call to fetch order details
    const fetchOrderDetails = async () => {
      try {
        // Mock API call - replace with real API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
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
              icon: 'CheckCircleIcon'
            },
            {
              id: 2,
              status: 'processing',
              title: 'Đang chuẩn bị hàng',
              description: 'Hàng đang được đóng gói và chuẩn bị giao',
              date: '2024-01-16 14:20',
              icon: 'ClockIcon'
            },
            {
              id: 3,
              status: 'shipping',
              title: 'Đang giao hàng',
              description: 'Đơn hàng đang được giao đến địa chỉ của bạn',
              date: '2024-01-17 09:15',
              icon: 'TruckIcon'
            }
          ]
        };
        
        setOrderStatus(mockStatus);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError(t('error_loading_order'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [params.orderNumber, t]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('loading_order')}</p>
        </div>
      </div>
    );
  }

  if (error || !orderStatus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md w-full">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            {error || t('order_not_found')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('order_not_found_description')}
          </p>
          <div className="space-y-3">
            <Link
              href="/order-status"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              {t('check_another_order')}
            </Link>
            <Link
              href="/"
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors inline-block"
            >
              {t('back_home')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/order-status"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            {t('back_to_search')}
          </Link>
        </div>

        {/* Order Status Display */}
        <OrderStatusDisplay orderStatus={orderStatus} />
        
        {/* Additional Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('order_actions')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => window.print()}
              className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              {t('print_order')}
            </button>
            <button
              onClick={() => {
                const subject = encodeURIComponent(`Inquiry about Order #${orderStatus.orderNumber}`);
                const body = encodeURIComponent(`Hi, I have a question about my order #${orderStatus.orderNumber}. `);
                window.open(`mailto:support@mexe.vn?subject=${subject}&body=${body}`);
              }}
              className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {t('contact_support')}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}