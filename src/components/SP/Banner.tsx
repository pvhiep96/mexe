'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';

export default function SPBanner() {
  const t = useTranslations('banner');
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      src: '/images/demo-banner/banner-1.jpg',
      alt: 'Banner 1',
      width: 300,
      height: 200,
    },
    {
      src: '/images/demo-banner/banner-2.jpg',
      alt: 'Banner 2',
      width: 300,
      height: 200,
    },
    {
      src: '/images/demo-banner/banner-2.jpg',
      alt: 'Banner 3',
      width: 300,
      height: 200,
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const categories = [
    {
      icon: '/images/icon-grid.webp',
      label: 'Tất cả sản phẩm',
      href: '/collections/tatcasanpham',
    },
    {
      icon: '/images/icon-sale.webp',
      label: 'Sản phẩm khuyến mãi',
      href: '/collections/san-pham-khuyen-mai',
    },
    {
      icon: '/images/icon-new.webp',
      label: 'Sản phẩm mới',
      href: '/collections/san-pham-moi',
    },
    {
      icon: '/images/icon-preorder.webp',
      label: 'PRE-ORDER',
      href: '/collections/pre-order',
    },
  ];

  return (
    <section className='bg-gray-50 py-4'>
      <div className='container mx-auto px-4'>
        {/* Banner Slider */}
        <div className='mb-6'>
          <Slider {...sliderSettings} ref={sliderRef}>
            {images.map((image, index) => (
              <div key={index} className='px-2'>
                <Link href='/collections/tatcasanpham'>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className='h-auto w-full rounded-lg object-cover'
                  />
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        {/* Categories Grid */}
        <div className='mb-6'>
          <h3 className='mb-4 text-lg font-bold text-gray-800'>Khám phá theo chủ đề</h3>
          <div className='grid grid-cols-2 gap-4'>
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className='flex items-center rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md'
              >
                <Image
                  src={category.icon}
                  alt={category.label}
                  width={24}
                  height={24}
                  className='mr-3'
                />
                <span className='text-sm font-medium text-gray-700'>{category.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links
        <div className='space-y-3'>
          <div className='rounded-lg bg-white p-4 shadow-sm'>
            <h4 className='mb-2 font-semibold text-gray-800'>Setup Góc Làm Việc</h4>
            <p className='text-sm text-gray-600'>SET UP KHÔNG GIAN GÓC LÀM VIỆC</p>
          </div>
          
          <div className='rounded-lg bg-white p-4 shadow-sm'>
            <h4 className='mb-2 font-semibold text-gray-800'>Bàn phím hay</h4>
            <p className='text-sm text-gray-600'>BÀN PHÍM HAY</p>
          </div>
          
          <div className='rounded-lg bg-white p-4 shadow-sm'>
            <h4 className='mb-2 font-semibold text-gray-800'>Du Lịch Dã Ngoại</h4>
            <p className='text-sm text-gray-600'>Ưu đãi tháng 8 - Deal tốt sẵn sàng</p>
          </div>
          
          <div className='rounded-lg bg-white p-4 shadow-sm'>
            <h4 className='mb-2 font-semibold text-gray-800'>Loa - Tai Nghe</h4>
            <p className='text-sm text-gray-600'>Sản phẩm Cyberpunk - Scifi công nghệ</p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
