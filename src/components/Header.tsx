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

const learnMoreMenu = [
  { label: 'Về Mexe', href: '#' },
  { label: 'Kiểm tra đơn hàng', href: '/order-status' },
  { label: 'Chính sách bảo hành', href: '#' },
  { label: 'Chính sách đổi trả', href: '#' },
  { label: 'Hướng dẫn mua hàng', href: '#' },
  { label: 'Hệ thống đại lý', href: '#' },
  { label: 'Tuyển dụng', href: '#' },
  { label: 'Liên hệ hỗ trợ', href: '#' },
];

const newsMenu = [
  { label: 'Tin tức thị trường', href: '/news?category=tin-tuc-thi-truong' },
  { label: 'Kinh nghiệm sử dụng xe', href: '/news?category=kinh-nghiem-su-dung-xe' },
  { label: 'So sánh sản phẩm', href: '/news?category=so-sanh-san-pham' },
  { label: 'Khuyến mãi', href: '/news?category=khuyen-mai' },
  { label: 'Top 10 phụ kiện ô tô cần thiết', href: '/news/top-10-phu-kien-o-to-can-thiet' },
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
    href: '/products?category=den-trang-tri-xe',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Camera Hành Trình & Cảm Biến Lùi',
    href: '/products?category=camera-hanh-trinh',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Âm Thanh & Giải Trí Trên Xe',
    href: '/products?category=am-thanh-xe-hoi',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Phụ Kiện Nội Thất Cao Cấp',
    href: '/products?category=noi-that-xe',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Phụ Kiện Ngoại Thất & Đồ Chơi Xe',
    href: '/products?category=phu-kien-ngoai-that',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Chăm Sóc & Bảo Dưỡng Xe',
    href: '/products?category=cham-soc-xe',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Công Nghệ Tiện Ích Ô Tô',
    href: '/products?category=cong-nghe-oto',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Lốp, Mâm & Phụ Kiện Lốp',
    href: '/products?category=lop-mam-xe',
  },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>('null');
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const { getCartItemCount } = useCart();

  // Lock body scroll when explore dropdown is open
  // useEffect(() => {
  // if (openMenu === 'explore') {
  //   document.body.style.overflow = 'hidden';
  // } else {
  //   document.body.style.overflow = '';
  // }
  // return () => {
  //   document.body.style.overflow = '';
  // };
  // }, [openMenu]);

  return (
    <header className='sticky top-0 z-50 w-full bg-white shadow'>
      <div className='mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4'>
        <Link href='/' className='flex items-center'>
          <Image
            src='/images/logo-mexe.png'
            alt='Mexe Logo'
            width={100}
            height={40}
            className='h-16 w-auto'
          />
        </Link>
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
            <li>
              <Link
                href='/products'
                className='block px-4 py-2 transition-colors hover:font-semibold hover:text-black'
              >
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link
                href='/news'
                className='block px-4 py-2 transition-colors hover:font-semibold hover:text-black'
              >
                Tin tức
              </Link>
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
          <Link href='/cart' className='relative'>
            <ShoppingCartIcon className='h-8 w-8' />
            <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white'>
              {getCartItemCount()}
            </span>
          </Link>
          <Link
            href='/account'
            className='flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-gray-300'
          >
            <UserIcon className='h-8 w-8' />
          </Link>
        </div>
      </div>
    </header>
  );
}
