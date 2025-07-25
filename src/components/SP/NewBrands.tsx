'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function SPNewBrands() {
  const t = useTranslations('new_brands');

  const products = t
    .raw('products')
    .map(
      (product: {
        name: string;
        original_price: string;
        discounted_price: string;
        discount: string;
      }) => ({
        name: product.name,
        original_price: product.original_price,
        discounted_price: product.discounted_price,
        discount: product.discount,
        image: `/product-${product.name.split(' ').join('-').toLowerCase()}.jpg`,
      })
    );

  return (
    <section className='bg-white py-4'>
      <div className='container mx-auto px-4'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold'>{t('title')}</h2>
          <a href='#' className='text-sm text-blue-600 hover:underline'>
            {t('view_more')}
          </a>
        </div>
        <div className='mb-4 text-center'>
          <p className='text-sm'>
            {t('deal_ends')}{' '}
            <span className='font-semibold'>
              1 {t('days')} : 12 {t('hours')} : 30 {t('minutes')} : 45{' '}
              {t('seconds')}
            </span>
          </p>
        </div>
        <div className='flex flex-col space-y-4'>
          {products.map((product) => (
            <div key={product.name} className='overflow-hidden rounded border'>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className='h-auto w-full'
              />
              <div className='p-2'>
                <p className='text-xs font-semibold'>{t('quality_deal')}</p>
                <p className='text-xs'>{t('ship_now')}</p>
                <h3 className='text-base font-semibold'>{product.name}</h3>
                <p className='text-xs line-through'>{product.original_price}</p>
                <p className='text-base font-bold'>
                  {product.discounted_price}{' '}
                  <span className='text-red-600'>{product.discount}</span>
                </p>
                <div className='mt-2 flex space-x-2'>
                  <a href='#' className='text-sm text-blue-600 hover:underline'>
                    {t('view_details')}
                  </a>
                  <a
                    href='#'
                    className='rounded bg-blue-600 px-2 py-1 text-sm text-white hover:bg-blue-700'
                  >
                    {t('buy_now')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
