"use client";
import React, { useState } from 'react';
import Footer from '@/components/Footer';
import ProductGrid from '../../../components/ProductGrid';
// @ts-ignore: no types for react-slick
import Slider from 'react-slick';

const products = [
  {
    id: 1,
    name: 'Màn hình cao cấp Kuycon P40K & P40U',
    url: '#',
    image: 'https://file.hstatic.net/1000069970/collection/20250711-son08030_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Màn hình 5K, 120Hz, 40 inch, ngàm VESA, chuyên nghiệp cho thiết kế.',
    ordered: 12,
    total: 50,
    endDate: '30/07/2025',
  },
  {
    id: 2,
    name: 'Mô hình xe Kawasaki Ninja H2R',
    url: '#',
    image: 'https://file.hstatic.net/1000069970/collection/gravastar_collection_af12333a90a34df0b3f30914520f092b_large.png',
    description: 'Mô hình xe mô tô tỉ lệ 1:6, đề nổ, phun khói, có đèn LED.',
    ordered: 20,
    total: 100,
    endDate: '25/07/2025',
  },
  {
    id: 3,
    name: 'Ghế gaming Ragnok ErgoStrike7',
    url: '#',
    image: 'https://file.hstatic.net/1000069970/collection/20240801-113333_408d293fe0964529a4d3c14958b0f30b_large.jpeg',
    description: 'Ghế gaming công thái học, thiết kế tối ưu cho game thủ. Ghế gaming công thái học, thiết kế tối ưu cho game thủ. Ghế gaming công thái học, thiết kế tối ưu cho game thủ.',
    ordered: 35,
    total: 120,
    endDate: 'Sản phẩm đang về hàng',
  },
  {
    id: 4,
    name: 'Bàn phím cơ Lofree Flow 2',
    url: '#',
    image: 'https://file.hstatic.net/1000069970/collection/20250711-son08030_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Bàn phím cơ siêu mượt, tích hợp touch bar, hỗ trợ VIA.',
    ordered: 10,
    total: 60,
    endDate: '15/08/2025',
  },
  {
    id: 5,
    name: 'Đèn RGBIC hiệu ứng NID Glide',
    url: '#',
    image: 'https://file.hstatic.net/1000069970/collection/20250711-son08030_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Đèn RGBIC với hiệu ứng chuyển động, điều khiển qua app.',
    ordered: 18,
    total: 80,
    endDate: '10/08/2025',
  },
  {
    id: 6,
    name: 'Loa Bluetooth Gravastar Mars Pro',
    url: '#',
    image: 'https://file.hstatic.net/1000069970/collection/gravastar_marspro_4d816eab8c1c4942940f59d9599beb4b_large.png',
    description: 'Loa Bluetooth thiết kế độc đáo, âm thanh mạnh mẽ.',
    ordered: 25,
    total: 90,
    endDate: '05/08/2025',
  },
  {
    id: 7,
    name: 'Chuột không dây Gaming Mercury Pro',
    url: '#',
    image: 'https://file.hstatic.net/1000069970/collection/chuot_mercurypro_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Chuột gaming không dây, cảm biến siêu nhạy, pin lâu.',
    ordered: 30,
    total: 110,
    endDate: '01/08/2025',
  },
  {
    id: 8,
    name: 'Bàn nâng hạ điện LivArt 9Space',
    url: '#',
    image: 'https://product.hstatic.net/1000069970/product/3_5ab5425c437a4c1a8ce51b0ff2ce0869_large.png',
    description: 'Bàn làm việc thông minh, nâng hạ điện, sạc không dây.',
    ordered: 8,
    total: 40,
    endDate: '28/07/2025',
  },
  {
    id: 9,
    name: 'Đèn cảm ứng âm thanh NID B-Light',
    url: '#',
    image: 'https://file.hstatic.net/1000069970/collection/den_blight_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Đèn cảm ứng âm thanh, đổi màu RGB, thiết kế gỗ.',
    ordered: 15,
    total: 70,
    endDate: '20/08/2025',
  },
  {
    id: 10,
    name: 'Kệ màn hình Hyperwork',
    url: '#',
    image: 'https://file.hstatic.net/1000069970/collection/ke_man_hinh_hyperwork_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Kệ màn hình gỗ, tăng diện tích bàn làm việc.',
    ordered: 22,
    total: 55,
    endDate: '18/08/2025',
  },
  {
    id: 11,
    name: 'Đồng hồ để bàn RGB LED Clock',
    url: '#',
    image: 'https://file.hstatic.net/1000069970/collection/led_clock_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Đồng hồ để bàn RGB, nhiều hiệu ứng màu sắc.',
    ordered: 17,
    total: 65,
    endDate: '12/08/2025',
  },
  {
    id: 12,
    name: 'Bàn phím cơ NuPhy Air75 V2',
    url: '#',
    image: 'https://file.hstatic.net/1000069970/collection/nuphy_air75v2_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Bàn phím cơ không dây, siêu mỏng, pin trâu.',
    ordered: 14,
    total: 60,
    endDate: '22/08/2025',
  },
];

