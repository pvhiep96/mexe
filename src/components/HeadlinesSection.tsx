'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeadlinesArticle {
  id: string;
  title: string;
  image: string;
  url: string;
  alt: string;
}

const headlinesArticles: HeadlinesArticle[] = [
  {
    id: '1',
    title: 'NOMI - Người Bạn Đồng Hành Thông Minh Trong Xe của Bạn',
    image: '/images/demo-banner/banner-1.jpg',
    url: '/news/nomi-nguoi-ban-dong-hanh-thong-minh-trong-xe-cua-ban',
    alt: 'NOMI - Người Bạn Đồng Hành Thông Minh Trong Xe của Bạn',
  },
  {
    id: '2',
    title: 'ChargeStick: Sạc Không Dây Siêu Nhỏ Gọn 4-in-1',
    image: '/images/demo-banner/banner-2.jpg',
    url: '/news/chargestick-sac-khong-day-sieu-nho-gon-4-in-1',
    alt: 'ChargeStick: Sạc Không Dây Siêu Nhỏ Gọn 4-in-1',
  },
  {
    id: '3',
    title:
      'Domono AquaCam – Camera thông minh chống nước, đồng hành mọi hành trình.',
    image: '/images/demo-combo/demo-combo-1.png',
    url: '/news/domono-aquacam-camera-thong-minh-chong-nuoc',
    alt: 'Domono AquaCam – Camera thông minh chống nước, đồng hành mọi hành trình.',
  },
  {
    id: '4',
    title: '4URPC Gen 2: Bộ Truyền Không Dây True Wireless 4K Đột Phá',
    image: '/images/demo-combo/demo-combo-2.png',
    url: '/news/4urpc-gen-2-bo-truyen-khong-day-true-wireless-4k-dot-pha',
    alt: '4URPC Gen 2: Bộ Truyền Không Dây True Wireless 4K Đột Phá',
  },
];

export default function HeadlinesSection() {
  return (
    <div className='headlines bg-[#2F6194] py-12'>
      <div className='container mx-auto px-4'>
        <div className='title-outer mb-12 text-center'>
          <h1 className='headlines-title text-4xl font-bold text-gray-900'>
            Tin Tức & Bài Viết
          </h1>
        </div>

        <div className='product-loop headline-posts grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {/* Left Section - 1 Large Item */}
          <div className='headline-post group cursor-pointer'>
            <div className='content'>
              <div className='inner relative overflow-hidden rounded-lg shadow-lg'>
                <Image
                  src={headlinesArticles[0].image}
                  alt={headlinesArticles[0].alt}
                  width={480}
                  height={320}
                  className='h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105'
                  loading='eager'
                  fetchPriority='high'
                  decoding='sync'
                  style={{ width: 'auto', height: 'auto' }}
                />
                {/* Hover Title Overlay */}
                <div className='absolute right-0 bottom-0 left-0 translate-y-full transform bg-[rgba(0,0,0,0.45)] p-4 text-white transition-transform duration-[135ms] group-hover:translate-y-0'>
                  <Link href={headlinesArticles[0].url} className='block'>
                    <h4 className='post-title text-xl leading-tight font-semibold'>
                      {headlinesArticles[0].title}
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - 3 Items */}
          <div className='flex flex-col gap-6'>
            {/* Top Item */}
            <div className='headline-post group cursor-pointer'>
              <div className='content'>
                <div className='inner relative overflow-hidden rounded-lg shadow-lg'>
                  <Image
                    src={headlinesArticles[1].image}
                    alt={headlinesArticles[1].alt}
                    width={480}
                    height={320}
                    className='h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105'
                    loading='eager'
                    fetchPriority='high'
                    decoding='sync'
                    style={{ width: 'auto', height: 'auto' }}
                  />
                  {/* Hover Title Overlay */}
                  <div className='absolute right-0 bottom-0 left-0 translate-y-full transform bg-[rgba(0,0,0,0.45)] p-3 text-white transition-transform duration-[135ms] group-hover:translate-y-0'>
                    <Link href={headlinesArticles[1].url} className='block'>
                      <h4 className='post-title text-lg leading-tight font-semibold'>
                        {headlinesArticles[1].title}
                      </h4>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 2 Items */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='headline-post group cursor-pointer'>
                <div className='content'>
                  <div className='inner relative overflow-hidden rounded-lg shadow-lg'>
                    <Image
                      src={headlinesArticles[2].image}
                      alt={headlinesArticles[2].alt}
                      width={480}
                      height={320}
                      className='h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105'
                      loading='eager'
                      fetchPriority='high'
                      decoding='sync'
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    {/* Hover Title Overlay */}
                    <div className='absolute right-0 bottom-0 left-0 translate-y-full transform bg-[rgba(0,0,0,0.45)] p-2 text-white transition-transform duration-[135ms] group-hover:translate-y-0'>
                      <Link href={headlinesArticles[2].url} className='block'>
                        <h4 className='post-title text-sm leading-tight font-semibold'>
                          {headlinesArticles[2].title}
                        </h4>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className='headline-post group cursor-pointer'>
                <div className='content'>
                  <div className='inner relative overflow-hidden rounded-lg shadow-lg'>
                    <Image
                      src={headlinesArticles[3].image}
                      alt={headlinesArticles[3].alt}
                      width={480}
                      height={320}
                      className='h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105'
                      loading='eager'
                      fetchPriority='high'
                      decoding='sync'
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    {/* Hover Title Overlay */}
                    <div className='absolute right-0 bottom-0 left-0 translate-y-full transform bg-[rgba(0,0,0,0.45)] p-2 text-white transition-transform duration-[135ms] group-hover:translate-y-0'>
                      <Link href={headlinesArticles[3].url} className='block'>
                        <h4 className='post-title text-sm leading-tight font-semibold'>
                          {headlinesArticles[3].title}
                        </h4>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
