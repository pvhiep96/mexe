'use client';

import { useTranslations } from 'next-intl';
import { CheckCircleIcon, TruckIcon, CreditCardIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface OrderData {
  id: number;
  order_number: string;
  status: string;
  payment_status: string;
  payment_method: string;
  total_amount: string;
  shipping_name?: string;
  shipping_phone?: string;
  shipping_city?: string;
  shipping_district?: string;
  shipping_ward?: string;
  delivery_address?: string;
  tracking_number?: string;
  shipping_provider?: string;
  created_at: string;
  updated_at: string;
  order_items?: any[];
}

const OrderStatusPage = () => {
  const t = useTranslations('order_status');
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy order number từ localStorage
  const orderNumber = typeof window !== 'undefined' 
    ? localStorage.getItem('lastOrderNumber') || null
    : null;

  // Check if user is logged in
  const isLoggedIn = typeof window !== 'undefined'
    ? localStorage.getItem('auth_token') !== null
    : false;

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!orderNumber) {
        setError('Không tìm thấy mã đơn hàng');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://47.129.168.239:81/api/v1/orders/${orderNumber}`);
        if (!response.ok) {
          throw new Error('Không thể tải thông tin đơn hàng');
        }
        
        const data = await response.json();
        setOrderData(data);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(err instanceof Error ? err.message : 'Lỗi tải dữ liệu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, [orderNumber]);

  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(typeof price === 'string' ? parseFloat(price) : price);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return t('pending');
      case 'confirmed': return t('confirmed');
      case 'processing': return t('processing');
      case 'shipped': return t('shipped');
      case 'delivered': return t('delivered');
      case 'cancelled': return t('cancelled');
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600';
      case 'confirmed': return 'text-blue-600';
      case 'processing': return 'text-orange-600';
      case 'shipped': return 'text-purple-600';
      case 'delivered': return 'text-green-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>Không thể tải thông tin đơn hàng</h1>
          <p className='text-gray-600 mb-6'>{error || 'Vui lòng thử lại sau'}</p>
          <Link
            href='/'
            className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors'
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
        <div className='rounded-lg bg-white p-8 shadow-lg'>
          {/* Success Icon */}
          <div className='text-center'>
            <CheckCircleIcon className='mx-auto h-16 w-16 text-green-500' />
            <h1 className='mt-4 text-3xl font-bold text-gray-900'>
              {t('title')}
            </h1>
            <p className='mt-2 text-lg text-gray-600'>
              {t('message')}
            </p>
          </div>

          {/* Order Details */}
          <div className='mt-8 space-y-6'>
            {/* Basic Order Info */}
            <div className='rounded-lg bg-gray-50 p-6'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    {t('order_number')}
                  </p>
                  <p className='text-lg font-semibold text-gray-900'>{orderData.order_number}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    {t('status')}
                  </p>
                  <p className={`text-lg font-semibold ${getStatusColor(orderData.status)}`}>
                    {getStatusText(orderData.status)}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    {t('total_amount')}
                  </p>
                  <p className='text-lg font-semibold text-gray-900'>
                    {formatPrice(orderData.total_amount)}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    Ngày đặt hàng
                  </p>
                  <p className='text-lg font-semibold text-gray-900'>
                    {new Date(orderData.created_at).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className='rounded-lg bg-gray-50 p-6'>
              <h3 className='mb-4 flex items-center text-lg font-semibold text-gray-900'>
                <CreditCardIcon className='mr-2 h-5 w-5' />
                {t('payment_info')}
              </h3>
              
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    {t('payment_method')}
                  </p>
                  <p className='text-base text-gray-900'>
                    {orderData.payment_method === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : orderData.payment_method}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    {t('payment_status')}
                  </p>
                  <p className={`text-base font-medium ${orderData.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {orderData.payment_status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                  </p>
                </div>
              </div>

              {/* COD Note */}
              {orderData.payment_method === 'cod' && (
                <div className='mt-4 rounded-lg bg-blue-50 p-4'>
                  <div className='flex items-start'>
                    <div className='flex-shrink-0'>
                      <svg className='h-5 w-5 text-blue-400' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' clipRule='evenodd' />
                      </svg>
                    </div>
                    <div className='ml-3'>
                      <h4 className='text-sm font-medium text-blue-800'>
                        Hướng dẫn thanh toán COD
                      </h4>
                      <div className='mt-1 text-sm text-blue-700'>
                        <p>{t('cod_note')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shipping Info - Only show if there's shipping data */}
            {(orderData.shipping_name || orderData.delivery_address || orderData.tracking_number) && (
              <div className='rounded-lg bg-gray-50 p-6'>
                <h3 className='mb-4 flex items-center text-lg font-semibold text-gray-900'>
                  <TruckIcon className='mr-2 h-5 w-5' />
                  {t('shipping_info')}
                </h3>
                
                <div className='space-y-4'>
                  {orderData.shipping_name && (
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          Người nhận
                        </p>
                        <p className='text-base text-gray-900'>{orderData.shipping_name}</p>
                      </div>
                      {orderData.shipping_phone && (
                        <div>
                          <p className='text-sm font-medium text-gray-500'>
                            Số điện thoại
                          </p>
                          <p className='text-base text-gray-900'>{orderData.shipping_phone}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {orderData.delivery_address && (
                    <div>
                      <p className='text-sm font-medium text-gray-500 mb-1'>
                        {t('shipping_address')}
                      </p>
                      <p className='text-base text-gray-900'>{orderData.delivery_address}</p>
                    </div>
                  )}

                  {orderData.tracking_number && (
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                      <div>
                        <p className='text-sm font-medium text-gray-500'>
                          {t('tracking_number')}
                        </p>
                        <p className='text-base font-mono text-gray-900'>{orderData.tracking_number}</p>
                      </div>
                      {orderData.shipping_provider && (
                        <div>
                          <p className='text-sm font-medium text-gray-500'>
                            {t('shipping_method')}
                          </p>
                          <p className='text-base text-gray-900'>{orderData.shipping_provider}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className='mt-8'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              {t('next_steps')}
            </h2>
            <div className='space-y-3'>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-100'>
                    <span className='text-sm font-medium text-blue-600'>1</span>
                  </div>
                </div>
                <p className='ml-3 text-gray-700'>{t('step1')}</p>
              </div>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-100'>
                    <span className='text-sm font-medium text-blue-600'>2</span>
                  </div>
                </div>
                <p className='ml-3 text-gray-700'>{t('step2')}</p>
              </div>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-100'>
                    <span className='text-sm font-medium text-blue-600'>3</span>
                  </div>
                </div>
                <p className='ml-3 text-gray-700'>{t('step3')}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center'>
            <Link
              href='/'
              className='inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors'
            >
              {t('back_to_home')}
            </Link>
            {/* Only show "View my orders" button if user is logged in */}
            {isLoggedIn && (
              <Link
                href='/orders'
                className='inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors'
              >
                {t('view_orders')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;
