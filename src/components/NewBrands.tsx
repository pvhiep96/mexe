'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useFlashTooltip } from '@/context/FlashTooltipContext';
import Link from 'next/link';

interface BrandProduct {
  id: number;
  name: string;
  image: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
}

interface BrandProductCardProps {
  product: BrandProduct;
}

const brandProducts: BrandProduct[] = [
  {
    id: 1,
    name: 'Ghế ngồi chicco',
    image: '/images/demo-new-brands/demo-new-brand-1.png',
    originalPrice: '1,300,000đ',
    discountedPrice: '975,000đ',
    discount: '-25%',
  },
  {
    id: 2,
    name: 'Ghế ngồi oto Nuna',
    image: '/images/demo-new-brands/demo-new-brand-2.png',
    originalPrice: '1,140,000đ',
    discountedPrice: '741,000đ',
    discount: '-35%',
  },
  {
    id: 3,
    name: 'Gofa',
    image: '/images/demo-new-brands/demo-new-brand-3.png',
    originalPrice: '1,255,000đ',
    discountedPrice: '727,900đ',
    discount: '-42%',
  },
  {
    id: 5,
    name: 'Nước hoa oto',
    image: '/images/demo-new-brands/demo-new-brand-4.png',
    originalPrice: '1,080,000đ',
    discountedPrice: '680,400đ',
    discount: '-37%',
  },
  {
    id: 6,
    name: 'Nước hoa oto',
    image: '/images/demo-new-brands/demo-new-brand-4.png',
    originalPrice: '1,080,000đ',
    discountedPrice: '680,400đ',
    discount: '-37%',
  },
  {
    id: 7,
    name: 'Nước hoa oto',
    image: '/images/demo-new-brands/demo-new-brand-4.png',
    originalPrice: '1,080,000đ',
    discountedPrice: '680,400đ',
    discount: '-37%',
  },
  {
    id: 4,
    name: 'Nước hoa oto',
    image: '/images/demo-new-brands/demo-new-brand-4.png',
    originalPrice: '1,080,000đ',
    discountedPrice: '680,400đ',
    discount: '-37%',
  },
];

