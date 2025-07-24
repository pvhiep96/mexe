'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface BrandProduct {
  id: number;
  name: string;
  image: string;
  original_price: string;
  discounted_price: string;
  discount: string;
}

const brandProducts: BrandProduct[] = [
  {
    id: 1,
    name: 'Ghế ngồi chicco',
    image: '/images/demo-new-brands/demo-new-brand-1.png',
    original_price: '1,300,000đ',
    discounted_price: '975,000đ',
    discount: '-25%'
  },
  {
    id: 2,
    name: 'Ghế ngồi oto Nuna',
    image: '/images/demo-new-brands/demo-new-brand-2.png',
    original_price: '1,140,000đ',
    discounted_price: '741,000đ',
    discount: '-35%'
  },
  {
    id: 3,
    name: 'Gofa',
    image: '/images/demo-new-brands/demo-new-brand-3.png',
    original_price: '1,255,000đ',
    discounted_price: '727,900đ',
    discount: '-42%'
  },
  {
    id: 4,
    name: 'Nước hoa oto',
    image: '/images/demo-new-brands/demo-new-brand-4.png',
    original_price: '1,080,000đ',
    discounted_price: '680,400đ',
    discount: '-37%'
  }
];

export default function NewBrands() {
  // Countdown state
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number }>({ days: 1, hours: 11, minutes: 12, seconds: 32 });
  const [slider, setSlider] = useState(0);
  const visible = 4;

  useEffect(() => {
    const end = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000 + 12 * 60 * 1000 + 32 * 1000);
    const timer = setInterval(() => {
      const now = new Date();
      let diff = Math.max(0, end.getTime() - now.getTime());
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((diff / (1000 * 60)) % 60);
      let seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => {
    if (slider > 0) setSlider(slider - 1);
  };
  const next = () => {
    if (slider < brandProducts.length - visible) setSlider(slider + 1);
  };

  return (
    <div>
      {/* Desktop version */}
      <div className="hidden lg:block">
        <section className="w-full py-8 flex justify-center items-center bg-transparent">
          <div className="w-full max-w-7xl mx-auto px-4 relative">
            {/* Nền đỏ phía sau */}
            <div className="absolute inset-x-0 top-0 z-0 h-[320px] rounded-3xl bg-[#E53935]"></div>
            {/* Nội dung phía trên */}
            <div className="relative z-10">
              {/* Header + countdown */}
              <div className="px-6 pt-6">
                <button className="absolute right-10 top-10 border border-white text-white font-bold rounded-full px-6 py-2 flex items-center gap-2 hover:bg-white hover:text-[#E53935] transition">
                  XEM THÊM <ChevronRightIcon className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">⚡</span>
                  <h2 className="text-3xl font-extrabold text-white">Thương hiệu mới - Tung deal xịn đặc biệt</h2>
                </div>
                <div className="flex items-center gap-6 mb-6">
                  <div className="bg-white rounded-full px-6 py-3 flex items-center gap-6">
                    <div className="text-[#E53935] font-semibold text-lg">Deal này sắp hết thời gian</div>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-center"><span className="text-3xl font-bold text-[#E53935]">{String(timeLeft.days).padStart(2, '0')}</span><span className="text-xs text-gray-500">ngày</span></div>
                      <span className="text-2xl font-bold text-[#E53935]">:</span>
                      <div className="flex flex-col items-center"><span className="text-3xl font-bold text-[#E53935]">{String(timeLeft.hours).padStart(2, '0')}</span><span className="text-xs text-gray-500">giờ</span></div>
                      <span className="text-2xl font-bold text-[#E53935]">:</span>
                      <div className="flex flex-col items-center"><span className="text-3xl font-bold text-[#E53935]">{String(timeLeft.minutes).padStart(2, '0')}</span><span className="text-xs text-gray-500">phút</span></div>
                      <span className="text-2xl font-bold text-[#E53935]">:</span>
                      <div className="flex flex-col items-center"><span className="text-3xl font-bold text-[#E53935]">{String(timeLeft.seconds).padStart(2, '0')}</span><span className="text-xs text-gray-500">giây</span></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Slider sản phẩm */}
              <div className="p-6 pt-[90px] mt-[-80px] relative z-10">
                <div className="relative">
                  {/* Nút prev */}
                  <button onClick={prev} disabled={slider === 0} className="absolute left-[-30px] top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow z-10 disabled:opacity-40 disabled:cursor-not-allowed">
                    <ChevronLeftIcon className="w-6 h-6 text-[#E53935]" />
                  </button>
                  {/* Slider */}
                  <div className="overflow-hidden">
                    <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${slider * 270}px)` }}>
                      {brandProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-lg w-[250px] flex-shrink-0 mx-2 relative overflow-hidden border border-gray-200">
                          <div className="absolute left-0 top-0 w-full flex flex-col items-start z-10">
                            <div className="bg-[#E53935] text-white text-xs font-bold px-3 py-1 rounded-tr-2xl">HÀNG XỊN GIÁ HỜI <span className='ml-1'>🚚</span></div>
                            <div className="bg-white text-[#E53935] text-xs font-bold px-3 py-1 rounded-bl-2xl mt-1">GIAO HÀNG NGAY</div>
                          </div>
                          <Image src={product.image} alt={product.name} width={250} height={160} className="w-full h-40 object-cover" />
                          <div className="font-bold text-base mt-2 px-2 text-gray-900 line-clamp-2">{product.name}</div>
                          <div className="flex items-center gap-2 mt-2 px-2">
                            <span className="text-gray-500 text-sm line-through">Giá niêm yết: {product.original_price}</span>
                          </div>
                          <div className="flex items-center gap-2 px-2 mb-2">
                            <span className="text-xl font-bold text-[#E53935]">{product.discounted_price}</span>
                            <span className="bg-[#E53935] text-white text-xs font-bold px-2 py-1 rounded">{product.discount}</span>
                          </div>
                          <div className="flex pb-3 gap-2 px-2">
                            <button className="bg-gray-100 text-gray-800 font-bold rounded-full px-4 py-2 text-xs">XEM THÊM</button>
                            <button className="bg-[#0A115F] text-white font-bold rounded-full px-4 py-2 text-xs">MUA NGAY</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Nút next */}
                  <button onClick={next} disabled={slider >= brandProducts.length - visible} className="absolute right-[-30px] top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow z-10 disabled:opacity-40 disabled:cursor-not-allowed">
                    <ChevronRightIcon className="w-6 h-6 text-[#E53935]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Mobile version */}
      <div className="block lg:hidden">
        <section className="w-full bg-white py-4">
          <div className="max-w-xs mx-auto px-2">
            <h2 className="text-lg font-extrabold mb-4 text-center">THƯƠNG HIỆU MỚI</h2>
            <div className="flex overflow-x-auto gap-3 pb-2">
              {brandProducts.map((product) => (
                <div key={product.id} className="min-w-[140px] bg-white rounded-xl shadow p-2 flex flex-col items-center">
                  <Image src={product.image} alt={product.name} width={80} height={80} className="w-20 h-20 object-cover rounded-lg mb-1" />
                  <div className="text-xs font-bold text-center">{product.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
