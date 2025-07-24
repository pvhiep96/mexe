'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Product {
  id: number;
  name: string;
  img: string;
  badge: string;
  badgeColor: string;
  ordered: number;
  total: number;
  end: string;
  percent: number;
  tag: string;
  tagColor: string;
  tagText: string;
}

interface Tab {
  name: string;
}

export default function EarlyOrder() {
  const t = useTranslations('early_order');
  const [activeTab, setActiveTab] = useState(0);
  const [sliders, setSliders] = useState([0, 0, 0, 0, 0, 0]);
  const visible = 4;

  const tabs: Tab[] = [
    { name: 'Dự án thịnh hành' },
    { name: 'Mới ra mắt' },
    { name: 'Mở bán đợt 2' },
    { name: 'Sắp kết thúc' },
    { name: 'Sắp về hàng' },
    { name: 'Xem tất cả' }
  ];

  const products: Product[][] = [
    [
      { id: 1, name: 'Skoda sắp mở bán', img: '/images/demo-preorder/preorder-1.png', badge: 'PRE-ORDER', badgeColor: 'bg-red-600', ordered: 2, total: 30, end: '25/07/2025', percent: 7, tag: 'Mới ra mắt', tagColor: 'bg-[#0A115F]', tagText: 'text-white' },
      { id: 2, name: 'Suzuki Swift sắp mở bán', img: '/images/demo-preorder/preorder-2.png', badge: 'PRE-ORDER', badgeColor: 'bg-red-600', ordered: 24, total: 100, end: '12/07/2025', percent: 24, tag: 'Mới ra mắt', tagColor: 'bg-[#0A115F]', tagText: 'text-white' },
      { id: 3, name: 'Vin EC sắp mở bán', img: '/images/demo-preorder/preorder-3.png', badge: 'PRE-ORDER', badgeColor: 'bg-red-600', ordered: 9, total: 60, end: '04/07/2025', percent: 15, tag: 'Mới ra mắt', tagColor: 'bg-[#0A115F]', tagText: 'text-white' },
      { id: 4, name: 'Skoda sắp mở bán', img: '/images/demo-preorder/preorder-1.png', badge: 'PRE-ORDER', badgeColor: 'bg-red-600', ordered: 5, total: 20, end: '30/07/2025', percent: 25, tag: 'Mới ra mắt', tagColor: 'bg-[#0A115F]', tagText: 'text-white' },
      { id: 5, name: 'Suzuki Swift sắp mở bán', img: '/images/demo-preorder/preorder-2.png', badge: 'PRE-ORDER', badgeColor: 'bg-red-600', ordered: 12, total: 40, end: '01/08/2025', percent: 30, tag: 'Mới ra mắt', tagColor: 'bg-[#0A115F]', tagText: 'text-white' }
    ],
    [
      { id: 6, name: 'Cheerdots2 - Chuột Không Dây Thông Minh 4-in-1 | Touchpad, ChatGPT, Ghi Âm, Trình Chiếu Chuyên Nghiệp', img: '/images/demo-preorder/preorder-3.png', badge: 'MỚI RA MẮT', badgeColor: 'bg-blue-600', ordered: 81, total: 300, end: '', percent: 27, tag: 'Đã bán đợt 1: 300', tagColor: 'bg-[#0A115F]', tagText: 'text-white' },
      { id: 7, name: 'Sản phẩm 2', img: '/images/demo-preorder/preorder-1.png', badge: 'MỚI RA MẮT', badgeColor: 'bg-blue-600', ordered: 10, total: 50, end: '', percent: 20, tag: 'Đã bán đợt 1: 300', tagColor: 'bg-[#0A115F]', tagText: 'text-white' },
      { id: 8, name: 'Sản phẩm test slide', img: '/images/demo-preorder/preorder-2.png', badge: 'MỚI RA MẮT', badgeColor: 'bg-blue-600', ordered: 5, total: 20, end: '', percent: 25, tag: 'Đã bán đợt 1: 300', tagColor: 'bg-[#0A115F]', tagText: 'text-white' },
      { id: 9, name: 'Sản phẩm 4', img: '/images/demo-preorder/preorder-3.png', badge: 'MỚI RA MẮT', badgeColor: 'bg-blue-600', ordered: 7, total: 30, end: '', percent: 23, tag: 'Đã bán đợt 1: 300', tagColor: 'bg-[#0A115F]', tagText: 'text-white' }
    ],
    [
      { id: 10, name: 'Sản phẩm demo tab 3', img: '/images/demo-preorder/preorder-1.png', badge: 'MỞ BÁN ĐỢT 2', badgeColor: 'bg-gray-600', ordered: 0, total: 50, end: '', percent: 0, tag: 'Sắp mở bán', tagColor: 'bg-[#0A115F]', tagText: 'text-white' },
      { id: 11, name: 'Sản phẩm test slide', img: '/images/demo-preorder/preorder-2.png', badge: 'MỞ BÁN ĐỢT 2', badgeColor: 'bg-gray-600', ordered: 3, total: 10, end: '', percent: 30, tag: 'Sắp mở bán', tagColor: 'bg-[#0A115F]', tagText: 'text-white' },
      { id: 12, name: 'Sản phẩm 3', img: '/images/demo-preorder/preorder-3.png', badge: 'MỞ BÁN ĐỢT 2', badgeColor: 'bg-gray-600', ordered: 2, total: 20, end: '', percent: 10, tag: 'Sắp mở bán', tagColor: 'bg-[#0A115F]', tagText: 'text-white' },
      { id: 13, name: 'Sản phẩm 4', img: '/images/demo-preorder/preorder-1.png', badge: 'MỞ BÁN ĐỢT 2', badgeColor: 'bg-gray-600', ordered: 1, total: 5, end: '', percent: 20, tag: 'Sắp mở bán', tagColor: 'bg-[#0A115F]', tagText: 'text-white' }
    ],
    [], [], []
  ];

  const prev = () => {
    if (sliders[activeTab] > 0) {
      const newSliders = [...sliders];
      newSliders[activeTab]--;
      setSliders(newSliders);
    }
  };

  const next = () => {
    if (sliders[activeTab] < products[activeTab].length - visible) {
      const newSliders = [...sliders];
      newSliders[activeTab]++;
      setSliders(newSliders);
    }
  };

  const getTagText = (tabIndex: number) => {
    switch (tabIndex) {
      case 0: return 'Mới ra mắt';
      case 1: return 'Đã bán đợt 1: 300';
      case 2: return 'Sắp mở bán';
      default: return '';
    }
  };

  const getEndText = (product: Product, tabIndex: number, productIndex: number) => {
    if (tabIndex === 0) {
      return `Chiến dịch kết thúc: ${product.end}`;
    } else if (tabIndex === 1) {
      return 'Sản phẩm đang về hàng';
    } else if (tabIndex === 2) {
      return 'Sắp mở bán';
    }
    return '';
  };

  return (
    <div>
      {/* Desktop version */}
      <div className="hidden lg:block">
        <section className="w-full bg-[#0A115F]/10 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col items-center">
              <h2 className="font-extrabold text-3xl text-gray-800 mb-4 text-center tracking-wide">
                CÙNG MEXE ĐẶT HÀNG VỀ TAY SỚM NHẤT
              </h2>

              <div className="w-full">
                {/* Tabs */}
                <div className="flex justify-center w-full mb-6">
                  <div className="bg-white rounded-full border border-gray-300 inline-flex items-center px-2 py-1">
                    {tabs.map((tab, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTab(i)}
                        className={`
                          mx-1 transition-all duration-200
                          ${i === tabs.length - 1
                            ? 'ml-2 flex items-center border border-gray-400 text-[#0A115F] font-bold px-6 py-2 rounded-full bg-white hover:bg-gray-100 transition'
                            : activeTab === i
                              ? 'bg-[#0A115F] text-white font-bold px-6 py-2 rounded-full'
                              : 'bg-white text-[#0A115F] font-medium px-6 py-2 rounded-full hover:bg-[#0A115F]/10 transition'
                          }
                        `}
                      >
                        <span className="text-[10px]">{tab.name}</span>
                        {i === tabs.length - 1 && (
                          <ChevronRightIcon className="w-4 h-4 ml-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab content as slider */}
                <div className="w-full relative">
                  {products[activeTab].length > 0 ? (
                    <div className="flex items-center">
                      {/* Prev button */}
                      <button
                        onClick={prev}
                        disabled={sliders[activeTab] === 0}
                        className="rounded-full bg-white shadow p-2 mr-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
                      </button>

                      {/* Slider */}
                      <div className="overflow-hidden w-full">
                        <div
                          className="flex transition-transform duration-500 ease-in-out"
                          style={{ transform: `translateX(-${sliders[activeTab] * 340}px)` }}
                        >
                          {products[activeTab].map((product, idx) => (
                            <div
                              key={product.id}
                              className="bg-white rounded-2xl shadow-lg p-0 w-[320px] h-[420px] flex-shrink-0 relative mx-2 overflow-hidden transition-all duration-500"
                            >
                              {/* Ảnh nền phủ tràn */}
                              <Image
                                src={product.img}
                                alt={product.name}
                                fill
                                className="object-cover z-0"
                              />
                              {/* Overlay tối */}
                              <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

                              {/* Badge */}
                              <div className="absolute left-0 top-0 z-20">
                                <div className={`${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-tr-2xl rounded-bl-2xl`}>
                                  {product.badge} <span className="ml-1">i</span>
                                </div>
                              </div>

                              {/* Nội dung trên ảnh */}
                              <div className="relative z-20 flex flex-col justify-end h-full p-4">
                                {/* Tag */}
                                <div className={`font-semibold text-base text-white ${product.tagColor} px-3 py-1 rounded mb-2 inline-block`}>
                                  {getTagText(activeTab)}
                                </div>

                                <div className="font-bold text-base mb-1 text-white">{product.name}</div>

                                {/* Số lượng đã đặt */}
                                <div className="text-sm text-white mb-1">
                                  Số lượng đã đặt: <span className="font-bold">{product.ordered}/{product.total}</span>
                                </div>

                                {/* Progress bar */}
                                <div className="w-full h-2 bg-white bg-opacity-30 rounded mb-1 overflow-hidden">
                                  <div
                                    className={`${product.badgeColor.replace('bg-', 'bg-opacity-70 bg-')} h-2 rounded`}
                                    style={{ width: `${product.percent}%` }}
                                  ></div>
                                </div>

                                {/* Ngày kết thúc */}
                                <div className="text-xs text-white">
                                  {getEndText(product, activeTab, idx)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Next button */}
                      <button
                        onClick={next}
                        disabled={sliders[activeTab] >= products[activeTab].length - visible}
                        className="rounded-full bg-white shadow p-2 ml-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        <ChevronRightIcon className="w-6 h-6 text-gray-700" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-12">
                      Chưa có sản phẩm nào cho tab này.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile version */}
      <div className="block lg:hidden">
        <section className="w-full bg-[#0A115F]/10 py-4">
          <div className="max-w-xs mx-auto px-2">
            <h2 className="text-lg font-extrabold mb-4 text-center tracking-wide text-[#0A115F]">
              ĐẶT HÀNG SỚM
            </h2>
            {/* Example slider for mobile, repeat for each product */}
            <div className="flex overflow-x-auto gap-2 pb-2">
              {products[0].slice(0, 3).map((product) => (
                <div key={product.id} className="min-w-[180px] bg-white rounded-xl shadow p-2 flex flex-col items-center">
                  <Image
                    src={product.img}
                    alt={product.name}
                    width={180}
                    height={96}
                    className="w-full h-24 object-cover rounded mb-1"
                  />
                  <div className="font-bold text-xs text-center mb-1">{product.name}</div>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-gray-500 text-[10px] line-through">1,300,000đ</span>
                    <span className="text-xs font-bold text-[#E53935]">975,000đ</span>
                    <span className="bg-[#E53935] text-white text-[10px] font-bold px-1 py-0.5 rounded">-25%</span>
                  </div>
                  <button className="bg-[#0A115F] text-white font-bold rounded-full px-2 py-1 text-xs mt-1">
                    MUA NGAY
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
