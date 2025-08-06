'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import ProductGrid from '../../../components/ProductGrid';
// @ts-ignore: no types for react-slick
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Tất cả sản phẩm
const allProducts = [
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
  {
    id: 13,
    name: 'Tai nghe Gaming HyperX Cloud Alpha',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/hyperx_cloud_alpha_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Tai nghe gaming chất lượng cao, âm thanh surround 7.1.',
    ordered: 28,
    total: 75,
    endDate: '25/08/2025',
  },
  {
    id: 14,
    name: 'Webcam Logitech StreamCam',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/logitech_streamcam_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Webcam Full HD 1080p, tích hợp microphone, phù hợp streaming.',
    ordered: 19,
    total: 45,
    endDate: '30/08/2025',
  },
  {
    id: 15,
    name: 'Microphone Blue Yeti X',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/blue_yeti_x_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Microphone condenser USB, chất lượng studio, RGB lighting.',
    ordered: 12,
    total: 30,
    endDate: '15/09/2025',
  },
  {
    id: 16,
    name: 'Bàn phím cơ Keychron Q1',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/keychron_q1_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Bàn phím cơ 75%, aluminum case, hot-swappable switches.',
    ordered: 16,
    total: 50,
    endDate: '10/09/2025',
  },
  {
    id: 17,
    name: 'Chuột gaming Logitech G Pro X Superlight',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/logitech_g_pro_x_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Chuột gaming không dây siêu nhẹ, 25K DPI, 70 giờ pin.',
    ordered: 33,
    total: 80,
    endDate: '05/09/2025',
  },
  {
    id: 18,
    name: 'Màn hình gaming Samsung Odyssey G9',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/samsung_odyssey_g9_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Màn hình ultrawide 49 inch, 240Hz, 1000R curvature.',
    ordered: 8,
    total: 25,
    endDate: '20/09/2025',
  },
  {
    id: 19,
    name: 'Loa gaming Razer Nommo Pro',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/razer_nommo_pro_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Loa gaming 2.1, subwoofer, RGB lighting, THX audio.',
    ordered: 14,
    total: 35,
    endDate: '12/09/2025',
  },
  {
    id: 20,
    name: 'Bàn gaming Secretlab Titan',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/secretlab_titan_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Bàn gaming thông minh, nâng hạ điện, tích hợp sạc không dây.',
    ordered: 11,
    total: 40,
    endDate: '28/09/2025',
  },
  {
    id: 21,
    name: 'Đèn LED strip Philips Hue',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/philips_hue_strip_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Đèn LED strip thông minh, 16 triệu màu, điều khiển qua app.',
    ordered: 26,
    total: 70,
    endDate: '18/09/2025',
  },
  {
    id: 22,
    name: 'Bàn phím cơ Ducky One 3',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/ducky_one_3_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Bàn phím cơ TKL, PBT keycaps, hot-swappable, RGB.',
    ordered: 18,
    total: 55,
    endDate: '08/09/2025',
  },
  {
    id: 23,
    name: 'Chuột gaming SteelSeries Prime Pro',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/steelseries_prime_pro_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Chuột gaming siêu nhẹ, 18K CPI, switches optical.',
    ordered: 22,
    total: 60,
    endDate: '15/09/2025',
  },
  {
    id: 24,
    name: 'Màn hình Dell UltraSharp U2720Q',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/dell_ultrasharp_u2720q_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Màn hình 4K 27 inch, 99% sRGB, USB-C, thiết kế chuyên nghiệp.',
    ordered: 9,
    total: 30,
    endDate: '25/09/2025',
  },
  {
    id: 25,
    name: 'Loa Bluetooth JBL Flip 6',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/jbl_flip_6_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Loa Bluetooth portable, waterproof, 12 giờ pin, âm thanh mạnh mẽ.',
    ordered: 31,
    total: 85,
    endDate: '10/09/2025',
  },
  {
    id: 26,
    name: 'Bàn phím cơ Varmilo VA87M',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/varmilo_va87m_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Bàn phím cơ TKL, PBT dye-sublimated keycaps, aluminum case.',
    ordered: 13,
    total: 45,
    endDate: '22/09/2025',
  },
  {
    id: 27,
    name: 'Chuột gaming Glorious Model O',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/glorious_model_o_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Chuột gaming honeycomb, siêu nhẹ, 19K DPI, RGB.',
    ordered: 24,
    total: 65,
    endDate: '18/09/2025',
  },
  {
    id: 28,
    name: 'Màn hình LG 27GL850-B',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/lg_27gl850b_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Màn hình gaming 1440p, 144Hz, 1ms, Nano IPS, FreeSync.',
    ordered: 17,
    total: 50,
    endDate: '12/09/2025',
  },
  {
    id: 29,
    name: 'Loa gaming Logitech Z623',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/logitech_z623_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Loa gaming 2.1, 200W RMS, THX certified, subwoofer.',
    ordered: 19,
    total: 55,
    endDate: '30/09/2025',
  },
  {
    id: 30,
    name: 'Bàn phím cơ Leopold FC900R',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/leopold_fc900r_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Bàn phím cơ full-size, PBT keycaps, Cherry switches.',
    ordered: 11,
    total: 35,
    endDate: '25/09/2025',
  },
  {
    id: 31,
    name: 'Chuột gaming Razer DeathAdder V3 Pro',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/razer_deathadder_v3_pro_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Chuột gaming không dây, 30K DPI, 70 giờ pin, siêu nhẹ.',
    ordered: 15,
    total: 40,
    endDate: '15/09/2025',
  },
  {
    id: 32,
    name: 'Màn hình Samsung CRG9',
    url: '#',
    image:
      'https://file.hstatic.net/1000069970/collection/samsung_crg9_4d816eab8c1c4942940f59d9599beb4b_large.jpg',
    description: 'Màn hình ultrawide 49 inch, 5120x1440, 120Hz, FreeSync 2.',
    ordered: 7,
    total: 20,
    endDate: '08/09/2025',
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
              <a href='/' className='text-gray-700 hover:text-blue-600 cursor-pointer'>
                Trang chủ
              </a>
            </li>
            <li>
              <div className='flex items-center'>
                <span className='mx-2 text-gray-400'>/</span>
                <a
                  href='/products'
                  className='text-gray-700 hover:text-blue-600 cursor-pointer'
                >
                  Sản phẩm
                </a>
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
              {hashtags.slice(0, 4).map((tag: { label: string; url: string }) => (
                <button
                  key={tag.label}
                  className={`rounded-full bg-white px-7 py-2 text-base font-semibold text-black shadow-sm transition-all hover:bg-sky-400 hover:font-bold hover:text-white cursor-pointer`}
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
                    <button className='w-fit self-start rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold text-white shadow transition hover:bg-red-700 cursor-pointer sm:px-8 sm:py-2 sm:text-base'>
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
              <button 
                className='flex items-center gap-1 rounded-full bg-[#E30613] px-4 py-1.5 text-sm font-bold text-white shadow transition hover:bg-red-700 sm:gap-2 sm:px-8 sm:py-2 sm:text-lg cursor-pointer'
                onClick={() => handleHashtagClick('/products?category=all-categories')}
              >
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
                  className='flex h-16 min-h-[64px] w-16 min-w-[64px] flex-col items-center justify-center rounded-2xl bg-white shadow transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer sm:h-28 sm:min-h-[96px] sm:w-28 sm:min-w-[96px]'
                  onClick={() => handleHashtagClick(cat.url)}
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
                            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-1 shadow-lg cursor-pointer'
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
                <div className='relative max-w-6xl mx-auto'>
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
                              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg cursor-pointer'
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
