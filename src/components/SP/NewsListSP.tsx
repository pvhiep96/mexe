'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  url: string;
}

const newsData: NewsArticle[] = [
  {
    id: '1',
    title: 'Top 10 phụ kiện ô tô cần thiết cho xe mới',
    excerpt:
      'Khám phá những phụ kiện ô tô quan trọng nhất mà mọi chủ xe mới nên trang bị để bảo vệ và nâng cao trải nghiệm lái xe.',
    image: '/images/demo-banner/banner-1.jpg',
    author: 'Mexe Team',
    date: '27.05.2024',
    category: 'Phụ Kiện Ô Tô',
    url: '/news/top-10-phu-kien-o-to-can-thiet',
  },
  {
    id: '2',
    title: 'Hướng dẫn chọn camera hành trình phù hợp',
    excerpt:
      'Tìm hiểu cách chọn camera hành trình tốt nhất cho xe của bạn với các tiêu chí quan trọng và gợi ý sản phẩm chất lượng.',
    image: '/images/demo-banner/banner-2.jpg',
    author: 'Mexe Team',
    date: '25.05.2024',
    category: 'Công Nghệ',
    url: '/news/huong-dan-chon-camera-hanh-trinh',
  },
  {
    id: '3',
    title: '5 loại thảm sàn ô tô tốt nhất 2024',
    excerpt:
      'So sánh các loại thảm sàn ô tô phổ biến và gợi ý những sản phẩm chất lượng cao giúp bảo vệ sàn xe hiệu quả.',
    image: '/images/demo-combo/demo-combo-1.png',
    author: 'Mexe Team',
    date: '20.05.2024',
    category: 'Phụ Kiện Ô Tô',
    url: '/news/5-loai-tham-san-o-to-tot-nhat-2024',
  },
  {
    id: '4',
    title: 'Cách bảo dưỡng và vệ sinh nội thất ô tô',
    excerpt:
      'Hướng dẫn chi tiết cách bảo dưỡng và vệ sinh nội thất ô tô để giữ xe luôn sạch sẽ và bền đẹp.',
    image: '/images/demo-combo/demo-combo-2.png',
    author: 'Mexe Team',
    date: '15.05.2024',
    category: 'Bảo Dưỡng',
    url: '/news/cach-bao-duong-va-ve-sinh-noi-that-o-to',
  },
  {
    id: '5',
    title: 'Những phụ kiện an toàn cần thiết cho gia đình',
    excerpt:
      'Danh sách các phụ kiện an toàn quan trọng cho xe gia đình, đặc biệt khi có trẻ em và người già.',
    image: '/images/demo-combo/demo-combo-3.png',
    author: 'Mexe Team',
    date: '14.05.2024',
    category: 'An Toàn',
    url: '/news/phu-kien-an-toan-can-thiet-cho-gia-dinh',
  },
  {
    id: '6',
    title: 'Cách chọn máy lọc không khí ô tô chất lượng',
    excerpt:
      'Hướng dẫn chọn máy lọc không khí ô tô phù hợp để bảo vệ sức khỏe gia đình khi di chuyển.',
    image: '/images/demo-combo/demo-combo-4.png',
    author: 'Mexe Team',
    date: '02.05.2024',
    category: 'Sức Khỏe',
    url: '/news/cach-chon-may-loc-khong-khi-o-to',
  },
];

