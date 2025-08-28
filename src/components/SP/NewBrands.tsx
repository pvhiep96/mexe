'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function SPNewBrands() {
  const t = useTranslations('new_brands');
  const [currentSlide, setCurrentSlide] = useState(0);

  interface RawProduct {
    name: string;
    original_price: string;
    discounted_price: string;
    discount: string;
  }

  interface Product {
    name: string;
    original_price: string;
    discounted_price: string;
    discount: string;
    image: string;
  }

  const products: Product[] = (t.raw('products') as RawProduct[])
    .map((product: RawProduct) => ({
      name: product.name,
      original_price: product.original_price,
      discounted_price: product.discounted_price,
      discount: product.discount,
      image: `/product-${product.name.split(' ').join('-').toLowerCase()}.jpg`,
    }));

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className='w-full bg-transparent py-4'>
      <div className='relative mx-auto w-full px-4'>
        {/* Background cam giống desktop */}
        <div className='absolute inset-x-0 top-0 z-0 h-[200px] rounded-2xl bg-orange-500'></div>
        
        <div className='relative z-10'>
          {/* Header với title và button */}
          <div className='mb-4 flex flex-col items-start justify-between px-4 pt-4'>
            <div className='flex items-center gap-3'>
              <span className='text-xl'>⚡</span>
              <h2 className='text-lg font-extrabold text-white'>
                {t('title')}
              </h2>
            </div>
            <Link
              href='/brands'
              className='mt-2 flex items-center gap-2 rounded-full border border-white px-3 py-1 text-sm font-semibold text-white transition hover:bg-white hover:text-orange-500'
            >
              {t('view_more')} <ChevronRightIcon className='h-3 w-3' />
            </Link>
          </div>
          
          {/* Countdown timer */}
          <div className='mb-4 flex w-fit items-center gap-3 rounded-full bg-white px-3 py-2 mx-4'>
            <span className='text-xs font-semibold text-orange-500'>
              {t('deal_ends')}
            </span>
            <div className='flex items-center gap-1.5'>
              {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                <div key={unit} className='flex flex-col items-center'>
                  <span className='text-lg font-bold text-orange-500'>
                    00
                  </span>
                  <span className='text-xs text-gray-500'>{t(unit)}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile slider với nút next/prev */}
          <div className='relative flex items-center justify-center'>
            {/* Prev button */}
            <button
              onClick={prevSlide}
              className='absolute left-2 z-20 rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:bg-gray-50 cursor-pointer'
            >
              <ChevronLeftIcon className='h-5 w-5 text-orange-500' />
            </button>

            {/* Slider container */}
            <div className='w-full overflow-hidden'>
              <div
                className='flex transition-transform duration-500 ease-in-out'
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {products.map((product) => (
                  <div key={product.name} className='w-full flex-shrink-0'>
                    <div className='flex justify-center'>
                      <div className='w-[280px] flex flex-col items-center rounded-xl bg-white p-3 shadow-lg border border-gray-100'>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={280}
                          height={224}
                          className='mb-2 h-32 w-full rounded object-cover'
                        />
                        <div className='mb-2 text-center text-xs font-semibold text-red-600'>
                          {t('quality_deal')}
                        </div>
                        <div className='mb-2 text-center text-xs font-semibold text-red-600'>
                          {t('ship_now')}
                        </div>
                        <h3 className='mb-2 text-center text-sm font-semibold text-gray-900 line-clamp-2'>
                          {product.name}
                        </h3>
                        <div className='mb-2 text-center text-xs text-gray-500 line-through'>
                          {product.original_price}
                        </div>
                        <div className='mb-3 text-center'>
                          <span className='text-base font-bold text-red-600'>
                            {product.discounted_price}
                          </span>
                          <span className='ml-2 rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white'>
                            {product.discount}
                          </span>
                        </div>
                        <div className='flex gap-2 w-full'>
                          <a href='#' className='flex-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-800 text-center transition hover:bg-gray-200'>
                            {t('view_details')}
                          </a>
                          <a
                            href='#'
                            onClick={(e) => {
                              e.preventDefault();
                              // Chỉ hiển thị thông báo đơn giản, không thêm vào giỏ hàng
                              alert('Đặt hàng thành công!');
                            }}
                            className='flex-1 rounded-full bg-[#0A115F] px-3 py-1.5 text-xs font-semibold text-white text-center transition hover:bg-[#0e1a8a]'
                          >
                            {t('buy_now')}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={nextSlide}
              className='absolute right-2 z-20 rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:bg-gray-50 cursor-pointer'
            >
              <ChevronRightIcon className='h-5 w-5 text-orange-500' />
            </button>
          </div>
          
          {/* Pagination dots */}
          {products.length > 1 && (
            <div className='mt-4 flex justify-center gap-2'>
              {products.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 sm:h-3 sm:w-3 ${
                    currentSlide === idx ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
