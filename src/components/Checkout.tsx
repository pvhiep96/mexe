'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import Image from 'next/image';
import { BuildingStorefrontIcon, TruckIcon } from '@heroicons/react/24/outline';
import { useRouter } from '@/i18n/navigation';
import { useFlashTooltip } from '@/context/FlashTooltipContext';
import { api } from '@/config/api';
import CheckoutAddressSelector from './CheckoutAddressSelector';
import { apiClient } from '@/services/api';

interface Product {
  id: string | number;
  name: string;
  price: number;
  discountedPrice?: number;
  image: string;
  quantity: number;
  selectedColor?: string;
  // Variant information
  variant_id?: number;
  variant_name?: string;
  variant_value?: string;
  variant_sku?: string;
  variant_final_price?: number;
  // Payment options from API
  full_payment_transfer?: boolean;
  full_payment_discount_percentage?: number;
  partial_advance_payment?: boolean;
  advance_payment_percentage?: number;
  advance_payment_discount_percentage?: number;
}

interface Order {
  items: Product[];
  total: number;
  orderNumber: string;
}

interface CheckoutForm {
  deliveryType: 'home' | 'store';
  name: string;
  mobile: string;
  email?: string;
  national?: string;
  address?: string;
  city?: string;
  store?: string;
  deliveryAddress: string;
  paymentMethod: 'card' | 'cod' | 'bank';
  note?: string;
  couponCode?: string;
  couponType?: string;
  amount: number;
  orderNumber: string;
}

interface CheckoutProps {
  order: Order;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkout: (formData: any) => Promise<string>;
}

