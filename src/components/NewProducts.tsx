'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Product {
  id: number;
  name: string;
  images: string[];
  open_date: string;
  open_time: Date;
  sold_count: number;
  description: string;
}

export default function NewProducts() {
  const t = useTranslations('new_products');
  const [current, setCurrent] = useState(0);
  const [countdowns, setCountdowns] = useState<Array<{ [key: string]: number }>>([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: 'Bàn Phím Cơ NuPhy Kick75 | Bàn Phím Cơ Không Dây',
      images: [
        '/images/demo-new-products/new-pro-1.png',
        '/images/demo-new-products/new-pro-2.png',
        '/images/demo-new-products/new-pro-3.png'
      ],
      open_date: '15/07/2025',
      open_time: new Date('2025-07-15T00:00:00'),
      sold_count: 100000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
    },
    {
      id: 2,
      name: '(WAREHOUSE DEAL) Bàn Làm Việc Thông Minh Gỗ Sồi',
      images: [
        '/images/demo-new-products/new-pro-1.png',
        '/images/demo-new-products/new-pro-2.png',
        '/images/demo-new-products/new-pro-3.png'
      ],
      open_date: '01/07/2025',
      open_time: new Date('2025-07-01T00:00:00'),
      sold_count: 85000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
    },
    {
      id: 3,
      name: 'Máy Ảnh Polaroid Mini D1 Pro - Tự Do In Ảnh',
      images: [
        '/images/demo-new-products/new-pro-1.png',
        '/images/demo-new-products/new-pro-2.png',
        '/images/demo-new-products/new-pro-3.png'
      ],
      open_date: '03/07/2025',
      open_time: new Date('2025-07-03T00:00:00'),
      sold_count: 120000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
    },
    {
      id: 4,
      name: 'Đèn Bàn LED Chống Cận Thông Minh',
      images: [
        '/images/demo-new-products/new-pro-1.png',
        '/images/demo-new-products/new-pro-2.png',
        '/images/demo-new-products/new-pro-3.png'
      ],
      open_date: '10/07/2025',
      open_time: new Date('2025-07-10T00:00:00'),
      sold_count: 95000,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
    },
  ];

  const getIndex = (idx: number) => {
    return (idx + products.length) % products.length;
  };

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const goTo = (idx: number) => {
    setCurrent(idx);
  };

  const updateCountdowns = () => {
    const newCountdowns = products.map((p) => {
      const now = new Date();
      let diff = Math.max(0, p.open_time.getTime() - now.getTime());
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      let mins = Math.floor((diff / (1000 * 60)) % 60);
      let secs = Math.floor((diff / 1000) % 60);
      return { 'Ngày': days, 'Giờ': hours, 'Phút': mins, 'Giây': secs };
    });
    setCountdowns(newCountdowns);
  };

  useEffect(() => {
    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Desktop version */}
      <div className="hidden lg:block">
        <section className="w-full py-6 px-6 flex items-center justify-center" style={{ height: '440px' }}>
          <div className="mx-auto px-4 w-full h-full flex flex-col justify-center items-center overflow-visible relative">
            <div className="flex flex-col items-center justify-center w-full">
              <h2 className="text-2xl font-bold mb-2 text-[#0A115F]">SẢN PHẨM BÁN CHẠY</h2>
              <button className="bg-gray-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-500 transition">
                Khám phá thêm
              </button>
            </div>
            
            <div className="relative w-full h-full flex-1 flex flex-col justify-center items-center overflow-visible">
              {/* Slider content */}
              <div className="flex justify-center items-center h-full overflow-visible relative min-h-[270px] w-full">
                {[-1, 0, 1].map((offset) => {
                  const product = products[getIndex(current + offset)];
                  if (!product) return null;
                  
                  return (
                    <div
                      key={`slide${offset}`}
                      className={`
                        bg-white rounded-2xl shadow-lg p-4 flex flex-row items-center transition-all duration-700 ease-in-out mx-2
                        ${offset === 0 ? 'z-20 scale-110' : 'z-10 scale-90'}
                        w-[520px] h-[250px] relative overflow-visible
                      `}
                      style={{ willChange: 'transform' }}
                    >
                      {/* Images */}
                      <div className="grid grid-cols-2 grid-rows-2 gap-0 mr-[5px] overflow-hidden" style={{ width: '210px', height: '200px' }}>
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={105}
                          height={100}
                          className="rounded-xl object-cover w-full h-full col-span-1 row-span-1"
                          style={{ objectPosition: 'center', gridRow: '1 / span 1', gridColumn: '1 / span 1' }}
                        />
                        <Image
                          src={product.images[2]}
                          alt={product.name}
                          width={105}
                          height={100}
                          className="rounded-xl object-cover w-full h-full col-span-1 row-span-1"
                          style={{ objectPosition: 'center', gridRow: '2 / span 1', gridColumn: '1 / span 1' }}
                        />
                        <Image
                          src={product.images[1]}
                          alt={product.name}
                          width={105}
                          height={200}
                          className="rounded-xl object-cover w-full h-full col-span-1 row-span-2"
                          style={{ objectPosition: 'center', gridRow: '1 / span 2', gridColumn: '2 / span 1' }}
                        />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between min-w-0 w-full pl-2 h-full">
                        <div>
                          <div 
                            className="font-semibold text-base leading-tight mb-1 truncate" 
                            style={{ maxWidth: '220px' }}
                          >
                            {product.name}
                          </div>
                          <div className="flex items-center text-gray-500 text-xs mb-1">
                            Đã bán: {product.sold_count.toLocaleString()} sản phẩm
                          </div>
                          <h1 className="text-sm font-semibold mb-1">Thông tin sản phẩm</h1>
                          <span className="text-xs text-gray-600">{product.description}</span>
                        </div>
                        <button className="bg-red-500 text-white font-bold rounded-full px-4 py-2 mt-2 hover:bg-red-600 transition w-[150px] text-[8px]">
                          Mua Ngay <span className="ml-1">🔔</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Left arrow */}
              <button 
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer z-10 transition-all duration-300 hover:scale-110"
              >
                <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
              </button>
              
              {/* Right arrow */}
              <button 
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer z-10 transition-all duration-300 hover:scale-110"
              >
                <ChevronRightIcon className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </section>
      </div>
      
      {/* Mobile version */}
      <div className="sm:hidden">
        <section className="w-full py-3 px-2 flex flex-col items-center justify-center bg-[#e5e5e5]">
          <div className="mx-auto w-full flex flex-col justify-center items-center overflow-visible relative">
            <div className="flex flex-col items-center justify-center mb-2 w-full">
              <h2 className="text-lg font-bold mb-1 text-white text-center">SẢN PHẨM BÁN CHẠY</h2>
              <button className="bg-gray-400 text-white px-4 py-1 rounded-full font-semibold hover:bg-gray-500 transition text-xs">
                Khám phá thêm
              </button>
            </div>
            
            <div className="relative w-full flex flex-col justify-center items-center overflow-visible">
              {/* Slider content */}
              <div className="flex flex-col items-center w-full relative min-h-[320px]">
                {[0].map((offset) => {
                  const product = products[getIndex(current + offset)];
                  if (!product) return null;
                  
                  return (
                    <div
                      key={`mobile-slide${offset}`}
                      className="bg-white rounded-xl shadow-lg p-2 flex flex-col items-center transition-all duration-700 ease-in-out w-full max-w-xs min-h-[320px] relative overflow-visible"
                      style={{ willChange: 'transform, opacity' }}
                    >
                      {/* Badge ngoài cùng */}
                      <div className="absolute -right-2 -top-2 z-30 group">
                        <div className="bg-green-500 text-white text-[10px] font-bold p-1 rounded-full flex flex-col items-center justify-center shadow-lg border border-dashed border-white w-8 h-8 aspect-square relative">
                          <span className="text-center leading-tight text-[7px]">COMING<br/>SOON</span>
                          {/* Icon i nổi bật, tràn ra ngoài badge */}
                          <span 
                            className="absolute -top-1.5 -right-1.5 bg-white text-green-500 rounded-full w-3 h-3 flex items-center justify-center font-normal shadow border border-white text-xs cursor-pointer z-40"
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                          >
                            i
                            {/* Tooltip */}
                            {showTooltip && (
                              <span className="absolute left-5 top-1/2 -translate-y-1/2 w-56 bg-white text-black text-xs rounded-xl border border-green-400 shadow-lg px-2 py-2 z-50 transition-all">
                                <span className="block font-semibold mb-1 text-green-500">Coming soon là gì?</span>
                                Comming soon là trạng thái một sản phẩm mới đã sẵn sàng ra mắt người dùng, tuy nhiên chúng tôi cần thời gian chuẩn bị một số khâu cuối cùng để đưa sản phẩm ra mắt chỉnh chu nhất đến các khách hàng.<br/>
                                Ngày ra mắt là ngày bạn có thể đặt hàng chính thức, nhưng bạn có thể đăng ký sớm để giữ slot ưu đãi.
                                {/* Mũi tên */}
                                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3">
                                  <svg viewBox="0 0 10 10" className="w-3 h-3">
                                    <polygon points="0,5 10,0 10,10" fill="#fff" stroke="#4ade80" strokeWidth="1"/>
                                  </svg>
                                </span>
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                      
                      {/* Images */}
                      <div className="grid grid-cols-2 grid-rows-2 gap-0 mb-2 overflow-hidden w-[140px] h-[120px] mx-auto">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={70}
                          height={60}
                          className="rounded-lg object-cover w-full h-full col-span-1 row-span-1"
                          style={{ objectPosition: 'center', gridRow: '1 / span 1', gridColumn: '1 / span 1' }}
                        />
                        <Image
                          src={product.images[2]}
                          alt={product.name}
                          width={70}
                          height={60}
                          className="rounded-lg object-cover w-full h-full col-span-1 row-span-1"
                          style={{ objectPosition: 'center', gridRow: '2 / span 1', gridColumn: '1 / span 1' }}
                        />
                        <Image
                          src={product.images[1]}
                          alt={product.name}
                          width={70}
                          height={120}
                          className="rounded-lg object-cover w-full h-full col-span-1 row-span-2"
                          style={{ objectPosition: 'center', gridRow: '1 / span 2', gridColumn: '2 / span 1' }}
                        />
                      </div>
                      
                      {/* Info */}
                      <div className="flex flex-col justify-between min-w-0 w-full px-1 h-full items-center">
                        <div className="w-full">
                          <div 
                            className="font-semibold text-xs leading-tight mb-1 truncate text-center" 
                            style={{ maxWidth: '160px' }}
                          >
                            {product.name}
                          </div>
                          <div className="flex items-center text-gray-500 text-[10px] mb-1 justify-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            Dự kiến ra mắt:
                          </div>
                          <div className="font-bold text-base text-gray-800 mb-1 text-center">0 GIỜ SÁNG</div>
                          <div className="bg-green-400 text-white font-bold text-xs px-2 py-1 rounded mb-2 inline-block mx-auto">
                            {product.open_date}
                          </div>
                          {/* Countdown */}
                          <div className="flex gap-1 justify-center mb-2 text-[10px]">
                            {Object.entries(countdowns[getIndex(current + offset)] || {}).map(([label, val]) => (
                              <div key={label} className="flex flex-col items-center">
                                <div className="font-bold text-xs">{val}</div>
                                <div className="text-[8px] text-gray-500">{label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <button className="bg-red-500 text-white font-bold rounded-full px-2 py-1 mt-2 hover:bg-red-600 transition w-full text-xs max-w-[120px] mx-auto">
                          ĐĂNG KÝ ĐẶT TRƯỚC <span className="ml-1">🔔</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Left/Right arrows for mobile */}
              <div className="flex justify-between w-full mt-2 px-2">
                <button 
                  onClick={prev}
                  className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-8 h-8 flex items-center justify-center shadow cursor-pointer z-10 transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeftIcon className="w-4 h-4 text-gray-700" />
                </button>
                <button 
                  onClick={next}
                  className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-8 h-8 flex items-center justify-center shadow cursor-pointer z-10 transition-all duration-300 hover:scale-110"
                >
                  <ChevronRightIcon className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
