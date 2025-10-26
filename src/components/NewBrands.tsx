'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useFlashTooltip } from '@/context/FlashTooltipContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Product } from '@/services/api';

interface BrandProduct {
  id: number;
  name: string;
  image: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  slug?: string;
  originalIndex?: number;
}

interface BrandProductCardProps {
  product: BrandProduct;
}

interface NewBrandsProps {
  hotSpecialOffer?: Product[];
}

// Helper function to convert API products to component format
const convertApiProductToBrandProduct = (apiProduct: Product, index: number): BrandProduct => {
  const imageUrl = apiProduct.primary_image_url || '/images/placeholder-product.png';
  
  const price = parseInt(apiProduct.price);
  const originalPrice = apiProduct.original_price ? parseInt(apiProduct.original_price) : price;
  const discountPercent = apiProduct.discount_percent ? parseFloat(apiProduct.discount_percent) : 0;
  
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    image: imageUrl,
    originalPrice: `${originalPrice.toLocaleString()}đ`,
    discountedPrice: `${price.toLocaleString()}đ`,
    discount: discountPercent > 0 ? `-${Math.round(discountPercent)}%` : '',
    slug: apiProduct.slug,
    originalIndex: index,
  };
};

function BrandProductCard({ product }: BrandProductCardProps) {
  const t = useTranslations('new_brands');
  const { showTooltip } = useFlashTooltip();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.discountedPrice.replace(/[₫,]/g, '')) || 0,
      image: product.image,
      quantity: 1,
    };
    
    addToCart(productToAdd, 1);
    showTooltip('Đã thêm vào giỏ hàng thành công!', 'success');
  };

  return (
    <div 
      className='relative mx-2 h-[460px] w-full flex-shrink-0 rounded-lg border border-gray-200 bg-white shadow-md sm:w-[280px] md:w-[250px] hover:shadow-lg cursor-pointer transition-shadow duration-300'
      onClick={() => {
        const productUrl = product.slug ? `/products/${product.slug}` : `/products/${product.id}`;
        window.open(productUrl, '_blank');
      }}
    >
      {/* Badge labels - đặt trong card */}
      <div className='absolute top-3 left-3 z-10 flex flex-col items-start gap-2'>
        <div className='rounded-full bg-gradient-to-r from-red-500 to-red-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg'>
          {t('quality_deal')}
        </div>
        <div className='rounded-full bg-white px-4 py-1.5 text-xs font-bold text-red-600 shadow-md border border-red-100'>
          {t('ship_now')}
        </div>
      </div>

      {/* Ảnh sản phẩm - chiều cao tăng lên nhiều hơn */}
      <div className='h-70 w-full overflow-hidden rounded-t-lg'>
        <Image
          src={product.image}
          alt={product.name}
          width={280}
          height={224}
          className='h-full w-full object-cover'
        />
      </div>

      {/* Nội dung sản phẩm - chiều cao điều chỉnh */}
      <div className='flex h-[170px] flex-col justify-between p-3'>
        <div>
          <h3 className='h-12 line-clamp-2 text-sm font-semibold text-gray-900 sm:text-base'>
            {product.name}
          </h3>
          {/* <div className='mt-2 flex items-center gap-2'>
            <span className='text-sm text-gray-500 line-through'>
              {product.originalPrice}
            </span>CÙNG MEXE ĐẶT HÀNG VỀ TAY SỚM NHẤT
          </div> */}
          <div className='mt-2 flex items-center gap-2'>
            <span className='text-lg font-bold text-red-600'>
              {product.originalPrice}
            </span>
            <span className='rounded bg-red-600 px-2 py-0.5 text-xs font-semibold text-white'>
              {product.discount}
            </span>
          </div>
        </div>
        
        {/* Nút hành động - giảm khoảng cách với thông tin phía trên */}
        <div className='mt-3 flex gap-2'>
          <a
            href={product.slug ? `/products/${product.slug}` : `/products/${product.id}`}
            className='flex-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-800 transition hover:bg-gray-200 cursor-pointer'
            onClick={(e) => e.stopPropagation()}
          >
            {t('view_details')}
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className='flex-1 rounded-full bg-[#0A115F] px-3 py-1.5 text-xs font-semibold text-white transition hover:cursor-pointer hover:bg-[#0e1a8a]'
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewBrands({ hotSpecialOffer = [] }: NewBrandsProps) {
  const t = useTranslations('new_brands');
  const [slider, setSlider] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const visible = 4; // Số sản phẩm hiển thị cùng lúc

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const updateTimer = () => {
      const end = new Date('2025-07-30T23:59:59+07:00');
      const now = new Date();
      const diff = Math.max(0, end.getTime() - now.getTime());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    
    updateTimer(); // Initial call
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [mounted]);

  // Logic băng chuyền vô tận - giống EarlyOrder
  const prev = () => {
    if (slider > 0) {
      setSlider(slider - 1);
    }
  };

  const next = () => {
    // Luôn tăng lên, tạo hiệu ứng băng chuyền liên tục
    setSlider(slider + 1);
  };

  // Get brand products from API data
  const getBrandProducts = (): BrandProduct[] => {
    if (!hotSpecialOffer.length) {
      return []; // Return empty array if no products
    }

    return hotSpecialOffer.map((product, index) => 
      convertApiProductToBrandProduct(product, index)
    );
  };

  // Tạo mảng products lặp lại để tạo băng chuyền vô tận - giống EarlyOrder
  const getVisibleProducts = () => {
    const brandProducts = getBrandProducts();

    if (!brandProducts.length) {
      return [];
    }

    // If only 1 product, don't duplicate - just show it once
    if (brandProducts.length <= 1) {
      return brandProducts.map((product, index) => ({
        ...product,
        key: `product-single-${index}`,
        originalIndex: index,
      }));
    }

    // If 2-3 products, only duplicate minimally
    if (brandProducts.length <= 3) {
      let conveyorProducts = [];

      // Add original products
      conveyorProducts.push(...brandProducts);

      // Add 2 copies for smooth scrolling
      for (let i = 0; i < 2; i++) {
        conveyorProducts.push(...brandProducts);
      }

      // Add 2 copies at beginning for prev
      for (let i = 0; i < 2; i++) {
        conveyorProducts.unshift(...brandProducts);
      }

      return conveyorProducts.map((product, index) => ({
        ...product,
        key: `product-few-${index}`,
        originalIndex: index % brandProducts.length,
      }));
    }

    // Original logic for many products
    let conveyorProducts = [];

    // Thêm products gốc
    conveyorProducts.push(...brandProducts);

    // Thêm products lặp lại 5 lần để đảm bảo đủ items
    for (let i = 0; i < 5; i++) {
      conveyorProducts.push(...brandProducts);
    }

    // Thêm products lặp lại 5 lần ở đầu cho Prev
    for (let i = 0; i < 5; i++) {
      conveyorProducts.unshift(...brandProducts);
    }

    return conveyorProducts.map((product, index) => ({
      ...product,
      key: `product-many-${index}`,
      originalIndex: index % brandProducts.length,
    }));
  };

  const goToSlide = (index: number) => {
    setSlider(index);
  };

  return (
    <div>
      {/* Desktop version */}
      <div className='hidden lg:block'>
        <section className='w-full bg-transparent py-6 sm:py-8'>
          <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='absolute inset-x-0 top-0 z-0 h-[300px] rounded-2xl bg-orange-500 sm:h-[320px]'></div>
            <div className='relative z-10'>
              <div className='mb-4 flex flex-col items-start justify-between px-4 pt-4 sm:mb-6 sm:flex-row sm:items-center'>
                <div className='flex items-center gap-3'>
                  <span className='text-2xl sm:text-3xl'>⚡</span>
                  <h2 className='text-2xl font-extrabold text-white sm:text-3xl'>
                    {t('title')}
                  </h2>
                </div>
                <Link
                  href='/brands'
                  className='mt-2 flex items-center gap-2 rounded-full border border-white px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-white hover:text-orange-500 sm:mt-0'
                >
                  {t('view_more')} <ChevronRightIcon className='h-4 w-4' />
                </Link>
              </div>
              <div className='mb-4 flex w-fit items-center gap-4 rounded-full bg-white px-4 py-2 sm:mb-6 sm:gap-6 sm:py-3'>
                <span className='text-sm font-semibold text-orange-500 sm:text-base'>
                  {t('deal_ends')}
                </span>
                <div className='flex items-center gap-2'>
                  {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                    <div key={unit} className='flex flex-col items-center'>
                      <span className='text-xl font-bold text-orange-500 sm:text-2xl'>
                        {String(timeLeft[unit as keyof typeof timeLeft]).padStart(
                          2,
                          '0'
                        )}
                      </span>
                      <span className='text-xs text-gray-500'>{t(unit)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Slider với hiệu ứng mượt mà */}
              <div className='relative flex items-center'>
                {/* Prev button */}
                <button
                  onClick={prev}
                  disabled={slider === 0 || getBrandProducts().length <= 1}
                  className='mr-2 rounded-full bg-white p-2 shadow transition-all duration-300 disabled:opacity-40 cursor-pointer'
                  style={{
                    cursor: slider === 0 || getBrandProducts().length <= 1 ? 'not-allowed !important' : 'pointer !important'
                  }}
                  aria-label={t('prev_slide')}
                >
                  <ChevronLeftIcon className='h-6 w-6 text-orange-500' />
                </button>

                {/* Slider */}
                <div className='w-full overflow-hidden'>
                  <div
                    className='flex gap-4 transition-transform duration-500 ease-in-out'
                    style={{
                      transform: `translateX(-${slider * (280 + 16)}px)`,
                    }}
                  >
                    {getVisibleProducts().map((product) => (
                      <div
                        key={product.key}
                        className='w-full flex-shrink-0 sm:w-[280px] md:w-[250px]'
                      >
                        <BrandProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next button - Disable when only 1 product */}
                <button
                  onClick={next}
                  disabled={getBrandProducts().length <= 1}
                  className='ml-2 rounded-full bg-white p-2 shadow transition-all duration-300 disabled:opacity-40 cursor-pointer'
                  style={{
                    cursor: getBrandProducts().length <= 1 ? 'not-allowed !important' : 'pointer !important'
                  }}
                  aria-label={t('next_slide')}
              >
                <ChevronRightIcon className='h-6 w-6 text-orange-500' />
              </button>
              </div>
              
              {/* Pagination dots - ẩn đi vì đã có logic băng chuyền vô tận */}
            </div>
          </div>
        </section>
      </div>
      
      {/* Mobile version với slide trượt (vuốt sang phải) */}
      <div className='block lg:hidden'>
        <section className='w-full bg-transparent py-6'>
          <div className='relative mx-auto w-full px-4'>
            {/* Background cam giống desktop - kéo dài xuống dưới để bao quanh items */}
            <div className='absolute inset-x-0 top-0 z-0 h-[280px] bg-orange-500'></div>
            
            <div className='relative z-10'>
              {/* Header với title và button */}
              <div className='mb-4 flex flex-col items-start justify-between px-4 pt-4'>
                <div className='flex items-center gap-3'>
                  <span className='text-xl'>⚡</span>
                  <h2 className='text-lg font-extrabold text-white'>
                    {t('title')}
                  </h2>
                </div>
                <Link
                  href='/brands'
                  className='mt-2 flex items-center gap-2 rounded-full border border-white px-3 py-1 text-sm font-semibold text-white transition hover:bg-white hover:text-orange-500'
                >
                  {t('view_more')} <ChevronRightIcon className='h-3 w-3' />
                </Link>
              </div>
              
              {/* Countdown timer */}
              <div className='mb-4 flex w-fit items-center gap-3 rounded-full bg-white px-3 py-2 mx-4'>
                <span className='text-xs font-semibold text-orange-500'>
                  {t('deal_ends')}
                </span>
                <div className='flex items-center gap-1.5'>
                  {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                    <div key={unit} className='flex flex-col items-center'>
                      <span className='text-lg font-bold text-orange-500'>
                        {String(timeLeft[unit as keyof typeof timeLeft]).padStart(2, '0')}
                      </span>
                      <span className='text-xs text-gray-500'>{t(unit)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mobile slider với slide trượt (vuốt sang phải) */}
              <div className='relative'>
                {/* Slider container */}
                <div 
                  className='flex gap-3 overflow-x-auto pb-4'
                  style={{
                    scrollbarWidth: 'none', /* Firefox */
                    msOverflowStyle: 'none', /* Internet Explorer 10+ */
                  }}
                >
                  {/* Ẩn scrollbar cho Webkit browsers (Chrome, Safari, Edge) */}
                  <style jsx>{`
                    div::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  
                  {getBrandProducts().map((product, index) => (
                    <div 
                      key={`mobile-brand-${index}`} 
                      className='flex min-w-[220px] flex-col items-center rounded-lg bg-white p-3 shadow hover:shadow-lg cursor-pointer transition-shadow duration-300 border border-gray-200'
                      onClick={() => {
                        const productUrl = product.slug ? `/products/${product.slug}` : `/products/${product.id}`;
                        window.open(productUrl, '_blank');
                      }}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={220}
                        height={176}
                        className='mb-1 h-36 sm:h-40 w-full rounded object-cover'
                      />
                      <div className='mb-1 text-center text-xs font-semibold text-red-600'>
                        {t('quality_deal')}
                      </div>
                      <div className='mb-1 text-center text-xs font-semibold text-red-600'>
                        {t('ship_now')}
                      </div>
                      <div className='mb-1 text-center text-xs font-semibold text-gray-900 line-clamp-2'>
                        {product.name}
                      </div>
                      <div className='mb-1 flex items-center gap-1'>
                        <span className='text-xs text-gray-500 line-through'>
                          {product.originalPrice}
                        </span>
                        <span className='text-xs font-bold text-red-600'>
                          {product.discountedPrice}
                        </span>
                        <span className='rounded bg-red-600 px-1 py-0.5 text-[10px] font-bold text-white'>
                          {product.discount}
                        </span>
                      </div>
                      <div className='flex gap-2 w-full mt-1'>
                        <a 
                          href={product.slug ? `/products/${product.slug}` : `/products/${product.id}`}
                          className='flex-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800 text-center transition hover:bg-gray-200'
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t('view_details')}
                        </a>
                        <a
                          href={product.slug ? `/products/${product.slug}` : `/products/${product.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Chỉ hiển thị thông báo đơn giản, không thêm vào giỏ hàng
                            alert('Đặt hàng thành công!');
                          }}
                          className='flex-1 rounded-full bg-[#0A115F] px-2 py-1 text-xs font-bold text-white text-center transition hover:bg-[#0e1a8a]'
                        >
                          {t('buy_now')}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