export default function Checkout({ order, checkout }: CheckoutProps) {
  const t = useTranslations('checkout');
  const router = useRouter();
  const { showTooltip } = useFlashTooltip();

  const token = apiClient.getToken();

  // State to track selected payment method for each product
  // Key: product ID, Value: 'full' | 'partial' | 'regular'
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    Record<string, 'full' | 'partial' | 'regular'>
  >({});

  // Products already come with fresh data and payment options from checkout page
  // No need to fetch again as checkout page already queried fresh data from database
  const enhancedProducts = order.items;
  const isLoadingPaymentOptions = false;

  // Format price to Vietnamese currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Calculate payment amounts for a product based on user selection
  const calculateProductPayment = (product: Product) => {
    // Use variant price if available, otherwise use base price
    const unitPrice = product.variant_final_price || product.price || 0;
    const originalPrice = unitPrice * (product.quantity || 0);
    const selectedMethod =
      selectedPaymentMethods[String(product.id)] || 'regular';

    // Calculate based on user's selection
    if (selectedMethod === 'full' && (product.full_payment_transfer || false)) {
      const discountPercentage = product.full_payment_discount_percentage || 0;
      const discountedPrice =
        unitPrice * (1 - discountPercentage / 100);
      const totalPrice = discountedPrice * (product.quantity || 0);
      const discount = (originalPrice || 0) - totalPrice;

      return {
        type: 'full_payment',
        originalPrice: originalPrice || 0,
        totalPrice: totalPrice,
        discount: discount,
        discountPercentage: discountPercentage || 0,
        discountedUnitPrice: discountedPrice || 0,
      };
    }

    if (
      selectedMethod === 'partial' &&
      (product.partial_advance_payment || false) &&
      (product.advance_payment_percentage || 0) > 0
    ) {
      const advanceAmount =
        (originalPrice || 0) *
        ((product.advance_payment_percentage || 0) / 100);
      const advanceDiscountPercentage =
        product.advance_payment_discount_percentage || 0;
      const advanceDiscount =
        advanceDiscountPercentage > 0
          ? (originalPrice * advanceDiscountPercentage) / 100
          : 0;

      // Calculate according to example:
      // - Advance: 10% of 10,000,000 = 1,000,000
      // - Remaining: 90% of 10,000,000 = 9,000,000
      // - Discount: 20% of advance = 200,000
      // - Total to pay: 10,000,000 - 200,000 = 9,800,000
      // - Advance payment: 1,000,000
      // - COD payment: 9,800,000 - 1,000,000 = 8,800,000

      const totalPrice = (originalPrice || 0) - advanceDiscount;
      const remainingAmount = totalPrice - (advanceAmount || 0);

      return {
        type: 'partial_advance',
        originalPrice: originalPrice || 0,
        totalPrice: totalPrice,
        discount: advanceDiscount,
        advanceAmount: advanceAmount,
        remainingAmount: remainingAmount,
        advancePercentage: product.advance_payment_percentage || 0,
        advanceDiscountPercentage: advanceDiscountPercentage || 0,
      };
    }

    return {
      type: 'regular',
      originalPrice: originalPrice || 0,
      totalPrice: originalPrice || 0,
      discount: 0,
    };
  };

  // Calculate total order amounts using enhanced products with payment options
  const calculateOrderTotals = () => {
    let originalAmount = 0;
    let totalDiscount = 0;
    let finalAmount = 0;
    let paymentAmount = 0; // Số tiền cần thanh toán cho VNPay
    let hasAdvancePayment = false; // Kiểm tra có trả trước không

    enhancedProducts.forEach((item) => {
      const payment = calculateProductPayment(item);
      originalAmount += payment.originalPrice;
      totalDiscount += payment.discount;
      finalAmount += payment.totalPrice;

      // Tính số tiền cần thanh toán cho từng sản phẩm
      if (payment.type === 'partial_advance' && payment.advanceAmount) {
        // Trả trước: cộng số tiền trả trước
        paymentAmount += payment.advanceAmount;
        hasAdvancePayment = true;
      } else if (payment.type === 'full_payment') {
        // Chuyển khoản toàn bộ: cộng tổng tiền sau giảm giá
        paymentAmount += payment.totalPrice;
        hasAdvancePayment = true;
      } else {
        // Thanh toán thường: cộng tổng tiền
        paymentAmount += payment.totalPrice;
      }
    });

    return {
      originalAmount,
      totalDiscount,
      finalAmount,
      hasAdvancePayment,
      // Số tiền để thanh toán: tổng số tiền cần thanh toán cho VNPay
      paymentAmount: paymentAmount,
    };
  };

  const orderTotals = useMemo(
    () => calculateOrderTotals(),
    [enhancedProducts, selectedPaymentMethods]
  );

  // Move arrays inside component to use t function
  const stores = [
    { value: 'HCM', label: t('stores.hcm') },
    { value: 'HN', label: t('stores.hn') },
    { value: 'HP', label: t('stores.hp') },
  ];

  const couponTypes = [
    { value: 'none', label: t('coupon_types.none') },
    { value: '10off', label: t('coupon_types.10off') },
    { value: '20off', label: t('coupon_types.20off') },
  ];
  const [deliveryType, setDeliveryType] = useState<'home' | 'store'>('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bankImage, setBankImage] = useState('');
  const [checkoutAddressData, setCheckoutAddressData] = useState<any>({});

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CheckoutForm>({
    defaultValues: {
      amount: orderTotals.paymentAmount, // Sử dụng paymentAmount thay vì finalAmount
      deliveryType: 'home',
      national: 'Vietnam', // Fixed value
      deliveryAddress: '', // Empty string, will be set via useEffect
      paymentMethod: 'cod',
      orderNumber: order.orderNumber,
    },
  });

  const [paymentMethod] = watch(['paymentMethod']);

  const generateQR = () => {
    return `https://api.vietqr.io/image/970415-102007040056-xd3D8Ht.jpg?accountName=NGUYEN%20DINH%20HUNG&amount=${orderTotals.finalAmount}`;
  };
  // Set delivery address placeholder after component mounts
  useEffect(() => {
    setValue('deliveryAddress', t('delivery_address_placeholder'));
  }, [setValue, t]);

  // Update amount when totals change
  useEffect(() => {
    setValue('amount', orderTotals.paymentAmount); // Sử dụng paymentAmount thay vì finalAmount
  }, [setValue, orderTotals.paymentAmount]);

  const onSubmit = async (data: CheckoutForm) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Tạo order trong database trước - format theo Rails API
      const orderData = {
        orders: {
          order_number: order.orderNumber,
          payment_method: data.paymentMethod,
          delivery_type: data.deliveryType,
          delivery_address:
            data.deliveryType === 'home' ? data.address : undefined,
          store_location:
            data.deliveryType === 'store' ? data.store : undefined,
          notes: data.note,
          guest_name: data.name,
          guest_email: data.email,
          guest_phone: data.mobile,
          shipping_info: {
            shipping_name: data.name,
            shipping_phone: data.mobile,
            shipping_city:
              data.deliveryType === 'home'
                ? checkoutAddressData.province?.name || data.city
                : undefined,
            shipping_district:
              data.deliveryType === 'home'
                ? checkoutAddressData.ward?.name || 'Chưa xác định'
                : undefined,
            shipping_ward:
              data.deliveryType === 'home'
                ? checkoutAddressData.ward?.name || 'Chưa xác định'
                : undefined,
            shipping_postal_code: '70000', // Default value
            delivery_address:
              data.deliveryType === 'home'
                ? checkoutAddressData.detailAddress || data.address
                : undefined,
            // Add detailed address fields from database
            province_code:
              data.deliveryType === 'home'
                ? checkoutAddressData.provinceCode
                : undefined,
            ward_code:
              data.deliveryType === 'home'
                ? checkoutAddressData.wardCode
                : undefined,
            full_address:
              data.deliveryType === 'home'
                ? checkoutAddressData.fullAddress
                : undefined,
            // Administrative unit information
            administrative_unit_id:
              data.deliveryType === 'home'
                ? checkoutAddressData.administrativeUnit?.id
                : undefined,
            administrative_unit_name:
              data.deliveryType === 'home'
                ? checkoutAddressData.administrativeUnit?.full_name
                : undefined,
            province_type:
              data.deliveryType === 'home'
                ? checkoutAddressData.province?.type
                : undefined,
            is_municipality:
              data.deliveryType === 'home'
                ? checkoutAddressData.province?.is_municipality
                : undefined,
          },
          order_items: order.items.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
            variant_id: item.variant_id || null,
            full_payment_transfer: item.full_payment_transfer,
            full_payment_discount_percentage:
              item.full_payment_discount_percentage,
            partial_advance_payment: item.partial_advance_payment,
            advance_payment_percentage: item.advance_payment_percentage,
            advance_payment_discount_percentage:
              item.advance_payment_discount_percentage,
          })),
        },
      };

      // Gọi trực tiếp đến backend Rails API
      const authHeader = token; // Retrieve the auth header
      const headers = {
        'Content-Type': 'application/json', // Add Content-Type header
        ...(authHeader ? { Authorization: `Bearer ${authHeader}` } : {}), // Add auth header if it exists
      };

      const orderResponse = await fetch(
        // 'http://localhost:3005/api/v1/orders',
        'http://localhost:3005/api/v1/orders',
        {
          method: 'POST',
          headers,
          body: JSON.stringify(orderData),
        }
      );

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderResult = await orderResponse.json();

      // Lưu order number để hiển thị ở trang order-status
      localStorage.setItem('lastOrderNumber', order.orderNumber);

      // Xóa order khỏi localStorage sau khi tạo thành công
      localStorage.removeItem('currentOrder');

      // Nếu tạo order thành công, xử lý payment
      if (data.paymentMethod === 'cod' || data.paymentMethod === 'bank') {
        // COD: Hiển thị thông báo thành công và chuyển đến order-status
        showTooltip(
          'Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.',
          'success'
        );

        // Clear cart từ localStorage
        localStorage.removeItem('cart');
        localStorage.removeItem('cartItems');

        // Reset submitting state trước khi redirect
        setIsSubmitting(false);
        
        setTimeout(() => {
          try {
            router.push('/order-status');
          } catch (error) {
            // Fallback nếu router.push thất bại
            const currentPath = window.location.pathname;
            const locale = currentPath.split('/')[1] || 'vi';
            window.location.href = `/${locale}/order-status`;
          }
        }, 2000);
      } else if (data.paymentMethod === 'card') {
        // Card/Bank: Chuyển đến payment gateway với order đã tạo
        showTooltip(
          'Đã tạo đơn hàng thành công! Đang chuyển đến trang thanh toán...',
          'success'
        );
        // Clear cart từ localStorage
        localStorage.removeItem('cart');
        localStorage.removeItem('cartItems');

        setTimeout(async () => {
          try {
            const paymentUrl = await checkout({
              amount: order.total.toString(),
              orderInfo: order.orderNumber,
              orderType: 'topup',
              locale: 'vn',
            });

            // Immediately redirect to VNPay
            window.location.href = paymentUrl;
          } catch (error) {
            // For errors, show message and redirect to order status
            console.error('Payment URL generation error:', error);
            showTooltip(
              'Có lỗi khi tạo link thanh toán. Vui lòng kiểm tra đơn hàng của bạn.',
              'noti'
            );
            setIsSubmitting(false);
            try {
              router.push('/order-status');
            } catch (redirectError) {
              // Fallback nếu router.push thất bại
              const currentPath = window.location.pathname;
              const locale = currentPath.split('/')[1] || 'vi';
              window.location.href = `/${locale}/order-status`;
            }
          }
        }, 1500);
      }
    } catch (error) {
      // Hiển thị thông báo lỗi cụ thể
      if (error instanceof Error) {
        if (error.message.includes('Failed to create order')) {
          showTooltip('Không thể tạo đơn hàng. Vui lòng thử lại!', 'error');
        } else if (error.message.includes('NEXT_REDIRECT')) {
          // Đây là redirect error, không cần hiển thị
          return;
        } else {
          showTooltip(`Lỗi: ${error.message}`, 'error');
        }
      } else {
        showTooltip('Có lỗi xảy ra khi xử lý đơn hàng!', 'error');
      }

      // Không redirect nếu có lỗi tạo order
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCouponSubmit = () => {
    // Mock coupon application
    // Coupon applied
  };

  const handleCheckoutAddressChange = useCallback((address: any) => {
    setCheckoutAddressData(address);

    // Update form values for backward compatibility
    if (address.fullAddress) {
      setValue('address', address.fullAddress);
      setValue('deliveryAddress', address.fullAddress);
    }
    if (address.province?.name) {
      setValue('city', address.province.name);
    }
  }, [setValue]);

  // Check if address is complete for home delivery
  const isAddressComplete = () => {
    if (deliveryType !== 'home') return true;
    return Boolean(
      checkoutAddressData.provinceCode &&
        checkoutAddressData.wardCode &&
        checkoutAddressData.detailAddress?.trim()
    );
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>{t('title')}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-1 gap-8 lg:grid-cols-3'
      >
        {/* Left Column: Form Sections */}
        <div className='space-y-8 lg:col-span-2'>
          {/* Section 3: Product Payment Options */}
          <section className='rounded-lg bg-white p-6 shadow-md'>
            <h2 className='mb-4 text-xl font-semibold'>
              💳 Tùy chọn thanh toán theo sản phẩm
            </h2>

            {isLoadingPaymentOptions && (
              <div className='mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3'>
                <p className='text-sm text-blue-800'>
                  <span className='font-medium'>⏳ Đang tải:</span> Đang lấy
                  thông tin tùy chọn thanh toán cho từng sản phẩm từ database...
                </p>
              </div>
            )}

            {/* {!isLoadingPaymentOptions && enhancedProducts.every(item => !(item.full_payment_transfer || false) && !(item.partial_advance_payment || false)) && (
              <div className='mb-4 rounded-lg bg-yellow-50 p-3 border border-yellow-200'>
                <p className='text-sm text-yellow-800'>
                  <span className='font-medium'>📝 Chú ý:</span> Hiện tại chưa có sản phẩm nào được cấu hình payment options.
                  Vui lòng truy cập admin interface để thiết lập <strong>full_payment_transfer</strong> và <strong>partial_advance_payment</strong> cho các sản phẩm.
                </p>
              </div>
            )} */}
            <div className='mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3'>
              <p className='text-sm text-blue-800'>
                <span className='font-medium'>ℹ️ Hướng dẫn:</span> Một số sản
                phẩm có tùy chọn thanh toán đặc biệt với ưu đãi giảm giá. Vui
                lòng xem chi tiết từng sản phẩm bên dưới.
              </p>
            </div>

            <div className='space-y-4'>
              {enhancedProducts.map((item, index) => {
                const payment = calculateProductPayment(item);

                return (
                  <div
                    key={index}
                    className='rounded-lg border border-gray-200 bg-gray-50 p-4'
                  >
                    <div className='flex items-start space-x-3'>
                      <img
                        src={item.image || '/images/placeholder-product.png'}
                        alt={item.name}
                        className='h-16 w-16 rounded border border-gray-200 object-cover'
                      />
                      <div className='flex-1'>
                        <h4 className='font-medium text-gray-900'>
                          {item.name}
                        </h4>
                        {item.variant_name && item.variant_value && (
                          <p className='text-sm text-gray-600'>
                            {item.variant_name}: <span className='font-medium'>{item.variant_value}</span>
                            {item.variant_sku && <span className='text-gray-400 ml-2'>({item.variant_sku})</span>}
                          </p>
                        )}
                        <p className='mb-3 text-sm text-gray-600'>
                          Số lượng: {item.quantity} | Giá gốc:{' '}
                          {formatPrice(item.variant_final_price || item.price)} x {item.quantity}
                        </p>

                        {/* Payment options selection for products with multiple options */}

                        {/* Loại 1: Chuyển khoản toàn bộ */}
                        {/* {payment.type === 'full_payment' && (
                          <div className='rounded-lg border-2 border-green-300 bg-green-50 p-4 shadow-sm'>
                            <div className='mb-3 flex items-center space-x-2'>
                              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-500'>
                                <span className='text-sm font-bold text-white'>
                                  1
                                </span>
                              </div>
                              <span className='text-lg font-bold text-green-800'>
                                💰 Chuyển khoản toàn bộ
                              </span>
                            </div>
                            <div className='ml-10 space-y-2'>
                              <div className='rounded border border-green-200 bg-white p-3'>
                                <p className='mb-1 font-medium text-green-700'>
                                  ✅ Chuyển khoản 100% trước khi nhận hàng
                                </p>
                                {(payment.discountPercentage || 0) > 0 ? (
                                  <div className='space-y-1'>
                                    <p className='text-green-700'>
                                      🎉{' '}
                                      <span className='font-semibold'>
                                        Ưu đãi đặc biệt:
                                      </span>{' '}
                                      Giảm {payment.discountPercentage || 0}%
                                      khi chuyển khoản trước:{' '}
                                      {formatPrice(payment.discount || 0)}
                                    </p>
                                    <div className='flex justify-between text-sm'>
                                      <span>Tiết kiệm:</span>
                                      <span className='font-bold text-red-600'>
                                        -{formatPrice(payment.discount || 0)}
                                      </span>
                                    </div>
                                    <div className='flex justify-between border-t pt-2 text-lg font-bold'>
                                      <span className='text-green-800'>
                                        Chỉ cần thanh toán:
                                      </span>
                                      <span className='text-green-800'>
                                        {formatPrice(payment.totalPrice)}
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <p className='text-green-700'>
                                    Không có giảm giá đặc biệt
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )} */}

                        {/* Loại 2: Chuyển trước một phần */}
                        {/* {payment.type === 'partial_advance' && (
                          <div className='rounded-lg border-2 border-blue-300 bg-blue-50 p-4 shadow-sm'>
                            <div className='mb-3 flex items-center space-x-2'>
                              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-500'>
                                <span className='text-sm font-bold text-white'>
                                  2
                                </span>
                              </div>
                              <span className='text-lg font-bold text-blue-800'>
                                📊 Chuyển trước một phần
                              </span>
                            </div>
                            <div className='ml-10 space-y-3'>
                              <div className='rounded border border-blue-200 bg-white p-3'>
                                <p className='mb-2 font-medium text-blue-700'>
                                  💳 Thanh toán linh hoạt 2 giai đoạn
                                </p>
                                <div className='grid grid-cols-2 gap-3 text-sm'>
                                  <div className='rounded border bg-blue-50 p-2'>
                                    <p className='font-medium text-blue-800'>
                                      1️⃣ Trả trước
                                    </p>
                                    <p className='text-blue-700'>
                                      {payment.advancePercentage || 0}% ={' '}
                                      {formatPrice(payment.advanceAmount || 0)}
                                    </p>
                                  </div>
                                  <div className='rounded border bg-gray-50 p-2'>
                                    <p className='font-medium text-gray-700'>
                                      2️⃣ COD
                                    </p>
                                    <p className='text-gray-600'>
                                      {formatPrice(
                                        payment.remainingAmount || 0
                                      )}
                                    </p>
                                  </div>
                                </div>
                                {(payment.advanceDiscountPercentage || 0) >
                                  0 && (
                                  <div className='mt-2 rounded border border-green-200 bg-green-50 p-2'>
                                    <p className='font-medium text-green-700'>
                                      🎁 Bonus: Giảm{' '}
                                      {payment.advanceDiscountPercentage || 0}%
                                      khi trả trước
                                    </p>
                                    <p className='text-green-700'>
                                      Tiết kiệm: {formatPrice(payment.discount)}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )} */}

                        {/* Thanh toán thông thường */}
                        {payment.type === 'regular' && (
                          <div className='rounded-lg border border-gray-300 bg-gray-100 p-4'>
                            <div className='flex items-center space-x-2'>
                              <span className='text-gray-600'>💳</span>
                              <span className='font-medium text-gray-700'>
                                Thanh toán thông thường
                              </span>
                            </div>
                            <p className='mt-1 ml-6 text-sm text-gray-600'>
                              Sản phẩm này sử dụng các phương thức thanh toán
                              chuẩn (COD, chuyển khoản, thẻ)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          {/* Section 1: Delivery Information */}
          <section className='rounded-lg bg-white p-6 shadow-md'>
            <h2 className='mb-4 text-xl font-semibold'>
              {t('delivery_info.title')}
            </h2>
            <div className='mb-4 flex space-x-4 border-b border-gray-200'>
              <button
                type='button'
                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  deliveryType === 'home'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'border-b-2 border-transparent text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => {
                  setDeliveryType('home');
                  setValue('deliveryType', 'home');
                }}
              >
                <TruckIcon className='mr-2 inline-block size-5' />
                {t('delivery_info.home')}
              </button>
              <button
                type='button'
                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  deliveryType === 'store'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'border-b-2 border-transparent text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => {
                  setDeliveryType('store');
                  setValue('deliveryType', 'store');
                }}
              >
                {/* <BuildingStorefrontIcon className='mr-2 inline-block size-5' />
                {t('delivery_info.store')} */}
              </button>
            </div>

            {deliveryType === 'home' ? (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label className='mb-1 block text-sm font-medium'>
                    {t('delivery_info.name')}
                  </label>
                  <input
                    {...register('name', { required: t('errors.required') })}
                    className='w-full rounded border border-gray-300 p-2'
                    type='text'
                  />
                  {errors.name && (
                    <p className='text-sm text-red-500'>
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium'>
                    {t('delivery_info.mobile')}
                  </label>
                  <input
                    {...register('mobile', { required: t('errors.required') })}
                    className='w-full rounded border border-gray-300 p-2'
                    type='text'
                  />
                  {errors.mobile && (
                    <p className='text-sm text-red-500'>
                      {errors.mobile.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium'>
                    {t('delivery_info.email')}
                  </label>
                  <input
                    {...register('email')}
                    className='w-full rounded border border-gray-300 p-2'
                    type='email'
                  />
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium'>
                    {t('delivery_info.national')}
                  </label>
                  <input
                    {...register('national')}
                    className='w-full rounded border border-gray-300 bg-gray-100 p-2'
                    type='text'
                    disabled
                  />
                </div>
                <div className='col-span-2'>
                  <CheckoutAddressSelector
                    onAddressChange={handleCheckoutAddressChange}
                    required={true}
                    className='space-y-3'
                  />
                </div>
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label className='mb-1 block text-sm font-medium'>
                    {t('delivery_info.name')}
                  </label>
                  <input
                    {...register('name', { required: t('errors.required') })}
                    className='w-full rounded border border-gray-300 p-2'
                    type='text'
                  />
                  {errors.name && (
                    <p className='text-sm text-red-500'>
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium'>
                    {t('delivery_info.mobile')}
                  </label>
                  <input
                    {...register('mobile', { required: t('errors.required') })}
                    className='w-full rounded border border-gray-300 p-2'
                    type='text'
                  />
                  {errors.mobile && (
                    <p className='text-sm text-red-500'>
                      {errors.mobile.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium'>
                    {t('delivery_info.email')}
                  </label>
                  <input
                    {...register('email')}
                    className='w-full rounded border border-gray-300 p-2'
                    type='email'
                  />
                </div>
                <div>
                  {/* <label className='mb-1 block text-sm font-medium'>
                    {t('delivery_info.store')}
                  </label> */}
                  <Controller
                    name='store'
                    control={control}
                    rules={{ required: t('errors.required') }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className='w-full rounded border border-gray-300 p-2'
                      >
                        <option value=''>
                          {t('delivery_info.select_store')}
                        </option>
                        {stores.map((store) => (
                          <option key={store.value} value={store.value}>
                            {store.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.store && (
                    <p className='text-sm text-red-500'>
                      {errors.store.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Section 2: Delivery Method */}
          <section className='rounded-lg bg-white p-6 shadow-md'>
            <h2 className='mb-4 text-xl font-semibold'>
              {t('delivery_method.title')}
            </h2>

            {/* Address Summary */}
            {deliveryType === 'home' && !isAddressComplete() && (
              <div className='mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                <h3 className='mb-2 text-sm font-medium text-yellow-800'>
                  ⚠️ Vui lòng hoàn thành thông tin địa chỉ
                </h3>
                <p className='text-sm text-yellow-700'>
                  Bạn cần chọn đầy đủ: Tỉnh/Thành phố, Phường/Xã và điền địa chỉ
                  chi tiết để có thể đặt hàng.
                </p>
              </div>
            )}

            {checkoutAddressData.fullAddress && isAddressComplete() && (
              <div className='mb-4 rounded-lg border border-green-200 bg-green-50 p-4'>
                <h3 className='mb-2 text-sm font-medium text-green-800'>
                  ✅ Địa chỉ giao hàng đã chọn
                </h3>
                <div className='space-y-1 text-sm text-green-700'>
                  {checkoutAddressData.detailAddress && (
                    <div>
                      <strong>Địa chỉ:</strong>{' '}
                      {checkoutAddressData.detailAddress}
                    </div>
                  )}
                  {checkoutAddressData.ward && (
                    <div>
                      <strong>Phường/Xã:</strong>{' '}
                      {checkoutAddressData.ward.full_name}
                    </div>
                  )}
                  {checkoutAddressData.province && (
                    <div>
                      <strong>Tỉnh/TP:</strong>{' '}
                      {checkoutAddressData.province.full_name}
                      {checkoutAddressData.province.type && (
                        <span className='ml-2 rounded bg-green-100 px-2 py-1 text-xs'>
                          {checkoutAddressData.province.type}
                        </span>
                      )}
                      {checkoutAddressData.province.is_municipality && (
                        <span className='ml-1 rounded bg-blue-100 px-2 py-1 text-xs'>
                          Thành phố trực thuộc TW
                        </span>
                      )}
                    </div>
                  )}
                  {checkoutAddressData.administrativeUnit && (
                    <div className='text-xs text-green-600'>
                      <strong>Đơn vị hành chính:</strong>{' '}
                      {checkoutAddressData.administrativeUnit.full_name}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <label className='mb-1 block text-sm font-medium'>
                {t('delivery_method.address')}
              </label>
              <input
                {...register('deliveryAddress')}
                className='w-full rounded border border-gray-300 bg-gray-100 p-2'
                type='text'
                disabled
                placeholder='Địa chỉ sẽ được tự động cập nhật từ phần chọn địa chỉ ở trên'
              />
            </div>
          </section>

          {/* Section 4: General Payment Method */}
          <section className='rounded-lg bg-white p-6 shadow-md'>
            <h2 className='mb-4 text-xl font-semibold'>
              {t('payment_method.title')}
            </h2>
            <div className='space-y-3'>
              {/* Check if any product has special payment options */}
              {(() => {
                const hasFullPayment = enhancedProducts.some(
                  (item) => item.full_payment_transfer || false
                );
                const hasPartialPayment = enhancedProducts.some(
                  (item) => item.partial_advance_payment || false
                );

                return (
                  <>
                    {/* <label className='flex cursor-pointer items-start space-x-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50'>
                      <input
                        {...register('paymentMethod', {
                          required: t('errors.required'),
                        })}
                        type='radio'
                        value='card'
                        className='mt-1'
                      />
                      <div>
                        <div className='font-medium'>
                          {t('payment_method.card')}
                        </div>
                        <div className='mt-1 text-sm text-gray-600'>
                          Thanh toán online qua thẻ/ví điện tử
                        </div>
                      </div>
                    </label> */}

                    <label className='flex cursor-pointer items-start space-x-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50'>
                      <input
                        {...register('paymentMethod', {
                          required: t('errors.required'),
                        })}
                        type='radio'
                        value='cod'
                        className='mt-1'
                      />
                      <div>
                        <div className='font-medium'>
                          {t('payment_method.cod')}
                        </div>
                        <div className='mt-1 text-sm text-gray-600'>
                          Thanh toán khi nhận hàng
                        </div>
                      </div>
                    </label>

                    {/* <label className='flex cursor-pointer items-start space-x-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50'>
                      <input
                        {...register('paymentMethod', {
                          required: t('errors.required'),
                        })}
                        type='radio'
                        value='bank'
                        className='mt-1'
                      />
                      <div>
                        <div className='font-medium'>
                          {t('payment_method.bank')}
                        </div>
                        <div className='mt-1 text-sm text-gray-600'>
                          Chuyển khoản ngân hàng
                        </div>
                      </div>
                    </label> */}
                  </>
                );
              })()}

              {errors.paymentMethod && (
                <p className='text-sm text-red-500'>
                  {errors.paymentMethod.message}
                </p>
              )}
              {/* {paymentMethod} */}
              {paymentMethod === 'bank' && (
                <Image src={generateQR()} alt={''} width={400} height={400} />
              )}
            </div>

            {/* Payment Method Icons */}
            <div className='mt-4 border-t border-gray-200 pt-4'>
              <p className='mb-3 text-sm font-medium text-gray-700'>
                {t('payment_method.supported_methods')}
              </p>
              <div className='flex items-center gap-4'>
                {/* MoMo */}
                <div className='flex flex-col items-center'>
                  <div className='mb-1 flex h-8 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white'>
                    <Image
                      src='/images/payment-logos/momo-logo.svg'
                      alt='MoMo'
                      width={32}
                      height={32}
                      className='object-contain'
                    />
                  </div>
                  <span className='text-xs text-gray-600'>MoMo</span>
                </div>

                {/* VNPay */}
                <div className='flex flex-col items-center'>
                  <div className='mb-1 flex h-8 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white'>
                    <Image
                      src='/images/payment-logos/vnpay-logo.svg'
                      alt='VNPay'
                      width={40}
                      height={32}
                      className='object-contain'
                    />
                  </div>
                  <span className='text-xs text-gray-600'>VNPay</span>
                </div>

                {/* Visa */}
                <div className='flex flex-col items-center'>
                  <div className='mb-1 flex h-8 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white'>
                    <Image
                      src='/images/payment-logos/visa-logo.png'
                      alt='Visa'
                      width={36}
                      height={32}
                      className='object-contain'
                    />
                  </div>
                  <span className='text-xs text-gray-600'>Visa</span>
                </div>

                {/* ZaloPay */}
                <div className='flex flex-col items-center'>
                  <div className='mb-1 flex h-8 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white'>
                    <Image
                      src='/images/payment-logos/zalopay-logo.svg'
                      alt='ZaloPay'
                      width={36}
                      height={32}
                      className='object-contain'
                    />
                  </div>
                  <span className='text-xs text-gray-600'>ZaloPay</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Note */}
          <section className='rounded-lg bg-white p-6 shadow-md'>
            <h2 className='mb-4 text-xl font-semibold'>{t('note.title')}</h2>
            <textarea
              {...register('note')}
              className='w-full rounded border border-gray-300 p-2'
              rows={4}
              placeholder={t('note.placeholder')}
            />
          </section>
        </div>

        {/* Right Column: Cart Preview, Coupon, Summary */}
        <div className='space-y-8'>
          {/* Section 6: Cart Preview */}
          <section className='rounded-lg bg-white p-6 shadow-md'>
            <h2 className='mb-4 text-xl font-semibold'>
              {t('cart_preview.title')}
            </h2>
            <div className='space-y-4'>
              {enhancedProducts.map((item, index) => {
                const payment = calculateProductPayment(item);
                return (
                  <div
                    key={index}
                    className='border-b border-gray-200 pb-4 last:border-b-0'
                  >
                    <div className='flex items-start space-x-4'>
                      <Image
                        src={item.image || '/images/placeholder-product.png'}
                        alt={item.name}
                        width={80}
                        height={80}
                        className='rounded'
                      />
                      <div className='grow'>
                        <p className='font-medium'>{item.name}</p>
                        {item.variant_name && item.variant_value && (
                          <p className='text-sm text-gray-600'>
                            {item.variant_name}: <span className='font-medium'>{item.variant_value}</span>
                            {item.variant_sku && <span className='text-gray-400 ml-2'>({item.variant_sku})</span>}
                          </p>
                        )}
                        <p className='text-sm text-gray-600'>
                          Số lượng: {item.quantity}
                        </p>
                        <p className='text-sm'>
                          Giá gốc: {item.quantity} x {formatPrice(item.variant_final_price || item.price)}
                        </p>

                        {/* Payment option display */}
                        {payment.type === 'full_payment' && (
                          <div className='mt-2 rounded bg-green-50 p-2'>
                            <p className='text-sm font-medium text-green-800'>
                              🎉 Chuyển khoản toàn bộ
                            </p>
                            <p className='text-sm text-green-700'>
                              Giảm {payment.discountPercentage || 0}% ={' '}
                              {formatPrice(payment.discount || 0)}
                            </p>
                            <p className='text-sm text-green-700'>
                              Giá sau giảm: {item.quantity} x{' '}
                              {formatPrice(payment.discountedUnitPrice || 0)}
                            </p>
                          </div>
                        )}

                        {payment.type === 'partial_advance' && (
                          <div className='mt-2 rounded bg-blue-50 p-2'>
                            <p className='text-sm font-medium text-blue-800'>
                              💰 Chuyển trước một phần
                            </p>
                            <p className='text-sm text-blue-700'>
                              Trả trước {payment.advancePercentage || 0}%:{' '}
                              {formatPrice(payment.advanceAmount || 0)}
                            </p>
                            <p className='text-sm text-blue-700'>
                              Còn lại:{' '}
                              {formatPrice(payment.remainingAmount || 0)}
                            </p>
                            {(payment.advanceDiscountPercentage || 0) > 0 && (
                              <p className='text-sm text-green-700'>
                                Giảm {payment.advanceDiscountPercentage || 0}%
                                khi trả trước:{' '}
                                {formatPrice(payment.discount || 0)}
                              </p>
                            )}
                          </div>
                        )}

                        <p className='mt-2 text-base font-medium'>
                          Thành tiền: {formatPrice(payment.totalPrice)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 7: Coupon */}
          <section className='rounded-lg bg-white p-6 shadow-md'>
            <h2 className='mb-4 text-xl font-semibold'>{t('coupon.title')}</h2>
            <div className='space-y-4'>
              <div>
                <label className='mb-1 block text-sm font-medium'>
                  {t('coupon.type')}
                </label>
                <Controller
                  name='couponType'
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className='w-full rounded border border-gray-300 p-2'
                    >
                      {couponTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
              <div>
                <label className='mb-1 block text-sm font-medium'>
                  {t('coupon.code')}
                </label>
                <input
                  {...register('couponCode')}
                  className='w-full rounded border border-gray-300 p-2'
                  type='text'
                  placeholder={t('coupon.code_placeholder')}
                />
              </div>
              <button
                type='button'
                className='w-full cursor-pointer rounded bg-blue-600 p-2 text-white hover:bg-blue-700'
                onClick={handleCouponSubmit}
              >
                {t('coupon.submit')}
              </button>
            </div>
          </section>

          {/* Section 8: Summary */}
          <section className='rounded-lg bg-white p-6 shadow-md'>
            <h2 className='mb-4 text-xl font-semibold'>{t('summary.title')}</h2>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span>Tổng số sản phẩm</span>
                <span>
                  {enhancedProducts.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}
                </span>
              </div>
              <div className='flex justify-between'>
                <span>Giá trị đơn hàng</span>
                <span>{formatPrice(orderTotals.originalAmount)}</span>
              </div>
              {orderTotals.totalDiscount > 0 && (
                <div className='flex justify-between text-red-600'>
                  <span>Giảm giá</span>
                  <span>-{formatPrice(orderTotals.totalDiscount)}</span>
                </div>
              )}
              <div className='flex justify-between'>
                <span>{t('summary.shipping')}</span>
                <span>{t('summary.shipping_value')}</span>
              </div>
              <hr className='my-2' />
              <div className='flex justify-between text-lg font-bold'>
                <span>Tổng đơn</span>
                <span>{formatPrice(orderTotals.finalAmount)}</span>
              </div>

              {/* Payment Summary */}
              {(() => {
                let totalAdvanceAmount = 0;
                let totalRemainingAmount = 0;
                let hasFullPayment = false;
                let hasPartialPayment = false;

                enhancedProducts.forEach((item) => {
                  const payment = calculateProductPayment(item);
                  if (payment.type === 'full_payment') {
                    hasFullPayment = true;
                    totalAdvanceAmount += payment.totalPrice || 0;
                  } else if (payment.type === 'partial_advance') {
                    hasPartialPayment = true;
                    totalAdvanceAmount += payment.advanceAmount || 0;
                    totalRemainingAmount += payment.remainingAmount || 0;
                  } else {
                    totalRemainingAmount += payment.totalPrice || 0;
                  }
                });

                // If no payment options are selected, show regular payment
                if (!hasFullPayment && !hasPartialPayment) {
                  totalRemainingAmount = orderTotals.finalAmount || 0;
                }

                // Always show payment summary
                const showPaymentSummary = true;

                return (
                  <div className='mt-4 space-y-3 border-t pt-4'>
                    <h3 className='text-lg font-semibold text-gray-800'>
                      💳 Chi tiết thanh toán
                    </h3>

                    {hasFullPayment && (
                      <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                        <div className='mb-2 flex items-center space-x-2'>
                          <span className='text-xl text-green-600'>💰</span>
                          <span className='font-semibold text-green-800'>
                            Chuyển khoản toàn bộ
                          </span>
                        </div>
                        <div className='flex justify-between text-lg font-bold text-green-700'>
                          <span>Số tiền cần chuyển:</span>
                          <span>{formatPrice(totalAdvanceAmount || 0)}</span>
                        </div>
                        <p className='mt-1 text-sm text-green-600'>
                          ✅ Thanh toán 100% trước khi nhận hàng
                        </p>
                      </div>
                    )}

                    {hasPartialPayment && (
                      <div className='space-y-3'>
                        <div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
                          <div className='mb-2 flex items-center space-x-2'>
                            <span className='text-xl text-blue-600'>📊</span>
                            <span className='font-semibold text-blue-800'>
                              Thanh toán 2 giai đoạn
                            </span>
                          </div>

                          <div className='space-y-2'>
                            <div className='flex justify-between text-lg font-bold text-blue-700'>
                              <span>1️⃣ Trả trước:</span>
                              <span>
                                {formatPrice(totalAdvanceAmount || 0)}
                              </span>
                            </div>
                            <div className='flex justify-between text-lg font-bold text-gray-700'>
                              <span>2️⃣ COD khi nhận hàng:</span>
                              <span>
                                {formatPrice(totalRemainingAmount || 0)}
                              </span>
                            </div>
                          </div>

                          <div className='mt-3 border-t border-blue-200 pt-3'>
                            <div className='flex justify-between text-xl font-bold text-blue-800'>
                              <span>Tổng cộng:</span>
                              <span>
                                {formatPrice(
                                  (totalAdvanceAmount || 0) +
                                    (totalRemainingAmount || 0)
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {!hasFullPayment && !hasPartialPayment && (
                      <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
                        <div className='mb-2 flex items-center space-x-2'>
                          <span className='text-xl text-gray-600'>💳</span>
                          <span className='font-semibold text-gray-800'>
                            Thanh toán thông thường
                          </span>
                        </div>
                        <div className='flex justify-between text-lg font-bold text-gray-700'>
                          <span>Số tiền cần thanh toán:</span>
                          <span>{formatPrice(totalRemainingAmount || 0)}</span>
                        </div>
                        <p className='mt-1 text-sm text-gray-600'>
                          💳 Thanh toán khi nhận hàng (COD)
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
            <button
              type='submit'
              disabled={isSubmitting || !isAddressComplete()}
              className={`mt-4 w-full cursor-pointer rounded p-2 text-white transition-colors ${
                isSubmitting || !isAddressComplete()
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSubmitting
                ? 'Đang tạo đơn hàng...'
                : !isAddressComplete()
                  ? 'Vui lòng hoàn thành thông tin địa chỉ'
                  : 'Đặt hàng'}
            </button>
          </section>
        </div>
      </form>
    </div>
  );
}
