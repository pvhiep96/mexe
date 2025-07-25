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
    excerpt: 'Khám phá những phụ kiện ô tô quan trọng nhất mà mọi chủ xe mới nên trang bị để bảo vệ và nâng cao trải nghiệm lái xe.',
    image: '/images/demo-banner/banner-1.jpg',
    author: 'Mexe Team',
    date: '27.05.2024',
    category: 'Phụ Kiện Ô Tô',
    url: '/news/top-10-phu-kien-o-to-can-thiet'
  },
  {
    id: '2',
    title: 'Hướng dẫn chọn camera hành trình phù hợp',
    excerpt: 'Tìm hiểu cách chọn camera hành trình tốt nhất cho xe của bạn với các tiêu chí quan trọng và gợi ý sản phẩm chất lượng.',
    image: '/images/demo-banner/banner-2.jpg',
    author: 'Mexe Team',
    date: '25.05.2024',
    category: 'Công Nghệ',
    url: '/news/huong-dan-chon-camera-hanh-trinh'
  },
  {
    id: '3',
    title: '5 loại thảm sàn ô tô tốt nhất 2024',
    excerpt: 'So sánh các loại thảm sàn ô tô phổ biến và gợi ý những sản phẩm chất lượng cao giúp bảo vệ sàn xe hiệu quả.',
    image: '/images/demo-combo/demo-combo-1.png',
    author: 'Mexe Team',
    date: '20.05.2024',
    category: 'Phụ Kiện Ô Tô',
    url: '/news/5-loai-tham-san-o-to-tot-nhat-2024'
  },
  {
    id: '4',
    title: 'Cách bảo dưỡng và vệ sinh nội thất ô tô',
    excerpt: 'Hướng dẫn chi tiết cách bảo dưỡng và vệ sinh nội thất ô tô để giữ xe luôn sạch sẽ và bền đẹp.',
    image: '/images/demo-combo/demo-combo-2.png',
    author: 'Mexe Team',
    date: '15.05.2024',
    category: 'Bảo Dưỡng',
    url: '/news/cach-bao-duong-va-ve-sinh-noi-that-o-to'
  },
  {
    id: '5',
    title: 'Những phụ kiện an toàn cần thiết cho gia đình',
    excerpt: 'Danh sách các phụ kiện an toàn quan trọng cho xe gia đình, đặc biệt khi có trẻ em và người già.',
    image: '/images/demo-combo/demo-combo-3.png',
    author: 'Mexe Team',
    date: '14.05.2024',
    category: 'An Toàn',
    url: '/news/phu-kien-an-toan-can-thiet-cho-gia-dinh'
  },
  {
    id: '6',
    title: 'Cách chọn máy lọc không khí ô tô chất lượng',
    excerpt: 'Hướng dẫn chọn máy lọc không khí ô tô phù hợp để bảo vệ sức khỏe gia đình khi di chuyển.',
    image: '/images/demo-combo/demo-combo-4.png',
    author: 'Mexe Team',
    date: '02.05.2024',
    category: 'Sức Khỏe',
    url: '/news/cach-chon-may-loc-khong-khi-o-to'
  }
];

export default function NewsList() {
  const t = useTranslations('news');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    { id: 'all', name: t('all_categories'), count: newsData.length },
    { id: 'phu-kien-o-to', name: t('auto_accessories'), count: newsData.filter(item => item.category === 'Phụ Kiện Ô Tô').length },
    { id: 'cong-nghe', name: t('technology'), count: newsData.filter(item => item.category === 'Công Nghệ').length },
    { id: 'bao-duong', name: t('maintenance'), count: newsData.filter(item => item.category === 'Bảo Dưỡng').length },
    { id: 'an-toan', name: t('safety'), count: newsData.filter(item => item.category === 'An Toàn').length },
    { id: 'suc-khoe', name: t('health'), count: newsData.filter(item => item.category === 'Sức Khỏe').length }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(item => {
        const categoryMap: { [key: string]: string } = {
          'phu-kien-o-to': 'Phụ Kiện Ô Tô',
          'cong-nghe': 'Công Nghệ',
          'bao-duong': 'Bảo Dưỡng',
          'an-toan': 'An Toàn',
          'suc-khoe': 'Sức Khỏe'
        };
        return item.category === categoryMap[selectedCategory];
      });

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      {/* <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div> */}

      {/* Category Filter */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-1 bg-white rounded-lg shadow-sm p-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
              <span className="ml-1 text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {currentNews.map((article) => (
          <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                <Link href={article.url} className="hover:text-blue-600 transition-colors">
                  {article.title}
                </Link>
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{t('by')} {article.author}</span>
                <span>{article.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('previous')}
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('next')}
            </button>
          </nav>
        </div>
      )}
    </div>
  );
} 