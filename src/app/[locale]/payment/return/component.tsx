'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PaymentSuccess from '@/components/PaymentSuccess';
import {
  ExclamationTriangleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface PaymentResult {
  success: boolean;
  orderNumber?: string;
  amount?: number;
  transactionId?: string;
  paymentMethod?: string;
  errorMessage?: string;
}

function PaymentReturnContent() {
  const searchParams = useSearchParams();
  const t = useTranslations('payment_return');
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Parse VNPay return parameters
    const responseCode = searchParams.get('vnp_ResponseCode');
    const transactionStatus = searchParams.get('vnp_TransactionStatus');
    const orderInfo = searchParams.get('vnp_OrderInfo');
    const amount = searchParams.get('vnp_Amount');
    const transactionId = searchParams.get('vnp_TransactionNo');
    const txnRef = searchParams.get('vnp_TxnRef');
    const bankCode = searchParams.get('vnp_BankCode');
    const payDate = searchParams.get('vnp_PayDate');

    // Log payment result for debugging
    console.log('Payment result:', {
      responseCode,
      transactionStatus,
      orderInfo,
      amount,
      transactionId,
      txnRef,
      bankCode,
      payDate,
    });

    // Check if payment was successful
    const isSuccess = responseCode === '00' && transactionStatus === '00';

    let result: PaymentResult;

    if (isSuccess) {
      result = {
        success: true,
        orderNumber: txnRef || 'Unknown',
        amount: amount ? parseInt(amount) / 100 : 0, // VNPay returns amount in cents
        transactionId: transactionId || undefined,
        paymentMethod: bankCode || 'VNPay',
      };
    } else {
      // Handle different error codes
      let errorMessage = t('error_unknown');

      switch (responseCode) {
        case '07':
          errorMessage = t('error_suspicious_transaction');
          break;
        case '09':
          errorMessage = t('error_card_not_registered');
          break;
        case '10':
          errorMessage = t('error_authentication_failed');
          break;
        case '11':
          errorMessage = t('error_timeout');
          break;
        case '12':
          errorMessage = t('error_card_locked');
          break;
        case '13':
          errorMessage = t('error_wrong_otp');
          break;
        case '24':
          errorMessage = t('error_cancelled');
          break;
        case '51':
          errorMessage = t('error_insufficient_funds');
          break;
        case '65':
          errorMessage = t('error_transaction_limit');
          break;
        case '75':
          errorMessage = t('error_banking_system');
          break;
        case '79':
          errorMessage = t('error_exceeds_limit');
          break;
        default:
          errorMessage = t('error_payment_failed');
      }

      result = {
        success: false,
        orderNumber: txnRef || 'Unknown',
        errorMessage,
      };
    }

    setPaymentResult(result);
    setIsLoading(false);
  }, [searchParams, t]);

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600'></div>
          <p className='text-gray-600'>{t('processing')}</p>
        </div>
      </div>
    );
  }

  if (!paymentResult) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
        <div className='w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md'>
          <ExclamationTriangleIcon className='mx-auto mb-4 h-16 w-16 text-yellow-500' />
          <h1 className='mb-2 text-xl font-bold text-gray-900'>
            {t('invalid_request')}
          </h1>
          <p className='mb-6 text-gray-600'>
            {t('invalid_request_description')}
          </p>
          <Link
            href='/'
            className='rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
          >
            {t('back_home')}
          </Link>
        </div>
      </div>
    );
  }

  if (paymentResult.success) {
    return (
      <PaymentSuccess
        orderNumber={paymentResult.orderNumber!}
        amount={paymentResult.amount!}
        transactionId={paymentResult.transactionId}
        paymentMethod={paymentResult.paymentMethod}
      />
    );
  }

  // Payment failed
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md'>
        <div className='rounded-lg bg-white p-8 text-center shadow-md'>
          {/* Error Icon */}
          <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
            <XCircleIcon className='h-8 w-8 text-red-600' />
          </div>

          {/* Error Message */}
          <h1 className='mb-2 text-2xl font-bold text-gray-900'>
            {t('payment_failed')}
          </h1>
          <p className='mb-6 text-gray-600'>{paymentResult.errorMessage}</p>

          {/* Order Info */}
          {paymentResult.orderNumber &&
            paymentResult.orderNumber !== 'Unknown' && (
              <div className='mb-6 rounded-lg bg-gray-50 p-4 text-left'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>{t('order_number')}:</span>
                  <span className='font-medium text-gray-900'>
                    #{paymentResult.orderNumber}
                  </span>
                </div>
              </div>
            )}

          {/* Action Buttons */}
          <div className='space-y-3'>
            <Link
              href='/checkout'
              className='inline-block w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700'
            >
              {t('try_again')}
            </Link>

            <Link
              href='/'
              className='inline-block w-full rounded-lg bg-gray-100 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200'
            >
              {t('back_home')}
            </Link>
          </div>
        </div>

        {/* Support Section */}
        <div className='mt-6 rounded-lg bg-white p-6 text-center shadow-md'>
          <h3 className='mb-2 font-semibold text-gray-900'>{t('need_help')}</h3>
          <p className='mb-4 text-sm text-gray-600'>
            {t('support_description')}
          </p>
          <div className='flex justify-center space-x-4'>
            <a
              href='tel:+84123456789'
              className='text-sm font-medium text-blue-600 hover:text-blue-800'
            >
              {t('call_support')}
            </a>
            <span className='text-gray-300'>|</span>
            <a
              href='mailto:support@mexe.vn'
              className='text-sm font-medium text-blue-600 hover:text-blue-800'
            >
              {t('email_support')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentReturn() {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-screen items-center justify-center bg-gray-50'>
          <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600'></div>
        </div>
      }
    >
      <PaymentReturnContent />
    </Suspense>
  );
}
