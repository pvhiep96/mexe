'use client';
import React, { useState } from 'react';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
// @ts-ignore: no types for react-slick
import Slider from 'react-slick';

const products = [
  {
    id: 1,
    name: 'Màn hình cao cấp Kuycon P40K & P40U',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/20250711-son08030_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description:
      'Màn hình 5K, 120Hz, 40 inch, ngàm VESA, chuyên nghiệp cho thiết kế.',
    ordered: 12,
    total: 50,
    endDate: '30/07/2025',
  },
  {
    id: 2,
    name: 'Mô hình xe Kawasaki Ninja H2R',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/gravastar_collection_af12333a90a34df0b3f30914520f092b_large.png',
    description: 'Mô hình xe mô tô tỉ lệ 1:6, đề nổ, phun khói, có đèn LED.',
    ordered: 20,
    total: 100,
    endDate: '25/07/2025',
  },
  {
    id: 3,
    name: 'Ghế gaming Ragnok ErgoStrike7',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/20240801-113333_408d293fe0964529a4d3c14958b0f30b_large.jpeg',
    description:
      'Ghế gaming công thái học, thiết kế tối ưu cho game thủ. Ghế gaming công thái học, thiết kế tối ưu cho game thủ. Ghế gaming công thái học, thiết kế tối ưu cho game thủ.',
    ordered: 35,
    total: 120,
    endDate: 'Sản phẩm đang về hàng',
  },
  {
    id: 4,
    name: 'Bàn phím cơ Lofree Flow 2',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/20250711-son08030_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Bàn phím cơ siêu mượt, tích hợp touch bar, hỗ trợ VIA.',
    ordered: 10,
    total: 60,
    endDate: '15/08/2025',
  },
  {
    id: 5,
    name: 'Đèn RGBIC hiệu ứng NID Glide',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/20250711-son08030_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Đèn RGBIC với hiệu ứng chuyển động, điều khiển qua app.',
    ordered: 18,
    total: 80,
    endDate: '10/08/2025',
  },
  {
    id: 6,
    name: 'Loa Bluetooth Gravastar Mars Pro',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/gravastar_marspro_4d816eab8c1c4942940f59d9599beb4b_large.png',
    description: 'Loa Bluetooth thiết kế độc đáo, âm thanh mạnh mẽ.',
    ordered: 25,
    total: 90,
    endDate: '05/08/2025',
  },
  {
    id: 7,
    name: 'Chuột không dây Gaming Mercury Pro',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/chuot_mercurypro_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Chuột gaming không dây, cảm biến siêu nhạy, pin lâu.',
    ordered: 30,
    total: 110,
    endDate: '01/08/2025',
  },
  {
    id: 8,
    name: 'Bàn nâng hạ điện LivArt 9Space',
    url: '#',
    image:
      'https://product.hstatic.net/1000069970/product/3_5ab5425c437a4c1a8ce51b0ff2ce0869_large.png',
    description: 'Bàn làm việc thông minh, nâng hạ điện, sạc không dây.',
    ordered: 8,
    total: 40,
    endDate: '28/07/2025',
  },
  {
    id: 9,
    name: 'Đèn cảm ứng âm thanh NID B-Light',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/den_blight_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Đèn cảm ứng âm thanh, đổi màu RGB, thiết kế gỗ.',
    ordered: 15,
    total: 70,
    endDate: '20/08/2025',
  },
  {
    id: 10,
    name: 'Kệ màn hình Hyperwork',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/ke_man_hinh_hyperwork_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Kệ màn hình gỗ, tăng diện tích bàn làm việc.',
    ordered: 22,
    total: 55,
    endDate: '18/08/2025',
  },
  {
    id: 11,
    name: 'Đồng hồ để bàn RGB LED Clock',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/led_clock_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Đồng hồ để bàn RGB, nhiều hiệu ứng màu sắc.',
    ordered: 17,
    total: 65,
    endDate: '12/08/2025',
  },
  {
    id: 12,
    name: 'Bàn phím cơ NuPhy Air75 V2',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/nuphy_air75v2_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Bàn phím cơ không dây, siêu mỏng, pin trâu.',
    ordered: 14,
    total: 60,
    endDate: '22/08/2025',
  },
];

