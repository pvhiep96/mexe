'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

interface OrderItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  total: number;
}

interface TimelineItem {
  id: number;
  status: string;
  title: string;
  description: string;
  date: string;
  icon: any;
}

interface OrderStatus {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  phone: string;
  email: string;
  totalAmount: number;
  status: string;
  statusText: string;
  estimatedDelivery: string;
  items: OrderItem[];
  timeline: TimelineItem[];
}

interface OrderStatusDisplayProps {
  orderStatus: OrderStatus;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'confirmed':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-purple-100 text-purple-800';
    case 'shipping':
      return 'bg-orange-100 text-orange-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return ClockIcon;
    case 'confirmed':
      return CheckCircleIcon;
    case 'processing':
      return ClockIcon;
    case 'shipping':
      return TruckIcon;
    case 'delivered':
      return CheckCircleIcon;
    case 'cancelled':
      return XCircleIcon;
    default:
      return ClockIcon;
  }
};

export default function OrderStatusDisplay({
  orderStatus,
}: OrderStatusDisplayProps) {
  const t = useTranslations('order_status');
  const StatusIcon = getStatusIcon(orderStatus.status);

  return (
    <div className='mb-8 rounded-lg bg-white p-6 shadow-sm'>
      {/* Order Header */}
      <div className='mb-6 border-b border-gray-200 pb-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-2xl font-bold text-gray-900'>
              {t('order')} #{orderStatus.orderNumber}
            </h2>
            <p className='mt-1 text-gray-600'>
              {t('ordered_on')}:{' '}
              {new Date(orderStatus.orderDate).toLocaleDateString('vi-VN')}
            </p>
          </div>
          <div className='mt-4 sm:mt-0'>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(orderStatus.status)}`}
            >
              <StatusIcon className='mr-2 h-4 w-4' />
              {orderStatus.statusText}
            </span>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='rounded-lg bg-gray-50 p-4'>
          <h3 className='mb-3 flex items-center text-lg font-semibold text-gray-900'>
            <UserIcon className='mr-2 h-5 w-5 text-gray-600' />
            {t('customer_info')}
          </h3>
          <div className='space-y-2'>
            <p className='text-sm text-gray-600'>
              <span className='font-medium'>{t('name')}:</span>{' '}
              {orderStatus.customerName}
            </p>
            <p className='flex items-center text-sm text-gray-600'>
              <PhoneIcon className='mr-2 h-4 w-4 text-gray-500' />
              <span className='font-medium'>{t('phone')}:</span>{' '}
              {orderStatus.phone}
            </p>
            <p className='flex items-center text-sm text-gray-600'>
              <EnvelopeIcon className='mr-2 h-4 w-4 text-gray-500' />
              <span className='font-medium'>{t('email')}:</span>{' '}
              {orderStatus.email}
            </p>
          </div>
        </div>

        <div className='rounded-lg bg-gray-50 p-4'>
          <h3 className='mb-3 flex items-center text-lg font-semibold text-gray-900'>
            <CalendarIcon className='mr-2 h-5 w-5 text-gray-600' />
            {t('delivery_info')}
          </h3>
          <div className='space-y-2'>
            <p className='text-sm text-gray-600'>
              <span className='font-medium'>{t('estimated_delivery')}:</span>{' '}
              {new Date(orderStatus.estimatedDelivery).toLocaleDateString(
                'vi-VN'
              )}
            </p>
            <p className='text-sm text-gray-600'>
              <span className='font-medium'>{t('total_amount')}:</span>{' '}
              {orderStatus.totalAmount.toLocaleString('vi-VN')}đ
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className='mb-8'>
        <h3 className='mb-4 text-lg font-semibold text-gray-900'>
          {t('order_items')}
        </h3>
        <div className='space-y-4'>
          {orderStatus.items.map((item) => (
            <div
              key={item.id}
              className='flex items-center space-x-4 rounded-lg border border-gray-200 p-4'
            >
              <div className='flex-shrink-0'>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className='h-15 w-15 rounded object-cover'
                />
              </div>
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium text-gray-900'>
                  {item.name}
                </p>
                <p className='text-sm text-gray-500'>
                  {t('quantity')}: {item.quantity}
                </p>
              </div>
              <div className='flex-shrink-0 text-right'>
                <p className='text-sm font-medium text-gray-900'>
                  {item.price.toLocaleString('vi-VN')}đ
                </p>
                <p className='text-sm text-gray-500'>
                  {t('total')}: {item.total.toLocaleString('vi-VN')}đ
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Timeline */}
      <div>
        <h3 className='mb-4 text-lg font-semibold text-gray-900'>
          {t('order_timeline')}
        </h3>
        <div className='relative'>
          {orderStatus.timeline.map((item, index) => (
            <div key={item.id} className='relative pb-8'>
              {index !== orderStatus.timeline.length - 1 && (
                <div className='absolute top-8 left-4 h-full w-0.5 bg-gray-200'></div>
              )}
              <div className='relative flex items-start space-x-3'>
                <div className='flex-shrink-0'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100'>
                    <item.icon className='h-5 w-5 text-blue-600' />
                  </div>
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='text-sm font-medium text-gray-900'>
                    {item.title}
                  </p>
                  <p className='mt-1 text-sm text-gray-500'>
                    {item.description}
                  </p>
                  <p className='mt-1 text-xs text-gray-400'>{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
