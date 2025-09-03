'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RelatedProductType } from './types';

interface RelatedProductsProps {
  products: RelatedProductType[];
  title?: string;
  categoryName?: string;
}

export default function RelatedProducts({ products, title = 'SẢN PHẨM LIÊN QUAN', categoryName }: RelatedProductsProps) {
  // Only show real related products from API
  const displayProducts = products;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  return (
    <div className='rounded-lg border border-gray-200 bg-white lg:sticky lg:top-[100px]'>
      <div className='p-4'>
        <h3 className='mb-4 font-bold text-gray-900'>
          {title}
          {categoryName && products.length > 0 && (
            <span className='block text-sm font-normal text-gray-600 mt-1'>
              Danh mục: {categoryName}
            </span>
          )}
        </h3>
        <div className='space-y-4'>
          {displayProducts.map((relatedProduct, index) => (
            <Link
              key={relatedProduct.id}
              href={`/products/${relatedProduct.slug}`}
              className={`flex cursor-pointer items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-50 ${
                index < displayProducts.length - 1 ? 'border-b border-gray-100 pb-4' : ''
              }`}
            >
              <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200'>
                <Image
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  width={64}
                  height={64}
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='min-w-0 flex-1'>
                <h4 className='truncate text-sm font-medium text-gray-900'>
                  {relatedProduct.name}
                </h4>
                <p className='text-sm font-bold text-red-600'>
                  {formatPrice(relatedProduct.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        {displayProducts.length === 0 && (
          <div className='mt-4 text-center p-4'>
            <div className='text-gray-400 text-4xl mb-2'>📦</div>
            <p className='text-sm text-gray-500 mb-2'>
              Không tìm thấy sản phẩm cùng danh mục
            </p>
            <p className='text-xs text-gray-400'>
              Hãy thử xem các sản phẩm khác
            </p>
          </div>
        )}
      </div>
    </div>
  );
}