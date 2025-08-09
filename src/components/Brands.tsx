'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface Brand {
  id: string;
  image: string;
  name?: string;
  titleKey: string;
  brandKey: string;
  fieldKey: string;
  foundedKey: string;
  storyKey: string;
}

const brands: Brand[] = [
  {
    id: 'honda1',
    image: '/images/demo-logo-honda.jpg',
    titleKey: 'honda_title',
    brandKey: 'honda_brand',
    fieldKey: 'honda_field',
    foundedKey: 'honda_founded',
    storyKey: 'honda_story',
  },
  {
    id: 'toyota2',
    image: '/images/demo-logo-honda.jpg',
    titleKey: 'toyota_title',
    brandKey: 'toyota_brand',
    fieldKey: 'toyota_field',
    foundedKey: 'toyota_founded',
    storyKey: 'toyota_story',
  },
  {
    id: 'hyundai3',
    image: '/images/demo-logo-honda.jpg',
    titleKey: 'hyundai_title',
    brandKey: 'hyundai_brand',
    fieldKey: 'hyundai_field',
    foundedKey: 'hyundai_founded',
    storyKey: 'hyundai_story',
  },
  {
    id: 'ford4',
    image: '/images/demo-logo-honda.jpg',
    titleKey: 'ford_title',
    brandKey: 'ford_brand',
    fieldKey: 'ford_field',
    foundedKey: 'ford_founded',
    storyKey: 'ford_story',
  },
];

interface BrandCardProps {
  brand: Brand;
}

function BrandCard({ brand }: BrandCardProps) {
  const t = useTranslations('brands');

  const handleStoryClick = () => {};

  return (
    <div className='flex h-full max-w-[320px] min-w-[300px] flex-col overflow-hidden rounded-lg bg-white shadow-md'>
      <div className='relative aspect-video'>
        <Image
          src={brand.image}
          alt={t(brand.titleKey)}
          fill
          className='object-cover'
        />
        <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
          <span className='text-lg font-semibold text-white'>
            {t(brand.titleKey)}
          </span>
        </div>
      </div>
      <div className='bg-black py-2 text-center font-medium text-white'>
        {t(brand.brandKey)}
      </div>
      <div className='flex-1 p-4 text-sm text-gray-700'>
        <p>
          <strong>{t('field_label')}:</strong> {t(brand.fieldKey)}
        </p>
        <p>
          <strong>{t('founded_label')}:</strong> {t(brand.foundedKey)}
        </p>
        <p className='mt-2'>
          <strong>{t('story_label')}:</strong>{' '}
          {t(brand.storyKey).length > 30
            ? `${t(brand.storyKey).slice(0, 30)}...`
            : t(brand.storyKey)}
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

export default function Brands() {
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
