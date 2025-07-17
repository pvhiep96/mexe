'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function SPEarlyOrder() {
  const t = useTranslations('early_order');

  const products = [
    {
      status: t('pre_order'),
      orders: t('orders_placed.0'),
      end: t('campaign_ends.0'),
      image: '/product-1.jpg',
    },
    {
      status: t('pre_order'),
      orders: t('orders_placed.1'),
      end: t('campaign_ends.1'),
      image: '/product-2.jpg',
    },
    {
      status: t('pre_order'),
      orders: t('orders_placed.2'),
      end: t('campaign_ends.2'),
      image: '/product-3.jpg',
    },
    {
      status: t('pre_order'),
      orders: t('orders_placed.3'),
      end: t('campaign_ends.3'),
      image: '/product-4.jpg',
    },
    {
      status: t('new_release'),
      orders: t('orders_placed.4'),
      end: t('campaign_ends.4'),
      image: '/product-5.jpg',
    },
    {
      status: t('new_release'),
      orders: t('orders_placed.5'),
      end: t('campaign_ends.5'),
      image: '/product-6.jpg',
    },
    {
      status: t('second_batch'),
      orders: t('orders_placed.6'),
      end: t('campaign_ends.6'),
      image: '/product-7.jpg',
    },
    {
      status: t('coming_soon'),
      orders: t('orders_placed.7'),
      end: t('campaign_ends.7'),
      image: '/product-8.jpg',
    },
  ];

  return (
    <section className='bg-gray-100 py-4'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-4 text-center text-xl font-bold'>{t('title')}</h2>
        <div className='flex flex-col space-y-4'>
          {products.length ? (
            products.map((product, index) => (
              <div key={index} className='overflow-hidden rounded border'>
                <Image
                  src={product.image}
                  alt={product.status}
                  width={300}
                  height={200}
                  className='h-auto w-full'
                />
                <div className='p-2'>
                  <p className='text-xs font-semibold'>{product.status}</p>
                  <p className='text-xs'>{product.orders}</p>
                  <p className='text-xs'>{product.end}</p>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center text-sm'>{t('no_products')}</p>
          )}
        </div>
      </div>
    </section>
  );
}
