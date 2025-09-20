'use client';
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useFlashTooltip } from '@/context/FlashTooltipContext';

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
  full_payment_transfer?: boolean;
  full_payment_discount_percentage?: number;
  partial_advance_payment?: boolean;
  advance_payment_percentage?: number;
  advance_payment_discount_percentage?: number;
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
  const { addToCart } = useCart();
  const { showTooltip } = useFlashTooltip();

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    // Ngăn chặn event bubbling để không trigger handleProductClick
    event.stopPropagation();
    

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price || 0,
      image: product.image,
      quantity: 1,
      // Default payment options
      full_payment_transfer: product.full_payment_transfer ?? false,
      full_payment_discount_percentage: product.full_payment_discount_percentage ?? 0,
      partial_advance_payment: product.partial_advance_payment ?? false,
      advance_payment_percentage: product.advance_payment_percentage ?? 0,
      advance_payment_discount_percentage: product.advance_payment_discount_percentage ?? 0,
    }, 1);
    showTooltip('Đã thêm vào giỏ hàng thành công!', 'success');
  };

  const handleProductClick = (product: Product) => {
    // Redirect đến trang product detail với URL dạng products/[slug]
    if (product.url) {
      window.location.href = `/products/${product.url}`;
    } else {
      // Fallback: sử dụng product ID nếu không có slug
      window.location.href = `/products/${product.id}`;
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      {/* Background mới trải dài hết trang, kể cả phần trắng ở 2 bên */}
      <div className='absolute inset-0 z-0 h-full w-screen -left-[calc((100vw-100%)/2)]'>
        {/* Background chính với màu xám nhạt */}
        <div className='absolute inset-0 bg-gray-50'></div>
        
        {/* Pattern overlay với đường lượn sóng giống ảnh 2 */}
        <div className='absolute inset-0 overflow-hidden'>
          {/* Đường lượn sóng trên - giống ảnh 2 với màu xanh nhạt */}
          <div className='absolute top-0 left-0 w-full h-24'>
            <svg 
              className='w-full h-full' 
              viewBox='0 0 1200 96' 
              preserveAspectRatio='none'
            >
              <defs>
                <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e0f2fe" stopOpacity="1"/>
                  <stop offset="50%" stopColor="#bae6fd" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#e0f2fe" stopOpacity="1"/>
                </linearGradient>
              </defs>
              <path 
                d='M0,96 Q150,32 300,96 Q450,48 600,96 Q750,32 900,96 Q1050,48 1200,96 L1200,0 L0,0 Z' 
                fill='url(#waveGradient1)'
              />
            </svg>
          </div>
          
          {/* Đường lượn sóng giữa - tạo hiệu ứng 3D giống ảnh 2 */}
          <div className='absolute top-1/3 left-0 w-full h-20'>
            <svg 
              className='w-full h-full' 
              viewBox='0 0 1200 80' 
              preserveAspectRatio='none'
            >
              <defs>
                <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#bae6fd" stopOpacity="1"/>
                  <stop offset="50%" stopColor="#7dd3fc" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#bae6fd" stopOpacity="1"/>
                </linearGradient>
              </defs>
              <path 
                d='M0,0 Q100,48 200,0 Q300,64 400,0 Q500,48 600,0 Q700,64 800,0 Q900,48 1000,0 Q1100,64 1200,0 L1200,80 L0,80 Z' 
                fill='url(#waveGradient2)'
              />
            </svg>
          </div>
          
          {/* Đường lượn sóng dưới - giống ảnh 2 với màu xanh nhạt */}
          <div className='absolute bottom-0 left-0 w-full h-24'>
            <svg 
              className='w-full h-full' 
              viewBox='0 0 1200 96' 
              preserveAspectRatio='none'
            >
              <defs>
                <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e0f2fe" stopOpacity="1"/>
                  <stop offset="50%" stopColor="#bae6fd" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#e0f2fe" stopOpacity="1"/>
                </linearGradient>
              </defs>
              <path 
                d='M0,0 Q150,48 300,0 Q450,24 600,0 Q750,48 900,0 Q1050,24 1200,0 L1200,96 L0,96 Z' 
                fill='url(#waveGradient3)'
              />
            </svg>
          </div>
          
          {/* Đường lượn sóng phụ - tạo chiều sâu giống ảnh 2 */}
          <div className='absolute top-1/4 left-0 w-full h-16'>
            <svg 
              className='w-full h-full' 
              viewBox='0 0 1200 64' 
              preserveAspectRatio='none'
            >
              <defs>
                <linearGradient id="waveGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f0f9ff" stopOpacity="1"/>
                  <stop offset="50%" stopColor="#e0f2fe" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#f0f9ff" stopOpacity="1"/>
                </linearGradient>
              </defs>
              <path 
                d='M0,32 Q120,0 240,32 Q360,64 480,32 Q600,0 720,32 Q840,64 960,32 Q1080,0 1200,32 L1200,64 L0,64 Z' 
                fill='url(#waveGradient4)'
              />
            </svg>
          </div>
          
          {/* Đường lượn sóng phụ thứ 2 - tạo hiệu ứng mềm mại giống ảnh 2 */}
          <div className='absolute top-2/3 left-0 w-full h-16'>
            <svg 
              className='w-full h-full' 
              viewBox='0 0 1200 64' 
              preserveAspectRatio='none'
            >
              <defs>
                <linearGradient id="waveGradient5" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#bae6fd" stopOpacity="1"/>
                  <stop offset="50%" stopColor="#7dd3fc" stopOpacity="1"/>
                  <stop offset="100%" stopColor="#bae6fd" stopOpacity="1"/>
                </linearGradient>
              </defs>
              <path 
                d='M0,0 Q120,48 240,0 Q360,16 480,0 Q600,48 720,0 Q840,16 960,0 Q1080,48 1200,0 L1200,64 L0,64 Z' 
                fill='url(#waveGradient5)'
              />
            </svg>
          </div>
        </div>
      </div>

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
                className='group relative flex h-[320px] w-full max-w-[195px] cursor-pointer flex-col items-center rounded-lg border-2 border-[#2D6294] bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl sm:h-[420px] sm:max-w-[245px] lg:h-[450px]'
                style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)' }}
                onClick={() => handleProductClick(product)}
              >
                {/* Product image container */}
                <div className='relative flex h-[160px] w-full items-center justify-center overflow-hidden rounded-t-lg bg-[#f7f7f7] sm:h-[220px] lg:h-[245px]'>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className='h-full w-full rounded-t-lg object-cover transition-transform duration-300 group-hover:scale-110'
                    />
                  ) : (
                    /* Placeholder "No Image" đẹp mắt */
                    <div className='flex h-full w-full flex-col items-center justify-center rounded-t-3xl bg-gradient-to-br from-gray-100 to-gray-200 p-4'>
                      <svg
                        className='mb-2 h-12 w-12 text-gray-400 sm:h-16 sm:w-16 lg:h-20 lg:w-20'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={1.5}
                          d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                        />
                      </svg>
                      <div className='text-center'>
                        <p className='text-xs font-medium text-gray-500 sm:text-sm lg:text-base'>
                          No Image
                        </p>
                        <p className='text-xs text-gray-400 sm:text-sm'>
                          Available
                        </p>
                      </div>
                    </div>
                  )}

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


                </div>

                {/* Product content */}
                <div className='flex w-full flex-1 flex-col items-center px-2 pt-2 pb-3 sm:px-3'>
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
                    <button 
                      onClick={(event) => handleAddToCart(product, event)}
                      className='flex w-full cursor-pointer items-center justify-center gap-0.5 rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white transition-all hover:bg-red-600 sm:gap-2 sm:px-6 sm:py-2 sm:text-base'
                    >
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
          <div className='mt-4 flex flex-col items-center space-y-4'>
            <div className='text-sm text-gray-700 font-medium'>
              Trang {currentPage} của {totalPages} ({products.length} sản phẩm)
            </div>
            <div className='flex items-center space-x-2'>
              <button
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50'
                style={{
                  cursor: currentPage === 1 ? 'not-allowed !important' : 'pointer !important'
                }}
              >
                <svg
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    d='M15 19l-7-7 7-7'
                    stroke='#2D6294'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
              {(() => {
                const maxVisiblePages = 7;
                const pages = [];
                
                if (totalPages <= maxVisiblePages) {
                  // Show all pages if total is small
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  // Show pages with ellipsis
                  if (currentPage <= 4) {
                    // Show first 5 pages + ellipsis + last page
                    for (let i = 1; i <= 5; i++) {
                      pages.push(i);
                    }
                    pages.push('...');
                    pages.push(totalPages);
                  } else if (currentPage >= totalPages - 3) {
                    // Show first page + ellipsis + last 5 pages
                    pages.push(1);
                    pages.push('...');
                    for (let i = totalPages - 4; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    // Show first page + ellipsis + current-1, current, current+1 + ellipsis + last page
                    pages.push(1);
                    pages.push('...');
                    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                      pages.push(i);
                    }
                    pages.push('...');
                    pages.push(totalPages);
                  }
                }

                return pages.map((page, idx) => (
                  <React.Fragment key={idx}>
                    {page === '...' ? (
                      <div className='flex h-10 w-10 items-center justify-center text-lg sm:h-14 sm:w-14 sm:text-2xl'>
                        ...
                      </div>
                    ) : (
                      <button
                        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => goToPage(page as number)}
                      >
                        {page}
                      </button>
                    )}
                  </React.Fragment>
                ));
              })()}
              <button
                onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50'
                style={{
                  cursor: currentPage === totalPages ? 'not-allowed !important' : 'pointer !important'
                }}
              >
                <svg
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    d='M9 5l7 7-7 7'
                    stroke='#2D6294'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
