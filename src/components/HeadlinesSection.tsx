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
    alt: 'NOMI - Người Bạn Đồng Hành Thông Minh Trong Xe của Bạn'
  },
  {
    id: '2',
    title: 'ChargeStick: Sạc Không Dây Siêu Nhỏ Gọn 4-in-1',
    image: '/images/demo-banner/banner-2.jpg',
    url: '/news/chargestick-sac-khong-day-sieu-nho-gon-4-in-1',
    alt: 'ChargeStick: Sạc Không Dây Siêu Nhỏ Gọn 4-in-1'
  },
  {
    id: '3',
    title: 'Domono AquaCam – Camera thông minh chống nước, đồng hành mọi hành trình.',
    image: '/images/demo-combo/demo-combo-1.png',
    url: '/news/domono-aquacam-camera-thong-minh-chong-nuoc',
    alt: 'Domono AquaCam – Camera thông minh chống nước, đồng hành mọi hành trình.'
  },
  {
    id: '4',
    title: '4URPC Gen 2: Bộ Truyền Không Dây True Wireless 4K Đột Phá',
    image: '/images/demo-combo/demo-combo-2.png',
    url: '/news/4urpc-gen-2-bo-truyen-khong-day-true-wireless-4k-dot-pha',
    alt: '4URPC Gen 2: Bộ Truyền Không Dây True Wireless 4K Đột Phá'
  }
];

export default function HeadlinesSection() {
  return (
    <div className="headlines bg-[#2F6194] py-12">
      <div className="container mx-auto px-4">
        <div className="title-outer text-center mb-12">
          <h1 className="headlines-title text-4xl font-bold text-gray-900">
            Tin Tức & Bài Viết
          </h1>
        </div>
        
        <div className="product-loop headline-posts grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section - 1 Large Item */}
          <div className="headline-post group cursor-pointer">
            <div className="content">
              <div className="inner relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={headlinesArticles[0].image}
                  alt={headlinesArticles[0].alt}
                  width={480}
                  height={320}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                />
                {/* Hover Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.45)] text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-[135ms]">
                  <Link href={headlinesArticles[0].url} className="block">
                    <h4 className="post-title text-xl font-semibold leading-tight">
                      {headlinesArticles[0].title}
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - 3 Items */}
          <div className="flex flex-col gap-6">
            {/* Top Item */}
            <div className="headline-post group cursor-pointer">
              <div className="content">
                <div className="inner relative overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={headlinesArticles[1].image}
                    alt={headlinesArticles[1].alt}
                    width={480}
                    height={320}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                  />
                  {/* Hover Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.45)] text-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-[135ms]">
                    <Link href={headlinesArticles[1].url} className="block">
                      <h4 className="post-title text-lg font-semibold leading-tight">
                        {headlinesArticles[1].title}
                      </h4>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 2 Items */}
            <div className="grid grid-cols-2 gap-4">
              <div className="headline-post group cursor-pointer">
                <div className="content">
                  <div className="inner relative overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={headlinesArticles[2].image}
                      alt={headlinesArticles[2].alt}
                      width={480}
                      height={320}
                      className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="eager"
                      fetchPriority="high"
                      decoding="sync"
                    />
                    {/* Hover Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.45)] text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-[135ms]">
                      <Link href={headlinesArticles[2].url} className="block">
                        <h4 className="post-title text-sm font-semibold leading-tight">
                          {headlinesArticles[2].title}
                        </h4>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="headline-post group cursor-pointer">
                <div className="content">
                  <div className="inner relative overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={headlinesArticles[3].image}
                      alt={headlinesArticles[3].alt}
                      width={480}
                      height={320}
                      className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="eager"
                      fetchPriority="high"
                      decoding="sync"
                    />
                    {/* Hover Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.45)] text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-[135ms]">
                      <Link href={headlinesArticles[3].url} className="block">
                        <h4 className="post-title text-sm font-semibold leading-tight">
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