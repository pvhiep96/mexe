'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useFlashTooltip } from '@/context/FlashTooltipContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  slug?: string;
  images: Array<{ image_url: string } | string>;
  open_date: string;
  soldCount: number;
  description: string;
  open_time: Date;
  price?: number;
}

interface ProductSlideProps {
  product: Product;
}

// const products: Product[] = [
//   {
//     id: 1,
//     name: 'Bàn Phím Cơ NuPhy Kick75 | Bàn Phím Cơ Không Dây',
//     images: [
//       '/images/demo-new-products/new-pro-1.png',
//       '/images/demo-new-products/new-pro-2.png',
//       '/images/demo-new-products/new-pro-3.png',
//     ],
//     open_date: '15/07/2025',
//     open_time: new Date('2025-07-15T00:00:00'),
//     soldCount: 100000,
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
//   },
//   {
//     id: 2,
//     name: '(WAREHOUSE DEAL) Bàn Làm Việc Thông Minh Gỗ Sồi',
//     images: [
//       '/images/demo-new-products/new-pro-1.png',
//       '/images/demo-new-products/new-pro-2.png',
//       '/images/demo-new-products/new-pro-3.png',
//     ],
//     open_date: '01/07/2025',
//     open_time: new Date('2025-07-01T00:00:00'),
//     soldCount: 85000,
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
//   },
//   {
//     id: 3,
//     name: 'Máy Ảnh Polaroid Mini D1 Pro - Tự Do In Ảnh',
//     images: [
//       '/images/demo-new-products/new-pro-1.png',
//       '/images/demo-new-products/new-pro-2.png',
//       '/images/demo-new-products/new-pro-3.png',
//     ],
//     open_date: '03/07/2025',
//     open_time: new Date('2025-07-03T00:00:00'),
//     soldCount: 120000,
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
//   },
//   {
//     id: 4,
//     name: 'Đèn Bàn LED Chống Cận Thông Minh',
//     images: [
//       '/images/demo-new-products/new-pro-1.png',
//       '/images/demo-new-products/new-pro-2.png',
//       '/images/demo-new-products/new-pro-3.png',
//     ],
//     open_date: '10/07/2025',
//     open_time: new Date('2025-07-10T00:00:00'),
//     soldCount: 95000,
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
//   },
// ];

