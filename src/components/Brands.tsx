'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface Brand {
  id: string;
  logo: string;
  name?: string;
  titleKey: string;
  brandKey: string;
  field: string;
  founded_year: string;
  story: string;
}

// const brands: Brand[] = [
//   {
//     id: 'honda1',
//     image: '/images/demo-logo-honda.jpg',
//     titleKey: 'honda_title',
//     brandKey: 'honda_brand',
//     field: 'honda_field',
//     founded_year: 'honda_founded',
//     story: 'honda_story',
//   },
//   {
//     id: 'toyota2',
//     image: '/images/demo-logo-honda.jpg',
//     titleKey: 'toyota_title',
//     brandKey: 'toyota_brand',
//     field: 'toyota_field',
//     founded_year: 'toyota_founded',
//     story: 'toyota_story',
//   },
//   {
//     id: 'hyundai3',
//     image: '/images/demo-logo-honda.jpg',
//     titleKey: 'hyundai_title',
//     brandKey: 'hyundai_brand',
//     field: 'hyundai_field',
//     founded_year: 'hyundai_founded',
//     story: 'hyundai_story',
//   },
//   {
//     id: 'ford4',
//     image: '/images/demo-logo-honda.jpg',
//     titleKey: 'ford_title',
//     brandKey: 'ford_brand',
//     field: 'ford_field',
//     founded_year: 'ford_founded',
//     story: 'ford_story',
//   },
// ];

interface BrandCardProps {
  brand: Brand;
}

function BrandCard({ brand }: BrandCardProps) {
  const t = useTranslations('brands');

  const handleStoryClick = () => {
    window.open(`/products?brand=${brand.id.replace(/\d+$/, '')}`, '_blank');
  };

  return (
    <div className='flex h-full max-w-[320px] min-w-[300px] flex-col overflow-hidden rounded-lg bg-white shadow-md'>
      <div className='relative aspect-video'>
        <Image
          src={brand.logo}
          alt={brand.titleKey}
          fill
          className='object-cover'
        />
        <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
          <span className='text-lg font-semibold text-white'>
            {brand.titleKey}
          </span>
        </div>
      </div>
      <div className='bg-black py-2 text-center font-medium text-white'>
        {brand.brandKey}
      </div>
      <div className='flex-1 p-4 text-sm text-gray-700'>
        <p>
          <strong>{t('field_label')}:</strong> {brand.field}
        </p>
        <p>
          <strong>{t('founded_label')}:</strong> {brand.founded_year}
        </p>
        <p className='mt-2'>
          <strong>{t('story_label')}:</strong>{' '}
          {brand.story.length > 30
            ? `${brand.story.slice(0, 30)}...`
            : brand.story}
        </p>
      </div>
      <button
        onClick={handleStoryClick}
        className='flex items-center justify-center gap-1 bg-[#0A115F] py-3 font-semibold text-white transition-colors hover:cursor-pointer hover:bg-[#0A115F]/80'
      >
        {t('story_link')}
        <ChevronRightIcon className='h-4 w-4' />
      </button>
    </div>
  );
}

interface BrandsProps {
  brands: Brand[];
}
export default function Brands({ brands }: BrandsProps) {
  const t = useTranslations('brands');

  return (
    <section className='w-full bg-white py-8 sm:py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h2 className='mb-8 text-center text-3xl font-extrabold tracking-wide text-[#0A115F] sm:text-4xl'>
          {t('title')}
        </h2>
        <div className='flex gap-4 overflow-x-auto pb-4'>
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
