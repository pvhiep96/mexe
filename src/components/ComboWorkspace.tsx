'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Combo {
  id: number;
  name: string;
  image: string;
  tags: string[];
}

const combos: Combo[] = [
  {
    id: 1,
    name: 'Combo 1',
    image: '/images/demo-combo/demo-combo-1.png',
    tags: [
      'Camera hành trình',
      'Cảm biến áp suất lốp',
      'Thảm lót sàn',
      'Máy lọc không khí',
      '...',
    ],
  },
  {
    id: 2,
    name: 'Combo 2',
    image: '/images/demo-combo/demo-combo-2.png',
    tags: [
      'Sạc nhanh ô tô',
      'Bọc vô lăng',
      'Nước hoa ô tô',
      'HUD hiển thị tốc độ',
      '...',
    ],
  },
  {
    id: 3,
    name: 'Combo 3',
    image: '/images/demo-combo/demo-combo-3.png',
    tags: [
      'Bơm lốp điện tử',
      'Tẩu sạc đa năng',
      'Gối tựa đầu',
      'Bọc ghế da',
      '...',
    ],
  },
  {
    id: 4,
    name: 'Combo 4',
    image: '/images/demo-combo/demo-combo-4.png',
    tags: [
      'Bọc trần 5D',
      'Ốp gương chiếu hậu',
      'Ốp tay cửa',
      'Chắn bùn',
      '...',
    ],
  },
  {
    id: 5,
    name: 'Combo 5',
    image: '/images/demo-combo/demo-combo-5.png',
    tags: [
      'Cảm biến lùi',
      'Đèn LED nội thất',
      'Màn hình Android',
      'Dán phim cách nhiệt',
      '...',
    ],
  },
  {
    id: 6,
    name: 'Combo 6',
    image: '/images/demo-combo/demo-combo-6.png',
    tags: [
      'Gương cầu lồi',
      'Ốp bậc lên xuống',
      'Tấm che nắng',
      'Bọc cần số',
      '...',
    ],
  },
  {
    id: 7,
    name: 'Combo 7',
    image: '/images/demo-combo/demo-combo-1.png',
    tags: [
      'Bọc ghế da',
      'Tựa lưng massage',
      'Tấm chắn nắng kính lái',
      'Bọc dây an toàn',
      '...',
    ],
  },
  {
    id: 8,
    name: 'Combo 8',
    image: '/images/demo-combo/demo-combo-2.png',
    tags: [
      'Bọc trần 5D',
      'Ốp gương chiếu hậu',
      'Ốp tay cửa',
      'Chắn bùn',
      '...',
    ],
  },
];

export default function ComboWorkspace() {
  const [slider, setSlider] = useState(0);
  const visible = 8;
  const totalSlides = 1; // 8 items, 1 slide for now

  // Dot indicator logic for future extensibility
  const dots = Array.from({ length: totalSlides }, (_, i) => i);

  const prev = () => {
    if (slider > 0) setSlider(slider - 1);
  };
  const next = () => {
    if (slider < totalSlides - 1) setSlider(slider + 1);
  };

  return (
    <div>
      {/* Desktop version */}
      <div className='hidden lg:block'>
        <section className='flex w-full items-center justify-center bg-[#f5f5f5] py-8'>
          <div className='mx-auto w-full max-w-7xl px-4'>
            <div className='mb-6 flex items-center justify-between'>
              <h2 className='text-3xl font-extrabold text-gray-900'>
                Phụ kiện nên có
              </h2>
              <button className='flex items-center gap-2 rounded-full border border-gray-400 px-6 py-2 font-bold text-gray-900 transition hover:bg-gray-900 hover:text-white'>
                Khám phá thêm <ChevronRightIcon className='h-4 w-4' />
              </button>
            </div>
            <div className='relative'>
              {/* Nút prev */}
              <button
                onClick={prev}
                disabled={slider === 0}
                className='absolute top-1/2 left-[-30px] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40'
              >
                <ChevronLeftIcon className='h-6 w-6 text-gray-700' />
              </button>
              {/* Grid items */}
              <div className='grid grid-cols-4 grid-rows-2 gap-6 transition-transform duration-500'>
                {combos.map((combo) => (
                  <div
                    key={combo.id}
                    className='group relative overflow-hidden rounded-3xl bg-black/10 shadow-lg'
                  >
                    <Image
                      src={combo.image}
                      alt={combo.name}
                      width={300}
                      height={288}
                      className='h-72 w-full object-cover transition group-hover:brightness-75'
                    />
                    <button className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white/10 px-6 py-2 text-lg font-bold text-white opacity-0 backdrop-blur-sm transition group-hover:bg-white/30 group-hover:opacity-100'>
                      Xem
                    </button>
                    <div className='absolute bottom-0 left-0 flex w-full cursor-pointer flex-wrap gap-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4'>
                      {combo.tags.map((tag) => (
                        <span
                          key={tag}
                          className='rounded-full border border-white px-3 py-1 text-xs text-white transition hover:bg-white hover:text-black'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Nút next */}
              <button
                onClick={next}
                disabled={slider >= totalSlides - 1}
                className='absolute top-1/2 right-[-30px] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40'
              >
                <ChevronRightIcon className='h-6 w-6 text-gray-700' />
              </button>
            </div>
            {/* Dot indicators */}
            <div className='mt-8 flex items-center justify-center gap-3'>
              {dots.map((dot, idx) => (
                <button
                  key={idx}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${slider === idx ? 'bg-gray-900' : 'bg-gray-300'}`}
                ></button>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* Mobile version */}
      <div className='block lg:hidden'>
        <section className='flex w-full items-center justify-center bg-[#f5f5f5] py-4'>
          <div className='mx-auto w-full max-w-xs px-2'>
            <div className='mb-4 flex flex-col items-center'>
              <h2 className='mb-2 text-center text-lg font-extrabold text-gray-900'>
                Phụ kiện nên có
              </h2>
              <button className='mb-2 flex items-center gap-2 rounded-full border border-gray-400 px-4 py-1 text-xs font-bold text-gray-900 transition hover:bg-gray-900 hover:text-white'>
                Khám phá thêm <ChevronRightIcon className='h-3 w-3' />
              </button>
            </div>
            <div className='flex gap-2 overflow-x-auto pb-2'>
              {combos.map((combo) => (
                <div
                  key={combo.id}
                  className='flex min-w-[120px] flex-col overflow-hidden rounded-xl bg-black/10 shadow-lg'
                >
                  <Image
                    src={combo.image}
                    alt={combo.name}
                    width={120}
                    height={96}
                    className='h-24 w-full object-cover'
                  />
                  <div className='flex cursor-pointer flex-wrap gap-1 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-2'>
                    {combo.tags.map((tag) => (
                      <span
                        key={tag}
                        className='rounded-full border border-white px-2 py-0.5 text-[10px] text-white transition hover:bg-white hover:text-black'
                      >
                        {tag}
                      </span>
                    ))}
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
