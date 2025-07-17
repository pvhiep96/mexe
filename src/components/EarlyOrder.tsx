'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function EarlyOrder() {
  const t = useTranslations('early_order');

  const products = [
    { status: t('pre_order'), orders: t('orders_placed.0'), end: t('campaign_ends.0'), image: '/product-1.jpg' },
    { status: t('pre_order'), orders: t('orders_placed.1'), end: t('campaign_ends.1'), image: '/product-2.jpg' },
    { status: t('pre_order'), orders: t('orders_placed.2'), end: t('campaign_ends.2'), image: '/product-3.jpg' },
    { status: t('pre_order'), orders: t('orders_placed.3'), end: t('campaign_ends.3'), image: '/product-4.jpg' },
    { status: t('new_release'), orders: t('orders_placed.4'), end: t('campaign_ends.4'), image: '/product-5.jpg' },
    { status: t('new_release'), orders: t('orders_placed.5'), end: t('campaign_ends.5'), image: '/product-6.jpg' },
    { status: t('second_batch'), orders: t('orders_placed.6'), end: t('campaign_ends.6'), image: '/product-7.jpg' },
    { status: t('coming_soon'), orders: t('orders_placed.7'), end: t('campaign_ends.7'), image: '/product-8.jpg' },
  ];

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-4">{t('title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.length ? (
            products.map((product, index) => (
              <div key={index} className="border rounded overflow-hidden">
                <Image src={product.image} alt={product.status} width={300} height={200} className="w-full h-auto" />
                <div className="p-4">
                  <p className="text-sm font-semibold">{product.status}</p>
                  <p className="text-sm">{product.orders}</p>
                  <p className="text-sm">{product.end}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-4">{t('no_products')}</p>
          )}
        </div>
      </div>
    </section>
  );
}
