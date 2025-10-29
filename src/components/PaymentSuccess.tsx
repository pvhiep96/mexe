'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { CheckCircleIcon, ShoppingBagIcon, ClockIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface PaymentSuccessProps {
  orderNumber: string;
  amount: number;
  transactionId?: string;
  paymentMethod?: string;
}

export default function PaymentSuccess({
  orderNumber,
  amount,
  transactionId,
  paymentMethod
}: PaymentSuccessProps) {
  const t = useTranslations('payment_success');
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Clear cart after successful payment
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
      localStorage.removeItem('currentOrder');
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(`/order-status?order=${orderNumber}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, orderNumber]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('title')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('description')}
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">
              {t('order_details')}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('order_number')}:</span>
                <span className="font-medium text-gray-900">#{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('amount')}:</span>
                <span className="font-medium text-gray-900">
                  {amount.toLocaleString('vi-VN')}đ
                </span>
              </div>
              {transactionId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('transaction_id')}:</span>
                  <span className="font-medium text-gray-900">{transactionId}</span>
                </div>
              )}
              {paymentMethod && (
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('payment_method')}:</span>
                  <span className="font-medium text-gray-900">{paymentMethod}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">{t('status')}:</span>
                <span className="font-medium text-green-600">{t('status_paid')}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
              <ClockIcon className="h-5 w-5 mr-2" />
              {t('next_steps')}
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• {t('confirmation_email')}</li>
              <li>• {t('processing_time')}</li>
              <li>• {t('delivery_update')}</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href={`/order-status?order=${orderNumber}`}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
            >
              <ShoppingBagIcon className="h-5 w-5 inline mr-2" />
              {t('track_order')}
            </Link>
            
            <Link
              href="/"
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors inline-block"
            >
              {t('continue_shopping')}
            </Link>
          </div>

          {/* Auto-redirect notice */}
          <div className="mt-6 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              {t('auto_redirect', { seconds: countdown })}
            </p>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">
            {t('need_help')}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {t('help_description')}
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="tel:+84123456789"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {t('call_support')}
            </a>
            <span className="text-gray-300">|</span>
            <a
              href="mailto:support@mexe.vn"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {t('email_support')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}