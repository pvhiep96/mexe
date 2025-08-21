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
      href: '/products',
    },
    {
      icon: '/images/icon-sale.webp',
      label: 'Phụ kiện khuyến mãi',
      href: '/products?sale=true',
    },
    {
      icon: '/images/icon-new.webp',
      label: 'Phụ kiện mới',
      href: '/products?new=true',
    },
    {
      icon: '/images/icon-preorder.webp',
      label: 'ĐẶT TRƯỚC',
      href: '/products?preorder=true',
    },
  ];

  const categories = [
    {
      icon: '/images/icon-grid.webp',
      label: 'Tất cả sản phẩm',
      href: '/products',
    },
    {
      icon: '/images/icon-more.webp',
      label: 'Thương hiệu đối tác',
      href: '/',
      submenu: [
        { label: 'Toyota', href: '/products?brand=toyota' },
        { label: 'Honda', href: '/products?brand=honda' },
        { label: 'Thaco', href: '/products?brand=thaco' },
        { label: 'Vinfast', href: '/products?brand=vinfast' },
        { label: 'Tmas', href: '/products?brand=tmas' },
        { label: 'Icar', href: '/products?brand=icar' },
        { label: 'Aozoom', href: '/products?brand=aozoom' },
        { label: 'Auto365', href: '/products?brand=auto365' },
        { label: 'Chicco', href: '/products?brand=chicco' },
        { label: 'Vinaquick', href: '/products?brand=vinaquick' },
        { label: 'Setcar', href: '/products?brand=setcar' },
        { label: 'Vietmap', href: '/products?brand=vietmap' },
      ],
    },
    {
      icon: '/images/icon-new.webp',
      label: 'Phụ kiện nội/ngoại thất',
      href: '/products?category=noi-that-xe',
      submenu: [
        {
          label: 'Thảm lót sàn xe',
          href: '/products?category=tham-lot-san-xe',
        },
        { label: 'Gối tựa đầu', href: '/products?category=goi-tua-dau' },
        { label: 'Áo trùm ghế', href: '/products?category=ao-trum-ghe' },
        {
          label: 'Kệ để đồ',
          href: '/products?category=ke-de-do-xe',
        },
      ],
    },
    {
      icon: '/images/icon-search.svg',
      label: 'Ứng dụng/định vị',
      href: '/products?category=an-toan-xe',
      submenu: [
        { label: 'Camera hành trình', href: '/products?category=camera-hanh-trinh' },
        {
          label: 'Cảm biến lùi',
          href: '/products?category=cam-bien-lui',
        },
      ],
    },
    {
      icon: '/images/icon-new.webp',
      label: 'Đồ chơi xe',
      href: '/products?featured=true',
    },
    {
      icon: '/images/icon-more.webp',
      label: 'Camping',
      href: '/products?category=phu-kien-ngoai-that',
      submenu: [
        {
          label: 'Ốp viền cửa',
          href: '/products?category=op-vien-cua',
        },
        { label: 'Decal dán xe', href: '/products?category=decal-dan-xe' },
      ],
    },
    {
      icon: '/images/icon-more.webp',
      label: 'Thiết bị an toàn',
      href: '/products?category=dong-ho-trang-tri-xe',
    },
    {
      icon: '/images/icon-sale.webp',
      label: 'Pin – sạc – xe điện',
      href: '/products?category=den-trang-tri-xe',
      submenu: [
        { label: 'Đèn LED nội thất', href: '/products?category=den-led-noi-that' },
        {
          label: 'Đèn pha bổ sung',
          href: '/products?category=den-pha-bo-sung',
        },
        {
          label: 'Đèn xi nhan',
          href: '/products?category=den-xi-nhan',
        },
      ],
    },
  ];

  const vendors = [
    {
      href: '/products?brand=toyota',
      img: '/images/brands/toyota.png',
      hoverImg:
        '/images/brands/toyota.png',
    },
    {
      href: '/products?brand=honda',
      img: '/images/brands/honda.png',
      hoverImg:
        '/images/brands/honda.png',
    },
    {
      href: '/products?brand=thaco',
      img: '/images/brands/thaco.png',
      hoverImg:
        '/images/brands/thaco.png',
    },
    {
      href: '/products?brand=vinfast',
      img: '/images/brands/vinfast.webp',
      hoverImg:
        '/images/brands/vinfast.webp',
    },
    {
      href: '/products?brand=tmas',
      img: '/images/brands/tmas.svg',
      hoverImg:
        '/images/brands/tmas.svg',
    },
    {
      href: '/products?brand=icar',
      img: '/images/brands/icar.jpg',
      hoverImg:
        '/images/brands/icar.jpg',
    },
    {
      href: '/products?brand=aozoom',
      img: '/images/brands/aozoom.svg',
      hoverImg:
        '/images/brands/aozoom.svg',
    },
    {
      href: '/products?brand=auto365',
      img: '/images/brands/auto365.png',
      hoverImg:
        '/images/brands/auto365.png',
    },
    {
      href: '/products?brand=chicco',
      img: '/images/brands/chicco.webp',
      hoverImg:
        '/images/brands/chicco.webp',
    },
    {
      href: '/products?brand=vinaquick',
      img: '/images/brands/vinaquick.png',
      hoverImg:
        '/images/brands/vinaquick.png',
    },
    {
      href: '/products?brand=setcar',
      img: '/images/brands/setcar.png',
      hoverImg:
        '/images/brands/setcar.png',
    },
    {
      href: '/products?brand=vietmap',
      img: '/images/brands/vietmap.webp',
      hoverImg:
        '/images/brands/vietmap.webp',
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
          
          <div className='tab-content h-[calc(600px-48px)] overflow-y-auto min-w-[330px]'>
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
                                          <div className='sidebar-icon-wrap group flex cursor-pointer items-center rounded-lg bg-gray-100 p-3 text-gray-600 transition-colors duration-300 ease-in-out hover:bg-[#2D6294] hover:text-white h-[55px]'>
                        <a
                          href={item.href}
                          target='_blank'
                          className='text-sm text-gray-700 truncate group-hover:text-white transition-colors duration-300 flex items-center justify-center w-full'
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
              <div className='menu-vendor-list grid h-full w-full grid-cols-2 gap-3 p-3 min-w-[330px]'>
                {vendors.map((vendor, idx) => (
                  <a
                    key={idx}
                    href={vendor.href}
                    target='_blank'
                    className='vendor-item-menu block flex h-full w-full items-center justify-center overflow-hidden rounded-lg transition-all hover:scale-105'
                    rel='noreferrer'
                  >
                    <img
                      width='140'
                      height='60'
                      src={vendor.img}
                      alt={`vendor_${idx + 1}`}
                      className='img-vendor w-[140px] h-[60px] object-contain'
                    />
                    <img
                      width='140'
                      height='60'
                      src={vendor.hoverImg}
                      alt={`vendor_hover_${idx + 1}`}
                      className='img-vendor-hover hidden w-[140px] h-[60px] object-contain hover:block'
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
              className={`absolute z-50 min-w-[300px] rounded-lg bg-white shadow-xl border border-gray-200 transition-all duration-200 ${hoveredSubmenu === item.label ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              style={{
                left: `${width - 50}px`, // Overlap 2px để không bị mất hover
                top: `${(idx * 55)}px` // 48px header + 8px padding + 55px mỗi item (height)
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
                <Link href='/products'>
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
                  <Link href='/products'>
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
            <h3 className='mb-4 text-lg font-bold text-gray-800'>Khám phá phụ kiện ô tô</h3>
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
              <h4 className='mb-2 font-semibold text-gray-800'>Nội thất xe</h4>
              <p className='text-sm text-gray-600'>TRANG TRÍ VÀ TIỆN NGHI CHO XE CỦA BẠN</p>
            </div>
            
            <div className='rounded-lg bg-white p-4 shadow-sm'>
              <h4 className='mb-2 font-semibold text-gray-800'>Camera hành trình</h4>
              <p className='text-sm text-gray-600'>AN TOÀN VÀ BẢO VỆ XE</p>
            </div>
            
            <div className='rounded-lg bg-white p-4 shadow-sm'>
              <h4 className='mb-2 font-semibold text-gray-800'>Phụ kiện hot</h4>
              <p className='text-sm text-gray-600'>Ưu đãi tháng 8 - Deal tốt sẵn sàng</p>
            </div>
            
            <div className='rounded-lg bg-white p-4 shadow-sm'>
              <h4 className='mb-2 font-semibold text-gray-800'>Âm thanh xe hơi</h4>
              <p className='text-sm text-gray-600'>Hệ thống âm thanh chất lượng cao</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
