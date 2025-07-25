'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface BrandProduct {
  id: number;
  name: string;
  image: string;
  original_price: string;
  discounted_price: string;
  discount: string;
}

const brandProducts: BrandProduct[] = [
  {
    id: 1,
    name: 'Ghế ngồi chicco',
    image: '/images/demo-new-brands/demo-new-brand-1.png',
    original_price: '1,300,000đ',
    discounted_price: '975,000đ',
    discount: '-25%',
  },
  {
    id: 2,
    name: 'Ghế ngồi oto Nuna',
    image: '/images/demo-new-brands/demo-new-brand-2.png',
    original_price: '1,140,000đ',
    discounted_price: '741,000đ',
    discount: '-35%',
  },
  {
    id: 3,
    name: 'Gofa',
    image: '/images/demo-new-brands/demo-new-brand-3.png',
    original_price: '1,255,000đ',
    discounted_price: '727,900đ',
    discount: '-42%',
  },
  {
    id: 4,
    name: 'Nước hoa oto',
    image: '/images/demo-new-brands/demo-new-brand-4.png',
    original_price: '1,080,000đ',
    discounted_price: '680,400đ',
    discount: '-37%',
  },
];

export default function NewBrands() {
  // Countdown state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 1, hours: 11, minutes: 12, seconds: 32 });
  const [slider, setSlider] = useState(0);
  const visible = 4;

  useEffect(() => {
    const end = new Date(
      Date.now() +
        1 * 24 * 60 * 60 * 1000 +
        11 * 60 * 60 * 1000 +
        12 * 60 * 1000 +
        32 * 1000
    );
    const timer = setInterval(() => {
      const now = new Date();
      const diff = Math.max(0, end.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => {
    if (slider > 0) setSlider(slider - 1);
  };
  const next = () => {
    if (slider < brandProducts.length - visible) setSlider(slider + 1);
  };

  return (
    <div>
      {/* Desktop version */}
      <div className='hidden lg:block'>
        <section className='flex w-full items-center justify-center bg-transparent py-8'>
          <div className='relative mx-auto w-full max-w-7xl px-4'>
            {/* Nền đỏ phía sau */}
            <div className='absolute inset-x-0 top-0 z-0 h-[320px] rounded-3xl bg-[#E53935]'></div>
            {/* Nội dung phía trên */}
            <div className='relative z-10'>
              {/* Header + countdown */}
              <div className='px-6 pt-6'>
                <button className='absolute top-10 right-10 flex items-center gap-2 rounded-full border border-white px-6 py-2 font-bold text-white transition hover:bg-white hover:text-[#E53935]'>
                  XEM THÊM <ChevronRightIcon className='h-4 w-4' />
                </button>
                <div className='mb-4 flex items-center gap-3'>
                  <span className='text-3xl'>⚡</span>
                  <h2 className='text-3xl font-extrabold text-white'>
                    Thương hiệu mới - Tung deal xịn đặc biệt
                  </h2>
                </div>
                <div className='mb-6 flex items-center gap-6'>
                  <div className='flex items-center gap-6 rounded-full bg-white px-6 py-3'>
                    <div className='text-lg font-semibold text-[#E53935]'>
                      Deal này sắp hết thời gian
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='flex flex-col items-center'>
                        <span className='text-3xl font-bold text-[#E53935]'>
                          {String(timeLeft.days).padStart(2, '0')}
                        </span>
                        <span className='text-xs text-gray-500'>ngày</span>
                      </div>
                      <span className='text-2xl font-bold text-[#E53935]'>
                        :
                      </span>
                      <div className='flex flex-col items-center'>
                        <span className='text-3xl font-bold text-[#E53935]'>
                          {String(timeLeft.hours).padStart(2, '0')}
                        </span>
                        <span className='text-xs text-gray-500'>giờ</span>
                      </div>
                      <span className='text-2xl font-bold text-[#E53935]'>
                        :
                      </span>
                      <div className='flex flex-col items-center'>
                        <span className='text-3xl font-bold text-[#E53935]'>
                          {String(timeLeft.minutes).padStart(2, '0')}
                        </span>
                        <span className='text-xs text-gray-500'>phút</span>
                      </div>
                      <span className='text-2xl font-bold text-[#E53935]'>
                        :
                      </span>
                      <div className='flex flex-col items-center'>
                        <span className='text-3xl font-bold text-[#E53935]'>
                          {String(timeLeft.seconds).padStart(2, '0')}
                        </span>
                        <span className='text-xs text-gray-500'>giây</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Slider sản phẩm */}
              <div className='relative z-10 mt-[-80px] p-6 pt-[90px]'>
                <div className='relative'>
                  {/* Nút prev */}
                  <button
                    onClick={prev}
                    disabled={slider === 0}
                    className='absolute top-1/2 left-[-30px] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow disabled:cursor-not-allowed disabled:opacity-40'
                  >
                    <ChevronLeftIcon className='h-6 w-6 text-[#E53935]' />
                  </button>
                  {/* Slider */}
                  <div className='overflow-hidden'>
                    <div
                      className='flex transition-transform duration-500 ease-in-out'
                      style={{ transform: `translateX(-${slider * 270}px)` }}
                    >
                      {brandProducts.map((product) => (
                        <div
                          key={product.id}
                          className='relative mx-2 w-[250px] flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg'
                        >
                          <div className='absolute top-0 left-0 z-10 flex w-full flex-col items-start'>
                            <div className='rounded-tr-2xl bg-[#E53935] px-3 py-1 text-xs font-bold text-white'>
                              HÀNG XỊN GIÁ HỜI <span className='ml-1'>🚚</span>
                            </div>
                            <div className='mt-1 rounded-bl-2xl bg-white px-3 py-1 text-xs font-bold text-[#E53935]'>
                              GIAO HÀNG NGAY
                            </div>
                          </div>
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={250}
                            height={160}
                            className='h-40 w-full object-cover'
                          />
                          <div className='mt-2 line-clamp-2 px-2 text-base font-bold text-gray-900'>
                            {product.name}
                          </div>
                          <div className='mt-2 flex items-center gap-2 px-2'>
                            <span className='text-sm text-gray-500 line-through'>
                              Giá niêm yết: {product.original_price}
                            </span>
                          </div>
                          <div className='mb-2 flex items-center gap-2 px-2'>
                            <span className='text-xl font-bold text-[#E53935]'>
                              {product.discounted_price}
                            </span>
                            <span className='rounded bg-[#E53935] px-2 py-1 text-xs font-bold text-white'>
                              {product.discount}
                            </span>
                          </div>
                          <div className='flex gap-2 px-2 pb-3'>
                            <button className='rounded-full bg-gray-100 px-4 py-2 text-xs font-bold text-gray-800'>
                              XEM THÊM
                            </button>
                            <button className='rounded-full bg-[#0A115F] px-4 py-2 text-xs font-bold text-white'>
                              MUA NGAY
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Nút next */}
                  <button
                    onClick={next}
                    disabled={slider >= brandProducts.length - visible}
                    className='absolute top-1/2 right-[-30px] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow disabled:cursor-not-allowed disabled:opacity-40'
                  >
                    <ChevronRightIcon className='h-6 w-6 text-[#E53935]' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Mobile version */}
      <div className='block lg:hidden'>
        <section className='w-full bg-white py-4'>
          <div className='mx-auto max-w-xs px-2'>
            <h2 className='mb-4 text-center text-lg font-extrabold'>
              THƯƠNG HIỆU MỚI
            </h2>
            <div className='flex gap-3 overflow-x-auto pb-2'>
              {brandProducts.map((product) => (
                <div
                  key={product.id}
                  className='flex min-w-[140px] flex-col items-center rounded-xl bg-white p-2 shadow'
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={80}
                    height={80}
                    className='mb-1 h-20 w-20 rounded-lg object-cover'
                  />
                  <div className='text-center text-xs font-bold'>
                    {product.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
