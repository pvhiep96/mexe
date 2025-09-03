'use client';

import { useTranslations } from 'next-intl';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const OrderStatusPage = () => {
  const t = useTranslations('order_status');
  
  const fallbackTranslations: Record<string, string> = {
    title: 'Đặt hàng thành công!',
    message: 'Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất có thể.',
    order_number: 'Mã đơn hàng',
    status: 'Trạng thái',
    pending: 'Đang xử lý',
    next_steps: 'Các bước tiếp theo',
    step1: 'Chúng tôi sẽ xác nhận đơn hàng của bạn trong vòng 24 giờ',
    step2: 'Bạn sẽ nhận được email xác nhận với thông tin chi tiết',
    step3: 'Đơn hàng sẽ được giao trong 3-5 ngày làm việc',
    back_to_home: 'Về trang chủ',
    view_orders: 'Xem đơn hàng của tôi',
  };

  const safeTranslate = (key: string) => {
    try {
      return t(key);
    } catch (error) {
      return fallbackTranslations[key] || key;
    }
  };

  // Lấy order number từ URL params hoặc localStorage
  const orderNumber = typeof window !== 'undefined' 
    ? localStorage.getItem('lastOrderNumber') || 'N/A'
    : 'N/A';

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
        <div className='rounded-lg bg-white p-8 shadow-lg'>
          {/* Success Icon */}
          <div className='text-center'>
            <CheckCircleIcon className='mx-auto h-16 w-16 text-green-500' />
            <h1 className='mt-4 text-3xl font-bold text-gray-900'>
              {safeTranslate('title')}
            </h1>
            <p className='mt-2 text-lg text-gray-600'>
              {safeTranslate('message')}
            </p>
          </div>

          {/* Order Details */}
          <div className='mt-8 rounded-lg bg-gray-50 p-6'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div>
                <p className='text-sm font-medium text-gray-500'>
                  {safeTranslate('order_number')}
                </p>
                <p className='text-lg font-semibold text-gray-900'>{orderNumber}</p>
              </div>
              <div>
                <p className='text-sm font-medium text-gray-500'>
                  {safeTranslate('status')}
                </p>
                <p className='text-lg font-semibold text-yellow-600'>
                  {safeTranslate('pending')}
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className='mt-8'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              {safeTranslate('next_steps')}
            </h2>
            <div className='space-y-3'>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-100'>
                    <span className='text-sm font-medium text-blue-600'>1</span>
                  </div>
                </div>
                <p className='ml-3 text-gray-700'>{safeTranslate('step1')}</p>
              </div>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-100'>
                    <span className='text-sm font-medium text-blue-600'>2</span>
                  </div>
                </div>
                <p className='ml-3 text-gray-700'>{safeTranslate('step2')}</p>
              </div>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-100'>
                    <span className='text-sm font-medium text-blue-600'>3</span>
                  </div>
                </div>
                <p className='ml-3 text-gray-700'>{safeTranslate('step3')}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center'>
            <Link
              href='/'
              className='inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors'
            >
              {safeTranslate('back_to_home')}
            </Link>
            <Link
              href='/orders'
              className='inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors'
            >
              {safeTranslate('view_orders')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusPage;
