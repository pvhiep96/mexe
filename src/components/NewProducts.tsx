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

function ProductSlide({ product }: ProductSlideProps) {
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
    <div className='mx-2 flex h-[300px] w-[400px] flex-col items-center rounded-2xl bg-white p-4 shadow-md transition-all duration-500 ease-in-out sm:h-[200px] sm:flex-row sm:w-[500px]'>
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
          className='col-span-1 row-span-1 rounded-xl object-cover'
          style={{
            objectPosition: 'center',
            gridRow: '1 / span 1',
            gridColumn: '1 / span 1',
            width: '100%',
            height: '100%'
          }}
        />
        <Image
          src={product.images[2]}
          alt={product.name}
          width={105}
          height={100}
          className='col-span-1 row-span-1 rounded-xl object-cover'
          style={{
            objectPosition: 'center',
            gridRow: '2 / span 1',
            gridColumn: '1 / span 1',
            width: '100%',
            height: '100%'
          }}
        />
        <Image
          src={product.images[1]}
          alt={product.name}
          width={105}
          height={200}
          className='col-span-1 row-span-2 rounded-xl object-cover'
          style={{
            objectPosition: 'center',
            gridRow: '1 / span 2',
            gridColumn: '2 / span 1',
            width: '100%',
            height: '100%'
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
  const [slider, setSlider] = useState(0);
  const [mounted, setMounted] = useState(false);
  const visible = 3; // Số sản phẩm hiển thị cùng lúc

  useEffect(() => {
    setMounted(true);
  }, []);

  const prev = () => {
    if (slider > 0) {
      setSlider(slider - 1);
    }
  };

  const next = () => {
    if (slider < products.length - visible) {
      setSlider(slider + 1);
    }
  };

  return (
    <div>
      {/* Desktop version */}
      <div className='hidden lg:block'>
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
              {/* Prev button */}
              <button
                onClick={prev}
                disabled={slider === 0}
                className='mr-2 rounded-full bg-white p-2 shadow transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40'
                aria-label={t('prev_slide')}
              >
                <ChevronLeftIcon className='h-6 w-6 text-gray-700' />
              </button>

              {/* Slider */}
              <div className='w-full overflow-hidden'>
                <div
                  className='flex transition-transform duration-500 ease-in-out'
                  style={{
                    transform: `translateX(-${slider * 420}px)`,
                  }}
                >
                  {products.map((product, idx) => (
                    <ProductSlide key={product.id} product={product} />
                  ))}
                </div>
              </div>

              {/* Next button */}
              <button
                onClick={next}
                disabled={slider >= products.length - visible}
                className='ml-2 rounded-full bg-white p-2 shadow transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40'
                aria-label={t('next_slide')}
              >
                <ChevronRightIcon className='h-6 w-6 text-gray-700' />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile version */}
      <div className='block lg:hidden'>
        <section className='w-full bg-gray-50 py-4'>
          <div className='container mx-auto px-4'>
            <div className='mb-4 flex flex-col items-center'>
              <h2 className='text-lg font-extrabold text-[#0A115F]'>
                {t('title')}
              </h2>
              <Link
                href='/products'
                className='mt-2 rounded-full bg-gray-400 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-gray-500'
              >
                {t('explore_more')}
              </Link>
            </div>
            
            {/* Mobile slider với khả năng vuốt sang bên */}
            <div 
              className='flex gap-3 overflow-x-auto pb-2'
              style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none', /* Internet Explorer 10+ */
              }}
            >
              {/* Ẩn scrollbar cho Webkit browsers (Chrome, Safari, Edge) */}
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              {products.map((product) => (
                <div
                  key={product.id}
                  className='flex min-w-[200px] flex-col items-center rounded-xl bg-white p-3 shadow'
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={200}
                    height={160}
                    className='mb-2 h-32 w-full rounded object-cover'
                  />
                  <div className='mb-2 text-center text-xs font-bold'>
                    {product.name.length > 50 
                      ? `${product.name.slice(0, 50)}...` 
                      : product.name}
                  </div>
                  <div className='mb-2 text-center text-xs text-gray-500'>
                    {t('sold', { count: product.soldCount.toLocaleString('vi-VN') })}
                  </div>
                  <button 
                    onClick={() => {
                      const { showTooltip } = useFlashTooltip();
                      showTooltip(t('buy_now_success'), 'success');
                    }}
                    className='rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-600'
                  >
                    {t('buy_now')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
