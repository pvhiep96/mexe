"use client";
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
  bannerImage = "https://file.hstatic.net/1000069970/file/banner_pre_c4eeb4b0068b421dafdc8ce2f9aa7d54_40d9e9e6a2894924b768c57612313211.png"
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDiscount = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return (
    <div className="relative pb-12">
      {/* Background blue rounded container */}
      <div className="absolute inset-0 top-8 h-full w-full bg-[#2D6294] rounded-t-[60px] z-0"></div>

      {/* Main content container */}
      <div className="container mx-auto max-w-[1200px] relative z-10 pt-8">
        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[5px] sm:gap-4 lg:gap-5 justify-center place-items-center mt-8 w-full max-w-[1000px] mx-auto sm:px-0" style={{ rowGap: '20px' }}>
          {paginatedProducts.map((product, idx) => (
            <React.Fragment key={product.id}>
              {/* Product card */}
              <div className="relative bg-white rounded-3xl border-2 border-[#2D6294] shadow-lg flex flex-col overflow-hidden p-0 items-center w-full max-w-[195px] sm:max-w-[245px] h-[320px] sm:h-[420px] lg:h-[450px] cursor-pointer hover:shadow-xl transition-shadow duration-300"
                style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)' }}>

                {/* Product image container */}
                <div className="w-full flex justify-center items-center bg-[#f7f7f7] relative h-[160px] sm:h-[220px] lg:h-[245px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full rounded-t-3xl"
                  />

                  {/* Product badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                        NEW
                      </span>
                    )}
                    {product.isHot && (
                      <span className="bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                        HOT
                      </span>
                    )}
                    {product.isPreorder && (
                      <span className="bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                        PRE-ORDER
                      </span>
                    )}
                  </div>

                  {/* Discount badge */}
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                      -{product.discount}%
                    </div>
                  )}

                  {/* Quick view button */}
                  <button className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer">
                    <div className="bg-white rounded-full p-2 shadow-lg">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Product content */}
                <div className="flex flex-col flex-1 w-full items-center px-1.5 sm:px-3 pt-2 pb-3">
                  {/* Product name */}
                  <div className="w-full font-bold text-xs sm:text-base text-black mb-1 text-left line-clamp-2" style={{ minHeight: '32px' }}>
                    {product.name}
                  </div>

                  {/* Product description */}
                  <div className="w-full text-gray-600 text-xs mb-2 text-left line-clamp-2" style={{ minHeight: '24px' }}>
                    {product.description}
                  </div>

                  {/* Price section */}
                  {product.price && (
                    <div className="w-full mb-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-red-500 font-bold text-sm sm:text-lg">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-gray-400 text-xs line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Preorder info */}
                  {product.isPreorder && product.ordered !== undefined && product.total !== undefined && (
                    <div className="w-full mb-2">
                      <div className="text-xs text-gray-600 mb-1">
                        Đã đặt: {product.ordered}/{product.total}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div
                          className="bg-red-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(product.ordered / product.total) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {product.endDate}
                      </div>
                    </div>
                  )}

                  {/* Spacer to push button to bottom */}
                  <div className="flex-1" />

                  {/* Add to cart button */}
                  <div className="flex justify-center w-full mt-auto">
                    <button className="flex items-center justify-center gap-0.5 sm:gap-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full px-1.5 sm:px-6 py-0.5 sm:py-2 text-xs sm:text-base w-full transition-all cursor-pointer">
                      <svg
                        className="h-3 w-3 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="hidden sm:inline">Thêm giỏ hàng</span>
                      <span className="sm:hidden text-xs">Thêm</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Banner after specified index */}
              {showBanner && idx === bannerIndex - 1 && (
                <div className="col-span-full flex justify-center my-4 px-2 sm:px-0">
                  <img
                    src={bannerImage}
                    alt="Banner giữa grid"
                    className="rounded-xl shadow w-full max-w-[900px] h-[80px] sm:h-[100px] lg:h-[120px] object-cover"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2 sm:gap-4 px-2 sm:px-0">
            {/* Previous button */}
            <button
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#2D6294] flex items-center justify-center shadow text-xl sm:text-2xl font-bold transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow text-lg sm:text-2xl font-normal transition-all cursor-pointer ${currentPage === idx + 1 ? 'bg-white text-black font-bold' : 'bg-[#2D6294]/20 text-black'
                  }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}

            {/* Next button */}
            <button
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#2D6294] flex items-center justify-center shadow text-xl sm:text-2xl font-bold transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
