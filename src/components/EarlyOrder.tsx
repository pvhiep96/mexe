'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Product as APIProduct } from '@/services/api';
import { useCart } from '@/context/CartContext';
import { useFlashTooltip } from '@/context/FlashTooltipContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

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
  price?: number;
}

interface Tab {
  name: string;
}

interface EarlyOrderProps {
  featuredProducts?: APIProduct[];
}

export default function EarlyOrder({ featuredProducts = [] }: EarlyOrderProps) {
  const t = useTranslations('early_order');
  const { addToCart } = useCart();
  const { showTooltip } = useFlashTooltip();
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

  // Convert API products to component format
  const convertApiProductsToLocalFormat = (apiProducts: APIProduct[]): Product[] => {
    return apiProducts.map((apiProduct, index) => {
      const primaryImage = apiProduct.images?.find(img => img.is_primary) || apiProduct.images?.[0];
      const imageUrl = primaryImage?.image_url || '/images/demo-preorder/preorder-1.png';
      
      // Calculate mock ordered data based on view count and stock
      const mockOrdered = Math.min(
        Math.floor(apiProduct.view_count / 10) || Math.floor(Math.random() * 20) + 5,
        apiProduct.stock_quantity
      );
      const mockTotal = apiProduct.stock_quantity || 100;
      const mockPercent = Math.floor((mockOrdered / mockTotal) * 100);
      
      return {
        id: apiProduct.id,
        name: apiProduct.name,
        img: imageUrl,
        badge: apiProduct.is_preorder ? 'PRE-ORDER' : 
               apiProduct.is_new ? 'MỚI RA MẮT' : 
               apiProduct.is_hot ? 'HOT' : 
               apiProduct.is_featured ? 'ĐẶC BIỆT' : 'SẢN PHẨM',
        badgeColor: apiProduct.is_preorder ? 'bg-red-600' : 
                   apiProduct.is_new ? 'bg-blue-600' : 
                   apiProduct.is_hot ? 'bg-orange-600' : 
                   apiProduct.is_featured ? 'bg-purple-600' : 'bg-gray-600',
        ordered: mockOrdered,
        total: mockTotal,
        end: apiProduct.preorder_end_date || '25/12/2025',
        percent: mockPercent,
        tag: apiProduct.is_new ? 'Mới ra mắt' : 'Sản phẩm hot',
        tagColor: 'bg-[#0A115F]',
        tagText: 'text-white',
        price: parseInt(apiProduct.price),
      };
    });
  };

  // Create product tabs based on API data
  const createProductTabs = (): Product[][] => {
    if (!featuredProducts.length) {
      // Return empty arrays for all tabs if no products
      return [[], [], [], [], []];
    }

    const allProducts = convertApiProductsToLocalFormat(featuredProducts);
    
    // Filter products by type for different tabs
    const trendingProjects = allProducts.filter(p => p.badge === 'HOT' || p.badge === 'ĐẶC BIỆT');
    const newLaunched = allProducts.filter(p => p.badge === 'MỚI RA MẮT');
    const preorderProducts = allProducts.filter(p => p.badge === 'PRE-ORDER');
    const comingSoon = allProducts.filter(p => p.badge === 'SẢN PHẨM');
    
    return [
      trendingProjects.length ? trendingProjects : allProducts.slice(0, 5),
      newLaunched.length ? newLaunched : allProducts.slice(5, 10),
      preorderProducts.length ? preorderProducts : allProducts.slice(10, 15),
      comingSoon.length ? comingSoon : allProducts.slice(15, 20),
      allProducts, // Show all for "Xem tất cả" tab
    ];
  };

  const products = createProductTabs();

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
                    {featuredProducts[index]?.original_price && (
                      <span className='text-[10px] text-gray-500 line-through'>
                        {parseInt(featuredProducts[index].original_price).toLocaleString()}đ
                      </span>
                    )}
                    <span className='text-xs font-bold text-[#E53935]'>
                      {parseInt(featuredProducts[index]?.price || '0').toLocaleString()}đ
                    </span>
                    {featuredProducts[index]?.discount_percent && (
                      <span className='rounded bg-[#E53935] px-1 py-0.5 text-[10px] font-bold text-white'>
                        -{featuredProducts[index].discount_percent}%
                      </span>
                    )}
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Thêm vào giỏ hàng
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price || 0,
                        image: product.img,
                        quantity: 1,
                      }, 1);
                      showTooltip('Đã thêm vào giỏ hàng thành công!', 'success');
                    }}
                    className='mt-1 rounded-full bg-blue-600 px-2 py-1 text-xs font-bold text-white flex items-center gap-1'
                  >
                    <ShoppingCartIcon className='h-3 w-3' />
                    Thêm giỏ hàng
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
