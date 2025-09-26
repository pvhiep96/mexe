'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useFlashTooltip } from '@/context/FlashTooltipContext';
import Link from 'next/link';

interface Combo {
  id: number;
  name: string;
  image: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
}

interface ComboCardProps {
  combo: Combo;
}

interface ComboWorkspaceProps {
  essentialAccessories: any[];
}

// Function to convert API data to Combo format
function convertToCombo(product: any): Combo {
  const price = parseInt(product.price);
  const originalPrice = product.original_price ? parseInt(product.original_price) : price;
  const discountPercent = product.discount_percent ? parseFloat(product.discount_percent) : 0;

  return {
    id: product.id,
    name: product.name,
    image: product.primary_image_url || product.images?.[0]?.image_url || '/images/placeholder-product.png',
    originalPrice: `${originalPrice.toLocaleString()}đ`,
    discountedPrice: `${price.toLocaleString()}đ`,
    discount: discountPercent > 0 ? `-${Math.round(discountPercent)}%` : '',
  };
}

const ITEMS_PER_PAGE = 8;

function ComboCard({ combo }: ComboCardProps) {
  const t = useTranslations('combo_workspace');
  const { showTooltip } = useFlashTooltip();

  const handleViewClick = () => {
    showTooltip(t('view_alert'), 'noti');
  };

  return (
    <div className='group relative h-[258px] overflow-hidden rounded-lg bg-white shadow-md'>
      <Image
        src={combo.image}
        alt={combo.name}
        width={300}
        height={258}
        className='h-full w-full object-cover transition group-hover:brightness-75'
      />
      <button
        onClick={handleViewClick}
        className='absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white/10 px-4 py-1.5 text-base font-semibold text-white opacity-0 backdrop-blur-sm transition group-hover:bg-white/30 group-hover:opacity-100 hover:cursor-pointer'
        aria-label={t('view')}
      >
        {t('view')}
      </button>
      <div className='absolute bottom-0 left-0 flex w-full flex-col bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3'>
        <div className='mb-1 line-clamp-2 text-sm font-semibold text-white'>
          {combo.name}
        </div>
        <div className='mt-2 flex items-center gap-2'>
          <span className='text-sm text-gray-300 line-through'>
            {combo.originalPrice}
          </span>
        </div>
        <div className='mt-1 flex items-center gap-2'>
          <span className='text-lg font-bold text-white'>
            {combo.discountedPrice}
          </span>
          <span className='rounded bg-red-600 px-2 py-0.5 text-xs font-semibold text-white'>
            {combo.discount}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ComboWorkspace({ essentialAccessories }: ComboWorkspaceProps) {
  const t = useTranslations('combo_workspace');
  const { showTooltip } = useFlashTooltip();
  const [slider, setSlider] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // Thêm state cho current page
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Fallback data nếu API không có dữ liệu
  const fallbackCombos: Combo[] = [
    {
      id: 1,
      name: 'BẠT PHỦ VẢI DÙ OXFORD',
      image: '/images/demo-combo/demo-combo-1.png',
      originalPrice: '1,300,000đ',
      discountedPrice: '975,000đ',
      discount: '-25%',
    },
    {
      id: 2,
      name: '2 trong 1 Búa an toàn',
      image: '/images/demo-combo/demo-combo-2.png',
      originalPrice: '1,140,000đ',
      discountedPrice: '741,000đ',
      discount: '-35%',
    },
    {
      id: 3,
      name: 'Camera Hành Trình 3K',
      image: '/images/demo-combo/demo-combo-3.png',
      originalPrice: '1,255,000đ',
      discountedPrice: '727,900đ',
      discount: '-42%',
    },
    {
      id: 4,
      name: 'Giá Điện Thoại Ô Tô',
      image: '/images/demo-combo/demo-combo-4.png',
      originalPrice: '1,080,000đ',
      discountedPrice: '680,400đ',
      discount: '-37%',
    },
  ];

  // Convert API data to Combo format hoặc sử dụng fallback
  const combos = essentialAccessories?.length > 0 
    ? essentialAccessories.map(convertToCombo) 
    : fallbackCombos;
  const totalSlides = Math.ceil(combos.length / 8);

  const prev = () => {
    setSlider((prev) => Math.max(0, prev - 1));
    setCurrentPage((prev) => Math.max(0, prev - 1)); // Cập nhật current page
  };

  const next = () => {
    setSlider((prev) => Math.min(totalSlides - 1, prev + 1));
    setCurrentPage((prev) => Math.min(totalSlides - 1, prev + 1)); // Cập nhật current page
  };

  const goToSlide = (index: number) => {
    setSlider(index);
    setCurrentPage(index); // Cập nhật current page
  };

  const goToPage = (pageIndex: number) => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({
        left: pageIndex * containerWidth,
        behavior: 'smooth',
      });
      setCurrentPage(pageIndex);
    }
  };

  const visibleCombos = combos.slice(
    slider * ITEMS_PER_PAGE,
    (slider + 1) * ITEMS_PER_PAGE
  );

  return (
    <>
      {/* Desktop version */}
      <div className='hidden lg:block'>
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

            {/* Slider với hiệu ứng mượt mà */}
            <div className='relative flex items-center'>
              {/* Prev button */}
              <button
                onClick={prev}
                disabled={slider === 0}
                className='mr-2 cursor-pointer rounded-full bg-white p-2 shadow transition-all duration-300 disabled:opacity-40'
                style={{
                  cursor:
                    slider === 0
                      ? 'not-allowed !important'
                      : 'pointer !important',
                }}
                aria-label={t('prev_slide')}
              >
                <ChevronLeftIcon className='h-6 w-6 text-gray-700' />
              </button>

              {/* Slider container */}
              <div className='w-full overflow-hidden rounded-lg'>
                <div
                  className='flex transition-transform duration-500 ease-in-out'
                  style={{
                    transform: `translateX(-${slider * 100}%)`,
                  }}
                >
                  {/* Trang 1 */}
                  <div className='w-full flex-shrink-0 p-4'>
                    <div className='grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4'>
                      {combos.slice(0, 8).map((combo) => (
                        <div key={combo.id}>
                          <ComboCard combo={combo} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trang 2 */}
                  <div className='w-full flex-shrink-0 p-4'>
                    <div className='grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4'>
                      {combos.slice(8, 12).map((combo) => (
                        <div key={combo.id}>
                          <ComboCard combo={combo} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Next button */}
              <button
                onClick={next}
                disabled={slider >= totalSlides - 1}
                className='ml-2 cursor-pointer rounded-full bg-white p-2 shadow transition-all duration-300 disabled:opacity-40'
                style={{
                  cursor:
                    slider >= totalSlides - 1
                      ? 'not-allowed !important'
                      : 'pointer !important',
                }}
                aria-label={t('next_slide')}
              >
                <ChevronRightIcon className='h-6 w-6 text-gray-700' />
              </button>
            </div>

            {/* Pagination dots */}
            {totalSlides > 1 && (
              <div className='mt-4 flex justify-center gap-2'>
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToPage(idx)}
                    className={`h-2 w-2 rounded-full transition sm:h-3 sm:w-3 ${slider === idx ? 'bg-gray-900' : 'bg-gray-300'}`}
                    style={{
                      cursor: 'pointer !important',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Mobile version */}
      <div className='block lg:hidden'>
        <section className='w-full bg-white py-2 sm:py-3'>
          <div className='container mx-auto px-2 sm:px-3'>
            <div className='mb-3 flex flex-col items-center justify-between sm:mb-4 sm:flex-row'>
              <h2 className='text-sm font-extrabold text-gray-900 sm:text-base lg:text-lg'>
                {t('title')}
              </h2>
              <Link
                href='/combos'
                className='mt-1 flex items-center gap-1 rounded-full border border-gray-400 px-2 py-1 text-xs font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white sm:mt-0 sm:gap-2 sm:px-3 sm:text-sm'
              >
                {t('explore_more')} <ChevronRightIcon className='h-3 w-3' />
              </Link>
            </div>

            {/* Mobile slider với 8 items 1 trang chia 2 hàng - giống hệt mexe.com */}
            <div className='relative overflow-hidden rounded-lg'>
              <div
                ref={scrollContainerRef}
                className='flex overflow-x-auto'
                style={{
                  scrollbarWidth: 'none' /* Firefox */,
                  msOverflowStyle: 'none' /* Internet Explorer 10+ */,
                }}
                onScroll={(e) => {
                  const target = e.target as HTMLDivElement;
                  const scrollLeft = target.scrollLeft;
                  const containerWidth = target.clientWidth;
                  const newPage = Math.round(scrollLeft / containerWidth);
                  setCurrentPage(newPage);
                }}
              >
                {/* Ẩn scrollbar cho Webkit browsers (Chrome, Safari, Edge) */}
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>

                {/* Trang 1 - 8 items chia 2 hàng */}
                <div className='min-w-[100%] flex-shrink-0 px-3 py-4'>
                  <div className='grid grid-cols-2 gap-3 sm:gap-4'>
                    {combos.slice(0, 8).map((combo) => (
                      <div key={combo.id}>
                        <MobileComboCard combo={combo} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trang 2 - 4 items còn lại chia 2 hàng */}
                <div className='min-w-[100%] flex-shrink-0 px-3 py-4'>
                  <div className='grid grid-cols-2 gap-3 sm:gap-4'>
                    {combos.slice(8, 12).map((combo) => (
                      <div key={combo.id}>
                        <MobileComboCard combo={combo} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pagination dots giống hệt mexe.com */}
              <div className='mt-2 flex justify-center gap-2'>
                {Array.from({ length: 2 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToPage(idx)}
                    className={`h-2 w-2 rounded-full transition sm:h-3 sm:w-3 ${
                      idx === currentPage
                        ? 'bg-gray-900'
                        : 'border border-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// Mobile ComboCard component - giống hệt mexe.com với layout 2x4
function MobileComboCard({ combo }: ComboCardProps) {
  const t = useTranslations('combo_workspace');
  const { showTooltip } = useFlashTooltip();

  const handleViewClick = () => {
    showTooltip(t('view_alert'), 'noti');
  };

  return (
    <div className='group relative h-[110px] overflow-hidden rounded-lg bg-white shadow-lg sm:h-[120px] md:h-[140px]'>
      <Image
        src={combo.image}
        alt={combo.name}
        width={140}
        height={140}
        className='h-full w-full transition group-hover:brightness-75'
      />

      {/* Hiển thị tên sản phẩm và giá */}
      <div className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-2'>
        <div className='mb-1 line-clamp-1 text-xs font-semibold text-white'>
          {combo.name}
        </div>
        <div className='mt-1 flex items-center gap-1'>
          <span className='text-xs text-gray-300 line-through'>
            {combo.originalPrice}
          </span>
        </div>
        <div className='mt-0.5 flex items-center gap-1'>
          <span className='text-xs font-bold text-white'>
            {combo.discountedPrice}
          </span>
          <span className='rounded bg-red-600 px-1 py-0.5 text-[10px] font-bold text-white'>
            {combo.discount}
          </span>
        </div>
      </div>
    </div>
  );
}
