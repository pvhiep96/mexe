'use client';

import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Hiển thị tất cả pages nếu tổng số ít
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logic hiển thị pages với ellipsis
      if (currentPage <= 3) {
        // Trang đầu: 1, 2, 3, 4, 5, ..., last
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        if (totalPages > 5) {
          pages.push('...');
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Trang cuối: 1, ..., last-4, last-3, last-2, last-1, last
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Trang giữa: 1, ..., current-1, current, current+1, ..., last
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className='flex items-center justify-center space-x-2 py-8'>
      {/* Previous Button */}
      <Link
        href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : '#'}
        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
          currentPage > 1
            ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            : 'cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400'
        }`}
        onClick={(e) => currentPage <= 1 && e.preventDefault()}
      >
        <svg
          className='h-4 w-4'
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
      </Link>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className='px-3 py-2 text-gray-500'>...</span>
          ) : (
            <Link
              href={`${baseUrl}?page=${page}`}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </Link>
          )}
        </React.Fragment>
      ))}

      {/* Next Button */}
      <Link
        href={
          currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : '#'
        }
        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
          currentPage < totalPages
            ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            : 'cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400'
        }`}
        onClick={(e) => currentPage >= totalPages && e.preventDefault()}
      >
        <svg
          className='h-4 w-4'
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
      </Link>
    </div>
  );
}
