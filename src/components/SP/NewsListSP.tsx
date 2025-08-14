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
      count: newsData.filter((item) => item.category === 'Công Nghệ')
        .length,
    },
    {
      id: 'bao-duong',
      name: t('maintenance'),
      count: newsData.filter((item) => item.category === 'Bảo Dưỡng')
        .length,
    },
    {
      id: 'an-toan',
      name: t('safety'),
      count: newsData.filter((item) => item.category === 'An Toàn')
        .length,
    },
    {
      id: 'suc-khoe',
      name: t('health'),
      count: newsData.filter((item) => item.category === 'Sức Khỏe')
        .length,
    },
  ];

  const filteredNews =
    selectedCategory === 'all'
      ? newsData
      : newsData.filter((item) => item.category === categories.find(cat => cat.id === selectedCategory)?.name);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className='min-h-screen bg-gray-50'>
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
              className='rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50'
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
              className='rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50'
            >
              {t('next')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
