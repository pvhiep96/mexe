'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PaymentSuccess from '@/components/PaymentSuccess';
import { ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline';
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
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
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
    console.log('VNPay return params:', {
      responseCode,
      transactionStatus,
      orderInfo,
      amount,
      transactionId,
      txnRef,
      bankCode,
      payDate
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
        paymentMethod: bankCode || 'VNPay'
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
        errorMessage
      };
    }

    setPaymentResult(result);
    setIsLoading(false);
  }, [searchParams, t]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('processing')}</p>
        </div>
      </div>
    );
  }

  if (!paymentResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md w-full">
          <ExclamationTriangleIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            {t('invalid_request')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('invalid_request_description')}
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {/* Error Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <XCircleIcon className="h-8 w-8 text-red-600" />
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('payment_failed')}
          </h1>
          <p className="text-gray-600 mb-6">
            {paymentResult.errorMessage}
          </p>

          {/* Order Info */}
          {paymentResult.orderNumber && paymentResult.orderNumber !== 'Unknown' && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('order_number')}:</span>
                <span className="font-medium text-gray-900">#{paymentResult.orderNumber}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/checkout"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block"
            >
              {t('try_again')}
            </Link>
            
            <Link
              href="/"
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors inline-block"
            >
              {t('back_home')}
            </Link>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center mt-6">
          <h3 className="font-semibold text-gray-900 mb-2">
            {t('need_help')}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {t('support_description')}
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

export default function PaymentReturnPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <PaymentReturnContent />
    </Suspense>
  );
}