'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  submenu?: 'mega' | DropdownItem[];
}

const navItems: NavItem[] = [
  { label: 'Trang chủ', href: '#' },
  { label: 'Khám phá', submenu: 'mega' },
  {
    label: 'Tìm hiểu thêm',
    submenu: [
      { label: 'Về chúng tôi', href: '#' },
      { label: 'Liên hệ', href: '#' },
    ],
  },
  {
    label: 'Bài viết',
    submenu: [
      { label: 'Tin tức', href: '#' },
      { label: 'Hướng dẫn', href: '#' },
    ],
  },
];

const Header: React.FC = () => {
  return (
    <div className='hidden lg:block'>
      <header className='sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow'>
        <div className='mx-auto max-w-7xl px-4'>
          {/* Desktop Nav */}
          <div className='hidden h-20 items-center justify-between md:flex'>
            {/* Logo */}
            <Link href='#' className='flex items-center'>
              <Image
                src='/logo-mexe.png'
                alt='Logo'
                width={64}
                height={64}
                className='mr-2 h-16 w-auto'
              />
            </Link>

            {/* Nav Links */}
            <nav className='flex justify-center'>
              <ul className='flex space-x-8 text-base font-medium text-[#0A115F]'>
                {navItems.map((item, index) =>
                  item.submenu === 'mega' ? (
                    <MegaMenu key={index} />
                  ) : item.submenu ? (
                    <DropdownMenu
                      key={index}
                      label={item.label}
                      items={item.submenu}
                    />
                  ) : (
                    <li key={index}>
                      <Link
                        href={item.href ?? '#'}
                        className='transition hover:text-[#0A115F]'
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>

            {/* Search, Cart, Account */}
            <div className='flex items-center justify-end space-x-6'>
              {/* Search */}
              <form className='relative w-80 max-w-xs' role='search'>
                <input
                  className='w-full rounded-full bg-[#0A115F]/10 py-2 pl-5 pr-12 text-[#0A115F] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0A115F]'
                  type='search'
                  placeholder='Tìm sản phẩm'
                  aria-label='Search'
                />
                <button
                  className='absolute right-3 top-1/2 -translate-y-1/2'
                  type='submit'
                >
                  <Image
                    src='/icon-search.svg'
                    alt='Search'
                    width={24}
                    height={24}
                  />
                </button>
              </form>

              {/* Cart */}
              <Link href='#' className='relative'>
                <Image
                  src='/cart-shopping-light.svg'
                  alt='Cart'
                  width={28}
                  height={28}
                />
                <span className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white'>
                  0
                </span>
              </Link>

              {/* Account */}
              <Link
                href='#'
                className='flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-gray-300'
              >
                <Image
                  src='/vth-user.webp'
                  alt='Account'
                  width={40}
                  height={40}
                  className='object-cover'
                />
              </Link>
            </div>
          </div>

          {/* Mobile Nav */}
          <div className='flex h-16 items-center justify-between md:hidden'>
            <button className='relative flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 shadow-md'>
              <svg
                className='h-7 w-7 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 8h16M4 16h16'
                />
              </svg>
              <span className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs text-white'>
                4
              </span>
            </button>

            <Link href='#' className='flex items-center'>
              <Image
                src='/logo-mexe.png'
                alt='Logo'
                width={32}
                height={32}
                className='h-8 w-auto'
              />
            </Link>

            <div className='flex items-center space-x-4'>
              <button>
                <Image
                  src='/icon-search.svg'
                  alt='Search'
                  width={28}
                  height={28}
                />
              </button>
              <Link href='#' className='relative'>
                <Image
                  src='/cart-shopping-light.svg'
                  alt='Cart'
                  width={28}
                  height={28}
                />
                <span className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white'>
                  0
                </span>
              </Link>
              <Link
                href='#'
                className='flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-gray-300'
              >
                <Image
                  src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                  alt='Account'
                  width={36}
                  height={36}
                  className='object-cover'
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, items }) => (
  <li className='group relative'>
    <button className='flex items-center transition hover:text-[#0A115F]'>
      {label}
      <svg
        className='ml-1 h-4 w-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M19 9l-7 7-7-7'
        />
      </svg>
    </button>
    <div className='invisible absolute left-0 top-full z-50 mt-2 w-40 rounded-lg bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100'>
      {items.map((item, idx) => (
        <Link
          key={idx}
          href={item.href}
          className='block px-4 py-2 hover:bg-gray-100'
        >
          {item.label}
        </Link>
      ))}
    </div>
  </li>
);

const MegaMenu: React.FC = () => (
  <li className='group relative'>
    <button className='flex items-center transition hover:text-[#0A115F]'>
      Khám phá
      <svg
        className='ml-1 h-4 w-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M19 9l-7 7-7-7'
        />
      </svg>
    </button>
    <div className='invisible fixed left-0 top-[80px] z-[9999] max-h-[calc(100vh-80px)] w-screen overflow-y-auto rounded-lg bg-[#06064C] py-6 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100'>
      <section className='mx-auto max-w-7xl px-4 text-white'>
        <h2 className='mb-6 text-3xl font-bold uppercase'>
          KHÁM PHÁ THEO CHỦ ĐỀ
        </h2>
        {/* You can render more dynamic sections here like cards or categories */}
        {/* This is left simplified — you can reuse and split more components */}
      </section>
    </div>
  </li>
);
