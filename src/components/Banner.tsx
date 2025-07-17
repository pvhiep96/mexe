'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Banner() {
  const t = useTranslations('banner');

  const images = [
    {
      src: '/images/demo-banner/banner-1.jpg',
      alt: 'Placeholder 1',
      width: 300,
      height: 200,
    },
    {
      src: '/images/demo-banner/banner-2.jpg',
      alt: 'Placeholder 2',
      width: 300,
      height: 200,
    },
    {
      src: '/images/demo-banner/banner-2.jpg',
      alt: 'Placeholder 3',
      width: 300,
      height: 200,
    },
  ];
  return (
    <section className='bg-gray-100 py-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div>
            <h3 className='mb-4 text-xl font-bold'>{t('categories')}</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='text-blue-600 hover:underline'>
                  {t('all_products')}
                </a>
              </li>
              <li>
                <a href='#' className='text-blue-600 hover:underline'>
                  {t('partner_brands')}
                </a>
              </li>
              <li>
                <a href='#' className='text-blue-600 hover:underline'>
                  {t('accessories')}
                </a>
              </li>
              <li>
                <a href='#' className='text-blue-600 hover:underline'>
                  {t('apps_positioning')}
                </a>
              </li>
              <li>
                <a href='#' className='text-blue-600 hover:underline'>
                  {t('car_toys')}
                </a>
              </li>
              <li>
                <a href='#' className='text-blue-600 hover:underline'>
                  {t('camping')}
                </a>
              </li>
              <li>
                <a href='#' className='text-blue-600 hover:underline'>
                  {t('safety_equipment')}
                </a>
              </li>
              <li>
                <a href='#' className='text-blue-600 hover:underline'>
                  {t('battery_charging')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-4 text-xl font-bold'>{t('partners')}</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='text-blue-600 hover:underline'>
                  {t('partner_1')}
                </a>
              </li>
              <li>
                <a href='#' className='text-blue-600 hover:underline'>
                  {t('partner_2')}
                </a>
              </li>
              <li>
                <a href='#' className='text-blue-600 hover:underline'>
                  {t('partner_3')}
                </a>
              </li>
            </ul>
          </div>

          <div className='space-y-4'>
            {images.map((image) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className='h-auto w-full'
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
