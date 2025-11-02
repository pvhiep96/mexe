'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
// import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortAlphaDown,
  faSortAlphaUp,
  faClock,
  faStar,
  faSortNumericUp,
  faSortNumericDown,
} from '@fortawesome/free-solid-svg-icons';
import { apiClient } from '@/services/api';
import type { Product } from '@/services/api';
import Link from 'next/link';

const sortOptions = [
  {
    label: 'A-Z',
    desc: 'Sắp xếp tên từ A đến Z',
    icon: <FontAwesomeIcon icon={faSortAlphaDown} className='h-6 w-6' />,
    sortValue: 'name_asc',
    isHot: false,
  },
  {
    label: 'Z-A',
    desc: 'Sắp xếp tên từ Z đến A',
    icon: <FontAwesomeIcon icon={faSortAlphaUp} className='h-6 w-6' />,
    sortValue: 'name_desc',
    isHot: false,
  },
  {
    label: 'Mới nhất',
    desc: 'Sắp xếp theo sản phẩm mới nhất',
    icon: <FontAwesomeIcon icon={faClock} className='h-6 w-6' />,
    sortValue: 'newest',
    isHot: false,
  },
  {
    label: 'Bán chạy',
    desc: 'Sắp xếp theo sản phẩm bán chạy',
    icon: <FontAwesomeIcon icon={faStar} className='h-6 w-6' />,
    sortValue: 'newest', // Keep default sort when filtering by is_hot
    isHot: true,
  },
  {
    label: 'Giá tăng',
    desc: 'Sắp xếp theo giá tăng dần',
    icon: <FontAwesomeIcon icon={faSortNumericUp} className='h-6 w-6' />,
    sortValue: 'price_asc',
    isHot: false,
  },
  {
    label: 'Giá giảm',
    desc: 'Sắp xếp theo giá giảm dần',
    icon: <FontAwesomeIcon icon={faSortNumericDown} className='h-6 w-6' />,
    sortValue: 'price_desc',
    isHot: false,
  },
];


const coupons = [
  {
    title: 'FLASH\nGIỜ\nVÀNG',
    desc: 'Từ 12H - 13H ngày 29.06',
    code: 'FLASHSALE',
    button: 'LƯU MÃ',
  },
  {
    title: 'TĂNG\nVOUCHER\n100K',
    desc: 'Giảm 100K cho đơn hàng có giá trị từ 999K',
    code: 'DEAL100K',
    button: 'LƯU MÃ',
  },
  {
    title: 'SALE\nUP TO\n45%',
    desc: 'Ưu đãi lên đến 45% các sản phẩm so với giá niêm yết',
    code: 'SALE45',
    button: 'LƯU MÃ',
  },
];

const hashtags: { label: string; url: string }[] = [
  { label: '#VàiThứHay', url: '/products?category=vai-thu-hay' },
  { label: '#NORESTOCK', url: '/products?category=no-restock' },
  { label: '#ShopeeMall', url: '/products?category=shopee-mall' },
  { label: '#LazMall', url: '/products?category=laz-mall' },
  { label: '#Tiki', url: '/products?category=tiki' },
  { label: '#Groupbuy', url: '/products?category=groupbuy' },
  { label: '#SetupDecor', url: '/products?category=setup-decor' },
  { label: '#SảnPhẩmHOT', url: '/products?category=san-pham-hot' },
  { label: '#ĐènRGB', url: '/products?category=den-rgb' },
  { label: '#LoaLạLạ', url: '/products?category=loa-la-la' },
];

type ProductListPageType = {
  allProducts: Product[];
  filterInfo?: {
    category?: string;
    brand?: string;
    isPreorder?: boolean;
  };
};

interface ProductVideoData {
  id: number;
  url: string;
  title: string;
  description?: string;
  youtube_video_id: string;
  thumbnail_url: string;
  embed_url: string;
  product: {
    id: number;
    name: string;
    slug: string;
    price: string;
    brand_name?: string;
  };
}

