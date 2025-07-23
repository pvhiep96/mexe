'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function EarlyOrder() {
  const t = useTranslations('early_order');

  const products = [
    {
      title: "Product 1",
      status: t('pre_order'),
      orders: t('orders_placed.0'),
      end: t('campaign_ends.0'),
      image: `/images/demo-new-products/new-pro-2.png`,
    },
    {
      title: "Product 1",
      status: t('pre_order'),
      orders: t('orders_placed.1'),
      end: t('campaign_ends.1'),
      image: `/images/demo-new-products/new-pro-2.png`,
    },
    {
      title: "Product 1",
      status: t('pre_order'),
      orders: t('orders_placed.2'),
      end: t('campaign_ends.2'),
      image: `/images/demo-new-products/new-pro-2.png`,
    },
    {
      title: "Product 1",
      status: t('pre_order'),
      orders: t('orders_placed.3'),
      end: t('campaign_ends.3'),
      image: `/images/demo-new-products/new-pro-2.png`,
    },
    {
      title: "Product 1",
      status: t('new_release'),
      orders: t('orders_placed.4'),
      end: t('campaign_ends.4'),
      image: `/images/demo-new-products/new-pro-2.png`,
    },
    {
      title: "Product 1",
      status: t('new_release'),
      orders: t('orders_placed.5'),
      end: t('campaign_ends.5'),
      image: `/images/demo-new-products/new-pro-2.png`,
    },
    {
      title: "Product 1",
      status: t('second_batch'),
      orders: t('orders_placed.6'),
      end: t('campaign_ends.6'),
      image: `/images/demo-new-products/new-pro-2.png`,
    },
    {
      title: "Product 1",
      status: t('coming_soon'),
      orders: t('orders_placed.7'),
      end: t('campaign_ends.7'),
      image: `/images/demo-new-products/new-pro-2.png`,
    },
  ];

  return (
    <section className='bg-gray-100 py-8'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-4 text-center text-2xl font-bold'>{t('title')}</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
          {products.length ? (
            products.map((product, index) => (
              <div key={index} className='relative overflow-hidden shadow-xl rounded-lg hover:cursor-pointer hover:shadow-xl'>
                <Link href={`/products/${product.id}`} className="block">
                <Image
                  src={product.image}
                  alt={product.status}
                  width={300}
                  height={200}
                  className='h-auto w-full rounded'
                />
                  <p className='absolute top-2 right-0 w-40 text-sm bg-green-700 rounded text-white p-1'>{product.orders}</p>
                <div className='p-4 '>
                  <p className='text-sm font-semibold'>{product.status}</p>
                  <p className='text-sm'>{product.end}</p>
                </div>
                </Link>
              </div>

            ))
          ) : (
            <p className='col-span-4 text-center'>{t('no_products')}</p>
          )}
        </div>
      </div>
    </section>
  );
}
