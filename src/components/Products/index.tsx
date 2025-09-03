'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  },
  {
    label: 'Z-A',
    desc: 'Sắp xếp tên từ Z đến A',
    icon: <FontAwesomeIcon icon={faSortAlphaUp} className='h-6 w-6' />,
  },
  {
    label: 'Mới nhất',
    desc: 'Sắp xếp theo sản phẩm mới nhất',
    icon: <FontAwesomeIcon icon={faClock} className='h-6 w-6' />,
  },
  {
    label: 'Bán chạy',
    desc: 'Sắp xếp theo sản phẩm bán chạy',
    icon: <FontAwesomeIcon icon={faStar} className='h-6 w-6' />,
  },
  {
    label: 'Giá tăng',
    desc: 'Sắp xếp theo giá tăng dần',
    icon: <FontAwesomeIcon icon={faSortNumericUp} className='h-6 w-6' />,
  },
  {
    label: 'Giá giảm',
    desc: 'Sắp xếp theo giá giảm dần',
    icon: <FontAwesomeIcon icon={faSortNumericDown} className='h-6 w-6' />,
  },
];

const categories = [
  {
    name: 'Setup Góc Làm Việc',
    icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_1.png?v=7372',
    url: '/products?category=setup-goc-lam-viec',
  },
  {
    name: 'Bàn phím hay',
    icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_2.png?v=7372',
    url: '/products?category=ban-phim-hay',
  },
  {
    name: 'Du Lịch Dã Ngoại',
    icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_3.png?v=7372',
    url: '/products?category=du-lich-da-ngoai',
  },
  {
    name: 'Loa - Tai Nghe',
    icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_4.png?v=7372',
    url: '/products?category=loa-tai-nghe',
  },
  {
    name: 'Sản phẩm độc đáo nhất',
    icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_5.png?v=7372',
    url: '/products?category=san-pham-doc-dao-nhat',
  },
  {
    name: 'Sản phẩm HOT',
    icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_6.png?v=7372',
    url: '/products?category=san-pham-hot',
  },
  {
    name: 'Sản phẩm DIY Steampunk',
    icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_7.png?v=7372',
    url: '/products?category=san-pham-diy-steampunk',
  },
  {
    name: 'Đèn tràn trí NID LIGHT',
    icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_8.png?v=7372',
    url: '/products?category=den-tran-tri-nid-light',
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

// Thay đổi dữ liệu review mẫu cho 1 item demo
const reviews = [
  {
    videoId: 'mV6VWyHwhFg',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    subtitle: 'ĐÁNH GIÁ MÀN HÌNH ĐÔI JSAUX',
    views: 16724000,
    description:
      'Lấy cảm hứng từ Star Wars và tác phẩm nghệ thuật từ bộ truyện tranh Star Wars: Dark Empire, Hot Toys vui mừng giới thiệu một mô hình hoàn...',
  },
  {
    videoId: 'mV6VWyHwhFg',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    subtitle: 'ĐÁNH GIÁ MÀN HÌNH ĐÔI JSAUX',
    views: 16724000,
    description:
      'Lấy cảm hứng từ Star Wars và tác phẩm nghệ thuật từ bộ truyện tranh Star Wars: Dark Empire, Hot Toys vui mừng giới thiệu một mô hình hoàn...',
  },
  {
    videoId: 'mV6VWyHwhFg',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    subtitle: 'ĐÁNH GIÁ MÀN HÌNH ĐÔI JSAUX',
    views: 16724000,
    description:
      'Lấy cảm hứng từ Star Wars và tác phẩm nghệ thuật từ bộ truyện tranh Star Wars: Dark Empire, Hot Toys vui mừng giới thiệu một mô hình hoàn...',
  },
  {
    videoId: 'mV6VWyHwhFg',
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    subtitle: 'ĐÁNH GIÁ MÀN HÌNH ĐÔI JSAUX',
    views: 16724000,
    description:
      'Lấy cảm hứng từ Star Wars và tác phẩm nghệ thuật từ bộ truyện tranh Star Wars: Dark Empire, Hot Toys vui mừng giới thiệu một mô hình hoàn...',
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
};
export default function ProductListPage({ allProducts }: ProductListPageType) {
  const router = useRouter();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<number>(2); // Default to "Mới nhất" (index 2)

  // Lọc sản phẩm theo category (demo)
  const getFilteredProducts = () => {
    // Trong thực tế, bạn sẽ lấy category từ URL params
    // const searchParams = new URLSearchParams(window.location.search);
    // const category = searchParams.get('category');

    // Demo: Trả về tất cả sản phẩm
    return allProducts;
  };

  const products = getFilteredProducts();

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
                <span className='text-gray-500'>Tất cả sản phẩm</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Title */}
        <div className='mb-8'>
          <h1 className='mb-2 text-3xl font-bold text-gray-900'>
            Tất cả sản phẩm
          </h1>
          <p className='text-gray-600'>
            Khám phá bộ sưu tập sản phẩm đa dạng của chúng tôi
          </p>
        </div>

        {/* Hashtag */}
        <div className='mb-8'>
          <div className='hidden py-4 sm:block'>
            <div className='grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-5'>
              {hashtags
                .slice(0, 4)
                .map((tag: { label: string; url: string }) => (
                  <button
                    key={tag.label}
                    className={`cursor-pointer rounded-full bg-white px-7 py-2 text-base font-semibold text-black shadow-sm transition-all hover:bg-sky-400 hover:font-bold hover:text-white`}
                    style={{ minWidth: 140 }}
                    onClick={() => handleHashtagClick(tag.url)}
                  >
                    {tag.label}
                  </button>
                ))}
            </div>
          </div>
          {/* Coupon */}
          <div className='mb-8'>
            <div className='mx-auto flex w-[90%] flex-nowrap gap-3 overflow-x-auto pb-2 sm:gap-6'>
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className='relative flex w-full max-w-[280px] flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg sm:max-w-xs md:max-w-sm lg:max-w-md'
                  style={{ minHeight: '80px' }}
                >
                  {/* Răng cưa trái */}
                  <div className='absolute top-1/2 left-0 z-10 -ml-2 h-8 w-4 -translate-y-1/2 rounded-full border border-gray-200 bg-white sm:-ml-3 sm:h-10 sm:w-6' />
                  {/* Răng cưa phải */}
                  <div className='absolute top-1/2 right-0 z-10 -mr-2 h-8 w-4 -translate-y-1/2 rounded-full border border-gray-200 bg-white sm:-mr-3 sm:h-10 sm:w-6' />
                  {/* Phần trái đỏ */}
                  <div
                    className='flex min-w-[70px] flex-col items-center justify-center bg-red-600 px-3 py-2 text-center text-sm font-extrabold whitespace-pre-line text-white sm:min-w-[90px] sm:px-5 sm:py-4 sm:text-lg'
                    style={{ letterSpacing: 0.5 }}
                  >
                    {c.title}
                  </div>
                  {/* Phần phải trắng */}
                  <div className='flex flex-1 flex-col justify-center gap-2 px-2 py-2 sm:gap-3 sm:px-4 sm:py-3'>
                    <div className='mb-1 text-xs font-medium text-gray-800 sm:mb-2 sm:text-base'>
                      {c.desc}
                    </div>
                    <button className='w-fit cursor-pointer self-start rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold text-white shadow transition hover:bg-red-700 sm:px-8 sm:py-2 sm:text-base'>
                      {c.button}
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
                  onClick={() => setSelectedSort(idx)}
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
            showBanner={true}
            bannerIndex={8}
            bannerImage='https://file.hstatic.net/1000069970/file/banner_pre_c4eeb4b0068b421dafdc8ce2f9aa7d54_40d9e9e6a2894924b768c57612313211.png'
          />
          {/* Review slider */}
          <div className='mt-12 w-full py-10'>
            <div className='container mx-auto max-w-[1200px] px-4'>
              <h3 className='mb-6 text-center text-2xl font-extrabold tracking-wide sm:mb-8 sm:text-3xl'>
                CÙNG XEM REVIEW SẢN PHẨM
              </h3>

              {/* Mobile: Flex layout */}
              <div className='block sm:hidden'>
                <div className='flex gap-[10px] overflow-x-auto px-4 pb-4'>
                  {reviews.map((r, idx) => (
                    <div key={idx} className='flex-shrink-0'>
                      <div className='flex h-[275px] w-[175px] flex-col overflow-hidden rounded-2xl border border-[#2D6294] bg-white shadow-lg'>
                        <div className='relative flex h-[160px] w-full items-center justify-center'>
                          <img
                            src={`https://img.youtube.com/vi/${r.videoId}/hqdefault.jpg`}
                            alt={r.title}
                            className='h-full w-full rounded-t-2xl object-cover'
                          />
                          {/* Text overlay on thumbnail */}
                          <div className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-2'>
                            <div className='line-clamp-2 text-xs font-semibold text-white'>
                              {r.subtitle}
                            </div>
                          </div>
                          {/* Price overlay */}
                          <div className='absolute right-2 bottom-2 rounded bg-white px-2 py-1 text-xs font-bold text-black'>
                            2,990,000
                          </div>
                          {/* Play button */}
                          <a
                            href={`https://www.youtube.com/watch?v=${r.videoId}`}
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
                            {r.title}
                          </div>
                          <div className='line-clamp-2 text-xs text-gray-600'>
                            {r.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop: Slider */}
              <div className='hidden sm:block'>
                <div className='relative mx-auto max-w-6xl'>
                  <Slider {...reviewSliderSettings}>
                    {reviews.map((r, idx) => (
                      <div key={idx} className='px-3'>
                        <div className='mx-auto flex h-[440px] w-full max-w-[320px] flex-col overflow-hidden rounded-3xl border-2 border-[#2D6294] bg-white shadow-lg'>
                          <div className='relative flex h-[240px] w-full items-center justify-center'>
                            <img
                              src={`https://img.youtube.com/vi/${r.videoId}/hqdefault.jpg`}
                              alt={r.title}
                              className='h-full w-full rounded-t-3xl object-cover'
                            />
                            {/* Text overlay on thumbnail */}
                            <div className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-2'>
                              <div className='line-clamp-2 text-sm font-semibold text-white'>
                                {r.subtitle}
                              </div>
                            </div>
                            {/* Price overlay */}
                            <div className='absolute right-2 bottom-2 rounded bg-white px-2 py-1 text-sm font-bold text-black'>
                              2,990,000
                            </div>
                            {/* Play button */}
                            <a
                              href={`https://www.youtube.com/watch?v=${r.videoId}`}
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
                              {r.title}
                            </div>
                            <div className='line-clamp-2 text-sm text-gray-600'>
                              {r.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