function BrandProductCard({ product }: BrandProductCardProps) {
  const t = useTranslations('new_brands');
  const { showTooltip } = useFlashTooltip();

  const handleBuyNow = () => {
    showTooltip(t('buy_now_success'), 'success');
  };

  return (
    <div className='relative mx-2 w-full flex-shrink-0 rounded-xl border border-gray-200 bg-white shadow-md sm:w-[280px] md:w-[250px]'>
      <div className='absolute top-0 left-0 z-10 flex w-full flex-col items-start'>
        <div className='rounded-tr-xl bg-red-600 px-3 py-1 text-xs font-semibold text-white'>
          {t('quality_deal')}
        </div>
        <div className='mt-1 rounded-bl-xl bg-white px-3 py-1 text-xs font-semibold text-red-600'>
          {t('ship_now')}
        </div>
      </div>
      <Image
        src={product.image}
        alt={product.name}
        width={280}
        height={160}
        className='h-40 w-full rounded-t-xl object-cover'
      />
      <div className='p-3'>
        <h3 className='line-clamp-2 text-sm font-semibold text-gray-900 sm:text-base'>
          {product.name}
        </h3>
        <div className='mt-2 flex items-center gap-2'>
          <span className='text-sm text-gray-500 line-through'>
            {product.originalPrice}
          </span>
        </div>
        <div className='mt-1 flex items-center gap-2'>
          <span className='text-lg font-bold text-red-600'>
            {product.discountedPrice}
          </span>
          <span className='rounded bg-red-600 px-2 py-0.5 text-xs font-semibold text-white'>
            {product.discount}
          </span>
        </div>
        <div className='mt-3 flex gap-2'>
          <a
            href={`/products/${product.id}`}
            className='flex-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-800 transition hover:bg-gray-200'
          >
            {t('view_details')}
          </a>
          <button
            onClick={handleBuyNow}
            className='flex-1 rounded-full bg-[#0A115F] px-3 py-1.5 text-xs font-semibold text-white transition hover:cursor-pointer hover:bg-[#0e1a8a]'
          >
            {t('buy_now')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewBrands() {
  const t = useTranslations('new_brands');
  const [slider, setSlider] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const totalSlides = Math.ceil(brandProducts.length / itemsPerSlide);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') {
        setItemsPerSlide(4); // Default for SSR
      } else if (window.innerWidth < 640) {
        setItemsPerSlide(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2); // Tablet
      } else {
        setItemsPerSlide(4); // Desktop
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize(); // Call once to set initial value
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  useEffect(() => {
    const end = new Date('2025-07-30T23:59:59+07:00');
    const timer = setInterval(() => {
      const now = new Date();
      const diff = Math.max(0, end.getTime() - now.getTime());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => {
    if (slider > 0) setSlider(slider - 1);
  };

  const next = () => {
    if (slider < totalSlides - 1) setSlider(slider + 1);
  };

  const goToSlide = (index: number) => {
    setSlider(index);
  };

  const visibleProducts = brandProducts.slice(
    slider * itemsPerSlide,
    (slider + 1) * itemsPerSlide
  );

  return (
    <section className='w-full bg-transparent py-6 sm:py-8'>
      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='absolute inset-x-0 top-0 z-0 h-[300px] rounded-2xl bg-red-600 sm:h-[320px]'></div>
        <div className='relative z-10'>
          <div className='mb-4 flex flex-col items-start justify-between px-4 pt-4 sm:mb-6 sm:flex-row sm:items-center'>
            <div className='flex items-center gap-3'>
              <span className='text-2xl sm:text-3xl'>⚡</span>
              <h2 className='text-2xl font-extrabold text-white sm:text-3xl'>
                {t('title')}
              </h2>
            </div>
            <Link
              href='/brands'
              className='mt-2 flex items-center gap-2 rounded-full border border-white px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-white hover:text-red-600 sm:mt-0'
            >
              {t('view_more')} <ChevronRightIcon className='h-4 w-4' />
            </Link>
          </div>
          <div className='mb-4 flex w-fit items-center gap-4 rounded-full bg-white px-4 py-2 sm:mb-6 sm:gap-6 sm:py-3'>
            <span className='text-sm font-semibold text-red-600 sm:text-base'>
              {t('deal_ends')}
            </span>
            <div className='flex items-center gap-2'>
              {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                <div key={unit} className='flex flex-col items-center'>
                  <span className='text-xl font-bold text-red-600 sm:text-2xl'>
                    {String(timeLeft[unit as keyof typeof timeLeft]).padStart(
                      2,
                      '0'
                    )}
                  </span>
                  <span className='text-xs text-gray-500'>{t(unit)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='relative'>
            <button
              onClick={prev}
              disabled={slider === 0}
              className='absolute top-1/2 left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:-left-12 sm:h-10 sm:w-10'
              aria-label={t('prev_slide')}
            >
              <ChevronLeftIcon className='h-5 w-5 text-red-600 sm:h-6 sm:w-6' />
            </button>
            <div className='flex snap-x snap-mandatory gap-4 overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4'>
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className='w-full snap-center sm:min-w-0 md:min-w-[250px]'
                >
                  <BrandProductCard product={product} />
                </div>
              ))}
            </div>
            <button
              onClick={next}
              disabled={slider >= totalSlides - 1}
              className='absolute top-1/2 right-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:-right-12 sm:h-10 sm:w-10'
              aria-label={t('next_slide')}
            >
              <ChevronRightIcon className='h-5 w-5 text-red-600 sm:h-6 sm:w-6' />
            </button>
          </div>
          {totalSlides > 1 && (
            <div className='mt-4 flex justify-center gap-2'>
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 w-2 rounded-full transition sm:h-3 sm:w-3 ${slider === idx ? 'bg-red-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