export default function NewsListSP() {
  const t = useTranslations('news');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const categories = [
    { id: 'all', name: t('all_categories'), count: newsData.length },
    {
      id: 'phu-kien-o-to',
      name: t('auto_accessories'),
      count: newsData.filter((item) => item.category === 'Phụ Kiện Ô Tô')
        .length,
    },
    {
      id: 'cong-nghe',
      name: t('technology'),
      count: newsData.filter((item) => item.category === 'Công Nghệ').length,
    },
    {
      id: 'bao-duong',
      name: t('maintenance'),
      count: newsData.filter((item) => item.category === 'Bảo Dưỡng').length,
    },
    {
      id: 'an-toan',
      name: t('safety'),
      count: newsData.filter((item) => item.category === 'An Toàn').length,
    },
    {
      id: 'suc-khoe',
      name: t('health'),
      count: newsData.filter((item) => item.category === 'Sức Khỏe').length,
    },
  ];

  const headlinesArticles = [
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

  const filteredNews =
    selectedCategory === 'all'
      ? newsData
      : newsData.filter((item) => {
          if (selectedCategory === 'phu-kien-o-to') {
            return item.category === 'Phụ Kiện Ô Tô';
          } else if (selectedCategory === 'cong-nghe') {
            return item.category === 'Công Nghệ';
          } else if (selectedCategory === 'bao-duong') {
            return item.category === 'Bảo Dưỡng';
          } else if (selectedCategory === 'an-toan') {
            return item.category === 'An Toàn';
          } else if (selectedCategory === 'suc-khoe') {
            return item.category === 'Sức Khỏe';
          }
          return false;
        });

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Headlines Section - Tin Tức & Bài Viết */}
      <div className='headlines bg-[#2F6194] py-6'>
        <div className='container mx-auto px-4'>
          <div className='title-outer mb-6 text-center'>
            <h1 className='headlines-title text-2xl font-bold text-white'>
              Tin Tức & Bài Viết
            </h1>
          </div>

          <div className='product-loop headline-posts grid grid-cols-1 gap-4'>
            {/* Left Section - 1 Large Item */}
            <div className='headline-post group cursor-pointer'>
              <div className='content'>
                <div className='inner relative overflow-hidden rounded-lg shadow-lg'>
                  <Image
                    src={headlinesArticles[0].image}
                    alt={headlinesArticles[0].alt}
                    width={480}
                    height={320}
                    className='h-[280px] w-full object-cover transition-transform duration-300 group-hover:scale-105'
                    loading='eager'
                    fetchPriority='high'
                    decoding='sync'
                  />
                  {/* Hover Title Overlay */}
                  <div className='absolute right-0 bottom-0 left-0 translate-y-full transform bg-[rgba(0,0,0,0.45)] p-3 text-white transition-transform duration-[135ms] group-hover:translate-y-0'>
                    <Link href={headlinesArticles[0].url} className='block'>
                      <h4 className='post-title text-lg leading-tight font-semibold'>
                        {headlinesArticles[0].title}
                      </h4>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - 3 Items Stacked */}
            <div className='flex flex-col gap-3'>
              {/* Top Item - CHARGESTICK */}
              <div className='headline-post group cursor-pointer'>
                <div className='content'>
                  <div className='inner relative overflow-hidden rounded-lg shadow-lg'>
                    <Image
                      src={headlinesArticles[1].image}
                      alt={headlinesArticles[1].alt}
                      width={480}
                      height={320}
                      className='h-[130px] w-full object-cover transition-transform duration-300 group-hover:scale-105'
                      loading='eager'
                      fetchPriority='high'
                      decoding='sync'
                    />
                    {/* Hover Title Overlay */}
                    <div className='absolute right-0 bottom-0 left-0 translate-y-full transform bg-[rgba(0,0,0,0.45)] p-2 text-white transition-transform duration-[135ms] group-hover:translate-y-0'>
                      <Link href={headlinesArticles[1].url} className='block'>
                        <h4 className='post-title text-sm leading-tight font-semibold'>
                          {headlinesArticles[1].title}
                        </h4>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom 2 Items - DOMONO AQUACAM & 4URPC GEN 2 */}
              <div className='grid grid-cols-2 gap-3'>
                <div className='headline-post group cursor-pointer'>
                  <div className='content'>
                    <div className='inner relative overflow-hidden rounded-lg shadow-lg'>
                      <Image
                        src={headlinesArticles[2].image}
                        alt={headlinesArticles[2].alt}
                        width={480}
                        height={320}
                        className='h-[130px] w-full object-cover transition-transform duration-300 group-hover:scale-105'
                        loading='eager'
                        fetchPriority='high'
                        decoding='sync'
                      />
                      {/* Hover Title Overlay */}
                      <div className='absolute right-0 bottom-0 left-0 translate-y-full transform bg-[rgba(0,0,0,0.45)] p-2 text-white transition-transform duration-[135ms] group-hover:translate-y-0'>
                        <Link href={headlinesArticles[2].url} className='block'>
                          <h4 className='post-title text-xs leading-tight font-semibold'>
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
                        className='h-[130px] w-full object-cover transition-transform duration-300 group-hover:scale-105'
                        loading='eager'
                        fetchPriority='high'
                        decoding='sync'
                      />
                      {/* Hover Title Overlay */}
                      <div className='absolute right-0 bottom-0 left-0 translate-y-full transform bg-[rgba(0,0,0,0.45)] p-2 text-white transition-transform duration-[135ms] group-hover:translate-y-0'>
                        <Link href={headlinesArticles[3].url} className='block'>
                          <h4 className='post-title text-xs leading-tight font-semibold'>
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

      {/* Category Filter */}
      <div className='border-b border-gray-200 bg-white'>
        <div className='px-4 py-3'>
          <div className='flex space-x-2 overflow-x-auto pb-2'>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCurrentPage(1);
                }}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className='ml-1 text-xs opacity-75'>
                  ({category.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News List */}
      <div className='px-4 py-4'>
        <div className='space-y-4'>
          {currentNews.map((article) => (
            <article
              key={article.id}
              className='overflow-hidden rounded-lg bg-white shadow-sm'
            >
              <div className='relative h-48'>
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className='object-cover'
                />
                <div className='absolute top-3 left-3'>
                  <span className='rounded-full bg-blue-600 px-2 py-1 text-xs text-white'>
                    {article.category}
                  </span>
                </div>
              </div>
              <div className='p-4'>
                <h3 className='mb-2 line-clamp-2 text-lg font-semibold text-gray-900'>
                  <Link
                    href={article.url}
                    className='transition-colors hover:text-blue-600'
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className='mb-3 line-clamp-3 text-sm text-gray-600'>
                  {article.excerpt}
                </p>
                <div className='flex items-center justify-between text-xs text-gray-500'>
                  <span>
                    {t('by')} {article.author}
                  </span>
                  <span>{article.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='border-t border-gray-200 bg-white px-4 py-4'>
          <div className='flex items-center justify-between'>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className='rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 disabled:opacity-50'
              style={{
                cursor: currentPage === 1 ? 'not-allowed !important' : 'pointer !important'
              }}
            >
              {t('previous')}
            </button>

            <div className='flex items-center space-x-1'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 w-8 rounded-md text-sm font-medium ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{
                      cursor: 'pointer !important'
                    }}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className='rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 disabled:opacity-50'
              style={{
                cursor: currentPage === totalPages ? 'not-allowed !important' : 'pointer !important'
              }}
            >
              {t('next')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
