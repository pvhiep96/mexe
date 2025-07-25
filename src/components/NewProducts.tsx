'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Product {
  id: number;
  name: string;
  images: string[];
  open_date: string;
  open_time: Date;
  sold_count: number;
  description: string;
}

export default function NewProducts() {
  const t = useTranslations('new_products');
  const [current, setCurrent] = useState(0);
  const [countdowns, setCountdowns] = useState<
    Array<{ [key: string]: number }>
  >([]);
  const [showTooltip, setShowTooltip] = useState(false);

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
      sold_count: 100000,
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
      sold_count: 85000,
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
      sold_count: 120000,
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
      sold_count: 95000,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    },
  ];

  const getIndex = (idx: number) => {
    return (idx + products.length) % products.length;
  };

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const goTo = (idx: number) => {
    setCurrent(idx);
  };

  const updateCountdowns = () => {
    const newCountdowns = products.map((p) => {
      const now = new Date();
      const diff = Math.max(0, p.open_time.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      return { Ngày: days, Giờ: hours, Phút: mins, Giây: secs };
    });
    setCountdowns(newCountdowns);
  };

  useEffect(() => {
    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Desktop version */}
      <div className='hidden lg:block'>
        <section
          className='flex w-full items-center justify-center px-6 py-6'
          style={{ height: '440px' }}
        >
          <div className='relative mx-auto flex h-full w-full flex-col items-center justify-center overflow-visible px-4'>
            <div className='flex w-full flex-col items-center justify-center'>
              <h2 className='mb-2 text-2xl font-bold text-[#0A115F]'>
                SẢN PHẨM BÁN CHẠY
              </h2>
              <button className='rounded-full bg-gray-400 px-6 py-2 font-semibold text-white transition hover:bg-gray-500'>
                Khám phá thêm
              </button>
            </div>

            <div className='relative flex h-full w-full flex-1 flex-col items-center justify-center overflow-visible'>
              {/* Slider content */}
              <div className='relative flex h-full min-h-[270px] w-full items-center justify-center overflow-visible'>
                {[-1, 0, 1].map((offset) => {
                  const product = products[getIndex(current + offset)];
                  if (!product) return null;

                  return (
                    <div
                      key={`slide${offset}`}
                      className={`mx-2 flex flex-row items-center rounded-2xl bg-white p-4 shadow-lg transition-all duration-700 ease-in-out ${offset === 0 ? 'z-20 scale-110' : 'z-10 scale-90'} relative h-[250px] w-[520px] overflow-visible`}
                      style={{ willChange: 'transform' }}
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
                      <div className='flex h-full w-full min-w-0 flex-1 flex-col justify-between pl-2'>
                        <div>
                          <div
                            className='mb-1 truncate text-base leading-tight font-semibold'
                            style={{ maxWidth: '220px' }}
                          >
                            {product.name}
                          </div>
                          <div className='mb-1 flex items-center text-xs text-gray-500'>
                            Đã bán: {product.sold_count.toLocaleString()} sản
                            phẩm
                          </div>
                          <h1 className='mb-1 text-sm font-semibold'>
                            Thông tin sản phẩm
                          </h1>
                          <span className='text-xs text-gray-600'>
                            {product.description}
                          </span>
                        </div>
                        <button className='mt-2 w-[150px] rounded-full bg-red-500 px-4 py-2 text-[8px] font-bold text-white transition hover:bg-red-600'>
                          Mua Ngay <span className='ml-1'>🔔</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Left arrow */}
              <button
                onClick={prev}
                className='bg-opacity-80 hover:bg-opacity-100 absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110'
              >
                <ChevronLeftIcon className='h-6 w-6 text-gray-700' />
              </button>

              {/* Right arrow */}
              <button
                onClick={next}
                className='bg-opacity-80 hover:bg-opacity-100 absolute top-1/2 right-0 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110'
              >
                <ChevronRightIcon className='h-6 w-6 text-gray-700' />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile version */}
      <div className='sm:hidden'>
        <section className='flex w-full flex-col items-center justify-center bg-[#e5e5e5] px-2 py-3'>
          <div className='relative mx-auto flex w-full flex-col items-center justify-center overflow-visible'>
            <div className='mb-2 flex w-full flex-col items-center justify-center'>
              <h2 className='mb-1 text-center text-lg font-bold text-white'>
                SẢN PHẨM BÁN CHẠY
              </h2>
              <button className='rounded-full bg-gray-400 px-4 py-1 text-xs font-semibold text-white transition hover:bg-gray-500'>
                Khám phá thêm
              </button>
            </div>

            <div className='relative flex w-full flex-col items-center justify-center overflow-visible'>
              {/* Slider content */}
              <div className='relative flex min-h-[320px] w-full flex-col items-center'>
                {[0].map((offset) => {
                  const product = products[getIndex(current + offset)];
                  if (!product) return null;

                  return (
                    <div
                      key={`mobile-slide${offset}`}
                      className='relative flex min-h-[320px] w-full max-w-xs flex-col items-center overflow-visible rounded-xl bg-white p-2 shadow-lg transition-all duration-700 ease-in-out'
                      style={{ willChange: 'transform, opacity' }}
                    >
                      {/* Badge ngoài cùng */}
                      <div className='group absolute -top-2 -right-2 z-30'>
                        <div className='relative flex aspect-square h-8 w-8 flex-col items-center justify-center rounded-full border border-dashed border-white bg-green-500 p-1 text-[10px] font-bold text-white shadow-lg'>
                          <span className='text-center text-[7px] leading-tight'>
                            COMING
                            <br />
                            SOON
                          </span>
                          {/* Icon i nổi bật, tràn ra ngoài badge */}
                          <span
                            className='absolute -top-1.5 -right-1.5 z-40 flex h-3 w-3 cursor-pointer items-center justify-center rounded-full border border-white bg-white text-xs font-normal text-green-500 shadow'
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                          >
                            i{/* Tooltip */}
                            {showTooltip && (
                              <span className='absolute top-1/2 left-5 z-50 w-56 -translate-y-1/2 rounded-xl border border-green-400 bg-white px-2 py-2 text-xs text-black shadow-lg transition-all'>
                                <span className='mb-1 block font-semibold text-green-500'>
                                  Coming soon là gì?
                                </span>
                                Comming soon là trạng thái một sản phẩm mới đã
                                sẵn sàng ra mắt người dùng, tuy nhiên chúng tôi
                                cần thời gian chuẩn bị một số khâu cuối cùng để
                                đưa sản phẩm ra mắt chỉnh chu nhất đến các khách
                                hàng.
                                <br />
                                Ngày ra mắt là ngày bạn có thể đặt hàng chính
                                thức, nhưng bạn có thể đăng ký sớm để giữ slot
                                ưu đãi.
                                {/* Mũi tên */}
                                <span className='absolute top-1/2 -left-2 h-3 w-3 -translate-y-1/2'>
                                  <svg viewBox='0 0 10 10' className='h-3 w-3'>
                                    <polygon
                                      points='0,5 10,0 10,10'
                                      fill='#fff'
                                      stroke='#4ade80'
                                      strokeWidth='1'
                                    />
                                  </svg>
                                </span>
                              </span>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Images */}
                      <div className='mx-auto mb-2 grid h-[120px] w-[140px] grid-cols-2 grid-rows-2 gap-0 overflow-hidden'>
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={70}
                          height={60}
                          className='col-span-1 row-span-1 h-full w-full rounded-lg object-cover'
                          style={{
                            objectPosition: 'center',
                            gridRow: '1 / span 1',
                            gridColumn: '1 / span 1',
                          }}
                        />
                        <Image
                          src={product.images[2]}
                          alt={product.name}
                          width={70}
                          height={60}
                          className='col-span-1 row-span-1 h-full w-full rounded-lg object-cover'
                          style={{
                            objectPosition: 'center',
                            gridRow: '2 / span 1',
                            gridColumn: '1 / span 1',
                          }}
                        />
                        <Image
                          src={product.images[1]}
                          alt={product.name}
                          width={70}
                          height={120}
                          className='col-span-1 row-span-2 h-full w-full rounded-lg object-cover'
                          style={{
                            objectPosition: 'center',
                            gridRow: '1 / span 2',
                            gridColumn: '2 / span 1',
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div className='flex h-full w-full min-w-0 flex-col items-center justify-between px-1'>
                        <div className='w-full'>
                          <div
                            className='mb-1 truncate text-center text-xs leading-tight font-semibold'
                            style={{ maxWidth: '160px' }}
                          >
                            {product.name}
                          </div>
                          <div className='mb-1 flex items-center justify-center text-[10px] text-gray-500'>
                            <svg
                              className='mr-1 h-3 w-3'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                              />
                            </svg>
                            Dự kiến ra mắt:
                          </div>
                          <div className='mb-1 text-center text-base font-bold text-gray-800'>
                            0 GIỜ SÁNG
                          </div>
                          <div className='mx-auto mb-2 inline-block rounded bg-green-400 px-2 py-1 text-xs font-bold text-white'>
                            {product.open_date}
                          </div>
                          {/* Countdown */}
                          <div className='mb-2 flex justify-center gap-1 text-[10px]'>
                            {Object.entries(
                              countdowns[getIndex(current + offset)] || {}
                            ).map(([label, val]) => (
                              <div
                                key={label}
                                className='flex flex-col items-center'
                              >
                                <div className='text-xs font-bold'>{val}</div>
                                <div className='text-[8px] text-gray-500'>
                                  {label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <button className='mx-auto mt-2 w-full max-w-[120px] rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white transition hover:bg-red-600'>
                          ĐĂNG KÝ ĐẶT TRƯỚC <span className='ml-1'>🔔</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Left/Right arrows for mobile */}
              <div className='mt-2 flex w-full justify-between px-2'>
                <button
                  onClick={prev}
                  className='bg-opacity-80 hover:bg-opacity-100 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow transition-all duration-300 hover:scale-110'
                >
                  <ChevronLeftIcon className='h-4 w-4 text-gray-700' />
                </button>
                <button
                  onClick={next}
                  className='bg-opacity-80 hover:bg-opacity-100 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow transition-all duration-300 hover:scale-110'
                >
                  <ChevronRightIcon className='h-4 w-4 text-gray-700' />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
