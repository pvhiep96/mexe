'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RelatedArticlesSliderProps {
  title: string;
  articles: Array<{
    href: string;
    image: string;
    alt: string;
    title: string;
    description: string;
  }>;
  isMobile?: boolean;
}

export default function RelatedArticlesSlider({
  title,
  articles,
  isMobile = false,
}: RelatedArticlesSliderProps) {
  const sliderId = isMobile ? 'mobile-related-slider' : 'related-slider';
  const scrollAmount = isMobile ? 280 : 320;

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    const container = document.getElementById(sliderId);
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const container = document.getElementById(sliderId);
    if (container) {
      checkScrollPosition();
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, [sliderId]);

  const handlePrevClick = () => {
    const container = document.getElementById(sliderId);
    if (container && canScrollLeft) {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleNextClick = () => {
    const container = document.getElementById(sliderId);
    if (container && canScrollRight) {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (isMobile) {
    return (
      <div className='bg-gray-50 py-8'>
        <div className='px-4'>
          <h3 className='mb-6 text-xl font-bold text-gray-900'>{title}</h3>
          <div className='relative'>
            {/* Mobile Navigation Buttons */}
            <button
              className={`absolute top-1/2 -left-4 z-10 -translate-y-1/2 transform cursor-pointer rounded-full p-2 shadow-lg transition-all duration-200 ${
                canScrollLeft
                  ? 'bg-white hover:scale-105 hover:shadow-xl'
                  : 'cursor-not-allowed bg-gray-200 opacity-50'
              }`}
              onClick={handlePrevClick}
              disabled={!canScrollLeft}
            >
              <svg
                className={`h-4 w-4 ${canScrollLeft ? 'text-gray-600' : 'text-gray-400'}`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>

            <button
              className={`absolute top-1/2 -right-4 z-10 -translate-y-1/2 transform cursor-pointer rounded-full p-2 shadow-lg transition-all duration-200 ${
                canScrollRight
                  ? 'bg-white hover:scale-105 hover:shadow-xl'
                  : 'cursor-not-allowed bg-gray-200 opacity-50'
              }`}
              onClick={handleNextClick}
              disabled={!canScrollRight}
            >
              <svg
                className={`h-4 w-4 ${canScrollRight ? 'text-gray-600' : 'text-gray-400'}`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>

            <div
              id={sliderId}
              className='scrollbar-hide flex space-x-4 overflow-x-auto pb-4'
            >
              {articles.map((article, index) => (
                <div key={index} className='w-64 flex-shrink-0'>
                  <Link href={article.href} className='group block'>
                    <div className='h-48 overflow-hidden rounded-lg bg-white shadow-md'>
                      <div className='relative h-32'>
                        <Image
                          src={article.image}
                          alt={article.alt}
                          fill
                          className='object-cover'
                        />
                      </div>
                      <div className='flex h-16 items-center p-3'>
                        <h4 className='line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-blue-600'>
                          {article.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gray-50 py-12'>
      <div className='container mx-auto px-4'>
        <h3 className='mb-8 text-center text-2xl font-bold text-gray-900'>
          {title}
        </h3>
        <div className='relative px-[40px]'>
          {/* Navigation Buttons */}
          <button
            className={`absolute top-1/2 -left-6 z-10 -translate-y-1/2 transform cursor-pointer rounded-full p-3 shadow-lg transition-all duration-200 ${
              canScrollLeft
                ? 'bg-white hover:scale-105 hover:shadow-xl'
                : 'cursor-not-allowed bg-gray-200 opacity-50'
            }`}
            onClick={handlePrevClick}
            disabled={!canScrollLeft}
          >
            <svg
              className={`h-6 w-6 ${canScrollLeft ? 'text-gray-600' : 'text-gray-400'}`}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          <button
            className={`absolute top-1/2 -right-6 z-10 -translate-y-1/2 transform cursor-pointer rounded-full p-3 shadow-lg transition-all duration-200 ${
              canScrollRight
                ? 'bg-white hover:scale-105 hover:shadow-xl'
                : 'cursor-not-allowed bg-gray-200 opacity-50'
            }`}
            onClick={handleNextClick}
            disabled={!canScrollRight}
          >
            <svg
              className={`h-6 w-6 ${canScrollRight ? 'text-gray-600' : 'text-gray-400'}`}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>

          <div
            id={sliderId}
            className='scrollbar-hide flex space-x-6 overflow-x-auto pb-4'
          >
            {articles.map((article, index) => (
              <div key={index} className='w-80 flex-shrink-0'>
                <Link href={article.href} className='group block'>
                  <div className='h-80 overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg'>
                    <div className='relative h-48'>
                      <Image
                        src={article.image}
                        alt={article.alt}
                        fill
                        className='object-cover transition-transform group-hover:scale-105'
                      />
                    </div>
                    <div className='flex h-32 flex-col justify-between p-4'>
                      <h4 className='line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-blue-600'>
                        {article.title}
                      </h4>
                      <p className='line-clamp-2 text-sm text-gray-600'>
                        {article.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
