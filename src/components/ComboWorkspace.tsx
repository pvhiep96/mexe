'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useFlashTooltip } from '@/context/FlashTooltipContext';
import Link from 'next/link';

interface Combo {
  id: number;
  name: string;
  image: string;
  tags: string[];
}

interface ComboCardProps {
  combo: Combo;
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
    ],
  },
  {
    id: 3,
    name: 'Combo 3',
    image: '/images/demo-combo/demo-combo-3.png',
    tags: ['Bơm lốp điện tử', 'Tẩu sạc đa năng', 'Gối tựa đầu', 'Bọc ghế da'],
  },
  {
    id: 4,
    name: 'Combo 4',
    image: '/images/demo-combo/demo-combo-4.png',
    tags: ['Bọc trần 5D', 'Ốp gương chiếu hậu', 'Ốp tay cửa', 'Chắn bùn'],
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
    ],
  },
  {
    id: 6,
    name: 'Combo 6',
    image: '/images/demo-combo/demo-combo-6.png',
    tags: ['Gương cầu lồi', 'Ốp bậc lên xuống', 'Tấm che nắng', 'Bọc cần số'],
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
    ],
  },
  {
    id: 8,
    name: 'Combo 8',
    image: '/images/demo-combo/demo-combo-2.png',
    tags: ['Bọc trần 5D', 'Ốp gương chiếu hậu', 'Ốp tay cửa', 'Chắn bùn'],
  },
];

const ITEMS_PER_PAGE = 8;

function ComboCard({ combo }: ComboCardProps) {
  const t = useTranslations('combo_workspace');
  const { showTooltip } = useFlashTooltip();

  const handleViewClick = () => {
    showTooltip(t('view_alert'), 'noti');
  };

  return (
    <div className='group relative overflow-hidden rounded-xl bg-black/10 shadow-md'>
      <Image
        src={combo.image}
        alt={combo.name}
        width={300}
        height={288}
        className='h-64 w-full object-cover transition group-hover:brightness-75'
        style={{ width: 'auto', height: 'auto' }}
      />
      <button
        onClick={handleViewClick}
        className='absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white/10 px-4 py-1.5 text-base font-semibold text-white opacity-0 backdrop-blur-sm transition group-hover:bg-white/30 group-hover:opacity-100 hover:cursor-pointer'
        aria-label={t('view')}
      >
        {t('view')}
      </button>
      <div className='absolute bottom-0 left-0 flex w-full flex-wrap gap-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3'>
        {combo.tags.map((tagKey) => (
          <span
            key={tagKey}
            className='rounded-full border border-white px-2 py-0.5 text-xs text-white transition hover:bg-white hover:text-black'
          >
            {tagKey}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ComboWorkspace() {
  const t = useTranslations('combo_workspace');
  const [slider, setSlider] = useState(0);
  const totalSlides = Math.ceil(combos.length / ITEMS_PER_PAGE);

  const prev = () => {
    if (slider > 0) setSlider(slider - 1);
  };

  const next = () => {
    if (slider < totalSlides - 1) setSlider(slider + 1);
  };

  const goToSlide = (index: number) => {
    setSlider(index);
  };

  const visibleCombos = combos.slice(
    slider * ITEMS_PER_PAGE,
    (slider + 1) * ITEMS_PER_PAGE
  );

  return (
    <section className='w-full bg-gray-50 py-6 sm:py-8'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-4 flex flex-col items-center justify-between sm:mb-6 sm:flex-row'>
          <h2 className='text-2xl font-extrabold text-gray-900 sm:text-3xl'>
            {t('title')}
          </h2>
          <Link
            href='/combos'
            className='mt-2 flex items-center gap-2 rounded-full border border-gray-400 px-4 py-1.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white sm:mt-0'
          >
            {t('explore_more')} <ChevronRightIcon className='h-4 w-4' />
          </Link>
        </div>
        <div className='relative'>
          <button
            onClick={prev}
            disabled={slider === 0}
            className='absolute top-1/2 left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:-left-12 sm:h-10 sm:w-10'
            aria-label={t('prev_slide')}
          >
            <ChevronLeftIcon className='h-5 w-5 text-gray-700 sm:h-6 sm:w-6' />
          </button>
          <div className='flex snap-x snap-mandatory gap-4 overflow-x-auto sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-4'>
            {visibleCombos.map((combo) => (
              <div
                key={combo.id}
                className='min-w-[280px] snap-center sm:min-w-0'
              >
                <ComboCard combo={combo} />
              </div>
            ))}
          </div>
          <button
            onClick={next}
            disabled={slider >= totalSlides - 1}
            className='absolute top-1/2 right-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:-right-12 sm:h-10 sm:w-10'
            aria-label={t('next_slide')}
          >
            <ChevronRightIcon className='h-5 w-5 text-gray-700 sm:h-6 sm:w-6' />
          </button>
        </div>
        {totalSlides > 1 && (
          <div className='mt-4 flex justify-center gap-2'>
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2 w-2 rounded-full transition sm:h-3 sm:w-3 ${slider === idx ? 'bg-gray-900' : 'bg-gray-300'}`}
                aria-label={t('go_to_slide', { number: idx + 1 })}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
