'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function SPBrands() {
  const t = useTranslations('brands');

  const brands = [
    {
      id: 'honda',
      image: '/honda-logo.jpg',
      alt: t('honda.name'),
    },
    {
      id: 'toyota',
      image: '/toyota-logo.jpg',
      alt: t('toyota.name'),
    },
    {
      id: 'hyundai',
      image: '/hyundai-logo.jpg',
      alt: t('hyundai.name'),
    },
    {
      id: 'ford',
      image: '/ford-logo.jpg',
      alt: t('ford.name'),
    },
  ];

  return (
    <section className='bg-white py-4'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-4 text-center text-xl font-bold'>{t('title')}</h2>
        <div className='flex flex-col space-y-4'>
          {brands.map((brand) => (
            <div key={brand.id} className='rounded border p-4'>
              <Image
                src={brand.image}
                alt={brand.alt}
                width={150}
                height={100}
                className='mb-2 h-auto w-full'
              />
              <h3 className='text-base font-semibold'>
                {t(`${brand.id}.name`)}
              </h3>
              <p className='text-xs'>{t(`${brand.id}.brand`)}</p>
              <p className='text-xs'>{t(`${brand.id}.field`)}</p>
              <p className='text-xs'>{t(`${brand.id}.founded`)}</p>
              <p className='mt-2 text-xs'>{t(`${brand.id}.story`)}</p>
              <a
                href={`/products?brand=${brand.id}`}
                className='mt-2 inline-block text-xs text-blue-600 hover:underline'
              >
                {t(`${brand.id}.story_link`)}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
