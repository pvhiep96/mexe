'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

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
  const [sliders, setSliders] = useState([0, 0, 0, 0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const visible = 3;

  const tabs: Tab[] = [
    { name: 'Dự án thịnh hành' },
    { name: 'Mới ra mắt' },
    { name: 'Sắp kết thúc' },
    { name: 'Sắp về hàng' },
    { name: 'Xem tất cả' },
  ];

  const products: Product[][] = [
    [
      {
        id: 1,
        name: 'Skoda sắp mở bán',
        img: '/images/demo-preorder/preorder-1.png',
        badge: 'PRE-ORDER',
        badgeColor: 'bg-red-600',
        ordered: 2,
        total: 30,
        end: '25/07/2025',
        percent: 7,
        tag: 'Mới ra mắt',
        tagColor: 'bg-[#0A115F]',
        tagText: 'text-white',
      },
      {
        id: 2,
        name: 'Suzuki Swift sắp mở bán',
        img: '/images/demo-preorder/preorder-2.png',
        badge: 'PRE-ORDER',
        badgeColor: 'bg-red-600',
        ordered: 24,
        total: 100,
        end: '12/07/2025',
        percent: 24,
        tag: 'Mới ra mắt',
        tagColor: 'bg-[#0A115F]',
        tagText: 'text-white',
      },
      {
        id: 3,
        name: 'Vin EC sắp mở bán',
        img: '/images/demo-preorder/preorder-3.png',
        badge: 'PRE-ORDER',
        badgeColor: 'bg-red-600',
        ordered: 9,
        total: 60,
        end: '04/07/2025',
        percent: 15,
        tag: 'Mới ra mắt',
        tagColor: 'bg-[#0A115F]',
        tagText: 'text-white',
      },
      {
        id: 4,
        name: 'Skoda sắp mở bán',
        img: '/images/demo-preorder/preorder-1.png',
        badge: 'PRE-ORDER',
        badgeColor: 'bg-red-600',
        ordered: 5,
        total: 20,
        end: '30/07/2025',
        percent: 25,
        tag: 'Mới ra mắt',
        tagColor: 'bg-[#0A115F]',
        tagText: 'text-white',
      },
      {
        id: 5,
        name: 'Suzuki Swift sắp mở bán',
        img: '/images/demo-preorder/preorder-2.png',
        badge: 'PRE-ORDER',
        badgeColor: 'bg-red-600',
        ordered: 12,
        total: 40,
        end: '01/08/2025',
        percent: 30,
        tag: 'Mới ra mắt',
        tagColor: 'bg-[#0A115F]',
        tagText: 'text-white',
      },
    ],
    [
      {
        id: 6,
        name: 'Cheerdots2 - Chuột Không Dây Thông Minh 4-in-1 | Touchpad, ChatGPT, Ghi Âm, Trình Chiếu Chuyên Nghiệp',
        img: '/images/demo-preorder/preorder-3.png',
        badge: 'MỚI RA MẮT',
        badgeColor: 'bg-blue-600',
        ordered: 81,
        total: 300,
        end: '',
        percent: 27,
        tag: 'Đã bán đợt 1: 300',
        tagColor: 'bg-[#0A115F]',
        tagText: 'text-white',
      },
      {
        id: 7,
        name: 'Sản phẩm 2',
        img: '/images/demo-preorder/preorder-1.png',
        badge: 'MỚI RA MẮT',
        badgeColor: 'bg-blue-600',
        ordered: 10,
        total: 50,
        end: '',
        percent: 20,
        tag: 'Đã bán đợt 1: 300',
        tagColor: 'bg-[#0A115F]',
        tagText: 'text-white',
      },
      {
        id: 8,
        name: 'Sản phẩm test slide',
        img: '/images/demo-preorder/preorder-2.png',
        badge: 'MỚI RA MẮT',
        badgeColor: 'bg-blue-600',
        ordered: 5,
        total: 20,
        end: '',
        percent: 25,
        tag: 'Đã bán đợt 1: 300',
        tagColor: 'bg-[#0A115F]',
        tagText: 'text-white',
      },
      {
        id: 9,
        name: 'Sản phẩm 4',
        img: '/images/demo-preorder/preorder-3.png',
        badge: 'MỚI RA MẮT',
        badgeColor: 'bg-blue-600',
        ordered: 7,
        total: 30,
        end: '',
        percent: 23,
        tag: 'Đã bán đợt 1: 300',
        tagColor: 'bg-[#0A115F]',
        tagText: 'text-white',
      },
    ],
    [],
    [],
    [],
  ];

  // Logic băng chuyền vô tận - PREV DISABLED KHI Ở ĐẦU, NEXT LUÔN HOẠT ĐỘNG
  const prev = () => {
    if (sliders[activeTab] > 0) {
      const newSliders = [...sliders];
      newSliders[activeTab]--;
      setSliders(newSliders);
    }
  };

  const next = () => {
    // Luôn tăng lên, tạo hiệu ứng băng chuyền liên tục
    // Khi slider dương, chúng ta sẽ thấy items từ đầu
    // Khi slider = 0, bấm next sẽ hiển thị items từ đầu
    const newSliders = [...sliders];
    newSliders[activeTab]++;
    setSliders(newSliders);
  };

  // Tạo mảng products lặp lại để tạo băng chuyền vô tận
  const getVisibleProducts = (tabIndex: number) => {
    const currentProducts = products[tabIndex];
    if (!currentProducts || currentProducts.length === 0) return [];

    // Tạo mảng products lặp lại đơn giản để tạo băng chuyền vô tận
    let conveyorProducts = [];

    // Thêm products gốc
    conveyorProducts.push(...currentProducts);

    // Thêm products lặp lại 5 lần để đảm bảo đủ items
    for (let i = 0; i < 5; i++) {
      conveyorProducts.push(...currentProducts);
    }

    // Thêm products lặp lại 5 lần ở đầu cho Prev
    for (let i = 0; i < 5; i++) {
      conveyorProducts.unshift(...currentProducts);
    }

    return conveyorProducts.map((product, index) => ({
      ...product,
      key: `product-${tabIndex}-${index}`,
      originalIndex: index % currentProducts.length,
    }));
  };

  const getTagText = (tabIndex: number) => {
    switch (tabIndex) {
      case 0:
        return 'Mới ra mắt';
      case 1:
        return 'Đã bán đợt 1: 300';
      default:
        return '';
    }
  };

  const getEndText = (
    product: Product,
    tabIndex: number,
    productIndex: number
  ) => {
    if (tabIndex === 0) {
      return `Chiến dịch kết thúc: ${product.end}`;
    } else if (tabIndex === 1) {
      return 'Sản phẩm đang về hàng';
    }
    return '';
  };

  return (
    <div>
      {/* Desktop version */}
      <div className='hidden lg:block'>
        <section className='w-full bg-[#0A115F]/10 py-8'>
          <div className='mx-auto max-w-7xl px-4'>
            <div className='flex flex-col items-center'>
              <h2 className='mb-4 text-center text-3xl font-extrabold tracking-wide text-gray-800'>
                CÙNG MEXE ĐẶT HÀNG VỀ TAY SỚM NHẤT
              </h2>

              <div className='w-full'>
                {/* Tabs */}
                <div className='mb-6 flex w-full justify-center'>
                  <div className='inline-flex items-center rounded-full border border-gray-300 bg-white px-2 py-1'>
                    {tabs.map((tab, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTab(i)}
                        className={`mx-1 transition-all duration-200 ${
                          i === tabs.length - 1
                            ? 'ml-2 flex items-center rounded-full border border-gray-400 bg-white px-6 py-2 font-bold text-[#0A115F] transition hover:bg-gray-100'
                            : activeTab === i
                              ? 'rounded-full bg-[#0A115F] px-6 py-2 font-bold text-white'
                              : 'rounded-full bg-white px-6 py-2 font-medium text-[#0A115F] transition hover:bg-[#0A115F]/10'
                        } `}
                      >
                        <span className='text-[10px]'>{tab.name}</span>
                        {i === tabs.length - 1 && (
                          <ChevronRightIcon className='ml-1 h-4 w-4' />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab content as slider */}
                <div className='relative w-full'>
                  {products[activeTab].length > 0 ? (
                    <div className='flex items-center'>
                      {/* Prev button */}
                      <button
                        onClick={prev}
                        disabled={sliders[activeTab] === 0}
                        className='mr-2 rounded-full bg-white p-2 shadow transition-all duration-300 disabled:opacity-40 cursor-pointer'
                        style={{
                          cursor: sliders[activeTab] === 0 ? 'not-allowed !important' : 'pointer !important'
                        }}
                      >
                        <ChevronLeftIcon className='h-6 w-6 text-gray-700' />
                      </button>

                      {/* Slider */}
                      <div className='w-full overflow-hidden'>
                        <div
                          className='flex transition-transform duration-500 ease-in-out'
                          style={{
                            transform: `translateX(-${sliders[activeTab] * 340}px)`,
                          }}
                        >
                          {getVisibleProducts(activeTab).map((product, idx) => (
                            <div
                              key={product.key}
                              className='relative mx-2 h-[420px] w-[320px] flex-shrink-0 overflow-hidden rounded-2xl bg-white p-0 shadow-lg transition-all duration-500 hover:shadow-xl cursor-pointer'
                              onClick={() => window.open('/products/2', '_blank')}
                            >
                              {/* Ảnh nền phủ tràn */}
                              <Image
                                src={product.img}
                                alt={product.name}
                                fill
                                className='z-0 object-cover'
                              />
                              {/* Overlay tối */}
                              <div className='bg-opacity-40 absolute inset-0 z-10 bg-black'></div>

                              {/* Badge */}
                              <div className='absolute top-0 left-0 z-20'>
                                <div
                                  className={`${product.badgeColor} rounded-tr-2xl rounded-bl-2xl px-3 py-1 text-xs font-bold text-white`}
                                >
                                  {product.badge}{' '}
                                  <span className='ml-1'>i</span>
                                </div>
                              </div>

                              {/* Nội dung trên ảnh */}
                              <div className='relative z-20 flex h-full flex-col justify-end p-4'>
                                {/* Tag */}
                                <div
                                  className={`text-base font-semibold text-white ${product.tagColor} mb-2 inline-block rounded px-3 py-1`}
                                >
                                  {getTagText(activeTab)}
                                </div>

                                <div className='mb-1 text-base font-bold text-white'>
                                  {product.name}
                                </div>

                                {/* Số lượng đã đặt */}
                                <div className='mb-1 text-sm text-white'>
                                  Số lượng đã đặt:{' '}
                                  <span className='font-bold'>
                                    {product.ordered}/{product.total}
                                  </span>
                                </div>

                                {/* Progress bar */}
                                <div className='bg-opacity-30 mb-1 h-2 w-full overflow-hidden rounded bg-white'>
                                  <div
                                    className={`${product.badgeColor.replace('bg-', 'bg-opacity-70 bg-')} h-2 rounded`}
                                    style={{ width: `${product.percent}%` }}
                                  ></div>
                                </div>

                                {/* Ngày kết thúc */}
                                <div className='text-xs text-white'>
                                  {getEndText(product, activeTab, idx)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Next button - Không bao giờ disabled trong slider vòng tròn */}
                      <button
                        onClick={next}
                        className='ml-2 rounded-full bg-white p-2 shadow transition-all duration-300 cursor-pointer'
                        style={{
                          cursor: 'pointer !important'
                        }}
                      >
                        <ChevronRightIcon className='h-6 w-6 text-gray-700' />
                      </button>
                    </div>
                  ) : (
                    <div className='py-12 text-center text-gray-500'>
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
      <div className='block lg:hidden'>
        <section className='w-full bg-[#0A115F]/10 py-4'>
          <div className='container mx-auto px-4'>
            <h2 className='mb-4 text-center text-lg font-extrabold tracking-wide text-[#0A115F]'>
              ĐẶT HÀNG SỚM
            </h2>
            
            {/* Mobile Custom Dropdown */}
            <div className='mb-4 flex w-full justify-center'>
              <div className='relative'>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className='flex items-center justify-between rounded-full border border-gray-300 bg-white px-4 py-2.5 pr-8 text-sm font-medium text-[#0A115F] shadow-sm transition-all duration-200 hover:border-[#0A115F] hover:shadow-md focus:border-[#0A115F] focus:outline-none focus:ring-2 focus:ring-[#0A115F]/20'
                >
                  <span className='mr-2'>{tabs[activeTab].name}</span>
                  <ChevronDownIcon className={`h-4 w-4 text-[#0A115F] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className='absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-gray-200 bg-white py-2 shadow-lg'>
                    {tabs.map((tab, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setActiveTab(i);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl hover:bg-[#0A115F]/5 ${
                          activeTab === i 
                            ? 'bg-[#0A115F]/10 text-[#0A115F] font-semibold' 
                            : 'text-gray-700 hover:text-[#0A115F]'
                        }`}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Mobile slider với dropdown */}
            <div 
              className='flex gap-3 overflow-x-auto pb-2'
              style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none', /* Internet Explorer 10+ */
              }}
            >
              {/* Ẩn scrollbar cho Webkit browsers (Chrome, Safari, Edge) */}
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              {products[activeTab].slice(0, 3).map((product, index) => (
                <div
                  key={`mobile-early-${activeTab}-${index}`}
                  className='flex min-w-[220px] flex-col items-center rounded-lg bg-white p-3 shadow hover:shadow-lg cursor-pointer transition-shadow duration-300'
                  onClick={() => window.open('/products/2', '_blank')}
                >
                  <Image
                    src={product.img}
                    alt={product.name}
                    width={220}
                    height={176}
                    className='mb-1 h-36 sm:h-40 w-full rounded object-cover'
                  />
                  <div className='mb-1 text-center text-xs font-bold'>
                    {product.name}
                  </div>
                  <div className='mb-1 flex items-center gap-1'>
                    <span className='text-[10px] text-gray-500 line-through'>
                      1,300,000đ
                    </span>
                    <span className='text-xs font-bold text-[#E53935]'>
                      975,000đ
                    </span>
                    <span className='rounded bg-[#E53935] px-1 py-0.5 text-[10px] font-bold text-white'>
                      -25%
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      // Chỉ hiển thị thông báo đơn giản, không thêm vào giỏ hàng
                      alert('Đặt hàng thành công!');
                    }}
                    className='mt-1 rounded-full bg-[#0A115F] px-2 py-1 text-xs font-bold text-white'
                  >
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
