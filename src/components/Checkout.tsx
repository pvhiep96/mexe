'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import Image from 'next/image';
import { BuildingStorefrontIcon, TruckIcon } from '@heroicons/react/24/outline';

interface Product {
  name: string;
  price: number;
  image: string;
  discount?: number;
  quantity: number;
}

interface Order {
  items: Product[];
  total: number;
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
}

interface CheckoutProps {
  order: Order;
}

export default function Checkout({ order }: CheckoutProps) {
  const t = useTranslations('checkout');

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<CheckoutForm>({
    defaultValues: {
      deliveryType: 'home',
      national: 'Vietnam', // Fixed value
      deliveryAddress: '', // Empty string, will be set via useEffect
      paymentMethod: 'card',
    },
  });

  // Set delivery address placeholder after component mounts
  useEffect(() => {
    setValue('deliveryAddress', t('delivery_address_placeholder'));
  }, [setValue, t]);

  const onSubmit = (data: CheckoutForm) => {
    // TODO: Handle form submission (e.g., API call)
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
                  <div className='mb-1 flex h-8 w-12 items-center justify-center rounded-lg bg-pink-100'>
                    <span className='text-xs font-bold text-pink-600'>
                      MoMo
                    </span>
                  </div>
                  <span className='text-xs text-gray-600'>MoMo</span>
                </div>

                {/* VNPay */}
                <div className='flex flex-col items-center'>
                  <div className='mb-1 flex h-8 w-12 items-center justify-center rounded-lg bg-blue-100'>
                    <span className='text-xs font-bold text-blue-600'>
                      VNPay
                    </span>
                  </div>
                  <span className='text-xs text-gray-600'>VNPay</span>
                </div>

                {/* Visa */}
                <div className='flex flex-col items-center'>
                  <div className='mb-1 flex h-8 w-12 items-center justify-center rounded-lg bg-blue-900'>
                    <span className='text-xs font-bold text-white'>VISA</span>
                  </div>
                  <span className='text-xs text-gray-600'>Visa</span>
                </div>

                {/* ZaloPay */}
                <div className='flex flex-col items-center'>
                  <div className='mb-1 flex h-8 w-12 items-center justify-center rounded-lg bg-blue-500'>
                    <span className='text-xs font-bold text-white'>Zalo</span>
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
                    src={item.image}
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
                    {item.discount && (
                      <p className='text-sm text-red-500'>
                        {t('cart_preview.discount')}:{' '}
                        {item.discount.toLocaleString('vi-VN')}đ
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
              className='mt-4 w-full cursor-pointer rounded bg-green-600 p-2 text-white hover:bg-green-700'
            >
              {t('summary.checkout')}
            </button>
          </section>
        </div>
      </form>
    </div>
  );
}
