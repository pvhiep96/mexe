'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { apiClient } from '@/services/api';
import type { Product } from '@/services/api';

// Force client-side rendering
export const dynamic = 'force-dynamic';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await apiClient.getProduct(slug);
        setProduct(productData);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Có lỗi xảy ra khi tải thông tin sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className='min-h-screen bg-gray-50 py-8'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-center'>
            <div className='text-lg text-gray-600'>Đang tải thông tin sản phẩm...</div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className='min-h-screen bg-gray-50 py-8'>
        <div className='container mx-auto px-4'>
          <div className='text-center'>
            <div className='text-lg text-red-600 mb-4'>
              {error || 'Không tìm thấy sản phẩm'}
            </div>
            <Link
              href='/products'
              className='inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700'
            >
              Quay lại danh sách sản phẩm
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const hasImages = product.images && product.images.length > 0;
  const sortedImages = hasImages 
    ? [...product.images].sort((a, b) => {
        if (a.is_primary && !b.is_primary) return -1;
        if (!a.is_primary && b.is_primary) return 1;
        return a.sort_order - b.sort_order;
      })
    : [];

  return (
    <main className='min-h-screen bg-gray-50 py-8'>
      <div className='container mx-auto px-4'>
        {/* Breadcrumb */}
        <nav className='mb-6 text-sm text-gray-600'>
          <Link href='/' className='hover:text-blue-600'>Trang chủ</Link>
          <span className='mx-2'>/</span>
          <Link href='/products' className='hover:text-blue-600'>Sản phẩm</Link>
          <span className='mx-2'>/</span>
          <span className='text-gray-900'>{product.name}</span>
        </nav>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {/* Product Images */}
          <div className='space-y-4'>
            {/* Main Image */}
            <div className='relative h-96 w-full overflow-hidden rounded-lg bg-white'>
              {hasImages ? (
                <Image
                  src={sortedImages[selectedImageIndex]?.image_url || '/images/demo-item.webp'}
                  alt={product.name}
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />
              ) : (
                <Image
                  src='/images/demo-item.webp'
                  alt={product.name}
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 50vw'
                />
              )}
            </div>

            {/* Thumbnail Images */}
            {hasImages && sortedImages.length > 1 && (
              <div className='flex space-x-2 overflow-x-auto'>
                {sortedImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      index === selectedImageIndex
                        ? 'border-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image.image_url}
                      alt={image.alt_text || product.name}
                      fill
                      className='object-cover'
                      sizes='80px'
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>{product.name}</h1>
              {product.sku && (
                <p className='text-sm text-gray-500'>SKU: {product.sku}</p>
              )}
            </div>

            {/* Price */}
            <div className='space-y-2'>
              <div className='flex items-center gap-3'>
                <span className='text-3xl font-bold text-blue-600'>
                  {parseFloat(product.price).toLocaleString()}đ
                </span>
                {product.original_price && parseFloat(product.original_price) > parseFloat(product.price) && (
                  <span className='text-xl text-gray-500 line-through'>
                    {parseFloat(product.original_price).toLocaleString()}đ
                  </span>
                )}
              </div>
              {product.discount_percent && (
                <span className='inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800'>
                  Giảm {product.discount_percent}%
                </span>
              )}
            </div>

            {/* Description */}
            {product.short_description && (
              <div>
                <h3 className='text-lg font-semibold mb-2'>Mô tả ngắn</h3>
                <p className='text-gray-600'>{product.short_description}</p>
              </div>
            )}

            {product.description && (
              <div>
                <h3 className='text-lg font-semibold mb-2'>Mô tả chi tiết</h3>
                <div 
                  className='text-gray-600 prose prose-sm max-w-none'
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}

            {/* Stock Info */}
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-gray-600'>Tình trạng:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.stock_quantity > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock_quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                </span>
              </div>
              {product.stock_quantity > 0 && (
                <span className='text-sm text-gray-600'>
                  Còn {product.stock_quantity} sản phẩm
                </span>
              )}
            </div>

            {/* Brand & Category */}
            <div className='flex gap-6 text-sm'>
              {product.brand && (
                <div>
                  <span className='text-gray-600'>Thương hiệu:</span>
                  <span className='ml-2 font-medium'>{product.brand.name}</span>
                </div>
              )}
              {product.category && (
                <div>
                  <span className='text-gray-600'>Danh mục:</span>
                  <span className='ml-2 font-medium'>{product.category.name}</span>
                </div>
              )}
            </div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div>
                <h3 className='text-lg font-semibold mb-3'>Thông số kỹ thuật</h3>
                <div className='grid grid-cols-1 gap-2'>
                  {product.specifications
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((spec) => (
                      <div key={spec.id} className='flex justify-between py-2 border-b border-gray-100'>
                        <span className='text-gray-600'>{spec.spec_name}</span>
                        <span className='font-medium'>
                          {spec.spec_value}
                          {spec.unit && <span className='text-gray-500 ml-1'>{spec.unit}</span>}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className='flex gap-4 pt-4'>
              <button className='flex-1 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'>
                Thêm vào giỏ hàng
              </button>
              <button className='px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium transition-colors hover:bg-gray-50'>
                Yêu thích
              </button>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className='mt-12 text-center'>
          <Link
            href='/products'
            className='inline-block rounded-lg bg-gray-600 px-6 py-3 text-white transition-colors hover:bg-gray-700'
          >
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    </main>
  );
}
