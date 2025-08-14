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
    name: 'Ứng dụng Gofa - Định vị thông minh',
    image: '/images/demo-new-brands/demo-new-brand-3.png',
    originalPrice: '1,255,000đ',
    discountedPrice: '727,900đ',
    discount: '-42%',
  },
  {
    id: 4,
    name: 'Nước hoa oto cao cấp',
    image: '/images/demo-new-brands/demo-new-brand-4.png',
    originalPrice: '1,080,000đ',
    discountedPrice: '680,400đ',
    discount: '-37%',
  },
  {
    id: 5,
    name: 'Nước hoa oto hương gỗ',
    image: '/images/demo-new-brands/demo-new-brand-4.png',
    originalPrice: '1,080,000đ',
    discountedPrice: '680,400đ',
    discount: '-37%',
  },
  {
    id: 6,
    name: 'Nước hoa oto hương hoa',
    image: '/images/demo-new-brands/demo-new-brand-4.png',
    originalPrice: '1,080,000đ',
    discountedPrice: '680,400đ',
    discount: '-37%',
  },
  {
    id: 7,
    name: 'Nước hoa oto hương cam',
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
    // Chỉ hiển thị thông báo đơn giản, không thêm vào giỏ hàng
    showTooltip('Đặt hàng thành công!', 'success');
  };

  return (
    <div 
      className='relative mx-2 h-[460px] w-full flex-shrink-0 rounded-xl border border-gray-200 bg-white shadow-md sm:w-[280px] md:w-[250px] hover:shadow-lg cursor-pointer transition-shadow duration-300'
      onClick={() => window.open('/products/2', '_blank')}
    >
      {/* Badge labels - đặt trong card */}
      <div className='absolute top-3 left-3 z-10 flex flex-col items-start gap-2'>
        <div className='rounded-full bg-gradient-to-r from-red-500 to-red-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg'>
          {t('quality_deal')}
        </div>
        <div className='rounded-full bg-white px-4 py-1.5 text-xs font-bold text-red-600 shadow-md border border-red-100'>
          {t('ship_now')}
        </div>
      </div>

      {/* Ảnh sản phẩm - chiều cao tăng lên nhiều hơn */}
      <div className='h-70 w-full overflow-hidden rounded-t-xl'>
        <Image
          src={product.image}
          alt={product.name}
          width={280}
          height={224}
          className='h-full w-full'
        />
      </div>

      {/* Nội dung sản phẩm - chiều cao điều chỉnh */}
      <div className='flex h-[170px] flex-col justify-between p-3'>
        <div className='flex-1'>
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
        </div>
        
        {/* Nút hành động - giảm khoảng cách với thông tin phía trên */}
        <div className='mt-3 flex gap-2'>
          <a
            href={`/products/2`}
            className='flex-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-800 transition hover:bg-gray-200 cursor-pointer'
            onClick={(e) => e.stopPropagation()}
          >
            {t('view_details')}
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleBuyNow();
            }}
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
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const visible = 4; // Số sản phẩm hiển thị cùng lúc

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const updateTimer = () => {
      const end = new Date('2025-07-30T23:59:59+07:00');
      const now = new Date();
      const diff = Math.max(0, end.getTime() - now.getTime());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    
    updateTimer(); // Initial call
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [mounted]);

  const prev = () => {
    if (slider > 0) {
      setSlider(slider - 1);
    }
  };

  const next = () => {
    if (slider < brandProducts.length - visible) {
      setSlider(slider + 1);
    }
  };

  const goToSlide = (index: number) => {
    setSlider(index);
  };

  return (
    <section className='w-full bg-transparent py-6 sm:py-8'>
      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='absolute inset-x-0 top-0 z-0 h-[300px] rounded-2xl bg-orange-500 sm:h-[320px]'></div>
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
              className='mt-2 flex items-center gap-2 rounded-full border border-white px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-white hover:text-orange-500 sm:mt-0'
            >
              {t('view_more')} <ChevronRightIcon className='h-4 w-4' />
            </Link>
          </div>
          <div className='mb-4 flex w-fit items-center gap-4 rounded-full bg-white px-4 py-2 sm:mb-6 sm:gap-6 sm:py-3'>
            <span className='text-sm font-semibold text-orange-500 sm:text-base'>
              {t('deal_ends')}
            </span>
            <div className='flex items-center gap-2'>
              {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                <div key={unit} className='flex flex-col items-center'>
                  <span className='text-xl font-bold text-orange-500 sm:text-2xl'>
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
          
          {/* Slider với hiệu ứng mượt mà */}
          <div className='relative flex items-center'>
            {/* Prev button */}
            <button
              onClick={prev}
              disabled={slider === 0}
              className='mr-2 rounded-full bg-white p-2 shadow transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40'
              aria-label={t('prev_slide')}
            >
              <ChevronLeftIcon className='h-6 w-6 text-orange-500' />
            </button>

            {/* Slider */}
            <div className='w-full overflow-hidden'>
              <div
                className='flex gap-4 transition-transform duration-500 ease-in-out'
                style={{
                  transform: `translateX(-${slider * (280 + 16)}px)`,
                }}
              >
                {brandProducts.map((product) => (
                  <div
                    key={product.id}
                    className='w-full flex-shrink-0 sm:w-[280px] md:w-[250px]'
                  >
                    <BrandProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={next}
              disabled={slider >= brandProducts.length - visible}
              className='ml-2 rounded-full bg-white p-2 shadow transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40'
              aria-label={t('next_slide')}
            >
              <ChevronRightIcon className='h-6 w-6 text-orange-500' />
            </button>
          </div>
          
          {/* Pagination dots */}
          {Math.ceil(brandProducts.length / visible) > 1 && (
            <div className='mt-4 flex justify-center gap-2'>
              {Array.from({ length: Math.ceil(brandProducts.length / visible) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 w-2 rounded-full transition sm:h-3 sm:w-3 ${slider === idx ? 'bg-orange-500' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
