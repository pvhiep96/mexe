'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';

const exploreMenu = [
  { label: 'Tất cả sản phẩm', href: '#' },
  { label: 'Đèn & chiếu sáng', href: '#' },
  { label: 'Âm thanh & giải trí', href: '#' },
  { label: 'Camera hành trình', href: '#' },
  { label: 'Phụ kiện nội thất', href: '#' },
  { label: 'Phụ kiện ngoại thất', href: '#' },
  { label: 'Chăm sóc xe', href: '#' },
  { label: 'Đồ chơi ô tô', href: '#' },
];

const learnMoreMenu = [
  { label: 'Về Mexe', href: '#' },
  { label: 'Chính sách bảo hành', href: '#' },
  { label: 'Chính sách đổi trả', href: '#' },
  { label: 'Hướng dẫn mua hàng', href: '#' },
  { label: 'Hệ thống đại lý', href: '#' },
  { label: 'Tuyển dụng', href: '#' },
  { label: 'Liên hệ hỗ trợ', href: '#' },
];

const newsMenu = [
  { label: 'Tin tức thị trường', href: '#' },
  { label: 'Kinh nghiệm sử dụng xe', href: '#' },
  { label: 'So sánh sản phẩm', href: '#' },
  { label: 'Khuyến mãi', href: '#' },
  { label: 'Câu chuyện khách hàng', href: '#' },
];

const exploreSidebar = [
  { icon: '/icon-grid.webp', label: 'Tất cả' },
  { icon: '/icon-sale.webp', label: 'Sale' },
  { icon: '/icon-new.webp', label: 'New' },
  { icon: '/icon-more.webp', label: 'Khác' },
];

