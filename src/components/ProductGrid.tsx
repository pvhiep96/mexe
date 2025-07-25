'use client';
import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  url: string;
  image: string;
  description: string;
  ordered?: number;
  total?: number;
  endDate?: string;
  price?: number;
  originalPrice?: number;
  discount?: number;
  isNew?: boolean;
  isHot?: boolean;
  isPreorder?: boolean;
}

interface ProductGridProps {
  products: Product[];
  itemsPerPage?: number;
  showBanner?: boolean;
  bannerIndex?: number;
  bannerImage?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  itemsPerPage = 16,
  showBanner = true,
  bannerIndex = 8,
  bannerImage = 'https://file.hstatic.net/1000069970/file/banner_pre_c4eeb4b0068b421dafdc8ce2f9aa7d54_40d9e9e6a2894924b768c57612313211.png',
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatDiscount = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return (
    <div className='relative pb-12'>
      {/* Background blue rounded container */}
      <div className='absolute inset-0 top-8 z-0 h-full w-full rounded-t-[60px] bg-[#2D6294]'></div>

      {/* Main content container */}
      <div className='relative z-10 container mx-auto max-w-[1200px] pt-8'>
        {/* Product grid */}
        <div
          className='mx-auto mt-8 grid w-full max-w-[1000px] grid-cols-2 place-items-center justify-center gap-[5px] sm:grid-cols-2 sm:gap-4 sm:px-0 md:grid-cols-3 lg:grid-cols-4 lg:gap-5'
          style={{ rowGap: '20px' }}
        >
          {paginatedProducts.map((product, idx) => (
            <React.Fragment key={product.id}>
              {/* Product card */}
              <div
                className='relative flex h-[320px] w-full max-w-[195px] cursor-pointer flex-col items-center overflow-hidden rounded-3xl border-2 border-[#2D6294] bg-white p-0 shadow-lg transition-shadow duration-300 hover:shadow-xl sm:h-[420px] sm:max-w-[245px] lg:h-[450px]'
                style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)' }}
              >
                {/* Product image container */}
                <div className='relative flex h-[160px] w-full items-center justify-center bg-[#f7f7f7] sm:h-[220px] lg:h-[245px]'>
                  <img
                    src={product.image}
                    alt={product.name}
                    className='h-full w-full rounded-t-3xl object-cover'
                  />

                  {/* Product badges */}
                  <div className='absolute top-2 left-2 flex flex-col gap-1'>
                    {product.isNew && (
                      <span className='rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white sm:px-2 sm:py-1'>
                        NEW
                      </span>
                    )}
                    {product.isHot && (
                      <span className='rounded-full bg-orange-500 px-1.5 py-0.5 text-xs font-bold text-white sm:px-2 sm:py-1'>
                        HOT
                      </span>
                    )}
                    {product.isPreorder && (
                      <span className='rounded-full bg-blue-500 px-1.5 py-0.5 text-xs font-bold text-white sm:px-2 sm:py-1'>
                        PRE-ORDER
                      </span>
                    )}
                  </div>

                  {/* Discount badge */}
                  {product.discount && (
                    <div className='absolute top-2 right-2 rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white sm:px-2 sm:py-1'>
                      -{product.discount}%
                    </div>
                  )}

                  {/* Quick view button */}
                  <button className='bg-opacity-0 hover:bg-opacity-20 absolute inset-0 flex cursor-pointer items-center justify-center bg-black opacity-0 transition-all duration-300 hover:opacity-100'>
                    <div className='rounded-full bg-white p-2 shadow-lg'>
                      <svg
                        width='20'
                        height='20'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <path
                          d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                        <circle
                          cx='12'
                          cy='12'
                          r='3'
                          stroke='currentColor'
                          strokeWidth='2'
                        />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Product content */}
                <div className='flex w-full flex-1 flex-col items-center px-1.5 pt-2 pb-3 sm:px-3'>
                  {/* Product name */}
                  <div
                    className='mb-1 line-clamp-2 w-full text-left text-xs font-bold text-black sm:text-base'
                    style={{ minHeight: '32px' }}
                  >
                    {product.name}
                  </div>

                  {/* Product description */}
                  <div
                    className='mb-2 line-clamp-2 w-full text-left text-xs text-gray-600'
                    style={{ minHeight: '24px' }}
                  >
                    {product.description}
                  </div>

                  {/* Price section */}
                  {product.price && (
                    <div className='mb-2 w-full'>
                      <div className='flex items-center gap-1 sm:gap-2'>
                        <span className='text-sm font-bold text-red-500 sm:text-lg'>
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice &&
                          product.originalPrice > product.price && (
                            <span className='text-xs text-gray-400 line-through'>
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                      </div>
                    </div>
                  )}

                  {/* Preorder info */}
                  {product.isPreorder &&
                    product.ordered !== undefined &&
                    product.total !== undefined && (
                      <div className='mb-2 w-full'>
                        <div className='mb-1 text-xs text-gray-600'>
                          Đã đặt: {product.ordered}/{product.total}
                        </div>
                        <div className='h-1.5 w-full rounded-full bg-gray-200 sm:h-2'>
                          <div
                            className='h-1.5 rounded-full bg-red-500 transition-all duration-300 sm:h-2'
                            style={{
                              width: `${(product.ordered / product.total) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className='mt-1 text-xs text-gray-600'>
                          {product.endDate}
                        </div>
                      </div>
                    )}

                  {/* Spacer to push button to bottom */}
                  <div className='flex-1' />

                  {/* Add to cart button */}
                  <div className='mt-auto flex w-full justify-center'>
                    <button className='flex w-full cursor-pointer items-center justify-center gap-0.5 rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white transition-all hover:bg-red-600 sm:gap-2 sm:px-6 sm:py-2 sm:text-base'>
                      <svg
                        className='h-3 w-3 sm:h-6 sm:w-6 lg:h-7 lg:w-7'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                        />
                      </svg>
                      <span className='hidden sm:inline'>Thêm giỏ hàng</span>
                      <span className='text-xs sm:hidden'>Thêm</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Banner after specified index */}
              {showBanner && idx === bannerIndex - 1 && (
                <div className='col-span-full my-4 flex justify-center px-2 sm:px-0'>
                  <img
                    src={bannerImage}
                    alt='Banner giữa grid'
                    className='h-[80px] w-full max-w-[900px] rounded-xl object-cover shadow sm:h-[100px] lg:h-[120px]'
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='mt-8 flex justify-center gap-2 px-2 sm:gap-4 sm:px-0'>
            {/* Previous button */}
            <button
              className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#2D6294] text-xl font-bold shadow transition disabled:cursor-not-allowed disabled:opacity-50 sm:h-16 sm:w-16 sm:text-2xl'
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <svg
                className='h-6 w-6 sm:h-7 sm:w-7'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  d='M15 19l-7-7 7-7'
                  stroke='black'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-lg font-normal shadow transition-all sm:h-14 sm:w-14 sm:text-2xl ${
                  currentPage === idx + 1
                    ? 'bg-white font-bold text-black'
                    : 'bg-[#2D6294]/20 text-black'
                }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}

            {/* Next button */}
            <button
              className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#2D6294] text-xl font-bold shadow transition disabled:cursor-not-allowed disabled:opacity-50 sm:h-16 sm:w-16 sm:text-2xl'
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <svg
                className='h-6 w-6 sm:h-7 sm:w-7'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  d='M9 5l7 7-7 7'
                  stroke='black'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
