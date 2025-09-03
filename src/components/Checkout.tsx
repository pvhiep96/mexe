'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import Image from 'next/image';
import { BuildingStorefrontIcon, TruckIcon } from '@heroicons/react/24/outline';
import { useRouter } from '@/i18n/navigation';
import { useFlashTooltip } from '@/context/FlashTooltipContext';

interface Product {
  id: string | number;
  name: string;
  price: number;
  discountedPrice?: number;
  image: string;
  quantity: number;
  selectedColor?: string;
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
  checkout: (formData: any) => Promise<void>;
}

export default function Checkout({ order, checkout }: CheckoutProps) {
  const t = useTranslations('checkout');
  const router = useRouter();
  const { showTooltip } = useFlashTooltip();

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<CheckoutForm>({
    defaultValues: {
      amount: order.total,
      deliveryType: 'home',
      national: 'Vietnam', // Fixed value
      deliveryAddress: '', // Empty string, will be set via useEffect
      paymentMethod: 'card',
      orderNumber: order.orderNumber,
    },
  });

  // Set delivery address placeholder after component mounts
  useEffect(() => {
    setValue('deliveryAddress', t('delivery_address_placeholder'));
  }, [setValue, t]);

  const onSubmit = async (data: CheckoutForm) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      console.log('Form data:', data);
      console.log('Order data:', order);

      // Tạo order trong database trước - format theo Rails API
      const orderData = {
        orders: {
          order_number: order.orderNumber,
          payment_method: data.paymentMethod,
          delivery_type: data.deliveryType,
          delivery_address: data.deliveryType === 'home' ? data.address : undefined,
          store_location: data.deliveryType === 'store' ? data.store : undefined,
          notes: data.note,
          guest_name: data.name,
          guest_email: data.email,
          guest_phone: data.mobile,
          shipping_info: {
            shipping_name: data.name,
            shipping_phone: data.mobile,
            shipping_city: data.deliveryType === 'home' ? data.city : undefined,
            shipping_district: data.deliveryType === 'home' ? 'Quận 1' : undefined, // Default value
            shipping_ward: data.deliveryType === 'home' ? 'Phường 1' : undefined, // Default value
            shipping_postal_code: '70000', // Default value
            delivery_address: data.deliveryType === 'home' ? data.address : undefined
          },
          order_items: order.items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            variant_id: item.selectedColor || null
          }))
        }
      };

      // Gọi trực tiếp đến backend Rails API
      const orderResponse = await fetch('http://localhost:3005/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderResult = await orderResponse.json();
      console.log('Order created:', orderResult);

      // Lưu order number để hiển thị ở trang order-status
      localStorage.setItem('lastOrderNumber', order.orderNumber);
      
      // Xóa order khỏi localStorage sau khi tạo thành công
      localStorage.removeItem('currentOrder');

      // Nếu tạo order thành công, xử lý payment
      if (data.paymentMethod === 'cod') {
        // COD: Hiển thị thông báo thành công và chuyển đến order-status
        showTooltip(t('order_success_message'), 'success');
        setTimeout(() => {
          router.push('/order-status');
        }, 2000);
      } else if (data.paymentMethod === 'card' || data.paymentMethod === 'bank') {
        // Card/Bank: Chuyển đến payment gateway với order đã tạo
        showTooltip('Đã tạo đơn hàng thành công! Đang chuyển đến trang thanh toán...', 'success');
        setTimeout(async () => {
          try {
            await checkout({ ...data, orderInfo: order.orderNumber });
          } catch (error) {
            console.error('Payment redirect error:', error);
            // Nếu có lỗi payment, vẫn chuyển đến order-status
            router.push('/order-status');
          }
        }, 1500);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      
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

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-3xl font-bold'>{t('title')}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-1 gap-8 lg:grid-cols-3'
      >
        {/* Left Column: Form Sections */}
        <div className='space-y-8 lg:col-span-2'>
          {/* Backend Connection Test (chỉ hiển thị trong development) */}
          {process.env.NODE_ENV === 'development' && (
            <section className='rounded-lg bg-blue-50 p-4 border border-blue-200'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-sm font-medium text-blue-800'>🔌 Backend Connection Test (Port 3500)</h3>
                  <p className='text-xs text-blue-600 mt-1'>
                    Test connection to Rails backend on port 3500 before placing order
                  </p>
                </div>
                <button
                  type='button'
                  onClick={async () => {
                    try {
                      console.log('Testing backend connection on port 3500...');
                      const response = await fetch('http://localhost:3005/api/v1/orders');
                      const data = await response.json();
                      console.log('Backend test response:', data);
                      showTooltip('✅ Backend connected successfully on port 3500!', 'success');
                    } catch (error) {
                      console.error('Backend test error:', error);
                      showTooltip('❌ Backend test failed!', 'error');
                    }
                  }}
                  className='px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                >
                  Test Backend
                </button>
              </div>
            </section>
          )}
          
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
                <BuildingStorefrontIcon className='mr-2 inline-block size-5' />
                {t('delivery_info.store')}
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
                <div>
                  <label className='mb-1 block text-sm font-medium'>
                    {t('delivery_info.address')}
                  </label>
                  <input
                    {...register('address', { required: t('errors.required') })}
                    className='w-full rounded border border-gray-300 p-2'
                    type='text'
                  />
                  {errors.address && (
                    <p className='text-sm text-red-500'>
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium'>
                    {t('delivery_info.city')}
                  </label>
                  <input
                    {...register('city')}
                    className='w-full rounded border border-gray-300 p-2'
                    type='text'
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
                  <label className='mb-1 block text-sm font-medium'>
                    {t('delivery_info.store')}
                  </label>
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
            <div>
              <label className='mb-1 block text-sm font-medium'>
                {t('delivery_method.address')}
              </label>
              <input
                {...register('deliveryAddress')}
                className='w-full rounded border border-gray-300 bg-gray-100 p-2'
                type='text'
                disabled
              />
            </div>
          </section>

          {/* Section 3: Payment Method */}
          <section className='rounded-lg bg-white p-6 shadow-md'>
            <h2 className='mb-4 text-xl font-semibold'>
              {t('payment_method.title')}
            </h2>
            <div className='space-y-2'>
              <label className='flex items-center'>
                <input
                  {...register('paymentMethod', {
                    required: t('errors.required'),
                  })}
                  type='radio'
                  value='card'
                  className='mr-2'
                />
                {t('payment_method.card')}
              </label>
              <label className='flex items-center'>
                <input
                  {...register('paymentMethod', {
                    required: t('errors.required'),
                  })}
                  type='radio'
                  value='cod'
                  className='mr-2'
                />
                {t('payment_method.cod')}
              </label>
              <label className='flex items-center'>
                <input
                  {...register('paymentMethod', {
                    required: t('errors.required'),
                  })}
                  type='radio'
                  value='bank'
                  className='mr-2'
                />
                {t('payment_method.bank')}
              </label>
              {errors.paymentMethod && (
                <p className='text-sm text-red-500'>
                  {errors.paymentMethod.message}
                </p>
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
                  <div className='mb-1 flex h-8 w-12 items-center justify-center rounded-lg bg-white border border-gray-200'>
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
                  <div className='mb-1 flex h-8 w-12 items-center justify-center rounded-lg bg-white border border-gray-200'>
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
                  <div className='mb-1 flex h-8 w-12 items-center justify-center rounded-lg bg-white border border-gray-200'>
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
                  <div className='mb-1 flex h-8 w-12 items-center justify-center rounded-lg bg-white border border-gray-200'>
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

          {/* Section 4: Note */}
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
          {/* Section 5: Cart Preview */}
          <section className='rounded-lg bg-white p-6 shadow-md'>
            <h2 className='mb-4 text-xl font-semibold'>
              {t('cart_preview.title')}
            </h2>
            <div className='space-y-4'>
              {order.items.map((item, index) => (
                                  <div key={index} className='flex items-center space-x-4'>
                    <Image
                      src={item.image || '/images/placeholder-product.png'}
                      alt={item.name}
                      width={80}
                      height={80}
                      className='rounded'
                    />
                    <div className='grow'>
                      <p className='font-medium'>{item.name}</p>
                      <p className='text-sm'>
                        {t('cart_preview.price')}:{' '}
                        {item.price.toLocaleString('vi-VN')}đ
                      </p>
                      {item.discountedPrice && (
                        <p className='text-sm text-red-500'>
                          {t('cart_preview.discount')}:{' '}
                          {item.discountedPrice.toLocaleString('vi-VN')}đ
                        </p>
                      )}
                    <p className='text-sm'>
                      {t('cart_preview.quantity')}: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Coupon */}
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

          {/* Section 7: Summary */}
          <section className='rounded-lg bg-white p-6 shadow-md'>
            <h2 className='mb-4 text-xl font-semibold'>{t('summary.title')}</h2>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span>{t('summary.total_items')}</span>
                <span>
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className='flex justify-between'>
                <span>{t('summary.shipping')}</span>
                <span>{t('summary.shipping_value')}</span>
              </div>
              <div className='flex justify-between font-bold'>
                <span>{t('summary.total')}</span>
                <span>{order.total.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>
            <button
              type='submit'
              disabled={isSubmitting}
              className={`mt-4 w-full cursor-pointer rounded p-2 text-white transition-colors ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isSubmitting ? 'Đang tạo đơn hàng...' : 'Đặt hàng'}
            </button>
          </section>
        </div>
      </form>
    </div>
  );
}
