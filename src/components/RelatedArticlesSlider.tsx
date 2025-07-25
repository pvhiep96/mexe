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

export default function RelatedArticlesSlider({ title, articles, isMobile = false }: RelatedArticlesSliderProps) {
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
      <div className="bg-gray-50 py-8">
        <div className="px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
          <div className="relative">
            {/* Mobile Navigation Buttons */}
            <button 
              className={`absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 rounded-full p-2 shadow-lg transition-all duration-200 cursor-pointer ${
                canScrollLeft 
                  ? 'bg-white hover:shadow-xl hover:scale-105' 
                  : 'bg-gray-200 cursor-not-allowed opacity-50'
              }`}
              onClick={handlePrevClick}
              disabled={!canScrollLeft}
            >
              <svg className={`w-4 h-4 ${canScrollLeft ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              className={`absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 rounded-full p-2 shadow-lg transition-all duration-200 cursor-pointer ${
                canScrollRight 
                  ? 'bg-white hover:shadow-xl hover:scale-105' 
                  : 'bg-gray-200 cursor-not-allowed opacity-50'
              }`}
              onClick={handleNextClick}
              disabled={!canScrollRight}
            >
              <svg className={`w-4 h-4 ${canScrollRight ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div id={sliderId} className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {articles.map((article, index) => (
                <div key={index} className="flex-shrink-0 w-64">
                  <Link href={article.href} className="block group">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden h-48">
                      <div className="relative h-32">
                        <Image
                          src={article.image}
                          alt={article.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3 h-16 flex items-center">
                        <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 line-clamp-2">
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
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{title}</h3>
        <div className="relative px-[40px]">
          {/* Navigation Buttons */}
          <button 
            className={`absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 rounded-full p-3 shadow-lg transition-all duration-200 cursor-pointer ${
              canScrollLeft 
                ? 'bg-white hover:shadow-xl hover:scale-105' 
                : 'bg-gray-200 cursor-not-allowed opacity-50'
            }`}
            onClick={handlePrevClick}
            disabled={!canScrollLeft}
          >
            <svg className={`w-6 h-6 ${canScrollLeft ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className={`absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 rounded-full p-3 shadow-lg transition-all duration-200 cursor-pointer ${
              canScrollRight 
                ? 'bg-white hover:shadow-xl hover:scale-105' 
                : 'bg-gray-200 cursor-not-allowed opacity-50'
            }`}
            onClick={handleNextClick}
            disabled={!canScrollRight}
          >
            <svg className={`w-6 h-6 ${canScrollRight ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div id={sliderId} className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {articles.map((article, index) => (
              <div key={index} className="flex-shrink-0 w-80">
                <Link href={article.href} className="block group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-80">
                    <div className="relative h-48">
                      <Image
                        src={article.image}
                        alt={article.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4 h-32 flex flex-col justify-between">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
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