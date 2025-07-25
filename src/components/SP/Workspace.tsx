'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function SPWorkspace() {
  const t = useTranslations('workspace');

  return (
    <section className='bg-white py-4'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-4 text-center text-xl font-bold'>{t('title')}</h2>
        <p className='mb-4 text-center text-sm'>{t('description')}</p>
        <div className='flex flex-col space-y-4'>
          <div>
            <Image
              src='/images/store-1.jpg'
              alt={t('store_intro')}
              width={300}
              height={200}
              className='h-auto w-full rounded'
            />
            <h3 className='mt-2 text-base font-semibold'>{t('store_intro')}</h3>
            <p className='text-sm'>{t('location')}</p>
          </div>
          <div>
            <Image
              src='/images/store-2.jpg'
              alt={t('store_intro')}
              width={300}
              height={200}
              className='h-auto w-full rounded'
            />
            <h3 className='mt-2 text-base font-semibold'>{t('store_intro')}</h3>
            <p className='text-sm'>{t('location')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
