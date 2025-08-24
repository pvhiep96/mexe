'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface OrderStatusFormProps {
  onCheckOrder: (orderNumber: string) => void;
  isLoading: boolean;
}

export default function OrderStatusForm({ onCheckOrder, isLoading }: OrderStatusFormProps) {
  const t = useTranslations('order_status');
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!orderNumber.trim()) {
      setError(t('order_number_required'));
      return;
    }

    if (orderNumber.trim().length < 6) {
      setError(t('order_number_invalid'));
      return;
    }

    onCheckOrder(orderNumber.trim());
  };

  return (
    <div className='bg-white rounded-lg shadow-sm p-6 mb-8'>
      <div className='text-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>
          {t('check_order_title')}
        </h2>
        <p className='text-gray-600'>
          {t('check_order_description')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        <div className='mb-4'>
          <label htmlFor='orderNumber' className='block text-sm font-medium text-gray-700 mb-2'>
            {t('order_number_label')}
          </label>
          <div className='relative'>
            <input
              type='text'
              id='orderNumber'
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder={t('order_number_placeholder')}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              disabled={isLoading}
            />
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />
            </div>
          </div>
          {error && (
            <p className='mt-2 text-sm text-red-600'>
              {error}
            </p>
          )}
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? (
            <div className='flex items-center justify-center'>
              <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
              {t('checking')}
            </div>
          ) : (
            t('check_order_button')
          )}
        </button>
      </form>

      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-500'>
          {t('order_number_help')}
        </p>
        <p className='text-sm text-gray-500 mt-1'>
          {t('order_number_example')}
        </p>
      </div>
    </div>
  );
}
