'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { Category } from '../../../api';

interface SPHeaderProps {
  categories?: Category[];
}

export default function SPHeader({ categories = [] }: SPHeaderProps) {
  const t = useTranslations('header');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { order } = useCart();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className='text-primary sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm'>
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
          <div className='flex flex-1 justify-center'>
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
            <Link
              href='/cart'
              className='relative p-2 text-gray-600 hover:text-gray-900'
            >
              <ShoppingCartIcon className='h-6 w-6' />
              <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white'>
                {order?.items.length || 0}
              </span>
            </Link>

            {/* Account Icon */}
            <a href='#' className='p-2 text-gray-600 hover:text-gray-900'>
              <UserIcon className='h-6 w-6' />
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className='fixed inset-0 z-40 bg-black/50'
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Container */}
            <div
              className='fixed inset-0 z-50 overflow-y-auto bg-white'
              data-menu-open={isMenuOpen}
            >
              {/* Header */}
              <div className='flex items-center justify-between border-b border-gray-200 px-4 py-3'>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className='p-2 text-gray-600 hover:text-gray-900'
                >
                  <XMarkIcon className='h-6 w-6' />
                </button>

                <div className='flex flex-1 justify-center'>
                  <Image
                    src='/images/logo-mexe.png'
                    alt='Mexe Logo'
                    width={80}
                    height={32}
                    className='h-8 w-auto'
                  />
                </div>

                <div className='flex items-center space-x-3'>
                  <Link
                    href='/cart'
                    className='relative p-2 text-gray-600 hover:text-gray-900'
                  >
                    <ShoppingCartIcon className='h-6 w-6' />
                    <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white'>
                      {order?.items.length || 0}
                    </span>
                  </Link>
                  <a href='#' className='p-2 text-gray-600 hover:text-gray-900'>
                    <UserIcon className='h-6 w-6' />
                  </a>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className='flex-1 overflow-y-auto px-4 py-4'>
                {/* Search Bar */}
                <div className='mb-6'>
                  <form className='relative' role='search'>
                    <input
                      className='w-full rounded-full bg-gray-100 py-3 pr-10 pl-4 text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none'
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
                <nav className='space-y-4'>
                  <Link
                    href='/'
                    className='block py-3 text-base text-gray-700 hover:text-blue-600'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('home')}
                  </Link>

                  <div className='space-y-3'>
                    <span className='block py-2 text-base font-semibold text-gray-900'>
                      {t('explore')}
                    </span>
                    <div className='space-y-3 pl-4'>
                      <div className='border-l-2 border-gray-200 pl-4'>
                        <ul className='space-y-2'>
                          {/* Tất cả sản phẩm */}
                          <li>
                            <Link
                              href='/products'
                              className='block py-2 text-sm text-gray-600 hover:text-blue-600'
                              onClick={() => setIsMenuOpen(false)}
                            >
                              Tất cả sản phẩm
                            </Link>
                          </li>

                          {/* Dynamic categories from API */}
                          {categories.map((category) => (
                            <li key={category.id}>
                              <Link
                                href={`/products?category=${category.slug || category.id}`}
                                className='block py-2 text-sm text-gray-600 hover:text-blue-600'
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {category.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Link
                    href='/about'
                    className='block py-3 text-base text-gray-700 hover:text-blue-600'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('learn_more')}
                  </Link>

                  <Link
                    href='/articles'
                    className='block py-3 text-base text-gray-700 hover:text-blue-600'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('news')}
                  </Link>
                </nav>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
