'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
export default function Header() {
  const t = useTranslations('header');

  const exploreThemes = [
    t('workspace_setup'),
    t('monthly_offers'),
    t('newest_products'),
    t('diy_steampunk'),
  ];

  const mexeCornerItems = [
    { title: t('pre_order_info'), href: '#' },
    { title: t('livestream_sales'), href: '#' },
    { title: t('creative_clocks'), href: '#' },
    { title: t('keyboard_mouse_sets'), href: '#' },
  ];

  return (
    <header className='text-primary sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <Image
            src='/images/logo-mexe.png'
            alt='Mexe Logo'
            width={100}
            height={40}
            className='h-16 w-auto'
          />
          <nav className='hidden space-x-4 md:flex'>
            <Link href='/' className='hover:bg-secondary'>
              {t('home')}
            </Link>
            <div className='group relative'>
              <span className='cursor-pointer hover:underline'>
                {t('explore')}
              </span>
              <div className='invisible fixed top-[80px] left-0 z-[9999] max-h-[calc(100vh-80px)] w-screen overflow-y-auto rounded-lg bg-[#06064C] py-6 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100'>
                <h3 className='font-semibold'>{t('explore_by_theme')}</h3>
                <ul className='space-y-2'>
                  {exploreThemes.map((theme) => (
                    <li key={theme}>
                      <Link href='#' className='hover:underline'>
                        {theme}
                      </Link>
                    </li>
                  ))}
                </ul>
                <h3 className='mt-4 font-semibold'>{t('mexe_corner')}</h3>
                <ul className='space-y-2'>
                  {mexeCornerItems.map((item) => (
                    <li key={item.title}>
                      <Link href={item.href} className='hover:underline'>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href='#' className='hover:underline'>
                      {t('view_all')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <Link href='/about' className='hover:underline'>
              {t('learn_more')}
            </Link>
            <Link href='/articles' className='hover:underline'>
              {t('news')}
            </Link>
          </nav>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center justify-end space-x-6'>
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
                  0
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
        </div>
      </div>
    </header>
  );
}
