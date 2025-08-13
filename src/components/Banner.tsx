'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';

export default function Banner() {
  const t = useTranslations('banner');
  const [activeTab, setActiveTab] = useState('danhmuc');
  const [hoveredSubmenu, setHoveredSubmenu] = useState<string | null>(null);
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [width, setWidth] = useState(375);

  useEffect(() => {
    function handleResize() {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 768) {
        setWidth(0);
      }
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

  const images = [
    {
      src: '/images/demo-banner/banner-1.jpg',
      alt: 'Placeholder 1',
      width: 300,
      height: 200,
    },
    {
      src: '/images/demo-banner/banner-2.jpg',
      alt: 'Placeholder 2',
      width: 300,
      height: 200,
    },
    {
      src: '/images/demo-banner/banner-1.jpg',
      alt: 'Placeholder 3',
      width: 300,
      height: 200,
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const mobileCategories = [
    {
      icon: '/images/icon-grid.webp',
      label: 'Tất cả sản phẩm',
      href: '/collections/tatcasanpham',
    },
    {
      icon: '/images/icon-sale.webp',
      label: 'Sản phẩm khuyến mãi',
      href: '/collections/san-pham-khuyen-mai',
    },
    {
      icon: '/images/icon-new.webp',
      label: 'Sản phẩm mới',
      href: '/collections/san-pham-moi',
    },
    {
      icon: '/images/icon-preorder.webp',
      label: 'PRE-ORDER',
      href: '/collections/pre-order',
    },
  ];

  const categories = [
    {
      icon: '//theme.hstatic.net/1000069970/1001119059/14/icon_sidebar_1.png?v=7371',
      label: 'Tất cả sản phẩm',
      href: '/collections/tatcasanpham',
    },
    {
      icon: '//theme.hstatic.net/1000069970/1001119059/14/icon_sidebar_2.png?v=7371',
      label: 'Thương hiệu đối tác',
      href: '/',
      submenu: [
        { label: 'Hexcal', href: '/collections/hexcal' },
        { label: 'Nuphy', href: '/collections/nuphy' },
        { label: 'Upgen', href: '/collections/upgen' },
        { label: 'Hyperwork', href: '/collections/hyperwork' },
        { label: 'Jsaux', href: '/collections/jsaux' },
        { label: 'Satechi', href: '/collections/satechi' },
      ],
    },
    {
      icon: '//theme.hstatic.net/1000069970/1001119059/14/icon_sidebar_3.png?v=7371',
      label: 'Workspace | Góc làm việc hiệu quả',
      href: '/collections/setup-goc-lam-viec',
      submenu: [
        {
          label: 'Bàn phím/chuột/thảm lót chuột',
          href: '/collections/chuot-tham-lot-chuot',
        },
        { label: 'Kệ màn hình', href: '/collections/ke-man-hinh' },
        { label: 'Hub', href: '/collections/hub' },
        {
          label: 'Giá đỡ màn hình',
          href: '/collections/gia-do-man-hinh-may-tinh',
        },
      ],
    },
    {
      icon: '//theme.hstatic.net/1000069970/1001119059/14/icon_sidebar_4.png?v=7371',
      label: 'Sản phẩm công thái học',
      href: '/collections/san-pham-cong-thai-hoc',
      submenu: [
        { label: 'Ghế công thái học', href: '/collections/ghe-cong-thai-hoc' },
        {
          label: 'Bàn công thái học',
          href: '/collections/ban-nang-ha-cong-thai-hoc',
        },
      ],
    },
    {
      icon: '//theme.hstatic.net/1000069970/1001119059/14/icon_sidebar_5.png?v=7371',
      label: 'Showcase - Nơi khám phá những sản phẩm độc đáo',
      href: 'https://vaithuhay.com/collections/coming-soon',
    },
    {
      icon: '//theme.hstatic.net/1000069970/1001119059/14/icon_sidebar_6.png?v=7371',
      label: 'Phụ kiện máy tính',
      href: '/collections/phu-kien-may-tinh-cong-nghe-chinh-hang-gia-tot',
      submenu: [
        {
          label: 'Cổng hub chuyển, dock sạc phụ kiện hỗ trợ góc làm việc',
          href: '/collections/hub',
        },
        { label: 'Giá đỡ laptop', href: '/collections/gia-do-laptop' },
      ],
    },
    {
      icon: '//theme.hstatic.net/1000069970/1001119059/14/icon_sidebar_7.png?v=7371',
      label: 'Đồng hồ trang trí',
      href: '/collections/san-pham-dong-ho-cong-nghe-tai-vaithuhay',
    },
    {
      icon: '//theme.hstatic.net/1000069970/1001119059/14/icon_sidebar_8.png?v=7371',
      label: 'Đèn công nghệ',
      href: '/collections/den-cong-nghe-trang-tri-goc-lam-viec-chi-co-tai-vaithuhay',
      submenu: [
        { label: 'Đèn RGB', href: '/collections/nid-light' },
        {
          label: 'Đèn bàn, đọc sách',
          href: '/collections/den-ban-doc-sach-cong-nghe-tai-vaithuhay',
        },
        {
          label: 'Đèn trang trí',
          href: '/collections/den-ban-den-doc-sach-cong-nghe',
        },
      ],
    },
    {
      icon: '//theme.hstatic.net/1000069970/1001119059/14/icon_sidebar_9.png?v=7371',
      label: 'Sản phẩm sáng tạo',
      href: '/collections/san-pham-sang-tao',
    },
    {
      icon: '//theme.hstatic.net/1000069970/1001119059/14/icon_sidebar_10.png?v=7371',
      label: 'Loa/Tai nghe hay hay',
      href: '/collections/gravastar-collection-chien-binh-khong-gian',
    },
  ];

  const vendors = [
    {
      href: '/collections/hyperwork',
      img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_1.png?v=7371',
      hoverImg:
        '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_1.png?v=7371',
    },
    {
      href: '/collections/9space-turn-on-your-workspace/',
      img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_2.png?v=7371',
      hoverImg:
        '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_2.png?v=7371',
    },
    {
      href: '/collections/setup-goc-lam-viec',
      img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_3.png?v=7371',
      hoverImg:
        '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_3.png?v=7371',
    },
    {
      href: '/collections/hexcal',
      img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_4.png?v=7371',
      hoverImg:
        '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_4.png?v=7371',
    },
    {
      href: '/collections/gravastar-collection-chien-binh-khong-gian',
      img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_5.png?v=7371',
      hoverImg:
        '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_5.png?v=7371',
    },
    {
      href: '/collections/jsaux',
      img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_6.png?v=7371',
      hoverImg:
        '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_6.png?v=7371',
    },
    {
      href: 'https://www.facebook.com/groups/503429347670937/?hoisted_section_header_type=recently_seen&multi_permalinks=1164421058238426',
      img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_7.png?v=7371',
      hoverImg:
        '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_7.png?v=7371',
    },
    {
      href: '/collections/nid-light',
      img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_8.png?v=7371',
      hoverImg:
        '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_8.png?v=7371',
    },
    {
      href: '/collections/nuphy-collection',
      img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_9.png?v=7371',
      hoverImg:
        '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_9.png?v=7371',
    },
    {
      href: '/collections/satechi',
      img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_10.png?v=7371',
      hoverImg:
        '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_10.png?v=7371',
    },
    {
      href: '/collections/upgen',
      img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_11.png?v=7371',
      hoverImg:
        '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_11.png?v=7371',
    },
    {
      href: '/collections/zen-card-collection',
      img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_12.png?v=7371',
      hoverImg:
        '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_12.png?v=7371',
    },
  ];

  return (
    <section className='bg-gray-100 py-8'>
      {/* Desktop Layout */}
      <div className='slider-index m-4 hidden lg:flex relative'>
        <div
          className={`slider-sidebar mr-4 w-[${width}px] rounded-lg bg-white shadow-md h-[600px]`}
          style={
            activeTab === 'thuonghieu'
              ? {
                  backgroundImage: "url('/sidebar-menu-bg.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#2F6194',
                }
              : {}
          }
        >
          <ul className='grid grid-flow-col space-y-2 rounded-t-lg bg-[#2F6194]'>
            <li className={`nav-item mb-[0px]`}>
              <a
                className={`nav-link flex h-full cursor-pointer items-center justify-center rounded-tl-lg py-2 text-sm font-medium ${activeTab === 'danhmuc' ? 'bg-[#2F6194] text-white' : 'rounded-tr-lg bg-white text-gray-700 hover:text-gray-900'}`}
                onClick={() => setActiveTab('danhmuc')}
              >
                Danh mục
              </a>
            </li>
            <li className={`nav-item`}>
              <a
                className={`nav-link flex h-full cursor-pointer items-center justify-center rounded-tr-lg py-2 text-sm font-medium ${activeTab === 'thuonghieu' ? 'bg-[#2F6194] text-white' : 'rounded-bl-lg bg-white text-gray-700 hover:text-gray-900'}`}
                onClick={() => setActiveTab('thuonghieu')}
              >
                Đối Tác
              </a>
            </li>
          </ul>
          
          <div className='tab-content h-[calc(600px-48px)] overflow-y-auto'>
            <div
              className={`tab-pane ${activeTab === 'danhmuc' ? 'block' : 'hidden'} h-full`}
            >
              <div className='space-y-1 p-2'>
                {categories.map((item, idx) => (
                  <div
                    key={idx}
                    className={`ega-item-sidebar ${item.submenu ? 'has-submenu' : ''} relative`}
                    onMouseEnter={() => {
                      if (item.submenu) {
                        setHoveredSubmenu(item.label);
                      } else {
                        setHoveredSubmenu(null);
                      }
                    }}
                  >
                    <div className='sidebar-icon-wrap flex cursor-pointer items-center rounded-lg bg-gray-100 p-3 text-gray-600 transition-colors duration-300 ease-in-out hover:bg-[#2D6294] hover:text-gray-900'>
                      <img
                        width='30'
                        height='30'
                        src={item.icon}
                        alt={`icon_sidebar_${idx + 1}.png`}
                        className='mr-3 flex-shrink-0'
                      />
                      <a
                        href={item.href}
                        target='_blank'
                        className='text-sm text-gray-700 truncate'
                        rel='noreferrer'
                      >
                        {item.label}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div
              className={`tab-pane ${activeTab === 'thuonghieu' ? 'block' : 'hidden'} h-full`}
              id='thuonghieu'
            >
              <div className='menu-vendor-list grid h-full w-full grid-cols-2 gap-3 p-3'>
                {vendors.map((vendor, idx) => (
                  <a
                    key={idx}
                    href={vendor.href}
                    target='_blank'
                    className='vendor-item-menu block flex h-full w-full items-center justify-center overflow-hidden rounded-lg transition-all hover:scale-105'
                    rel='noreferrer'
                  >
                    <img
                      width='100'
                      height='50'
                      src={vendor.img}
                      alt={`vendor_${idx + 1}`}
                      className='img-vendor h-auto w-full max-w-[120px] object-contain'
                    />
                    <img
                      width='100'
                      height='50'
                      src={vendor.hoverImg}
                      alt={`vendor_hover_${idx + 1}`}
                      className='img-vendor-hover hidden h-auto w-full max-w-[120px] object-contain hover:block'
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submenu container positioned outside sidebar to overlay banner */}
        {categories.map((item, idx) => (
          item.submenu && (
            <div
              key={`submenu-${idx}`}
              className={`absolute z-50 min-w-[300px] rounded-lg bg-white shadow-xl border border-gray-200 ${hoveredSubmenu === item.label ? 'block' : 'hidden'}`}
              style={{
                left: `${width + 32}px`, // 32px margin để có khoảng cách hợp lý với item
                top: `${48 + (idx * 60)}px` // 48px cho header + 60px cho mỗi item - căn với cạnh trên của item
              }}
              onMouseEnter={() => setHoveredSubmenu(item.label)}
              onMouseLeave={() => setHoveredSubmenu(null)}
            >
              <div className='p-2'>
                {item.submenu.map((sub, subIdx) => (
                  <a
                    key={subIdx}
                    href={sub.href}
                    target='_blank'
                    className='block cursor-pointer px-3 py-3 text-sm text-gray-600 transition-colors duration-300 ease-in-out hover:bg-[#2D6294] hover:text-white rounded-lg bg-gray-100 mb-1'
                    rel='noreferrer'
                  >
                    {sub.label}
                  </a>
                ))}
              </div>
            </div>
          )
        ))}

        <div
          className='slider-index-wrap'
          style={{ width: `calc(100vw - 450px)` }}
        >
          <Slider {...sliderSettings} ref={sliderRef}>
            {images.map((image, index) => (
              <div key={index} className='item rounded-xl'>
                <Link href='/collections/tatcasanpham'>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className='h-[600px] w-full rounded-xl'
                  />
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className='block lg:hidden'>
        <div className='container mx-auto px-4'>
          {/* Banner Slider */}
          <div className='mb-6'>
            <Slider {...sliderSettings} ref={sliderRef}>
              {images.map((image, index) => (
                <div key={index} className='px-2'>
                  <Link href='/collections/tatcasanpham'>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className='h-[280px] w-full rounded-xl object-cover'
                    />
                  </Link>
                </div>
              ))}
            </Slider>
          </div>

          {/* Categories Grid */}
          <div className='mb-6'>
            <h3 className='mb-4 text-lg font-bold text-gray-800'>Khám phá theo chủ đề</h3>
            <div className='grid grid-cols-2 gap-4'>
              {mobileCategories.map((category, index) => (
                <Link
                  key={index}
                  href={category.href}
                  className='flex items-center rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md'
                >
                  <Image
                    src={category.icon}
                    alt={category.label}
                    width={24}
                    height={24}
                    className='mr-3'
                  />
                  <span className='text-sm font-medium text-gray-700'>{category.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-3'>
            <div className='rounded-lg bg-white p-4 shadow-sm'>
              <h4 className='mb-2 font-semibold text-gray-800'>Setup Góc Làm Việc</h4>
              <p className='text-sm text-gray-600'>SET UP KHÔNG GIAN GÓC LÀM VIỆC</p>
            </div>
            
            <div className='rounded-lg bg-white p-4 shadow-sm'>
              <h4 className='mb-2 font-semibold text-gray-800'>Bàn phím hay</h4>
              <p className='text-sm text-gray-600'>BÀN PHÍM HAY</p>
            </div>
            
            <div className='rounded-lg bg-white p-4 shadow-sm'>
              <h4 className='mb-2 font-semibold text-gray-800'>Du Lịch Dã Ngoại</h4>
              <p className='text-sm text-gray-600'>Ưu đãi tháng 8 - Deal tốt sẵn sàng</p>
            </div>
            
            <div className='rounded-lg bg-white p-4 shadow-sm'>
              <h4 className='mb-2 font-semibold text-gray-800'>Loa - Tai Nghe</h4>
              <p className='text-sm text-gray-600'>Sản phẩm Cyberpunk - Scifi công nghệ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
