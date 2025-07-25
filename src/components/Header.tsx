'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const exploreMenu = [
  { label: 'Tất cả sản phẩm', href: '#' },
  { label: 'Đèn & chiếu sáng', href: '#' },
  { label: 'Âm thanh & giải trí', href: '#' },
  { label: 'Camera hành trình', href: '#' },
  { label: 'Phụ kiện nội thất', href: '#' },
  { label: 'Phụ kiện ngoại thất', href: '#' },
  { label: 'Chăm sóc xe', href: '#' },
  { label: 'Đồ chơi ô tô', href: '#' },
];

const learnMoreMenu = [
  { label: 'Về Mexe', href: '#' },
  { label: 'Chính sách bảo hành', href: '#' },
  { label: 'Chính sách đổi trả', href: '#' },
  { label: 'Hướng dẫn mua hàng', href: '#' },
  { label: 'Hệ thống đại lý', href: '#' },
  { label: 'Tuyển dụng', href: '#' },
  { label: 'Liên hệ hỗ trợ', href: '#' },
];

const newsMenu = [
  { label: 'Tin tức thị trường', href: '#' },
  { label: 'Kinh nghiệm sử dụng xe', href: '#' },
  { label: 'So sánh sản phẩm', href: '#' },
  { label: 'Khuyến mãi', href: '#' },
  { label: 'Câu chuyện khách hàng', href: '#' },
];

const exploreSidebar = [
  { icon: '/icon-grid.webp', label: 'Tất cả' },
  { icon: '/icon-sale.webp', label: 'Sale' },
  { icon: '/icon-new.webp', label: 'New' },
  { icon: '/icon-more.webp', label: 'Khác' },
];