export default function ProductListPage({ allProducts, filterInfo }: ProductListPageType) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<number>(2); // Default to "Mới nhất" (index 2)
  const [latestVideos, setLatestVideos] = useState<ProductVideoData[]>([]);

  // Read sort from URL on mount and when URL changes
  useEffect(() => {
    const sortParam = searchParams.get('sort');
    const isHotParam = searchParams.get('isHot');
    
    // Find matching sort option index
    const matchingIndex = sortOptions.findIndex(opt => {
      if (isHotParam === 'true') {
        return opt.isHot === true;
      }
      return opt.sortValue === sortParam;
    });
    
    if (matchingIndex !== -1) {
      setSelectedSort(matchingIndex);
    } else if (!sortParam && !isHotParam) {
      // Default to "Mới nhất" if no params
      setSelectedSort(2);
    }
  }, [searchParams]);

  // Handle sort button click - update URL to trigger server-side refetch
  const handleSortClick = (idx: number) => {
    const selectedOption = sortOptions[idx];
    if (!selectedOption) return;

    // Build new URL with updated params
    const currentParams = new URLSearchParams(searchParams.toString());
    
    // Reset page to 1 when sort changes
    currentParams.set('page', '1');
    
    // Update sort params
    if (selectedOption.isHot) {
      currentParams.set('isHot', 'true');
      currentParams.set('sort', selectedOption.sortValue);
    } else {
      currentParams.set('sort', selectedOption.sortValue);
      currentParams.delete('isHot'); // Remove isHot if not needed
    }

    // Navigate to new URL - use pathname to preserve locale if present
    const basePath = pathname?.split('?')[0] || '/products';
    const newUrl = `${basePath}?${currentParams.toString()}`;
    router.push(newUrl);
    
    setSelectedSort(idx);
  };

  // Filter products based on filterInfo
  const getFilteredProducts = () => {
    let filtered = allProducts;

    // Filter preorder products if needed (backend doesn't support this filter yet)
    if (filterInfo?.isPreorder) {
      filtered = filtered.filter(product => product.is_preorder);
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Get page title based on filter
  const getPageTitle = () => {
    if (filterInfo?.category) {
      return filterInfo.category;
    }
    if (filterInfo?.brand) {
      return `Sản phẩm ${filterInfo.brand}`;
    }
    if (filterInfo?.isPreorder) {
      return 'Sản phẩm đặt trước';
    }
    return 'Tất cả sản phẩm';
  };

  const pageTitle = getPageTitle();


  // Map API Product type to ProductGrid's expected Product type
  const products = filteredProducts.map(product => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    images: product.images?.map(img => img.image_url) || [product.primary_image_url || ''],
    description: product.short_description || product.description || '',
    price: parseFloat(product.price),
    originalPrice: product.original_price ? parseFloat(product.original_price) : undefined,
    discount: product.discount_percent ? parseFloat(product.discount_percent) : undefined,
    isNew: product.is_new,
    isHot: product.is_hot,
    isPreorder: product.is_preorder,
    full_payment_transfer: product.full_payment_transfer,
    full_payment_discount_percentage: product.full_payment_discount_percentage,
    partial_advance_payment: product.partial_advance_payment,
    advance_payment_percentage: product.advance_payment_percentage,
    advance_payment_discount_percentage: product.advance_payment_discount_percentage,
  }));

  // Fetch latest videos on component mount
  useEffect(() => {
    const fetchLatestVideos = async () => {
      try {
        const response = await apiClient.getLatestProductVideos();
        if (response.success && response.data) {
          setLatestVideos(response.data);
        }
      } catch (error) {
        console.error('Error fetching latest videos:', error);
      }
    };

    fetchLatestVideos();
  }, []);

  const handleHashtagClick = (url: string) => {
    router.push(url);
  };

  // Custom Arrow component để tránh lặp nút
  function ReviewArrow(props: any) {
    const { className, style, onClick, type } = props;
    return (
      <button
        className={
          `${className} z-10 flex !h-[50px] !w-[50px] items-center justify-center rounded-full border-none bg-[#ffe066] text-[32px] shadow-none transition outline-none` +
          (type === 'prev' ? ' !left-[-30px]' : ' !right-[-30px]')
        }
        style={{
          ...style,
          display: 'flex',
          width: '50px',
          height: '50px',
          minWidth: '50px',
          minHeight: '50px',
          maxWidth: '50px',
          maxHeight: '50px',
        }}
        onClick={onClick}
        aria-label={type === 'prev' ? 'Previous' : 'Next'}
      >
        {type === 'prev' ? (
          <svg
            width='50'
            height='50'
            viewBox='0 0 50 50'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            {/* <circle cx="25" cy="25" r="25" fill="#fff"/> */}
            <path
              d='M32 40L18 25L32 10'
              stroke='#bfa100'
              strokeWidth='4'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        ) : (
          <svg
            width='50'
            height='50'
            viewBox='0 0 50 50'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            {/* <circle cx="25" cy="25" r="25" fill="#fff"/> */}
            <path
              d='M18 10L32 25L18 40'
              stroke='#bfa100'
              strokeWidth='4'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )}
      </button>
    );
  }

  const reviewSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    prevArrow: <ReviewArrow type='prev' />,
    nextArrow: <ReviewArrow type='next' />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3, arrows: true } },
      { breakpoint: 1024, settings: { slidesToShow: 2, arrows: true } },
      { breakpoint: 768, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8'>
        {/* Breadcrumb */}
        <nav className='mb-8 flex' aria-label='Breadcrumb'>
          <ol className='inline-flex items-center space-x-1 md:space-x-3'>
            <li className='inline-flex items-center'>
              <Link
                href='/'
                className='cursor-pointer text-gray-700 hover:text-blue-600'
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <div className='flex items-center'>
                <span className='mx-2 text-gray-400'>/</span>
                <Link
                  href='/products'
                  className='cursor-pointer text-gray-700 hover:text-blue-600'
                >
                  Sản phẩm
                </Link>
              </div>
            </li>
            <li aria-current='page'>
              <div className='flex items-center'>
                <span className='mx-2 text-gray-400'>/</span>
                <span className='text-gray-500'>{pageTitle}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Title */}
        <div className='mb-8'>
          <h1 className='mb-2 text-3xl font-bold text-gray-900'>
            {pageTitle}
          </h1>
          <p className='text-gray-600'>
            {filteredProducts.length > 0 
              ? `Tìm thấy ${filteredProducts.length} sản phẩm`
              : 'Không tìm thấy sản phẩm nào'
            }
          </p>
        </div>

        <div className='mb-8'>
          {/* Coupon */}
          <div className='mb-8'>
          </div>
          {/* Danh mục icon */}
          {/* Sắp xếp */}
          <div className='flex flex-col items-center'>
            <span className='mb-3 text-lg font-semibold sm:mb-4 sm:text-2xl'>
              Sắp xếp theo:
            </span>
            <div className='flex gap-3 sm:gap-6'>
              {sortOptions.map((opt, idx) => (
                <button
                  key={opt.label}
                  className={`group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow transition-all duration-200 hover:scale-105 sm:h-14 sm:w-14 ${
                    selectedSort === idx
                      ? 'bg-[#2D6294] text-white shadow-lg'
                      : 'bg-white text-gray-600 shadow hover:bg-gray-50 hover:text-[#2D6294]'
                  }`}
                  onClick={() => handleSortClick(idx)}
                  onMouseEnter={() => setHoverIdx(idx)}
                  onMouseLeave={() => setHoverIdx(null)}
                >
                  <div className='h-5 w-5 transition-colors duration-200 sm:h-7 sm:w-7'>
                    {opt.icon}
                  </div>
                </button>
              ))}
            </div>
            <div className='relative mt-3 h-12 sm:mt-4 sm:h-14'>
              {sortOptions.map((opt, idx) => (
                <div
                  key={idx}
                  className={`absolute top-0 flex h-8 items-center justify-center rounded-full px-4 py-1.5 text-center text-sm font-medium whitespace-nowrap transition-all duration-300 sm:h-10 sm:px-6 sm:py-2 sm:text-base ${
                    hoverIdx === idx
                      ? 'z-10 translate-y-0 transform bg-[#2D6294] text-white opacity-100 shadow-lg'
                      : 'pointer-events-none translate-y-1 transform bg-transparent text-transparent opacity-0 shadow-none'
                  }`}
                  style={{
                    left: `${(idx * 100) / sortOptions.length}%`,
                    transform:
                      hoverIdx === idx
                        ? 'translateX(-50%)'
                        : 'translateX(-50%) translateY(1rem)',
                  }}
                >
                  {opt.desc}
                </div>
              ))}
            </div>
          </div>
          {/* Product Grid Component */}
          <ProductGrid
            products={products}
            itemsPerPage={16}
            showBanner={false}
            bannerIndex={8}
            bannerImage='https://file.hstatic.net/1000069970/file/banner_pre_c4eeb4b0068b421dafdc8ce2f9aa7d54_40d9e9e6a2894924b768c57612313211.png'
          />
          {/* Review slider */}
          {latestVideos.length > 0 && (
            <div className='mt-12 w-full py-10'>
              <div className='container mx-auto max-w-[1200px] px-4'>
                <h3 className='mb-6 text-center text-2xl font-extrabold tracking-wide sm:mb-8 sm:text-3xl'>
                  CÙNG XEM REVIEW SẢN PHẨM
                </h3>

                {/* Mobile: Flex layout */}
                <div className='block sm:hidden'>
                  <div className={`flex gap-[10px] overflow-x-auto px-4 pb-4 ${latestVideos.length === 1 ? 'justify-center' : ''}`}>
                    {latestVideos.map((video) => (
                      <div key={video.id} className='flex-shrink-0'>
                        <div className='flex h-[275px] w-[175px] flex-col overflow-hidden rounded-2xl border border-[#2D6294] bg-white shadow-lg'>
                          <div className='relative flex h-[160px] w-full items-center justify-center'>
                            <img
                              src={video.thumbnail_url}
                              alt={video.title}
                              className='h-full w-full rounded-t-2xl object-cover'
                            />
                            {/* Text overlay on thumbnail */}
                            <div className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-2'>
                              <div className='line-clamp-2 text-xs font-semibold text-white'>
                                {video.product.name}
                              </div>
                            </div>
                            {/* Price overlay */}
                            <div className='absolute right-2 bottom-2 rounded bg-white px-2 py-1 text-xs font-bold text-black'>
                              {parseFloat(video.product.price).toLocaleString('vi-VN')}đ
                            </div>
                            {/* Play button */}
                            <a
                              href={video.url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-1 shadow-lg'
                            >
                              <svg
                                className='h-8 w-8'
                                viewBox='0 0 56 56'
                                fill='none'
                              >
                                <circle cx='28' cy='28' r='28' fill='#FF0000' />
                                <path d='M36 28L24 36V20L36 28Z' fill='white' />
                              </svg>
                            </a>
                          </div>
                          <div className='flex flex-1 flex-col p-3'>
                            <div className='mb-1 line-clamp-2 text-sm font-bold text-black'>
                              {video.title}
                            </div>
                            {video.description && (
                              <div className='line-clamp-2 text-xs text-gray-600'>
                                {video.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop: Slider hoặc Grid */}
                <div className='hidden sm:block'>
                  <div className='relative mx-auto max-w-6xl'>
                    {latestVideos.length > 4 ? (
                      // Dùng slider khi có trên 4 videos
                      <Slider {...reviewSliderSettings}>
                        {latestVideos.map((video) => (
                          <div key={video.id} className='px-3'>
                            <div className='mx-auto flex h-[440px] w-full max-w-[320px] flex-col overflow-hidden rounded-3xl border-2 border-[#2D6294] bg-white shadow-lg'>
                              <div className='relative flex h-[240px] w-full items-center justify-center'>
                                <img
                                  src={video.thumbnail_url}
                                  alt={video.title}
                                  className='h-full w-full rounded-t-3xl object-cover'
                                />
                                {/* Text overlay on thumbnail */}
                                <div className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-2'>
                                  <div className='line-clamp-2 text-sm font-semibold text-white'>
                                    {video.product.name}
                                  </div>
                                </div>
                                {/* Price overlay */}
                                <div className='absolute right-2 bottom-2 rounded bg-white px-2 py-1 text-sm font-bold text-black'>
                                  {parseFloat(video.product.price).toLocaleString('vi-VN')}đ
                                </div>
                                {/* Play button */}
                                <a
                                  href={video.url}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow-lg'
                                >
                                  <svg
                                    className='h-14 w-14'
                                    viewBox='0 0 56 56'
                                    fill='none'
                                  >
                                    <circle cx='28' cy='28' r='28' fill='#FF0000' />
                                    <path d='M36 28L24 36V20L36 28Z' fill='white' />
                                  </svg>
                                </a>
                              </div>
                              <div className='flex flex-1 flex-col p-4'>
                                <div className='mb-2 line-clamp-2 text-base font-bold text-black'>
                                  {video.title}
                                </div>
                                {video.description && (
                                  <div className='line-clamp-2 text-sm text-gray-600'>
                                    {video.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      // Hiển thị grid bình thường khi có 1-4 videos
                      <div className='flex justify-center gap-6'>
                        {latestVideos.map((video) => (
                          <div key={video.id}>
                            <div className='mx-auto flex h-[440px] w-full max-w-[320px] flex-col overflow-hidden rounded-3xl border-2 border-[#2D6294] bg-white shadow-lg'>
                              <div className='relative flex h-[240px] w-full items-center justify-center'>
                                <img
                                  src={video.thumbnail_url}
                                  alt={video.title}
                                  className='h-full w-full rounded-t-3xl object-cover'
                                />
                                {/* Text overlay on thumbnail */}
                                <div className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-2'>
                                  <div className='line-clamp-2 text-sm font-semibold text-white'>
                                    {video.product.name}
                                  </div>
                                </div>
                                {/* Price overlay */}
                                <div className='absolute right-2 bottom-2 rounded bg-white px-2 py-1 text-sm font-bold text-black'>
                                  {parseFloat(video.product.price).toLocaleString('vi-VN')}đ
                                </div>
                                {/* Play button */}
                                <a
                                  href={video.url}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-2 shadow-lg'
                                >
                                  <svg
                                    className='h-14 w-14'
                                    viewBox='0 0 56 56'
                                    fill='none'
                                  >
                                    <circle cx='28' cy='28' r='28' fill='#FF0000' />
                                    <path d='M36 28L24 36V20L36 28Z' fill='white' />
                                  </svg>
                                </a>
                              </div>
                              <div className='flex flex-1 flex-col p-4'>
                                <div className='mb-2 line-clamp-2 text-base font-bold text-black'>
                                  {video.title}
                                </div>
                                {video.description && (
                                  <div className='line-clamp-2 text-sm text-gray-600'>
                                    {video.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
