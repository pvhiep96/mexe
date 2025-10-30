'use client';

import { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Kiểm tra menu đang mở hay không
  useEffect(() => {
    const checkMenuStatus = () => {
      // Kiểm tra xem có element với data-menu-open không
      const menuElement = document.querySelector('[data-menu-open="true"]');
      setIsMenuOpen(!!menuElement);
    };

    // Check periodically for menu status
    const interval = setInterval(checkMenuStatus, 100);

    return () => clearInterval(interval);
  }, []);

  // Kiểm tra vị trí scroll để hiển thị/ẩn button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300 && !isMenuOpen) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // Check initial state
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [isMenuOpen]);

  // Scroll lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className='fixed right-6 bottom-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#0A115F] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#0e1a8a] hover:shadow-xl focus:ring-2 focus:ring-[#0A115F] focus:ring-offset-2 focus:outline-none'
          aria-label='Scroll to top'
        >
          <ChevronUpIcon className='h-6 w-6' />
        </button>
      )}
    </>
  );
}
