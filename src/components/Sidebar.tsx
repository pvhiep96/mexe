'use client';

import { useState, useRef } from 'react';
import Slider from 'react-slick';

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('danhmuc');
  const [hoveredSubmenu, setHoveredSubmenu] = useState<string | null>(null);
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0); // Optional: Track current slide

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
        { label: 'Bàn phím/chuột/thảm lót chuột', href: '/collections/chuot-tham-lot-chuot' },
        { label: 'Kệ màn hình', href: '/collections/ke-man-hinh' },
        { label: 'Hub', href: '/collections/hub' },
        { label: 'Giá đỡ màn hình', href: '/collections/gia-do-man-hinh-may-tinh' },
      ],
    },
    {
      icon: '//theme.hstatic.net/1000069970/1001119059/14/icon_sidebar_4.png?v=7371',
      label: 'Sản phẩm công thái học',
      href: '/collections/san-pham-cong-thai-hoc',
      submenu: [
        { label: 'Ghế công thái học', href: '/collections/ghe-cong-thai-hoc' },
        { label: 'Bàn công thái học', href: '/collections/ban-nang-ha-cong-thai-hoc' },
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
        { label: 'Cổng hub chuyển, dock sạc phụ kiện hỗ trợ góc làm việc', href: '/collections/hub' },
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
        { label: 'Đèn bàn, đọc sách', href: '/collections/den-ban-doc-sach-cong-nghe-tai-vaithuhay' },
        { label: 'Đèn trang trí', href: '/collections/den-ban-den-doc-sach-cong-nghe' },
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
    { href: '/collections/hyperwork', img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_1.png?v=7371', hoverImg: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_1.png?v=7371' },
    { href: '/collections/9space-turn-on-your-workspace/', img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_2.png?v=7371', hoverImg: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_2.png?v=7371' },
    { href: '/collections/setup-goc-lam-viec', img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_3.png?v=7371', hoverImg: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_3.png?v=7371' },
    { href: '/collections/hexcal', img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_4.png?v=7371', hoverImg: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_4.png?v=7371' },
    { href: '/collections/gravastar-collection-chien-binh-khong-gian', img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_5.png?v=7371', hoverImg: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_5.png?v=7371' },
    { href: '/collections/jsaux', img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_6.png?v=7371', hoverImg: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_6.png?v=7371' },
    { href: 'https://www.facebook.com/groups/503429347670937/?hoisted_section_header_type=recently_seen&multi_permalinks=1164421058238426', img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_7.png?v=7371', hoverImg: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_7.png?v=7371' },
    { href: '/collections/nid-light', img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_8.png?v=7371', hoverImg: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_8.png?v=7371' },
    { href: '/collections/nuphy-collection', img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_9.png?v=7371', hoverImg: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_9.png?v=7371' },
    { href: '/collections/satechi', img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_10.png?v=7371', hoverImg: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_10.png?v=7371' },
    { href: '/collections/upgen', img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_11.png?v=7371', hoverImg: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_11.png?v=7371' },
    { href: '/collections/zen-card-collection', img: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_12.png?v=7371', hoverImg: '//theme.hstatic.net/1000069970/1001119059/14/img_vendor_hover_12.png?v=7371' },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: (
        <img
          width="100"
          height="100"
          src="//theme.hstatic.net/1000069970/1001119059/14/ega-caret-left.png?v=7371"
          alt="Previous"
          className="hover:opacity-70 owl-prev absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
        />
    ),
    nextArrow: (
        <img
          width="44"
          height="66"
          src="//theme.hstatic.net/1000069970/1001119059/14/ega-caret-right.png?v=7371"
          alt="Next"
          className="hover:opacity-70 owl-next absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer"
        />

    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: (current: number) => setCurrentSlide(current), // Optional: Track current slide
  };

  return (
    <div className="slider-index flex m-4">
      <div className="relative w-[375px] slider-sidebar bg-white p-4 shadow-md mr-4 rounded-lg hidden sm:block">
        <ul className="space-y-2 border-b pb-2 grid grid-flow-col">
          <li className={`nav-item ${activeTab === 'danhmuc' ? 'border-b-2 border-yellow-400' : ''}`}>
            <a
              className="nav-link text-sm font-medium text-gray-700 hover:text-gray-900 py-2 block cursor-pointer"
              onClick={() => setActiveTab('danhmuc')}
            >
              Danh mục
            </a>
          </li>
          <li className={`nav-item ${activeTab === 'thuonghieu' ? 'border-b-2 border-yellow-400' : ''}`}>
            <a
              className="nav-link text-sm font-medium text-gray-700 hover:text-gray-900 py-2 block cursor-pointer"
              onClick={() => setActiveTab('thuonghieu')}
            >
              Đối Tác
            </a>
          </li>
        </ul>
        <div className="tab-content mt-4 h-[50vh] overflow-y-scroll">
          <div className={`pl-2 tab-pane rounded-full bg-white ${activeTab === 'danhmuc' ? 'block' : 'hidden'}`}>
            {categories.map((item, idx) => (
              <div key={idx} className={` ega-item-sidebar ${item.submenu ? 'has-submenu' : ''} py-1`}
              onMouseEnter={() => item.submenu && setHoveredSubmenu(item.label)}
              onMouseLeave={() => item.submenu && setHoveredSubmenu(null)}
              >
                <div
                  className="sidebar-icon-wrap flex items-center cursor-pointer bg-gray-100 rounded-lg p-3 text-gray-600 transition-colors duration-300 ease-in-out hover:bg-yellow-400 hover:text-gray-900 "
                >
                  <img
                    width="30"
                    height="30"
                    src={item.icon}
                    alt={`icon_sidebar_${idx + 1}.png`}
                    className="mr-3"
                  />
                  <a href={item.href} target="_blank" className="text-gray-700 text-sm">
                    {item.label}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className={`tab-pane ${activeTab === 'thuonghieu' ? 'block' : 'hidden'}`} id="thuonghieu">
            <div className="menu-vendor-list grid grid-cols-3 gap-4">
              {vendors.map((vendor, idx) => (
                <a
                  key={idx}
                  href={vendor.href}
                  target="_blank"
                  className="vendor-item-menu block overflow-hidden rounded-lg transition-all hover:scale-105"
                >
                  <img
                    width="100"
                    height="50"
                    src={vendor.img}
                    alt={`vendor_${idx + 1}`}
                    className="img-vendor w-full h-auto"
                  />
                  <img
                    width="100"
                    height="50"
                    src={vendor.hoverImg}
                    alt={`vendor_hover_${idx + 1}`}
                    className="img-vendor-hover w-full h-auto hidden hover:block"
                  />
                </a>
              ))}
            </div>
          </div>

          {categories.map((item, idx) => (
              <div key={idx} className={`ega-item-sidebar ${item.submenu ? 'has-submenu' : ''} py-1`}
              onMouseEnter={() => item.submenu && setHoveredSubmenu(item.label)}
              onMouseLeave={() => item.submenu && setHoveredSubmenu(null)}
              >

                {item.submenu && (
                  <div
                    className={`h-full absolute rounded-lg bg-white left-[290px] top-[80px] w-[375px] z-10 ${hoveredSubmenu === item.label ? 'block' : 'hidden'}`}
                  >
                    {item.submenu.map((sub, subIdx) => (
                      <a
                        key={subIdx}
                        href={sub.href}
                        target="_blank"
                        className="m-2 block text-sm text-gray-600 hover:text-gray-900 cursor-pointer bg-gray-100 rounded-lg p-3 text-gray-600 transition-colors duration-300 ease-in-out hover:bg-yellow-400 "
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="slider-index-wrap"
        style={{ width: 'calc(100vw - 375px)' }}
      >
        <Slider {...sliderSettings} ref={sliderRef}>
          <div className="item">
            <a href="https://vaithuhay.com/products/may-anh-polaroid-mini-d1-pro">
              <img
                width="2048"
                height="806"
                src="//theme.hstatic.net/1000069970/1001119059/14/slideshow_1_2048x2048.jpg?v=7371"
                alt="Máy ảnh Polaroid D1"
                className="w-full h-auto object-cover rounded-xl"
              />
            </a>
          </div>
          <div className="item">
            <a href="https://vaithuhay.com/collections/setup-goc-lam-viec">
              <img
                width="2048"
                height="806"
                src="//theme.hstatic.net/1000069970/1001119059/14/slideshow_2_2048x2048.jpg?v=7371"
                alt="Công Nghệ Tiện Ích Có Sẵn"
                className="w-full h-auto object-cover rounded-xl"
              />
            </a>
          </div>
          <div className="item">
            <a href="https://vaithuhay.com/products/ke-tu-quan-ao-cloakboard-9space-khung-sat-toi-gian-luu-tru-tien-loi">
              <img
                width="2048"
                height="806"
                src="//theme.hstatic.net/1000069970/1001119059/14/slideshow_3_2048x2048.jpg?v=7371"
                alt="Sản phẩm có sẵn"
                className="w-full h-auto object-cover rounded-xl"
              />
            </a>
          </div>
        </Slider>
      </div>
    </div>
  );
}
