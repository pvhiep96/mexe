'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import 'swiper/css';
import 'swiper/css/navigation';
import Slider from 'react-slick';
import ProductCard from './ProductCard';

export default function NewProducts() {
  const t = useTranslations('new_products');
  const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number } | null>(null);

  const handleMouseOver = (e: React.MouseEvent, content: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - 200;
    const y = e.clientY - 100; // Adjust based on tooltip height
    setTooltip({ content, x, y });
  };

  const handleMouseOut = () => {
    setTooltip(null);
  };
  const sliderRef = useRef<Slider>(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

interface Product {
  id: number;
  title: string;
  slug: string;
  images: string[];
  releaseDate: string;
  prices: {
    type: string;
    name: string;
    price: string;
    discount: string;
    active?: boolean;
  }[];
}

const products: Product[] = [
  {
    id: 1,
    title: '(WAREHOUSE DEAL) Bàn Làm Việc Thông Minh 9Space LivArt - Nâng Hạ Điện, Sạc Không Dây, Ngăn Kéo Tiện Lợi',
    slug: 'ban-nang-ha-9space-all-in-one',
    images: [
      'https://product.hstatic.net/1000069970/product/3_5ab5425c437a4c1a8ce51b0ff2ce0869_large.png',
      'https://product.hstatic.net/1000069970/product/6_d58a278b11b848dca3416e1a27f39a95_large.png',
      'https://product.hstatic.net/1000069970/product/2_a8c3eefda96448eab02418eb95e0db84_large.png',
    ],
    releaseDate: '2025-07-22T00:00:00+07:00',
    prices: [
      { type: 'dt', name: 'Đặt trước', price: '9,000,000₫', discount: '15%', active: true },
      { type: 'ud', name: 'Ưu đãi', price: '9,000,000₫', discount: '25%' },
      { type: 'tp', name: 'Tiên phong', price: '9,000,000₫', discount: '40%' },
      { type: 'fixed', name: 'Dự kiến', price: '9,000,000₫', discount: '' },
    ],
  },
  {
    id: 2,
    title: 'Bàn Phím Cơ Gaming GravaStar Mercury V75 Pro Special Edition Neon Graffiti - Switch Từ Tính Gateron Jade',
    slug: 'ban-phim-co-gaming-gravastar-mercury-v75-pro-special-edition-neon-graffiti',
    images: [
      'https://cdn.hstatic.net/products/1000069970/1_4c4d84436ead43de87f7633fca8096c5_large.png',
      'https://cdn.hstatic.net/products/1000069970/2_3db7255bf9d44d9e8f20e8730d63f7e0_large.png',
      'https://cdn.hstatic.net/products/1000069970/3_4aa7feb1782641d48896daf24ed3b903_large.png',
    ],
    releaseDate: '2025-08-01T00:00:00+07:00',
    prices: [
      { type: 'tp', name: 'Tiên phong', price: '8,496,000₫', discount: '40%', active: true },
      { type: 'ud', name: 'Ưu đãi', price: '10,620,000₫', discount: '25%' },
      { type: 'dt', name: 'Đặt trước', price: '12,036,000₫', discount: '15%' },
      { type: 'fixed', name: 'Dự kiến', price: '14,160,000₫', discount: '' },
    ],
  },
  {
    id: 3,
    title: 'Lofree Flow 2 - Chạm êm, gõ mượt, tích hợp touch bar, hỗ trợ VIA',
    slug: 'lofree-flow-2',
    images: [
      'https://product.hstatic.net/1000069970/product/20_7f8d06d44ebd4f00a96a8c9a989e099c_large.png',
      'https://product.hstatic.net/1000069970/product/t_i_xu_ng_dc16973f39fb470e9f79cca1d2d44a11_large.png',
      'https://product.hstatic.net/1000069970/product/10_e818149743e3401d9c536ade6ca1f98d_large.png',
    ],
    releaseDate: '2025-07-20T00:00:00+07:00',
    prices: [
      { type: 'tp', name: 'Tiên phong', price: '3,390,000₫', discount: '40%', active: true },
      { type: 'ud', name: 'Ưu đãi', price: '4,237,500₫', discount: '25%' },
      { type: 'dt', name: 'Đặt trước', price: '4,802,500₫', discount: '15%' },
      { type: 'fixed', name: 'Dự kiến', price: '5,650,000₫', discount: '' },
    ],
  },
];


  return (
    <div className='bg-gray-300 p-8 '>
    <section className="bg-gray-50 relative bg-gray-600  rounded-[20px]" id="home-coll-preorder"
    // style={{ backgroundImage: "url('/bg-vth.jpg')" }}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="https://file.hstatic.net/1000269366/file/untitled-19-02_2_5eb27e73131e4a08b8095e7258b2ed5a.png"
          alt="Vài Thứ Hay"
          width={1920}
          height={200}
          className="absolute top-0 w-full object-cover"
        />
        <Image
          src="https://file.hstatic.net/1000269366/file/untitled-19-02_3_211b3a0d6ebc4606856dab6877ff5db9.png"
          alt="Vài Thứ Hay"
          width={1920}
          height={200}
          className="absolute bottom-0 w-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10 pb-10">
        <div className="text-center">
          <div className="inline-block rounded">
            <h2 className="text-2xl md:text-3xl font-bold text-white p-4 bg-contain bg-no-repeat py-5 px-35"
            style={{ backgroundImage: "url('https://file.hstatic.net/1000269366/file/mask_group_1a09e296d36c4584be9093cb119d98c8.png')" }}
            >
              CHỌN LỰA SẢN PHẨM MỞ BÁN
              <span className="inline-block ml-2">
                <Image
                  src="https://file.hstatic.net/1000269366/file/icon-tt_1ea82d4d03ce4887ab28c48e00683acb.svg"
                  alt="Vài Thứ Hay"
                  width={24}
                  height={24}
                  className="inline"
                />
              </span>
            </h2>
          </div>
          <div className="">
            <Link href="/collections/coming-soon" className="rounded-full bg-gray-600 px-8 py-4 text-white font-semibold shadow-xl shadow-gray-400 hover:bg-yellow-400 hover:text-gray-700">
              Khám phá thêm <i className="fa fa-angle-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
        <div className="mt-16">
          <Slider {...sliderSettings} ref={sliderRef}>
            {products.map((product) => (
              <div className="p-4">
                <ProductCard product={product} handleMouseOver={handleMouseOver} handleMouseOut={handleMouseOut} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {tooltip && (
        <div
          id="tooltip-cms"
          className="fixed bg-white shadow-lg p-4 rounded max-w-xs z-50 text-sm"
          style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
        >
          {tooltip.content}
        </div>
      )}
    </section>
    </div>
  );

}