const categories = [
  { name: 'Setup Góc Làm Việc', icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_1.png?v=7372' },
  { name: 'Bàn phím hay', icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_2.png?v=7372' },
  { name: 'Du Lịch Dã Ngoại', icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_3.png?v=7372' },
  { name: 'Loa - Tai Nghe', icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_4.png?v=7372' },
  { name: 'Sản phẩm độc đáo nhất', icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_5.png?v=7372' },
  { name: 'Sản phẩm HOT', icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_6.png?v=7372' },
  { name: 'Sản phẩm DIY Steampunk', icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_7.png?v=7372' },
  { name: 'Đèn tràn trí NID LIGHT', icon: 'https://theme.hstatic.net/1000069970/1001119059/14/menu_mb_discovery_icon_8.png?v=7372' },
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
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    subtitle: 'ĐÁNH GIÁ MÀN HÌNH ĐÔI JSAUX',
    views: 16724000,
    description: 'Lấy cảm hứng từ Star Wars và tác phẩm nghệ thuật từ bộ truyện tranh Star Wars: Dark Empire, Hot Toys vui mừng giới thiệu một mô hình hoàn...',
  },
  {
    videoId: 'mV6VWyHwhFg',
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    subtitle: 'ĐÁNH GIÁ MÀN HÌNH ĐÔI JSAUX',
    views: 16724000,
    description: 'Lấy cảm hứng từ Star Wars và tác phẩm nghệ thuật từ bộ truyện tranh Star Wars: Dark Empire, Hot Toys vui mừng giới thiệu một mô hình hoàn...',
  },
  {
    videoId: 'mV6VWyHwhFg',
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    subtitle: 'ĐÁNH GIÁ MÀN HÌNH ĐÔI JSAUX',
    views: 16724000,
    description: 'Lấy cảm hứng từ Star Wars và tác phẩm nghệ thuật từ bộ truyện tranh Star Wars: Dark Empire, Hot Toys vui mừng giới thiệu một mô hình hoàn...',
  },
  {
    videoId: 'mV6VWyHwhFg',
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    subtitle: 'ĐÁNH GIÁ MÀN HÌNH ĐÔI JSAUX',
    views: 16724000,
    description: 'Lấy cảm hứng từ Star Wars và tác phẩm nghệ thuật từ bộ truyện tranh Star Wars: Dark Empire, Hot Toys vui mừng giới thiệu một mô hình hoàn...',
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
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><text x="4" y="13" fontSize="8" fontWeight="bold" fill="black">A</text><text x="4" y="21" fontSize="8" fontWeight="bold" fill="black">Z</text><path d="M16 7v10m0 0l-3-3m3 3l3-3" stroke="black" strokeWidth="2" strokeLinecap="round" /></svg>
    ),
  },
  {
    label: 'Z-A',
    desc: 'Sắp xếp tên từ Z đến A',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><text x="4" y="13" fontSize="8" fontWeight="bold" fill="black">Z</text><text x="4" y="21" fontSize="8" fontWeight="bold" fill="black">A</text><path d="M16 17V7m0 0l-3 3m3-3l3 3" stroke="black" strokeWidth="2" strokeLinecap="round" /></svg>
    ),
  },
  {
    label: 'Mới nhất',
    desc: 'Sắp xếp theo sản phẩm mới nhất',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" stroke="black" strokeWidth="2" /><path d="M8 2v4M16 2v4M4 10h16" stroke="black" strokeWidth="2" /></svg>
    ),
  },
  {
    label: 'Bán chạy',
    desc: 'Sắp xếp theo sản phẩm bán chạy',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M6 18v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" stroke="black" strokeWidth="2" /><circle cx="12" cy="7" r="4" stroke="black" strokeWidth="2" /><rect x="2" y="17" width="4" height="5" rx="2" fill="black" /></svg>
    ),
  },
  {
    label: 'Giá tăng',
    desc: 'Sắp xếp theo giá tăng dần',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="black" strokeWidth="2" /><path d="M12 16V8m0 0l-3 3m3-3l3 3" stroke="black" strokeWidth="2" strokeLinecap="round" /><text x="9" y="23" fontSize="8" fontWeight="bold" fill="black">$</text></svg>
    ),
  },
  {
    label: 'Giá giảm',
    desc: 'Sắp xếp theo giá giảm dần',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" stroke="black" strokeWidth="2" /><path d="M12 8v8m0 0l-3-3m3 3l3-3" stroke="black" strokeWidth="2" strokeLinecap="round" /><text x="9" y="23" fontSize="8" fontWeight="bold" fill="black">$</text></svg>
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
          `${className} z-10 !w-[50px] !h-[50px] rounded-full bg-[#ffe066] flex items-center justify-center transition border-none outline-none shadow-none text-[32px]` +
          (type === 'prev' ? ' !left-[-30px]' : ' !right-[-30px]')
        }
        style={{ ...style, display: 'flex', width: '50px', height: '50px', minWidth: '50px', minHeight: '50px', maxWidth: '50px', maxHeight: '50px' }}
        onClick={onClick}
        aria-label={type === 'prev' ? 'Previous' : 'Next'}
      >
        {type === 'prev' ? (
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* <circle cx="25" cy="25" r="25" fill="#fff"/> */}
            <path d="M32 40L18 25L32 10" stroke="#bfa100" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* <circle cx="25" cy="25" r="25" fill="#fff"/> */}
            <path d="M18 10L32 25L18 40" stroke="#bfa100" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
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
    prevArrow: <ReviewArrow type="prev" />,
    nextArrow: <ReviewArrow type="next" />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 800, settings: { slidesToShow: 3 } },
    ],
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="text-gray-700 hover:text-blue-600">Trang chủ</a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <a href="/products" className="text-gray-700 hover:text-blue-600">Sản phẩm</a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">Tất cả sản phẩm</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tất cả sản phẩm</h1>
          <p className="text-gray-600">Khám phá bộ sưu tập sản phẩm đa dạng của chúng tôi</p>
        </div>

        {/* Hashtag */}
        <div className="mb-8">
          <div className="py-4 hidden sm:block">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 justify-items-center">
              {hashtags.slice(0, 4).map((tag: { label: string }) => (
                <button
                  key={tag.label}
                  className={`rounded-full px-7 py-2 text-base font-semibold shadow-sm transition-all bg-white text-black hover:bg-sky-400 hover:text-white hover:font-bold`}
                  style={{ minWidth: 140 }}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
          {/* Coupon */}
          <div className="mb-8">
            <div className="flex flex-nowrap gap-3 sm:gap-6 overflow-x-auto pb-2 w-[90%] mx-auto">
              {coupons.map((c, idx) => (
                <div
                  key={c.code}
                  className="flex w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 relative flex-shrink-0"
                  style={{ minHeight: '80px' }}
                >
                  {/* Răng cưa trái */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-3 w-4 h-8 sm:w-6 sm:h-10 bg-white rounded-full z-10 border border-gray-200" />
                  {/* Răng cưa phải */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-3 w-4 h-8 sm:w-6 sm:h-10 bg-white rounded-full z-10 border border-gray-200" />
                  {/* Phần trái đỏ */}
                  <div className="flex flex-col justify-center items-center bg-red-600 text-white font-extrabold text-sm sm:text-lg text-center px-3 sm:px-5 py-2 sm:py-4 min-w-[70px] sm:min-w-[90px] whitespace-pre-line" style={{ letterSpacing: 0.5 }}>
                    {c.title}
                  </div>
                  {/* Phần phải trắng */}
                  <div className="flex flex-col justify-center flex-1 px-2 sm:px-4 py-2 sm:py-3 gap-2 sm:gap-3">
                    <div className="text-gray-800 text-xs sm:text-base font-medium mb-1 sm:mb-2">{c.desc}</div>
                    <button className="bg-red-600 text-white font-bold rounded-full px-4 sm:px-8 py-1.5 sm:py-2 text-xs sm:text-base w-fit self-start shadow hover:bg-red-700 transition">{c.button}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Danh mục icon */}
          <div className="mb-8 hidden sm:block">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-2xl font-bold">Khám phá các danh mục khác:</h2>
              <button className="flex items-center gap-1 sm:gap-2 bg-[#E30613] text-white font-bold rounded-full px-4 sm:px-8 py-1.5 sm:py-2 text-sm sm:text-lg shadow hover:bg-red-700 transition">
                <span className="flex gap-0.5 sm:gap-1">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span className="hidden sm:inline">Xem thêm</span>
                <span className="sm:hidden">Xem</span>
              </button>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-6">
              {categories.map((cat) => (
                <div key={cat.name} className="flex flex-col items-center justify-center bg-white rounded-2xl shadow w-16 h-16 sm:w-28 sm:h-28 min-w-[64px] min-h-[64px] sm:min-w-[96px] sm:min-h-[96px]">
                  <img src={cat.icon} alt={cat.name} className="w-6 h-6 sm:w-10 sm:h-10 object-contain mb-1 sm:mb-2" />
                  <div className="text-center text-xs sm:text-sm font-semibold text-black leading-tight">{cat.name}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Sắp xếp */}
          <div className="flex flex-col items-center">
            <span className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4">Sắp xếp theo:</span>
            <div className="flex gap-3 sm:gap-6">
              {sortOptions.map((opt, idx) => (
                <button
                  key={opt.label}
                  className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full shadow flex items-center justify-center transition cursor-pointer ${selectedSort === idx
                      ? 'bg-[#2D6294] hover:bg-[#2D6294]/80'
                      : 'bg-white hover:bg-sky-100'
                    }`}
                  onClick={() => setSelectedSort(idx)}
                  onMouseEnter={() => setHoverIdx(idx)}
                  onMouseLeave={() => setHoverIdx(null)}
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7">
                    {opt.icon}
                  </div>
                </button>
              ))}
            </div>
            <div
              className={`mt-3 sm:mt-4 px-4 sm:px-8 py-1.5 sm:py-2 rounded-full font-semibold text-sm sm:text-base text-center h-8 sm:h-10 flex items-center justify-center transition-all duration-200 hidden sm:flex ${hoverIdx !== null ? 'bg-[#2D6294] text-white shadow' : 'bg-transparent text-transparent shadow-none'}`}
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
            bannerImage="https://file.hstatic.net/1000069970/file/banner_pre_c4eeb4b0068b421dafdc8ce2f9aa7d54_40d9e9e6a2894924b768c57612313211.png"
          />
          {/* Review slider */}
          <div className="w-full py-10 mt-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 sm:mb-8 tracking-wide">CÙNG XEM REVIEW SẢN PHẨM</h3>

            {/* Mobile: Flex layout */}
            <div className="block sm:hidden">
              <div className="flex gap-[10px] overflow-x-auto pb-4 px-4">
                {reviews.map((r, idx) => (
                  <div key={idx} className="flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[275px] w-[175px] border border-[#2D6294]">
                      <div className="relative h-[160px] w-full flex items-center justify-center">
                        <img
                          src={`https://img.youtube.com/vi/${r.videoId}/hqdefault.jpg`}
                          alt={r.title}
                          className="w-full h-full object-cover rounded-t-2xl"
                        />
                        {/* Text overlay on thumbnail */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                          <div className="text-white text-xs font-semibold line-clamp-2">
                            {r.subtitle}
                          </div>
                        </div>
                        {/* Price overlay */}
                        <div className="absolute bottom-2 right-2 bg-white text-black text-xs font-bold px-2 py-1 rounded">
                          2,990,000
                        </div>
                        {/* Play button */}
                        <a
                          href={`https://www.youtube.com/watch?v=${r.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-lg"
                        >
                          <svg className="w-8 h-8" viewBox="0 0 56 56" fill="none">
                            <circle cx="28" cy="28" r="28" fill="#FF0000" />
                            <path d="M36 28L24 36V20L36 28Z" fill="white" />
                          </svg>
                        </a>
                      </div>
                      <div className="flex-1 flex flex-col p-3">
                        <div className="font-bold text-sm mb-1 line-clamp-2 text-black">{r.title}</div>
                        <div className="text-gray-600 text-xs line-clamp-2">{r.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Slider */}
            <div className="hidden sm:block">
              <div className="relative">
                <Slider {...reviewSliderSettings}>
                  {reviews.map((r, idx) => (
                    <div key={idx} className="px-3">
                      <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col h-[440px] w-full max-w-[320px] mx-auto border-2 border-[#2D6294]">
                        <div className="relative h-[240px] w-full flex items-center justify-center">
                          <img
                            src={`https://img.youtube.com/vi/${r.videoId}/hqdefault.jpg`}
                            alt={r.title}
                            className="w-full h-full object-cover rounded-t-3xl"
                          />
                          {/* Text overlay on thumbnail */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                            <div className="text-white text-sm font-semibold line-clamp-2">
                              {r.subtitle}
                            </div>
                          </div>
                          {/* Price overlay */}
                          <div className="absolute bottom-2 right-2 bg-white text-black text-sm font-bold px-2 py-1 rounded">
                            2,990,000
                          </div>
                          {/* Play button */}
                          <a
                            href={`https://www.youtube.com/watch?v=${r.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
                          >
                            <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none">
                              <circle cx="28" cy="28" r="28" fill="#FF0000" />
                              <path d="M36 28L24 36V20L36 28Z" fill="white" />
                            </svg>
                          </a>
                        </div>
                        <div className="flex-1 flex flex-col p-4">
                          <div className="font-bold text-base mb-2 line-clamp-2 text-black">{r.title}</div>
                          <div className="text-gray-600 text-sm line-clamp-2">{r.description}</div>
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
  );
}