const categories = [
  {
    name: 'Setup Góc Làm Việc',
    icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_1.png?v=7372',
  },
  {
    name: 'Bàn phím hay',
    icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_2.png?v=7372',
  },
  {
    name: 'Du Lịch Dã Ngoại',
    icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_3.png?v=7372',
  },
  {
    name: 'Loa - Tai Nghe',
    icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_4.png?v=7372',
  },
  {
    name: 'Sản phẩm độc đáo nhất',
    icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_5.png?v=7372',
  },
  {
    name: 'Sản phẩm HOT',
    icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_6.png?v=7372',
  },
  {
    name: 'Sản phẩm DIY Steampunk',
    icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_7.png?v=7372',
  },
  {
    name: 'Đèn tràn trí NID LIGHT',
    icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_8.png?v=7372',
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

const hashtags: { label: string }[] = [
  { label: '#VàiThứHay' },
  { label: '#NORESTOCK' },
  { label: '#ShopeeMall' },
  { label: '#LazMall' },
  { label: '#Tiki' },
  { label: '#Groupbuy' },
  { label: '#SetupDecor' },
  { label: '#SảnPhẩmHOT' },
  { label: '#ĐènRGB' },
  { label: '#LoaLạLạ' },
];

const sortOptions = [
  {
    label: 'A-Z',
    desc: 'Sắp xếp tên từ A đến Z',
    icon: (
      <svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
        <text x='4' y='13' fontSize='8' fontWeight='bold' fill='black'>
          A
        </text>
        <text x='4' y='21' fontSize='8' fontWeight='bold' fill='black'>
          Z
        </text>
        <path
          d='M16 7v10m0 0l-3-3m3 3l3-3'
          stroke='black'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
  {
    label: 'Z-A',
    desc: 'Sắp xếp tên từ Z đến A',
    icon: (
      <svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
        <text x='4' y='13' fontSize='8' fontWeight='bold' fill='black'>
          Z
        </text>
        <text x='4' y='21' fontSize='8' fontWeight='bold' fill='black'>
          A
        </text>
        <path
          d='M16 17V7m0 0l-3 3m3-3l3 3'
          stroke='black'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
  {
    label: 'Mới nhất',
    desc: 'Sắp xếp theo sản phẩm mới nhất',
    icon: (
      <svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
        <rect
          x='4'
          y='4'
          width='16'
          height='16'
          rx='3'
          stroke='black'
          strokeWidth='2'
        />
        <path d='M8 2v4M16 2v4M4 10h16' stroke='black' strokeWidth='2' />
      </svg>
    ),
  },
  {
    label: 'Bán chạy',
    desc: 'Sắp xếp theo sản phẩm bán chạy',
    icon: (
      <svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
        <path
          d='M6 18v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2'
          stroke='black'
          strokeWidth='2'
        />
        <circle cx='12' cy='7' r='4' stroke='black' strokeWidth='2' />
        <rect x='2' y='17' width='4' height='5' rx='2' fill='black' />
      </svg>
    ),
  },
  {
    label: 'Giá tăng',
    desc: 'Sắp xếp theo giá tăng dần',
    icon: (
      <svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
        <circle cx='12' cy='12' r='8' stroke='black' strokeWidth='2' />
        <path
          d='M12 16V8m0 0l-3 3m3-3l3 3'
          stroke='black'
          strokeWidth='2'
          strokeLinecap='round'
        />
        <text x='9' y='23' fontSize='8' fontWeight='bold' fill='black'>
          $
        </text>
      </svg>
    ),
  },
  {
    label: 'Giá giảm',
    desc: 'Sắp xếp theo giá giảm dần',
    icon: (
      <svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
        <circle cx='12' cy='12' r='8' stroke='black' strokeWidth='2' />
        <path
          d='M12 8v8m0 0l-3-3m3 3l3-3'
          stroke='black'
          strokeWidth='2'
          strokeLinecap='round'
        />
        <text x='9' y='23' fontSize='8' fontWeight='bold' fill='black'>
          $
        </text>
      </svg>
    ),
  },
];

export default function ProductListPage() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<number>(2); // Default to "Mới nhất" (index 2)

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
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 800, settings: { slidesToShow: 3 } },
    ],
  };

  return (
    <div className='flex min-h-screen flex-col'>
      <main className='grow'>
        {/* Banner */}
        {/* <div className="w-full bg-white border-b">
          <div className="container mx-auto max-w-[1200px]">
            <img src="https://file.hstatic.net/1000069970/file/banner_pre_c4eeb4b0068b421dafdc8ce2f9aa7d54_40d9e9e6a2894924b768c57612313211.png" alt="Banner" className="w-full max-w-5xl object-cover mx-auto" />
          </div>
        </div> */}
        {/* Breadcrumb and Title for Mobile */}
        <div className='container mx-auto max-w-[1200px] sm:hidden'>
          <div className='py-4'>
            {/* Breadcrumb */}
            <div className='mb-4 rounded-lg bg-white px-4 py-2 shadow-sm'>
              <div className='flex items-center text-sm'>
                <span className='text-blue-600'>Trang chủ</span>
                <span className='mx-2 text-gray-400'>/</span>
                <span className='text-blue-600'>Danh mục</span>
                <span className='mx-2 text-gray-400'>/</span>
                <span className='text-gray-600'>Tất cả sản phẩm</span>
              </div>
            </div>

            {/* Title Button */}
            <div className='mb-4 flex justify-center'>
              <div className='w-[90%] items-center'>
                <button className='w-full rounded-[5px] bg-[#2D6294] px-8 py-3 text-lg font-bold text-white shadow-lg transition-colors hover:bg-[#2D6294]/80'>
                  Tất cả sản phẩm
                </button>
                {/* Title Label */}
                <div className='text-left'>
                  <h1 className='text-base font-medium text-gray-600'>
                    Tất cả sản phẩm
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hashtag */}
        <div className='container mx-auto max-w-[1200px]'>
          <div className='hidden py-4 sm:block'>
            <div className='grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-5'>
              {hashtags.slice(0, 4).map((tag: { label: string }) => (
                <button
                  key={tag.label}
                  className={`rounded-full bg-white px-7 py-2 text-base font-semibold text-black shadow-sm transition-all hover:bg-sky-400 hover:font-bold hover:text-white`}
                  style={{ minWidth: 140 }}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
          {/* Coupon */}
          <div className='mb-8'>
            <div className='mx-auto flex w-[90%] flex-nowrap gap-3 overflow-x-auto pb-2 sm:gap-6'>
              {coupons.map((c, idx) => (
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
                    <button className='w-fit self-start rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold text-white shadow transition hover:bg-red-700 sm:px-8 sm:py-2 sm:text-base'>
                      {c.button}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Danh mục icon */}
          <div className='mb-8 hidden sm:block'>
            <div className='mb-4 flex items-center justify-between sm:mb-6'>
              <h2 className='text-lg font-bold sm:text-2xl'>
                Khám phá các danh mục khác:
              </h2>
              <button className='flex items-center gap-1 rounded-full bg-[#E30613] px-4 py-1.5 text-sm font-bold text-white shadow transition hover:bg-red-700 sm:gap-2 sm:px-8 sm:py-2 sm:text-lg'>
                <span className='flex gap-0.5 sm:gap-1'>
                  <svg
                    className='h-4 w-4 sm:h-5 sm:w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      d='M15 19l-7-7 7-7'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <svg
                    className='h-4 w-4 sm:h-5 sm:w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      d='M15 19l-7-7 7-7'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <svg
                    className='h-4 w-4 sm:h-5 sm:w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      d='M15 19l-7-7 7-7'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </span>
                <span className='hidden sm:inline'>Xem thêm</span>
                <span className='sm:hidden'>Xem</span>
              </button>
            </div>
            <div className='mx-auto grid max-w-6xl grid-cols-4 gap-3 sm:grid-cols-2 sm:gap-6 md:grid-cols-4 lg:grid-cols-8'>
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  className='flex h-16 min-h-[64px] w-16 min-w-[64px] flex-col items-center justify-center rounded-2xl bg-white shadow sm:h-28 sm:min-h-[96px] sm:w-28 sm:min-w-[96px]'
                >
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className='mb-1 h-6 w-6 object-contain sm:mb-2 sm:h-10 sm:w-10'
                  />
                  <div className='text-center text-xs leading-tight font-semibold text-black sm:text-sm'>
                    {cat.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Sắp xếp */}
          <div className='flex flex-col items-center'>
            <span className='mb-3 text-lg font-semibold sm:mb-4 sm:text-2xl'>
              Sắp xếp theo:
            </span>
            <div className='flex gap-3 sm:gap-6'>
              {sortOptions.map((opt, idx) => (
                <button
                  key={opt.label}
                  className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow transition sm:h-14 sm:w-14 ${
                    selectedSort === idx
                      ? 'bg-[#2D6294] hover:bg-[#2D6294]/80'
                      : 'bg-white hover:bg-sky-100'
                  }`}
                  onClick={() => setSelectedSort(idx)}
                  onMouseEnter={() => setHoverIdx(idx)}
                  onMouseLeave={() => setHoverIdx(null)}
                >
                  <div className='h-6 w-6 sm:h-7 sm:w-7'>{opt.icon}</div>
                </button>
              ))}
            </div>
            <div
              className={`mt-3 flex hidden h-8 items-center justify-center rounded-full px-4 py-1.5 text-center text-sm font-semibold transition-all duration-200 sm:mt-4 sm:flex sm:h-10 sm:px-8 sm:py-2 sm:text-base ${hoverIdx !== null ? 'bg-[#2D6294] text-white shadow' : 'bg-transparent text-transparent shadow-none'}`}
            >
              {hoverIdx !== null ? sortOptions[hoverIdx].desc : '\u00A0'}
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
            <div className='container mx-auto max-w-[1200px]'>
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
                            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-1 shadow-lg'
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
                <div className='relative'>
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
                              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg'
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
      </main>
      <Footer />
    </div>
  );
}