const exploreGrid = [
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Đèn LED & Đèn Pha Ô Tô',
    href: '#',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Camera Hành Trình & Cảm Biến Lùi',
    href: '#',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Âm Thanh & Giải Trí Trên Xe',
    href: '#',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Phụ Kiện Nội Thất Cao Cấp',
    href: '#',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Phụ Kiện Ngoại Thất & Đồ Chơi Xe',
    href: '#',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Chăm Sóc & Bảo Dưỡng Xe',
    href: '#',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Công Nghệ Tiện Ích Ô Tô',
    href: '#',
  },
  {
    image: '/images/demo-banner/banner-1.jpg',
    title: 'Lốp, Mâm & Phụ Kiện Lốp',
    href: '#',
  },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>('null');
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  // Lock body scroll when explore dropdown is open
  useEffect(() => {
    if (openMenu === 'explore') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openMenu]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-4">
        <Image
          src='/images/logo-mexe.png'
          alt='Mexe Logo'
          width={100}
          height={40}
          className='h-16 w-auto'
        />
        <nav className="flex-1 flex items-center justify-center">
          <ul className="flex gap-[10px] text-[14px] font-normal items-center">
            <li>
              <Link href="/" className="transition-colors hover:font-semibold hover:text-black block px-4 py-2">Trang chủ</Link>
            </li>
            <li className="relative group">
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all ${openMenu === 'explore' ? 'bg-[#2E6093] text-white' : ''} cursor-pointer`}
                onMouseEnter={() => setOpenMenu('explore')}
                onMouseLeave={() => setOpenMenu(null)}
              >
                Khám phá
                <ChevronDownIcon className={`w-5 h-5 ml-1 transition-transform ${openMenu === 'explore' ? 'rotate-180' : ''}`} />
              </button>
              {openMenu === 'explore' && (
                <div
                  className="fixed left-0 top-[65px] z-50 w-screen rounded-3xl bg-black shadow-2xl p-8 flex flex-col gap-8 overflow-x-hidden max-h-screen overflow-y-auto"
                  onMouseEnter={() => setOpenMenu('explore')}
                  onMouseLeave={() => setOpenMenu(null)}
                  style={{maxWidth: '100vw'}}
                >
                  {/* Flex row: Sidebar + Grid */}
                  <div className="w-full">
                    {/* Sidebar icon filter */}
                    <div className="text-white text-2xl font-extrabold mb-8 tracking-widest">KHÁM PHÁ THEO CHỦ ĐỀ</div>
                    <div className="flex flex-row w-full gap-10">
                      <div className="flex flex-col gap-6 items-center justify-start relative">
                        {exploreSidebar.map((item, idx) => (
                          <div key={idx} className="relative cursor-pointer">
                            <button
                              className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-lg mb-2 hover:bg-gray-100 transition-colors cursor-pointer"
                              onMouseEnter={() => setHoveredButton(idx)}
                              onMouseLeave={() => setHoveredButton(null)}
                            >
                              <div className="w-8 h-8 flex items-center justify-center">
                                <img src={item.icon} alt={item.label} className="w-8 h-8 object-contain" />
                              </div>
                            </button>
                            {hoveredButton === idx && (
                              <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
                                {item.label}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {/* Grid 4x2 */}
                      <div className="grid grid-cols-4 grid-rows-2 gap-6 flex-1">
                        {exploreGrid.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            className="group bg-[#181818] rounded-2xl overflow-hidden flex flex-col hover:scale-105 transition-transform shadow-lg"
                          >
                            <div className="relative w-full h-32">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-3 text-white font-bold text-base truncate group-hover:text-white">
                              {item.title}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Section: Shopee/Lazada + Mexe News */}
                  <div className="w-full flex flex-col gap-8 mt-10">
                    {/* Shopee/Lazada links */}
                    <div className="flex justify-between items-center gap-8 w-full">
                      <a href="https://shopee.vn/vaithuhay" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center bg-[#ee4d2d] rounded-xl py-4 text-white text-xl font-bold hover:opacity-90 transition">
                        <img src="/logo-mexe.png" alt="vaithuhay" className="h-8 mr-3" /> Shopee Mall
                      </a>
                      <a href="https://www.lazada.vn/shop/vaithuhay" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center bg-[#1a73e8] rounded-xl py-4 text-white text-xl font-bold hover:opacity-90 transition">
                        <img src="/logo-mexe.png" alt="vaithuhay" className="h-8 mr-3" /> Lazada
                      </a>
                    </div>
                    {/* Mexe News - slider */}
                    <div className="w-full bg-black rounded-2xl p-6 mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-white text-2xl font-extrabold uppercase">Mexe News</div>
                        <a href="#" className="text-white text-base font-semibold hover:underline flex items-center">Xem tất cả <span className="ml-1">&rarr;</span></a>
                      </div>
                      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                        {/* Bài viết mẫu */}
                        <div className="min-w-[260px] max-w-[260px] bg-white rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                          <div className="w-full h-40 relative">
                            <img src="/images/banner-policy.webp" alt="Pre order" className="w-full h-full object-cover rounded-t-xl" />
                          </div>
                          <div className="p-4 text-black font-bold text-base">PRE ORDER LÀ GÌ? MỌI ĐIỀU CẦN BIẾT VỀ PRE ORDER</div>
                        </div>
                        <div className="min-w-[260px] max-w-[260px] bg-white rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                          <div className="w-full h-40 relative">
                            <img src="/images/banner-sale.webp" alt="Livestream" className="w-full h-full object-cover rounded-t-xl" />
                          </div>
                          <div className="p-4 text-black font-bold text-base">CÁCH LIVESTREAM BÁN HÀNG CỦA DÂN CHUYÊN</div>
                        </div>
                        <div className="min-w-[260px] max-w-[260px] bg-white rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                          <div className="w-full h-40 relative">
                            <img src="/images/demo-banner/banner-2.png" alt="Đồng hồ bàn sáng tạo" className="w-full h-full object-cover rounded-t-xl" />
                          </div>
                          <div className="p-4 text-black font-bold text-base truncate">5 MẪU ĐỒNG HỒ ĐỂ BÀN SÁNG TẠO GIÚP TĂNG CẢM HỨNG LÀM VIỆC</div>
                        </div>
                        <div className="min-w-[260px] max-w-[260px] bg-white rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                          <div className="w-full h-40 relative">
                            <img src="/images/demo-banner/banner-3.png" alt="Bàn phím chuột" className="w-full h-full object-cover rounded-t-xl" />
                          </div>
                          <div className="p-4 text-black font-bold text-base truncate">TỔNG HỢP NHỮNG BỘ BÀN PHÍM VÀ CHUỘT GIÁ PHẢI CHĂNG DÀNH CHO DESIGNER</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li className="relative group">
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all ${openMenu === 'learnmore' ? 'bg-[#2E6093] text-white' : ''} cursor-pointer`}
                onMouseEnter={() => setOpenMenu('learnmore')}
                onMouseLeave={() => setOpenMenu(null)}
              >
                Tìm hiểu thêm
                <ChevronDownIcon className={`w-5 h-5 ml-1 transition-transform ${openMenu === 'learnmore' ? 'rotate-180' : ''}`} />
              </button>
              {openMenu === 'learnmore' && (
                <div
                  className="absolute left-1/2 top-full z-50 mt-[0px] w-80 -translate-x-1/2 rounded-2xl bg-white shadow-2xl p-4 flex flex-col gap-2"
                  onMouseEnter={() => setOpenMenu('learnmore')}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  {learnMoreMenu.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block rounded-full bg-gray-100 px-6 py-3 text-base text-gray-800 font-medium hover:bg-[#2e6093] hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            <li className="relative group">
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all ${openMenu === 'news' ? 'bg-[#2E6093] text-white' : ''} cursor-pointer`}
                onMouseEnter={() => setOpenMenu('news')}
                onMouseLeave={() => setOpenMenu(null)}
              >
                Bài viết
                <ChevronDownIcon className={`w-5 h-5 ml-1 transition-transform ${openMenu === 'news' ? 'rotate-180' : ''}`} />
              </button>
              {openMenu === 'news' && (
                <div
                  className="absolute left-1/2 top-full z-50 mt-[0px] w-80 -translate-x-1/2 rounded-2xl bg-white shadow-2xl p-4 flex flex-col gap-2"
                  onMouseEnter={() => setOpenMenu('news')}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  {newsMenu.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block rounded-full bg-gray-100 px-6 py-3 text-base text-gray-800 font-medium hover:bg-[#2e6093] hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </nav>
        <div className='flex items-center space-x-4'>
          <form className='relative w-80 max-w-xs' role='search'>
            <input
              className='focus:ring-primary w-full rounded-full bg-gray-200 py-2 pr-12 pl-5 placeholder-gray-500 focus:ring-2 focus:outline-none'
              type='search'
              placeholder='Tìm sản phẩm'
              aria-label='Search'
            />
            <button
              className='absolute top-1/2 right-3 -translate-y-1/2'
              type='submit'
            >
              <MagnifyingGlassIcon className='h-5 w-5 text-gray-500' />
            </button>
          </form>
          <a href='#' className='relative'>
            <ShoppingCartIcon className='h-8 w-8' />
            <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white'>0</span>
          </a>
          <a
            href='#'
            className='flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-gray-300'
          >
            <UserIcon className='h-8 w-8' />
          </a>
        </div>
      </div>
    </header>
  );
}
