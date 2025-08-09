'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useFlashTooltip } from '@/context/FlashTooltipContext';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  images: string[];
  open_date: string;
  soldCount: number;
  description: string;
  open_time: Date;
}

interface ProductSlideProps {
  product: Product;
  isActive: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Bàn Phím Cơ NuPhy Kick75 | Bàn Phím Cơ Không Dây',
    images: [
      '/images/demo-new-products/new-pro-1.png',
      '/images/demo-new-products/new-pro-2.png',
      '/images/demo-new-products/new-pro-3.png',
    ],
    open_date: '15/07/2025',
    open_time: new Date('2025-07-15T00:00:00'),
    soldCount: 100000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
  },
  {
    id: 2,
    name: '(WAREHOUSE DEAL) Bàn Làm Việc Thông Minh Gỗ Sồi',
    images: [
      '/images/demo-new-products/new-pro-1.png',
      '/images/demo-new-products/new-pro-2.png',
      '/images/demo-new-products/new-pro-3.png',
    ],
    open_date: '01/07/2025',
    open_time: new Date('2025-07-01T00:00:00'),
    soldCount: 85000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
  },
  {
    id: 3,
    name: 'Máy Ảnh Polaroid Mini D1 Pro - Tự Do In Ảnh',
    images: [
      '/images/demo-new-products/new-pro-1.png',
      '/images/demo-new-products/new-pro-2.png',
      '/images/demo-new-products/new-pro-3.png',
    ],
    open_date: '03/07/2025',
    open_time: new Date('2025-07-03T00:00:00'),
    soldCount: 120000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
  },
  {
    id: 4,
    name: 'Đèn Bàn LED Chống Cận Thông Minh',
    images: [
      '/images/demo-new-products/new-pro-1.png',
      '/images/demo-new-products/new-pro-2.png',
      '/images/demo-new-products/new-pro-3.png',
    ],
    open_date: '10/07/2025',
    open_time: new Date('2025-07-10T00:00:00'),
    soldCount: 95000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
  },
];

function ProductSlide({ product, isActive }: ProductSlideProps) {
  const t = useTranslations('new_products');
  const { showTooltip } = useFlashTooltip();
  const [width, setWidth] = useState(375);
  const maxCharacter = width < 768 ? 40 : 15;

  const handleBuyNow = () => {
    showTooltip(t('buy_now_success'), 'success');
  };

  useEffect(() => {
    function handleResize() {
      if (typeof window === 'undefined') return;
      setWidth(window.innerWidth);
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <div
      className={`mx-2 flex flex-col items-center rounded-2xl bg-white p-4 shadow-md transition-all duration-500 ease-in-out sm:flex-row ${
        isActive ? 'z-20 scale-100' : 'z-10 scale-95 opacity-70'
      } h-[300px] w-full sm:h-[200px] sm:w-[500px] lg:w-[400px]`}
    >
      {/* Images */}
      <div
        className='mr-[5px] grid grid-cols-2 grid-rows-2 gap-0 overflow-hidden'
        style={{ width: '210px', height: '200px' }}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          width={105}
          height={100}
          className='col-span-1 row-span-1 h-full w-full rounded-xl object-cover'
          style={{
            objectPosition: 'center',
            gridRow: '1 / span 1',
            gridColumn: '1 / span 1',
          }}
        />
        <Image
          src={product.images[2]}
          alt={product.name}
          width={105}
          height={100}
          className='col-span-1 row-span-1 h-full w-full rounded-xl object-cover'
          style={{
            objectPosition: 'center',
            gridRow: '2 / span 1',
            gridColumn: '1 / span 1',
          }}
        />
        <Image
          src={product.images[1]}
          alt={product.name}
          width={105}
          height={200}
          className='col-span-1 row-span-2 h-full w-full rounded-xl object-cover'
          style={{
            objectPosition: 'center',
            gridRow: '1 / span 2',
            gridColumn: '2 / span 1',
          }}
        />
      </div>

      {/* Info */}
      <div className='flex h-full flex-1 flex-col justify-between pl-0 sm:pl-4'>
        <div>
          <h3 className='truncate text-sm font-semibold sm:text-base'>
            {product.name.length > maxCharacter
              ? `${product.name.slice(0, maxCharacter)}...`
              : product.name}
          </h3>
          <p className='text-xs text-gray-500'>
            {t('sold', { count: product.soldCount.toLocaleString('vi-VN') })}
          </p>
          <h4 className='mt-1 text-xs font-medium sm:text-sm'>
            {t('product_info')}
          </h4>
          <p className='line-clamp-2 text-xs text-gray-600'>
            {product.description}
          </p>
        </div>
        <button
          onClick={handleBuyNow}
          className='mt-2 w-[120px] rounded-full bg-red-500 px-4 py-1.5 text-[10px] font-semibold text-white transition-colors hover:cursor-pointer hover:bg-red-600 sm:text-xs'
        >
          {t('buy_now')}
        </button>
      </div>
    </div>
  );
}

export default function NewProducts() {
  const t = useTranslations('new_products');
  const [current, setCurrent] = useState(0);

  const getIndex = (idx: number) => (idx + products.length) % products.length;

  const prev = () => setCurrent((prev) => getIndex(prev - 1));
  const next = () => setCurrent((prev) => getIndex(prev + 1));

  return (
    <section className='w-full bg-gray-50 py-6 sm:py-8'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-4 flex flex-col items-center'>
          <h2 className='text-2xl font-extrabold text-[#0A115F] sm:text-3xl'>
            {t('title')}
          </h2>
          <Link
            href='/products'
            className='mt-2 rounded-full bg-gray-400 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-gray-500'
          >
            {t('explore_more')}
          </Link>
        </div>

        <div className='relative flex items-center justify-center'>
          <button
            onClick={prev}
            className='absolute top-1/2 left-0 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110 sm:h-10 sm:w-10'
            aria-label={t('prev_slide')}
          >
            <ChevronLeftIcon className='h-5 w-5 text-gray-700 sm:h-6 sm:w-6' />
          </button>

          <div className='flex w-full justify-center overflow-hidden'>
            <div className='hidden justify-center space-x-4 lg:flex'>
              {[-1, 0, 1].map((offset) => (
                <ProductSlide
                  key={`slide${offset}`}
                  product={products[getIndex(current + offset)]}
                  isActive={offset === 0}
                />
              ))}
            </div>
            <div className='lg:hidden'>
              <ProductSlide product={products[current]} isActive={true} />
            </div>
          </div>

          <button
            onClick={next}
            className='absolute top-1/2 right-0 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110 sm:h-10 sm:w-10'
            aria-label={t('next_slide')}
          >
            <ChevronRightIcon className='h-5 w-5 text-gray-700 sm:h-6 sm:w-6' />
          </button>
        </div>
      </div>
    </section>
  );
}
