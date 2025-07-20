'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function SPHeader() {
  const t = useTranslations('header');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div className='px-4 py-3'>
        <div className='flex items-center justify-between'>
          {/* Left side - Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='p-2 text-gray-600 hover:text-gray-900'
          >
            {isMenuOpen ? (
              <XMarkIcon className='h-6 w-6' />
            ) : (
              <Bars3Icon className='h-6 w-6' />
            )}
          </button>

          {/* Center - Logo */}
          <div className='flex-1 flex justify-center'>
            <Image
              src='/images/logo-mexe.png'
              alt='Mexe Logo'
              width={80}
              height={32}
              className='h-8 w-auto'
            />
          </div>

          {/* Right side - Cart and Account Icons */}
          <div className='flex items-center space-x-3'>
            {/* Cart Icon */}
            <a href='#' className='relative p-2 text-gray-600 hover:text-gray-900'>
              <ShoppingCartIcon className='h-6 w-6' />
              <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white'>
                0
              </span>
            </a>

            {/* Account Icon */}
            <a href='#' className='p-2 text-gray-600 hover:text-gray-900'>
              <UserIcon className='h-6 w-6' />
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='mt-4 border-t border-gray-200 pt-4'>
            {/* Search Bar */}
            <div className='mb-4'>
              <form className='relative' role='search'>
                <input
                  className='w-full rounded-full bg-gray-100 py-2 pr-10 pl-4 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  type='search'
                  placeholder='Tìm sản phẩm'
                  aria-label='Search'
                />
                <button
                  className='absolute top-1/2 right-3 -translate-y-1/2'
                  type='submit'
                >
                  <MagnifyingGlassIcon className='h-4 w-4 text-gray-500' />
                </button>
              </form>
            </div>

            {/* Navigation Links */}
            <nav className='space-y-3'>
              <Link 
                href='/' 
                className='block py-2 text-gray-700 hover:text-blue-600'
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
              </Link>
              
              <div className='space-y-2'>
                <span className='block py-2 font-medium text-gray-900'>
                  {t('explore')}
                </span>
                <div className='pl-4 space-y-2'>
                  <div className='border-l-2 border-gray-200 pl-4'>
                    <h4 className='text-sm font-medium text-gray-700 mb-2'>
                      {t('explore_by_theme')}
                    </h4>
                    <ul className='space-y-1'>
                      {exploreThemes.map((theme) => (
                        <li key={theme}>
                          <Link 
                            href='#' 
                            className='block py-1 text-sm text-gray-600 hover:text-blue-600'
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {theme}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className='border-l-2 border-gray-200 pl-4'>
                    <h4 className='text-sm font-medium text-gray-700 mb-2'>
                      {t('mexe_corner')}
                    </h4>
                    <ul className='space-y-1'>
                      {mexeCornerItems.map((item) => (
                        <li key={item.title}>
                          <Link 
                            href={item.href} 
                            className='block py-1 text-sm text-gray-600 hover:text-blue-600'
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link 
                          href='#' 
                          className='block py-1 text-sm text-gray-600 hover:text-blue-600'
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {t('view_all')}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <Link 
                href='/about' 
                className='block py-2 text-gray-700 hover:text-blue-600'
                onClick={() => setIsMenuOpen(false)}
              >
                {t('learn_more')}
              </Link>
              
              <Link 
                href='/articles' 
                className='block py-2 text-gray-700 hover:text-blue-600'
                onClick={() => setIsMenuOpen(false)}
              >
                {t('news')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