function ProductSlide({ product }: ProductSlideProps) {
  const t = useTranslations('new_products');
  const { showTooltip } = useFlashTooltip();
  const { addToCart } = useCart();
  const [width, setWidth] = useState(375);
  const maxCharacter = width < 768 ? 60 : 50;

  const handleAddToCart = () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price || 0,
      image: typeof product.images?.[0] === 'string' 
        ? product.images[0] 
        : product.images?.[0]?.image_url || '/images/placeholder-product.png',
      quantity: 1,
    };
    
    addToCart(productToAdd, 1);
    showTooltip('Đã thêm vào giỏ hàng thành công!', 'success');
  };


  useEffect(() => {
    function handleResize() {
      if (typeof window === 'undefined') return;
      setWidth(window.innerWidth);
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const handleProductClick = () => {
    const productUrl = product.slug ? `/products/${product.slug}` : `/products/${product.id}`;
    window.open(productUrl, '_blank');
  };


  return (
    <div
      className='flex min-h-[300px] w-full max-w-[400px] cursor-pointer flex-col items-center rounded-2xl bg-white p-4 shadow-lg border border-gray-100 transition-all duration-500 ease-in-out hover:shadow-xl hover:border-gray-200 sm:min-h-[200px] sm:max-w-[500px] sm:flex-row'
      onClick={handleProductClick}
    >
      {/* Images */}
      <div
        className='mr-[5px] grid grid-cols-2 grid-rows-2 gap-0 overflow-hidden'
        style={{ width: '210px', height: '200px' }}
      >
        <Image
          src={
            typeof product.images?.[0] === 'string'
              ? product.images[0]
              : product.images?.[0]?.image_url || '/images/placeholder-product.png'
          }
          alt={product.name}
          width={105}
          height={100}
          className='col-span-1 row-span-1 rounded-xl object-cover'
          style={{
            objectPosition: 'center',
            gridRow: '1 / span 1',
            gridColumn: '1 / span 1',
            width: '100%',
            height: '100%',
          }}
        />
        <Image
          src={
            typeof product.images?.[2] === 'string'
              ? product.images[2]
              : product.images?.[2]?.image_url || 
                (typeof product.images?.[0] === 'string'
                  ? product.images[0]
                  : product.images?.[0]?.image_url) || '/images/placeholder-product.png'
          }
          alt={product.name}
          width={105}
          height={100}
          className='col-span-1 row-span-1 rounded-xl object-cover'
          style={{
            objectPosition: 'center',
            gridRow: '2 / span 1',
            gridColumn: '1 / span 1',
            width: '100%',
            height: '100%',
          }}
        />
        <Image
          src={
            typeof product.images?.[1] === 'string'
              ? product.images[1]
              : product.images?.[1]?.image_url || 
                (typeof product.images?.[0] === 'string'
                  ? product.images[0]
                  : product.images?.[0]?.image_url) || '/images/placeholder-product.png'
          }
          alt={product.name}
          width={105}
          height={200}
          className='col-span-1 row-span-2 rounded-xl object-cover'
          style={{
            objectPosition: 'center',
            gridRow: '1 / span 2',
            gridColumn: '2 / span 1',
            width: '100%',
            height: '100%',
          }}
        />
      </div>

      {/* Info */}
      <div className='flex h-full flex-1 flex-col justify-between pl-0 sm:pl-4'>
        <div className='flex-1'>
          <h3 className='text-sm font-semibold sm:text-base line-clamp-2 leading-tight'>
            {product.name}
          </h3>
          <p className='text-xs text-gray-500'>
            {/* {t('sold', { count: product.soldCount.toLocaleString('vi-VN') })} */}
          </p>
          <h4 className='mt-1 text-xs font-medium sm:text-sm'>
            {t('product_info')}
          </h4>
          <p className='line-clamp-2 text-xs text-gray-600 leading-relaxed mt-1'>
            {product.description}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className='mt-2 w-[120px] rounded-full bg-[#0A115F] px-4 py-1.5 text-[10px] font-semibold text-white transition-colors hover:cursor-pointer hover:bg-[#0e1a8a] sm:text-xs'
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
}

interface NewProductsProps {
  products: Product[];
}
export default function NewProducts({ products }: NewProductsProps) {
  const t = useTranslations('new_products');
  const { addToCart } = useCart();
  const { showTooltip } = useFlashTooltip();
  const [slider, setSlider] = useState(0);
  const [mounted, setMounted] = useState(false);
  const visible = 3; // Số sản phẩm hiển thị cùng lúc

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tạo slider băng chuyền vô tận đơn giản và hiệu quả - PREV DISABLED KHI Ở ĐẦU, NEXT LUÔN HOẠT ĐỘNG
  const prev = () => {
    setSlider((prevSlider) => {
      // Chỉ cho phép prev khi slider > 0 để tránh hiệu ứng không mong muốn
      if (prevSlider <= 0) {
        return prevSlider;
      }
      return prevSlider - 1;
    });
  };

  const next = () => {
    setSlider((prevSlider) => {
      // Luôn tăng lên, tạo hiệu ứng băng chuyền liên tục
      // Khi slider dương, chúng ta sẽ thấy items từ đầu
      // Khi slider = 0, bấm next sẽ hiển thị items từ đầu
      return prevSlider + 1;
    });
  };

  // Ngăn chặn HOÀN TOÀN việc trượt ngược
  useEffect(() => {
    if (mounted) {
      // Nếu slider đang ở vị trí có thể gây trượt ngược, tăng thêm products
      if (Math.abs(slider) > products.length * 2) {
        // Slider đang ở vị trí cao, tăng thêm products để tránh trượt ngược
      }

      // KIỂM TRA NGUY CƠ TRƯỢT NGƯỢC
      if (Math.abs(slider) > products.length * 10) {
        // NGUY CƠ TRƯỢT NGƯỢC CAO! Cần tăng thêm products hoặc xử lý đặc biệt
      }
    }
  }, [slider, products.length, mounted]);

  // Logic băng chuyền vô tận đơn giản và hiệu quả - PREV DISABLED KHI Ở ĐẦU, NEXT LUÔN HOẠT ĐỘNG
  const getVisibleProducts = () => {
    // If only 1 product, don't duplicate - just show it once
    if (products.length <= 1) {
      return products.map((product, index) => ({
        ...product,
        key: `product-single-${index}`,
        originalIndex: index,
      }));
    }

    // If 2-3 products, only duplicate minimally
    if (products.length <= 3) {
      const conveyorProducts = [];

      // Add original products
      conveyorProducts.push(...products);

      // Add 2 copies for smooth scrolling
      for (let i = 0; i < 2; i++) {
        conveyorProducts.push(...products);
      }

      // Add 2 copies at beginning for prev
      for (let i = 0; i < 2; i++) {
        conveyorProducts.unshift(...products);
      }

      return conveyorProducts.map((product, index) => ({
        ...product,
        key: `product-few-${index}`,
        originalIndex: index % products.length,
      }));
    }

    // Original logic for many products
    const conveyorProducts = [];

    // Thêm products gốc
    conveyorProducts.push(...products);

    // Thêm products lặp lại 10 lần để đảm bảo đủ items cho cả hai chiều
    for (let i = 0; i < 10; i++) {
      conveyorProducts.push(...products);
    }

    // Thêm products lặp lại 10 lần ở đầu cho Prev
    for (let i = 0; i < 10; i++) {
      conveyorProducts.unshift(...products);
    }

    return conveyorProducts.map((product, index) => ({
      ...product,
      key: `product-many-${index}`,
      originalIndex: index % products.length,
    }));
  };

  // KHÔNG BAO GIỜ RESET - Để tránh trượt ngược hoàn toàn
  // useEffect(() => {
  //   if (mounted) {
  //     // KHÔNG RESET NỮA - Để tránh trượt ngược
  //     // if (Math.abs(slider) > products.length * 6) {
  //     //   setTimeout(() => {
  //     //     const resetPosition = slider > 0 ? products.length : -products.length;
  //     //     setSlider(resetPosition);
  //     //   }, 100);
  //     // }
  //   }
  // }, [slider, products.length, mounted]);

  // Debug log để kiểm tra hoạt động băng chuyền đơn giản cho 4 sản phẩm
  useEffect(() => {
    if (mounted) {
      const visibleProducts = getVisibleProducts();
      // Băng chuyền logic: Lặp lại đơn giản để tạo vòng lặp vô tận
    }
  }, [slider, mounted]);

  // Thêm hiệu ứng hover cho buttons
  const [isHovered, setIsHovered] = useState(false);

  // Slider vòng lặp vô tận hoàn hảo cho cả hai chiều

  return (
    <div>
      {/* Desktop version */}
      <div className='hidden lg:block'>
        <section className='w-full bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-8'>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='mb-4 flex flex-col items-center'>
              <h2 className='text-2xl font-extrabold text-[#0A115F] sm:text-3xl'>
                {t('title')}
              </h2>
              <Link
                href='/products'
                className='mt-2 rounded-full bg-gray-400 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-gray-500'
              >
                {t('explore_more')}
              </Link>
            </div>

            <div className='relative flex items-center justify-center px-4'>
              {/* Prev button - Disable when only 1 product or at beginning */}
              <button
                onClick={prev}
                disabled={slider <= 0 || products.length <= 1}
                className={`mr-4 cursor-pointer rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-300 ${
                  slider <= 0 || products.length <= 1 ? 'bg-gray-100' : 'bg-white hover:bg-gray-50 hover:shadow-xl'
                }`}
                style={{
                  cursor:
                    slider <= 0 || products.length <= 1
                      ? 'not-allowed !important'
                      : 'pointer !important',
                }}
                aria-label={t('prev_slide')}
              >
                <ChevronLeftIcon
                  className={`h-6 w-6 ${
                    slider <= 0 || products.length <= 1 ? 'text-gray-400' : 'text-gray-700'
                  }`}
                />
              </button>

              {/* Slider Container - Tạo băng chuyền vô tận thực sự với logic đơn giản cho 4 sản phẩm */}
              <div className='flex-1 overflow-hidden'>
                <div
                  className='flex gap-6 transition-transform duration-500 ease-in-out'
                  style={{
                    transform: `translateX(-${slider * 440}px)`,
                    width: `${getVisibleProducts().length * 440}px`,
                  }}
                >
                  {/* Tạo mảng vô tận với products lặp lại cho cả hai chiều */}
                  {getVisibleProducts().map((product) => (
                    <div key={product.key} className='w-[420px] flex-shrink-0'>
                      <ProductSlide product={product} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Next button - Disable when only 1 product */}
              <button
                onClick={next}
                disabled={products.length <= 1}
                className={`ml-4 cursor-pointer rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-300 ${
                  products.length <= 1 ? 'bg-gray-100' : 'bg-white hover:bg-gray-50 hover:shadow-xl'
                }`}
                style={{
                  cursor: products.length <= 1 ? 'not-allowed !important' : 'pointer !important',
                }}
                aria-label={t('next_slide')}
              >
                <ChevronRightIcon className={`h-6 w-6 ${products.length <= 1 ? 'text-gray-400' : 'text-gray-700'}`} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile version */}
      <div className='block lg:hidden'>
        <section className='w-full bg-gray-50 py-4'>
          <div className='container mx-auto px-4'>
            <div className='mb-4 flex flex-col items-center'>
              <h2 className='text-lg font-extrabold text-[#0A115F]'>
                {t('title')}
              </h2>
              <Link
                href='/products'
                className='mt-2 rounded-full bg-gray-400 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-gray-500'
              >
                {t('explore_more')}
              </Link>
            </div>

            {/* Mobile slider với khả năng vuốt sang bên */}
            <div
              className='flex gap-3 overflow-x-auto pb-2'
              style={{
                scrollbarWidth: 'none' /* Firefox */,
                msOverflowStyle: 'none' /* Internet Explorer 10+ */,
              }}
            >
              {/* Ẩn scrollbar cho Webkit browsers (Chrome, Safari, Edge) */}
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              {products.map((product, index) => (
                <div
                  key={`mobile-product-${index}`}
                  className='flex min-w-[200px] flex-col items-center rounded-lg bg-white p-3 shadow cursor-pointer'
                  onClick={() => {
                    const productUrl = product.slug ? `/products/${product.slug}` : `/products/${product.id}`;
                    window.open(productUrl, '_blank');
                  }}
                >
                  <Image
                    src={
                      typeof product.images?.[0] === 'string'
                        ? product.images[0]
                        : product.images?.[0]?.image_url || '/images/placeholder-product.png'
                    }
                    alt={product.name}
                    width={200}
                    height={160}
                    className='mb-2 h-32 w-full rounded object-cover'
                  />
                  <div className='mb-2 text-center text-xs font-bold line-clamp-2 leading-tight'>
                    {product.name}
                  </div>
                  <div className='mb-2 text-center text-xs text-gray-500'>
                    {/* {t('sold', {
                      count: product.soldCount.toLocaleString('vi-VN'),
                    })} */}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const productToAdd = {
                        id: product.id,
                        name: product.name,
                        price: product.price || 0,
                        image: typeof product.images?.[0] === 'string' 
                          ? product.images[0] 
                          : product.images?.[0]?.image_url || '/images/placeholder-product.png',
                        quantity: 1,
                      };
                      
                      addToCart(productToAdd, 1);
                      showTooltip('Đã thêm vào giỏ hàng thành công!', 'success');
                    }}
                    className='rounded-full bg-[#0A115F] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#0e1a8a]'
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