const exploreGrid = [
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Đèn LED & Đèn Pha Ô Tô',
    href: '#',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Camera Hành Trình & Cảm Biến Lùi',
    href: '#',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Âm Thanh & Giải Trí Trên Xe',
    href: '#',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Phụ Kiện Nội Thất Cao Cấp',
    href: '#',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Phụ Kiện Ngoại Thất & Đồ Chơi Xe',
    href: '#',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Chăm Sóc & Bảo Dưỡng Xe',
    href: '#',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Công Nghệ Tiện Ích Ô Tô',
    href: '#',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Lốp, Mâm & Phụ Kiện Lốp',
    href: '#',
  },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>('null');
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const { order } = useCart();

  // Lock body scroll when explore dropdown is open
  useEffect(() => {
    if (openMenu === 'explore') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openMenu]);

  return (
    <header className='sticky top-0 z-50 w-full bg-white shadow'>
      <div className='mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4'>
        <Image
          src='/images/logo-mexe.png'
          alt='Mexe Logo'
          width={100}
          height={40}
          className='h-16 w-auto'
        />
        <nav className='flex flex-1 items-center justify-center'>
          <ul className='flex items-center gap-[10px] text-[14px] font-normal'>
            <li>
              <Link
                href='/'
                className='block px-4 py-2 transition-colors hover:font-semibold hover:text-black'
              >
                Trang chủ
              </Link>
            </li>
            <li className='group relative'>
              <button
                className={`flex items-center gap-1 rounded-full px-4 py-2 transition-all ${openMenu === 'explore' ? 'bg-[#2E6093] text-white' : ''} cursor-pointer`}
                onMouseEnter={() => setOpenMenu('explore')}
                onMouseLeave={() => setOpenMenu(null)}
              >
                Khám phá
                <ChevronDownIcon
                  className={`ml-1 h-5 w-5 transition-transform ${openMenu === 'explore' ? 'rotate-180' : ''}`}
                />
              </button>
              {openMenu === 'explore' && (
                <div
                  className='fixed top-[65px] left-0 z-50 flex max-h-screen w-screen flex-col gap-8 overflow-x-hidden overflow-y-auto rounded-3xl bg-black p-8 shadow-2xl'
                  onMouseEnter={() => setOpenMenu('explore')}
                  onMouseLeave={() => setOpenMenu(null)}
                  style={{ maxWidth: '100vw' }}
                >
                  {/* Flex row: Sidebar + Grid */}
                  <div className='w-full'>
                    {/* Sidebar icon filter */}
                    <div className='mb-8 text-2xl font-extrabold tracking-widest text-white'>
                      KHÁM PHÁ THEO CHỦ ĐỀ
                    </div>
                    <div className='flex w-full flex-row gap-10'>
                      <div className='relative flex flex-col items-center justify-start gap-6'>
                        {exploreSidebar.map((item, idx) => (
                          <div key={idx} className='relative cursor-pointer'>
                            <button
                              className='mb-2 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-gray-100'
                              onMouseEnter={() => setHoveredButton(idx)}
                              onMouseLeave={() => setHoveredButton(null)}
                            >
                              <div className='flex h-8 w-8 items-center justify-center'>
                                <img
                                  src={item.icon}
                                  alt={item.label}
                                  className='h-8 w-8 object-contain'
                                />
                              </div>
                            </button>
                            {hoveredButton === idx && (
                              <div className='absolute top-1/2 left-16 z-10 -translate-y-1/2 rounded-lg bg-white px-4 py-2 whitespace-nowrap text-black shadow-lg'>
                                {item.label}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {/* Grid 4x2 */}
                      <div className='grid flex-1 grid-cols-4 grid-rows-2 gap-6'>
                        {exploreGrid.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            className='group flex flex-col overflow-hidden rounded-2xl bg-[#181818] shadow-lg transition-transform hover:scale-105'
                          >
                            <div className='relative h-32 w-full'>
                              <img
                                src={item.image}
                                alt={item.title}
                                className='h-full w-full object-cover'
                              />
                            </div>
                            <div className='truncate p-3 text-base font-bold text-white group-hover:text-white'>
                              {item.title}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Section: Shopee/Lazada + Mexe News */}
                  <div className='mt-10 flex w-full flex-col gap-8'>
                    {/* Shopee/Lazada links */}
                    <div className='flex w-full items-center justify-between gap-8'>
                      <a
                        href='https://shopee.vn/vaithuhay'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex flex-1 items-center justify-center rounded-xl bg-[#ee4d2d] py-4 text-xl font-bold text-white transition hover:opacity-90'
                      >
                        <img
                          src='/logo-mexe.png'
                          alt='vaithuhay'
                          className='mr-3 h-8'
                        />{' '}
                        Shopee Mall
                      </a>
                      <a
                        href='https://www.lazada.vn/shop/vaithuhay'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex flex-1 items-center justify-center rounded-xl bg-[#1a73e8] py-4 text-xl font-bold text-white transition hover:opacity-90'
                      >
                        <img
                          src='/logo-mexe.png'
                          alt='vaithuhay'
                          className='mr-3 h-8'
                        />{' '}
                        Lazada
                      </a>
                    </div>
                    {/* Mexe News - slider */}
                    <div className='mt-4 w-full rounded-2xl bg-black p-6'>
                      <div className='mb-4 flex items-center justify-between'>
                        <div className='text-2xl font-extrabold text-white uppercase'>
                          Mexe News
                        </div>
                        <a
                          href='#'
                          className='flex items-center text-base font-semibold text-white hover:underline'
                        >
                          Xem tất cả <span className='ml-1'>&rarr;</span>
                        </a>
                      </div>
                      <div className='scrollbar-hide flex gap-6 overflow-x-auto'>
                        {/* Bài viết mẫu */}
                        <div className='max-w-[260px] min-w-[260px] flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-lg'>
                          <div className='relative h-40 w-full'>
                            <img
                              src='/images/banner-policy.webp'
                              alt='Pre order'
                              className='h-full w-full rounded-t-xl object-cover'
                            />
                          </div>
                          <div className='p-4 text-base font-bold text-black'>
                            PRE ORDER LÀ GÌ? MỌI ĐIỀU CẦN BIẾT VỀ PRE ORDER
                          </div>
                        </div>
                        <div className='max-w-[260px] min-w-[260px] flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-lg'>
                          <div className='relative h-40 w-full'>
                            <img
                              src='/images/banner-sale.webp'
                              alt='Livestream'
                              className='h-full w-full rounded-t-xl object-cover'
                            />
                          </div>
                          <div className='p-4 text-base font-bold text-black'>
                            CÁCH LIVESTREAM BÁN HÀNG CỦA DÂN CHUYÊN
                          </div>
                        </div>
                        <div className='max-w-[260px] min-w-[260px] flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-lg'>
                          <div className='relative h-40 w-full'>
                            <img
                              src='/images/demo-banner/banner-2.png'
                              alt='Đồng hồ bàn sáng tạo'
                              className='h-full w-full rounded-t-xl object-cover'
                            />
                          </div>
                          <div className='truncate p-4 text-base font-bold text-black'>
                            5 MẪU ĐỒNG HỒ ĐỂ BÀN SÁNG TẠO GIÚP TĂNG CẢM HỨNG LÀM
                            VIỆC
                          </div>
                        </div>
                        <div className='max-w-[260px] min-w-[260px] flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-lg'>
                          <div className='relative h-40 w-full'>
                            <img
                              src='/images/demo-banner/banner-3.png'
                              alt='Bàn phím chuột'
                              className='h-full w-full rounded-t-xl object-cover'
                            />
                          </div>
                          <div className='truncate p-4 text-base font-bold text-black'>
                            TỔNG HỢP NHỮNG BỘ BÀN PHÍM VÀ CHUỘT GIÁ PHẢI CHĂNG
                            DÀNH CHO DESIGNER
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li className='group relative'>
              <button
                className={`flex items-center gap-1 rounded-full px-4 py-2 transition-all ${openMenu === 'learnmore' ? 'bg-[#2E6093] text-white' : ''} cursor-pointer`}
                onMouseEnter={() => setOpenMenu('learnmore')}
                onMouseLeave={() => setOpenMenu(null)}
              >
                Tìm hiểu thêm
                <ChevronDownIcon
                  className={`ml-1 h-5 w-5 transition-transform ${openMenu === 'learnmore' ? 'rotate-180' : ''}`}
                />
              </button>
              {openMenu === 'learnmore' && (
                <div
                  className='absolute top-full left-1/2 z-50 mt-[0px] flex w-80 -translate-x-1/2 flex-col gap-2 rounded-2xl bg-white p-4 shadow-2xl'
                  onMouseEnter={() => setOpenMenu('learnmore')}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  {learnMoreMenu.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className='block rounded-full bg-gray-100 px-6 py-3 text-base font-medium text-gray-800 transition-colors hover:bg-[#2e6093] hover:text-white'
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            <li className='group relative'>
              <button
                className={`flex items-center gap-1 rounded-full px-4 py-2 transition-all ${openMenu === 'news' ? 'bg-[#2E6093] text-white' : ''} cursor-pointer`}
                onMouseEnter={() => setOpenMenu('news')}
                onMouseLeave={() => setOpenMenu(null)}
              >
                Bài viết
                <ChevronDownIcon
                  className={`ml-1 h-5 w-5 transition-transform ${openMenu === 'news' ? 'rotate-180' : ''}`}
                />
              </button>
              {openMenu === 'news' && (
                <div
                  className='absolute top-full left-1/2 z-50 mt-[0px] flex w-80 -translate-x-1/2 flex-col gap-2 rounded-2xl bg-white p-4 shadow-2xl'
                  onMouseEnter={() => setOpenMenu('news')}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  {newsMenu.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className='block rounded-full bg-gray-100 px-6 py-3 text-base font-medium text-gray-800 transition-colors hover:bg-[#2e6093] hover:text-white'
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </nav>
        <div className='flex items-center space-x-4'>
          <form className='relative w-80 max-w-xs' role='search'>
            <input
              className='focus:ring-primary w-full rounded-full bg-gray-200 py-2 pr-12 pl-5 placeholder-gray-500 focus:ring-2 focus:outline-none'
              type='search'
              placeholder='Tìm sản phẩm'
              aria-label='Search'
            />
            <button
              className='absolute top-1/2 right-3 -translate-y-1/2'
              type='submit'
            >
              <MagnifyingGlassIcon className='h-5 w-5 text-gray-500' />
            </button>
          </form>
          <a href='#' className='relative'>
            <ShoppingCartIcon className='h-8 w-8' />
            <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white'>
              {order?.items.length || 0}
            </span>
          </a>
          <a
            href='#'
            className='flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-gray-300'
          >
            <UserIcon className='h-8 w-8' />
          </a>
        </div>
      </div>
    </header>
  );
}
