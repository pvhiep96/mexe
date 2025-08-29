'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { useTranslations } from 'next-intl';
import { ProductType } from './types';
import Link from 'next/link';
// const PRODUCT_MOCK = {
//   id: 'den-led-xe-o-to-cao-cap',
//   name: 'Đèn LED Xe Ô Tô Cao Cấp – Ánh sáng trắng sáng, thiết kế hiện đại, tương thích đa dòng xe',
//   nameKey: 'den-led-xe-o-to-cao-cap',
//   price: 1250000,
//   image:
//     'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
//   images: [
//     'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop',
//     'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop',
//   ],
//   colors: [
//     { name: 'Trắng', value: 'white' },
//     { name: 'Vàng', value: '#2D6294' },
//   ],
//   description:
//     'Đèn LED xe ô tô cao cấp với công nghệ LED hiện đại, ánh sáng trắng sáng và rõ ràng, phù hợp cho nhiều dòng xe khác nhau. Sản phẩm được thiết kế với chất liệu cao cấp, chống nước và chống rung tốt, đảm bảo tuổi thọ lâu dài và hiệu suất ánh sáng tối ưu. Với thiết kế compact và dễ lắp đặt, đèn không chỉ cải thiện tầm nhìn khi lái xe mà còn tăng tính thẩm mỹ cho chiếc xe của bạn.',
//   brand: 'AUTOLIGHT',
//   brandDescription:
//     'AUTOLIGHT là thương hiệu chuyên về thiết bị chiếu sáng xe ô tô hàng đầu với hơn 15 năm kinh nghiệm trong lĩnh vực automotive lighting. Chúng tôi cam kết cung cấp những sản phẩm chất lượng cao, đáp ứng các tiêu chuẩn quốc tế về an toàn và hiệu suất. AUTOLIGHT tự hào là đối tác tin cậy của nhiều hãng xe lớn và được người tiêu dùng Việt Nam tin tưởng lựa chọn. Với đội ngũ kỹ thuật viên giàu kinh nghiệm và hệ thống bảo hành toàn quốc, AUTOLIGHT luôn đồng hành cùng khách hàng trong việc nâng cấp và bảo trì hệ thống chiếu sáng xe.',
//   services: [
//     { icon: '🚚', text: 'Miễn phí vận chuyển' },
//     { icon: '🔧', text: 'Lắp đặt miễn phí' },
//     { icon: '🛡️', text: 'Bảo hành 2 năm' },
//     { icon: '📞', text: 'Hỗ trợ 24/7' },
//   ],
//   specs: {
//     'Thương hiệu': 'AUTOLIGHT',
//     Model: 'AL-2024',
//     'Công suất': '35W',
//     'Điện áp': '12V/24V',
//     'Tuổi thọ': '50,000 giờ',
//     'Kích thước': '120 × 80 × 45mm',
//     'Trọng lượng': '280g',
//     'Chất liệu': 'Nhôm hợp kim + Kính cường lực',
//   },
//   quantity: 1,
// };
// interface Product {
//   id: string;
//   name: string;
//   nameKey: string;
//   price: number;
//   image: string;
//   discount?: number;
//   quantity: number;
// }
type ProductDetailProps = {
  product: ProductType;
};
export default function ProductDetail({ product }: ProductDetailProps) {
  const t = useTranslations('product_detail');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('white');
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullProductInfo, setShowFullProductInfo] = useState(true);
  const [showFullTargetAudience, setShowFullTargetAudience] = useState(false);
  const [showWarrantyPolicy, setShowWarrantyPolicy] = useState(false);
  const [showTechnicalSpecs, setShowTechnicalSpecs] = useState(true);
  const [showRealImages, setShowRealImages] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const product: Product = PRODUCT_MOCK;

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const { addToCart } = useCart();
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setSuccessMessage(t('add_to_cart_success'));
    setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3s
  };

  // Product images for slideshow
  const productImages = [
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
  ];

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8'>
        {/* Breadcrumb */}
        <nav className='mb-8 flex' aria-label='Breadcrumb'>
          <ol className='inline-flex items-center space-x-1 md:space-x-3'>
            <li className='inline-flex items-center'>
              <Link href='/' className='text-gray-700 hover:text-blue-600'>
                Trang chủ
              </Link>
            </li>
            <li>
              <div className='flex items-center'>
                <span className='mx-2 text-gray-400'>/</span>
                <Link
                  href='/products'
                  className='text-gray-700 hover:text-blue-600'
                >
                  Sản phẩm
                </Link>
              </div>
            </li>
            <li aria-current='page'>
              <div className='flex items-center'>
                <span className='mx-2 text-gray-400'>/</span>
                <span className='text-gray-500'>{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {/* Product Images */}
          <div className='space-y-4'>
            <div className='aspect-square overflow-hidden rounded-lg bg-white'>
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className='h-full w-full object-cover'
              />
            </div>
            <div className='grid grid-cols-4 gap-2'>
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 bg-white transition-all ${
                    selectedImage === index
                      ? 'border-[#2D6294]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    width={150}
                    height={150}
                    className='h-full w-full object-cover'
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className='space-y-6'>
            <div>
              <h1 className='mb-2 text-3xl font-bold text-gray-900'>
                {product.name}
              </h1>
              <p className='text-2xl font-semibold text-red-600'>
                {product.price}
              </p>
            </div>

            {/* Services */}
            <div className='border-t border-b border-gray-200 py-4'>
              <div className='scrollbar-hide flex space-x-4 overflow-x-auto'>
                {product.services.map((service, index) => (
                  <div
                    key={index}
                    className={`min-w-[140px] flex-shrink-0 rounded-lg border p-3 text-center text-sm ${
                      index === 0
                        ? 'border-[#2D6294] bg-[#2D6294]/10'
                        : 'border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className='relative mb-2'>
                      <div
                        className={`text-lg ${index === 0 ? 'text-gray-800' : 'text-gray-400'}`}
                      >
                        {service.icon}
                      </div>
                      <div className='absolute -right-1 -bottom-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#2D6294]'>
                        <div className='h-1.5 w-1.5 rounded-full bg-white'></div>
                      </div>
                    </div>
                    <div
                      className={`text-xs leading-tight font-medium ${
                        index === 0 ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {service.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Information */}
            <div className='rounded-lg border border-gray-200 bg-white p-4'>
              <div className='mb-3'>
                <span className='text-lg font-bold text-gray-900'>
                  THƯƠNG HIỆU: {product.brand}
                </span>
              </div>
              <div className='relative'>
                <p
                  className={`leading-relaxed text-gray-600 transition-all duration-500 ease-in-out ${
                    showFullDescription ? 'max-h-none' : 'line-clamp-3'
                  }`}
                >
                  {product.brandDescription}
                </p>
                {!showFullDescription && (
                  <div className='pointer-events-none absolute right-0 bottom-0 left-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent'></div>
                )}
                <div className='relative z-10 mt-3 flex justify-center'>
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className='rounded-full bg-gray-200 px-4 py-1 text-sm text-gray-700 shadow-sm transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none'
                  >
                    {showFullDescription ? '▲' : '▼'}
                  </button>
                </div>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className='mb-3 text-lg font-medium text-gray-900'>
                Màu sắc:
              </h3>
              <div className='flex space-x-3'>
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`rounded-full border-2 px-6 py-2 transition-all ${
                      selectedColor === color.value
                        ? 'border-[#2D6294] bg-[#2D6294]/10'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector and Action Buttons */}
            <div className='flex flex-row items-center gap-2 sm:gap-3'>
              {/* Quantity Selector */}
              <div className='flex h-[48px] min-w-[120px] items-center rounded-lg border border-gray-300 bg-gray-50 sm:min-w-[140px]'>
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className='cursor-pointer px-3 py-2 text-sm text-gray-700 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:text-base'
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className='min-w-[60px] border-x border-gray-300 bg-white px-3 py-2 text-center text-sm font-medium text-gray-900 sm:min-w-[70px] sm:px-4 sm:text-base'>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className='cursor-pointer px-3 py-2 text-sm text-gray-700 hover:text-gray-900 sm:px-4 sm:text-base'
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button className='flex h-[48px] min-w-[60px] cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200 sm:min-w-[70px] sm:px-6'>
                <div className='relative'>
                  <ShoppingCartIcon className='h-6 w-6 sm:h-8 sm:w-8' />
                  <div className='absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-gray-700 sm:h-4 sm:w-4'>
                    <span className='text-xs font-bold text-white'>+</span>
                  </div>
                </div>
              </button>

              {/* Buy Now Button */}
              <div className='relative inline-block'>
                <button
                  onClick={handleAddToCart}
                  className='flex h-[48px] min-w-[100px] flex-1 cursor-pointer items-center justify-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-bold whitespace-nowrap text-white transition-colors hover:bg-gray-900 sm:min-w-[120px] sm:px-8 sm:py-3 sm:text-base'
                >
                  {t('add_to_cart')}
                </button>
                {successMessage && (
                  <div className='animate-fade-in absolute bottom-full left-1/2 mb-2 w-100 -translate-x-1/2 transform rounded-lg bg-green-600 px-4 py-2 text-sm text-white shadow-lg'>
                    {successMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className='mt-12 hidden gap-6 lg:grid lg:grid-cols-6'>
          {/* Left Column - Product Information, Target Audience, Warranty Policy, Real Images (80% width) */}
          <div className='col-span-4 space-y-6'>
            {/* Product Information Header */}
            <div className='mb-4 flex items-center justify-between rounded-lg bg-[#2D6294] px-6 py-3 text-white'>
              <h2 className='text-lg font-bold'>THÔNG TIN SẢN PHẨM</h2>
              <button
                onClick={() => setShowFullProductInfo(!showFullProductInfo)}
                className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-800'
              >
                <svg
                  className={`h-3 w-3 text-[#2D6294] transition-transform duration-300 ${showFullProductInfo ? 'rotate-180' : ''}`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>

            {/* Product Information Content */}
            {showFullProductInfo && (
              <div className='rounded-lg border border-gray-200 bg-white p-6'>
                <div className='space-y-8'>
                  {/* Title and Intro */}
                  <div>
                    <h3 className='mb-4 text-xl font-bold text-gray-900'>
                      Ánh sáng LED trắng sáng – Tăng cường tầm nhìn khi lái xe
                      ban đêm
                    </h3>
                    <p className='leading-relaxed text-gray-600'>
                      Đèn LED xe ô tô với ánh sáng trắng sáng 6000K, cung cấp
                      tầm nhìn rõ ràng và an toàn khi lái xe trong điều kiện
                      thiếu sáng. Công nghệ LED hiện đại giúp tiết kiệm điện và
                      tuổi thọ lâu dài hơn so với đèn halogen truyền thống.
                    </p>
                  </div>

                  {/* First Image */}
                  <div className='flex justify-center'>
                    <div className='aspect-square w-full max-w-md overflow-hidden rounded-lg bg-gray-800'>
                      <Image
                        src={product.images[0]}
                        alt='Product detail'
                        width={400}
                        height={400}
                        className='h-full w-full object-cover'
                      />
                    </div>
                  </div>

                  {/* Second Content Block */}
                  <div>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      Đèn LED xe ô tô AUTOLIGHT AL-2024 với thiết kế hiện đại,
                      tương thích với nhiều dòng xe khác nhau từ sedan đến SUV.
                      Sản phẩm được thiết kế với công nghệ LED COB tiên tiến,
                      tạo ra ánh sáng tập trung và đồng đều, giúp tăng cường tầm
                      nhìn khi lái xe ban đêm.
                    </p>
                  </div>

                  {/* Second Image */}
                  <div className='flex justify-center'>
                    <div className='aspect-square w-full max-w-md overflow-hidden rounded-lg bg-gray-800'>
                      <Image
                        src={product.images[1]}
                        alt='Product detail 2'
                        width={400}
                        height={400}
                        className='h-full w-full object-cover'
                      />
                    </div>
                  </div>

                  {/* Third Content Block */}
                  <div>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      Với thiết kế compact và dễ lắp đặt, đèn LED AUTOLIGHT
                      không chỉ cải thiện tầm nhìn mà còn tăng tính thẩm mỹ cho
                      chiếc xe của bạn. Chất liệu nhôm hợp kim cao cấp giúp tản
                      nhiệt tốt, đảm bảo tuổi thọ lâu dài và hiệu suất ổn định.
                    </p>
                    <p className='leading-relaxed text-gray-600'>
                      Sản phẩm đi kèm với bộ lắp đặt đầy đủ và hướng dẫn chi
                      tiết, phù hợp cho cả người mới bắt đầu và thợ chuyên
                      nghiệp. Đèn được thiết kế chống nước IP67, đảm bảo hoạt
                      động ổn định trong mọi điều kiện thời tiết.
                    </p>
                  </div>

                  {/* Third Image */}
                  <div className='flex justify-center'>
                    <div className='aspect-square w-full max-w-md overflow-hidden rounded-lg bg-gray-800'>
                      <Image
                        src={product.images[2]}
                        alt='Product detail 3'
                        width={400}
                        height={400}
                        className='h-full w-full object-cover'
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Target Audience Section */}
            <div className='mt-6'>
              {/* Target Audience Header */}
              <div className='mb-4 flex items-center justify-between rounded-lg bg-[#2D6294] px-6 py-3 text-white'>
                <h2 className='text-lg font-bold'>
                  SẢN PHẨM GIÀNH CHO NHỮNG AI?
                </h2>
                <button
                  onClick={() =>
                    setShowFullTargetAudience(!showFullTargetAudience)
                  }
                  className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-800'
                >
                  <svg
                    className={`h-3 w-3 text-[#2D6294] transition-transform duration-300 ${showFullTargetAudience ? 'rotate-180' : ''}`}
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>

              {/* Target Audience Content */}
              {showFullTargetAudience && (
                <div className='rounded-lg border border-gray-200 bg-white p-6'>
                  <div className='space-y-6'>
                    {/* First Target Group */}
                    <div>
                      <h3 className='mb-2 font-bold text-gray-900'>
                        Chủ xe muốn nâng cấp hệ thống chiếu sáng
                      </h3>
                      <p className='leading-relaxed text-gray-600'>
                        Với ánh sáng LED trắng sáng và thiết kế hiện đại, đèn
                        rất phù hợp để thay thế đèn halogen cũ, cải thiện tầm
                        nhìn và tăng tính thẩm mỹ cho xe.
                      </p>
                    </div>

                    {/* Second Target Group */}
                    <div>
                      <h3 className='mb-2 font-bold text-gray-900'>
                        Tài xế thường xuyên lái xe ban đêm
                      </h3>
                      <p className='leading-relaxed text-gray-600'>
                        Ánh sáng LED mạnh mẽ và tập trung giúp tăng cường tầm
                        nhìn khi lái xe trong điều kiện thiếu sáng, đảm bảo an
                        toàn cho người lái và hành khách.
                      </p>
                    </div>

                    {/* Third Target Group */}
                    <div>
                      <h3 className='mb-2 font-bold text-gray-900'>
                        Thợ sửa xe và cửa hàng phụ tùng
                      </h3>
                      <p className='leading-relaxed text-gray-600'>
                        Sản phẩm chất lượng cao, dễ lắp đặt và tương thích với
                        nhiều dòng xe, phù hợp cho việc kinh doanh và cung cấp
                        dịch vụ lắp đặt cho khách hàng.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Warranty and Return Policy Header */}
            <div className='mb-4 flex items-center justify-between rounded-lg bg-[#2D6294] px-6 py-3 text-white'>
              <h2 className='text-lg font-bold'>
                CHÍNH SÁCH ĐỔI TRẢ VÀ BẢO HÀNH
              </h2>
              <button
                onClick={() => setShowWarrantyPolicy(!showWarrantyPolicy)}
                className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-800'
              >
                <svg
                  className={`h-3 w-3 text-[#2D6294] transition-transform duration-300 ${showWarrantyPolicy ? 'rotate-180' : ''}`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>

            {/* Warranty and Return Policy Content */}
            {showWarrantyPolicy && (
              <div className='rounded-lg border border-gray-200 bg-white p-6'>
                <div className='space-y-6'>
                  {/* Return Policy */}
                  <div>
                    <h3 className='mb-3 font-bold text-gray-900'>
                      Chính sách đổi trả hàng:
                    </h3>
                    <ul className='space-y-2 text-gray-600'>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Hàng bị lỗi kỹ thuật do nhà sản xuất.
                      </li>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Hàng bị hư hỏng do quá trình vận chuyển.
                      </li>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Hàng giao không đúng mẫu mã, loại mà khách đã đặt.
                      </li>
                    </ul>
                  </div>

                  {/* Return Conditions */}
                  <div>
                    <h3 className='mb-3 font-bold text-gray-900'>
                      Điều kiện đổi trả hàng:
                    </h3>
                    <ul className='space-y-2 text-gray-600'>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Khách hàng cần thông báo cho chúng tôi về tình trạng lỗi
                        sản phẩm, sự cố đơn hàng trong vòng 7 ngày kể từ thời
                        điểm giao hàng thành công.
                      </li>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Khách hàng cần cung cấp video mở hộp sản phẩm để chứng
                        minh lỗi do quá trình vận chuyển hoặc sản xuất.
                      </li>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Hàng hóa còn đầy đủ các phụ kiện đi kèm.
                      </li>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Các vấn đề lỗi sản phẩm Vaithuhay sẽ nhận hàng về kiểm
                        tra phản hồi trong vòng 14 ngày làm việc (kể từ ngày
                        nhận được hàng chuyển về kiểm tra). Lý do: vì cần xác
                        định lỗi sản xuất hay loại sử dụng không đúng hướng dẫn.
                      </li>
                    </ul>
                  </div>

                  {/* Non-eligible Cases */}
                  <div>
                    <h3 className='mb-3 font-bold text-gray-900'>
                      Các trường hợp không đủ điều kiện đổi trả:
                    </h3>
                    <ul className='space-y-2 text-gray-600'>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Sản phẩm bị hư hỏng do lỗi của khách hàng, Vaithuhay chỉ
                        hỗ trợ theo chính sách bảo hành đi kèm.
                      </li>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Khách hàng không cung cấp được video/hình ảnh chứng minh
                        vấn đề lỗi do nhà sản xuất và vận chuyển.
                      </li>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Hàng hoàn về không còn đầy đủ phụ kiện ban đầu.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Real Images Section */}
            <div className='mb-4 flex items-center justify-between rounded-lg bg-[#2D6294] px-6 py-3 text-white'>
              <h2 className='text-lg font-bold'>HÌNH ẢNH</h2>
              <button
                onClick={() => setShowRealImages(!showRealImages)}
                className='flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-800'
              >
                <svg
                  className={`h-3 w-3 text-[#2D6294] transition-transform duration-300 ${showRealImages ? 'rotate-180' : ''}`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
            {showRealImages && (
              <div className='rounded-lg border border-gray-200 bg-white p-6'>
                {/* Main Image Display */}
                <div className='relative mb-6'>
                  <div className='aspect-[4/3] overflow-hidden rounded-lg bg-gray-800'>
                    <Image
                      src={productImages[currentImageIndex]}
                      alt={`Product image ${currentImageIndex + 1}`}
                      width={800}
                      height={600}
                      className='h-full w-full object-cover'
                    />
                  </div>
                  {/* Navigation Dots */}
                  <div className='mt-4 flex justify-center space-x-2'>
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 w-2 rounded-full border border-gray-300 transition-colors ${
                          index === currentImageIndex
                            ? 'bg-white'
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className='scrollbar-hide flex gap-3 overflow-x-auto'>
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-gray-200 transition-colors ${
                        index === currentImageIndex
                          ? 'border-[#2D6294]'
                          : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        width={80}
                        height={80}
                        className='h-full w-full object-cover'
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Technical Specifications and Related Products (20% width) */}
          <div className='col-span-2 space-y-6'>
            {/* Technical Specifications Header */}
            <div className='mb-4 flex items-center justify-between rounded-lg bg-[#2D6294] px-6 py-3 text-white'>
              <h2 className='text-lg font-bold'>THÔNG SỐ KỸ THUẬT</h2>
              <button
                onClick={() => setShowTechnicalSpecs(!showTechnicalSpecs)}
                className='flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-800'
              >
                <svg
                  className={`h-3 w-3 text-[#2D6294] transition-transform duration-300 ${showTechnicalSpecs ? 'rotate-180' : ''}`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>

            {/* Technical Specifications Content */}
            {showTechnicalSpecs && (
              <div className='overflow-hidden rounded-lg border border-gray-200 bg-white'>
                <table className='w-full'>
                  <tbody>
                    <tr className='border-b border-[#dee2e6]'>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Loại đèn
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>
                        LED COB – Ánh sáng trắng sáng
                      </td>
                    </tr>
                    <tr className='border-b border-[#dee2e6]'>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Nhiệt độ màu
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>
                        6000K – Trắng sáng tự nhiên
                      </td>
                    </tr>
                    <tr className='border-b border-[#dee2e6]'>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Công suất
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>35W</td>
                    </tr>
                    <tr className='border-b border-[#dee2e6]'>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Điện áp hoạt động
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>
                        12V/24V DC
                      </td>
                    </tr>
                    <tr className='border-b border-[#dee2e6]'>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Tuổi thọ LED
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>
                        50,000 giờ
                      </td>
                    </tr>
                    <tr className='border-b border-[#dee2e6]'>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Chống nước
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>IP67</td>
                    </tr>
                    <tr className='border-b border-[#dee2e6]'>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Chống rung
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>Có</td>
                    </tr>
                    <tr className='border-b border-[#dee2e6]'>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Kích thước
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>
                        120 × 80 × 45 mm
                      </td>
                    </tr>
                    <tr>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Trọng lượng
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>280g</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Related Products */}
            <div className='rounded-lg border border-gray-200 bg-white lg:sticky lg:top-[100px]'>
              <div className='p-4'>
                <h3 className='mb-4 font-bold text-gray-900'>
                  SẢN PHẨM LIÊN QUAN
                </h3>
                <div className='space-y-4'>
                  {/* Related Product 1 */}
                  <div className='flex cursor-pointer items-center space-x-3 rounded-lg border-b border-gray-100 p-2 pb-4 transition-colors hover:bg-gray-50'>
                    <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200'>
                      <Image
                        src='https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=64&h=64&fit=crop'
                        alt='Đèn pha LED'
                        width={64}
                        height={64}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <h4 className='truncate text-sm font-medium text-gray-900'>
                        Đèn pha LED xe ô tô cao cấp...
                      </h4>
                      <p className='text-sm font-bold text-red-600'>
                        1,890,000₫
                      </p>
                    </div>
                  </div>

                  {/* Related Product 2 */}
                  <div className='flex cursor-pointer items-center space-x-3 rounded-lg border-b border-gray-100 p-2 pb-4 transition-colors hover:bg-gray-50'>
                    <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200'>
                      <Image
                        src='https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=64&h=64&fit=crop'
                        alt='Bộ lọc gió động cơ'
                        width={64}
                        height={64}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <h4 className='truncate text-sm font-medium text-gray-900'>
                        Bộ lọc gió động cơ cao cấp...
                      </h4>
                      <p className='text-sm font-bold text-red-600'>450,000₫</p>
                    </div>
                  </div>

                  {/* Related Product 3 */}
                  <div className='flex cursor-pointer items-center space-x-3 rounded-lg p-2 transition-colors hover:bg-gray-50'>
                    <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200'>
                      <Image
                        src='https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=64&h=64&fit=crop'
                        alt='Dầu nhớt động cơ'
                        width={64}
                        height={64}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <h4 className='truncate text-sm font-medium text-gray-900'>
                        Dầu nhớt động cơ tổng hợp...
                      </h4>
                      <p className='text-sm font-bold text-red-600'>650,000₫</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className='mt-12 space-y-6 lg:hidden'>
          {/* Product Information */}
          <div>
            <div className='mb-4 flex items-center justify-between rounded-lg bg-[#2D6294] px-6 py-3 text-white'>
              <h2 className='text-lg font-bold'>THÔNG TIN SẢN PHẨM</h2>
              <button
                onClick={() => setShowFullProductInfo(!showFullProductInfo)}
                className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-800'
              >
                <svg
                  className={`h-3 w-3 text-[#2D6294] transition-transform duration-300 ${showFullProductInfo ? 'rotate-180' : ''}`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
            {showFullProductInfo && (
              <div className='rounded-lg border border-gray-200 bg-white p-6'>
                <div className='space-y-8'>
                  <div>
                    <h3 className='mb-4 text-xl font-bold text-gray-900'>
                      Ánh sáng LED trắng sáng – Tăng cường tầm nhìn khi lái xe
                      ban đêm
                    </h3>
                    <p className='leading-relaxed text-gray-600'>
                      Đèn LED xe ô tô với ánh sáng trắng sáng 6000K, cung cấp
                      tầm nhìn rõ ràng và an toàn khi lái xe trong điều kiện
                      thiếu sáng. Công nghệ LED hiện đại giúp tiết kiệm điện và
                      tuổi thọ lâu dài hơn so với đèn halogen truyền thống.
                    </p>
                  </div>
                  <div className='flex justify-center'>
                    <div className='aspect-square w-full max-w-md overflow-hidden rounded-lg bg-gray-800'>
                      <Image
                        src={product.images[0]}
                        alt='Product detail'
                        width={400}
                        height={400}
                        className='h-full w-full object-cover'
                      />
                    </div>
                  </div>
                  <div>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      Đèn LED xe ô tô AUTOLIGHT AL-2024 với thiết kế hiện đại,
                      tương thích với nhiều dòng xe khác nhau từ sedan đến SUV.
                      Sản phẩm được thiết kế với công nghệ LED COB tiên tiến,
                      tạo ra ánh sáng tập trung và đồng đều, giúp tăng cường tầm
                      nhìn khi lái xe ban đêm.
                    </p>
                  </div>
                  <div className='flex justify-center'>
                    <div className='aspect-square w-full max-w-md overflow-hidden rounded-lg bg-gray-800'>
                      <Image
                        src={product.images[1]}
                        alt='Product detail 2'
                        width={400}
                        height={400}
                        className='h-full w-full object-cover'
                      />
                    </div>
                  </div>
                  <div>
                    <p className='mb-4 leading-relaxed text-gray-600'>
                      Với thiết kế compact và dễ lắp đặt, đèn LED AUTOLIGHT
                      không chỉ cải thiện tầm nhìn mà còn tăng tính thẩm mỹ cho
                      chiếc xe của bạn. Chất liệu nhôm hợp kim cao cấp giúp tản
                      nhiệt tốt, đảm bảo tuổi thọ lâu dài và hiệu suất ổn định.
                    </p>
                    <p className='leading-relaxed text-gray-600'>
                      Sản phẩm đi kèm với bộ lắp đặt đầy đủ và hướng dẫn chi
                      tiết, phù hợp cho cả người mới bắt đầu và thợ chuyên
                      nghiệp. Đèn được thiết kế chống nước IP67, đảm bảo hoạt
                      động ổn định trong mọi điều kiện thời tiết.
                    </p>
                  </div>
                  <div className='flex justify-center'>
                    <div className='aspect-square w-full max-w-md overflow-hidden rounded-lg bg-gray-800'>
                      <Image
                        src={product.images[2]}
                        alt='Product detail 3'
                        width={400}
                        height={400}
                        className='h-full w-full object-cover'
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Technical Specifications */}
          <div>
            <div className='mb-4 flex items-center justify-between rounded-lg bg-[#2D6294] px-6 py-3 text-white'>
              <h2 className='text-lg font-bold'>THÔNG SỐ KỸ THUẬT</h2>
              <button
                onClick={() => setShowTechnicalSpecs(!showTechnicalSpecs)}
                className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-800'
              >
                <svg
                  className={`h-3 w-3 text-[#2D6294] transition-transform duration-300 ${showTechnicalSpecs ? 'rotate-180' : ''}`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
            {showTechnicalSpecs && (
              <div className='overflow-hidden rounded-lg border border-gray-200 bg-white'>
                <table className='w-full'>
                  <tbody>
                    <tr className='border-b border-[#dee2e6]'>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Loại đèn
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>
                        LED COB – Ánh sáng trắng sáng
                      </td>
                    </tr>
                    <tr className='border-b border-[#dee2e6]'>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Nhiệt độ màu
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>
                        6000K – Trắng sáng tự nhiên
                      </td>
                    </tr>
                    <tr className='border-b border-[#dee2e6]'>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Công suất
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>35W</td>
                    </tr>
                    <tr className='border-b border-[#dee2e6]'>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Điện áp hoạt động
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>
                        12V/24V DC
                      </td>
                    </tr>
                    <tr className='border-b border-[#dee2e6]'>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Tuổi thọ LED
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>
                        50,000 giờ
                      </td>
                    </tr>
                    <tr className='border-b border-[#dee2e6]'>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Chống nước
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>IP67</td>
                    </tr>
                    <tr className='border-b border-[#dee2e6]'>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Chống rung
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>Có</td>
                    </tr>
                    <tr className='border-b border-[#dee2e6]'>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Kích thước
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>
                        120 × 80 × 45 mm
                      </td>
                    </tr>
                    <tr>
                      <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                        Trọng lượng
                      </td>
                      <td className='px-4 py-3 text-sm text-gray-900'>280g</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Target Audience */}
          <div>
            <div className='mb-4 flex items-center justify-between rounded-lg bg-[#2D6294] px-6 py-3 text-white'>
              <h2 className='text-lg font-bold'>
                SẢN PHẨM GIÀNH CHO NHỮNG AI?
              </h2>
              <button
                onClick={() =>
                  setShowFullTargetAudience(!showFullTargetAudience)
                }
                className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-800'
              >
                <svg
                  className={`h-3 w-3 text-[#2D6294] transition-transform duration-300 ${showFullTargetAudience ? 'rotate-180' : ''}`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
            {showFullTargetAudience && (
              <div className='rounded-lg border border-gray-200 bg-white p-6'>
                <div className='space-y-6'>
                  <div>
                    <h3 className='mb-2 font-bold text-gray-900'>
                      Chủ xe muốn nâng cấp hệ thống chiếu sáng
                    </h3>
                    <p className='leading-relaxed text-gray-600'>
                      Với ánh sáng LED trắng sáng và thiết kế hiện đại, đèn rất
                      phù hợp để thay thế đèn halogen cũ, cải thiện tầm nhìn và
                      tăng tính thẩm mỹ cho xe.
                    </p>
                  </div>
                  <div>
                    <h3 className='mb-2 font-bold text-gray-900'>
                      Tài xế thường xuyên lái xe ban đêm
                    </h3>
                    <p className='leading-relaxed text-gray-600'>
                      Ánh sáng LED mạnh mẽ và tập trung giúp tăng cường tầm nhìn
                      khi lái xe trong điều kiện thiếu sáng, đảm bảo an toàn cho
                      người lái và hành khách.
                    </p>
                  </div>
                  <div>
                    <h3 className='mb-2 font-bold text-gray-900'>
                      Thợ sửa xe và cửa hàng phụ tùng
                    </h3>
                    <p className='leading-relaxed text-gray-600'>
                      Sản phẩm chất lượng cao, dễ lắp đặt và tương thích với
                      nhiều dòng xe, phù hợp cho việc kinh doanh và cung cấp
                      dịch vụ lắp đặt cho khách hàng.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Warranty Policy */}
          <div>
            <div className='mb-4 flex items-center justify-between rounded-lg bg-[#2D6294] px-6 py-3 text-white'>
              <h2 className='text-lg font-bold'>
                CHÍNH SÁCH ĐỔI TRẢ VÀ BẢO HÀNH
              </h2>
              <button
                onClick={() => setShowWarrantyPolicy(!showWarrantyPolicy)}
                className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-800'
              >
                <svg
                  className={`h-3 w-3 text-[#2D6294] transition-transform duration-300 ${showWarrantyPolicy ? 'rotate-180' : ''}`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
            {showWarrantyPolicy && (
              <div className='rounded-lg border border-gray-200 bg-white p-6'>
                <div className='space-y-6'>
                  <div>
                    <h3 className='mb-3 font-bold text-gray-900'>
                      Chính sách đổi trả hàng:
                    </h3>
                    <ul className='space-y-2 text-gray-600'>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Hàng bị lỗi kỹ thuật do nhà sản xuất.
                      </li>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Hàng bị hư hỏng do quá trình vận chuyển.
                      </li>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Hàng giao không đúng mẫu mã, loại mà khách đã đặt.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className='mb-3 font-bold text-gray-900'>
                      Điều kiện đổi trả hàng:
                    </h3>
                    <ul className='space-y-2 text-gray-600'>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Khách hàng cần thông báo cho chúng tôi về tình trạng lỗi
                        sản phẩm, sự cố đơn hàng trong vòng 7 ngày kể từ thời
                        điểm giao hàng thành công.
                      </li>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Khách hàng cần cung cấp video mở hộp sản phẩm để chứng
                        minh lỗi do quá trình vận chuyển hoặc sản xuất.
                      </li>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Hàng hóa còn đầy đủ các phụ kiện đi kèm.
                      </li>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Các vấn đề lỗi sản phẩm Vaithuhay sẽ nhận hàng về kiểm
                        tra phản hồi trong vòng 14 ngày làm việc (kể từ ngày
                        nhận được hàng chuyển về kiểm tra). Lý do: vì cần xác
                        định lỗi sản xuất hay loại sử dụng không đúng hướng dẫn.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className='mb-3 font-bold text-gray-900'>
                      Các trường hợp không đủ điều kiện đổi trả:
                    </h3>
                    <ul className='space-y-2 text-gray-600'>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Sản phẩm bị hư hỏng do lỗi của khách hàng, Vaithuhay chỉ
                        hỗ trợ theo chính sách bảo hành đi kèm.
                      </li>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Khách hàng không cung cấp được video/hình ảnh chứng minh
                        vấn đề lỗi do nhà sản xuất và vận chuyển.
                      </li>
                      <li className='flex items-start'>
                        <span className='mt-1 mr-2 text-[#2D6294]'>•</span>
                        Hàng hoàn về không còn đầy đủ phụ kiện ban đầu.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Real Images */}
          <div>
            <div className='mb-4 flex items-center justify-between rounded-lg bg-[#2D6294] px-6 py-3 text-white'>
              <h2 className='text-lg font-bold'>HÌNH ẢNH</h2>
              <button
                onClick={() => setShowRealImages(!showRealImages)}
                className='flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-800'
              >
                <svg
                  className={`h-3 w-3 text-[#2D6294] transition-transform duration-300 ${showRealImages ? 'rotate-180' : ''}`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
            {showRealImages && (
              <div className='rounded-lg border border-gray-200 bg-white p-6'>
                {/* Main Image Display */}
                <div className='relative mb-6'>
                  <div className='aspect-[4/3] overflow-hidden rounded-lg bg-gray-800'>
                    <Image
                      src={productImages[currentImageIndex]}
                      alt={`Product image ${currentImageIndex + 1}`}
                      width={800}
                      height={600}
                      className='h-full w-full object-cover'
                    />
                  </div>

                  {/* Navigation Dots */}
                  <div className='mt-4 flex justify-center space-x-2'>
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 w-2 rounded-full border border-gray-300 transition-colors ${
                          index === currentImageIndex
                            ? 'bg-white'
                            : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className='scrollbar-hide flex gap-3 overflow-x-auto'>
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-gray-200 transition-colors ${
                        index === currentImageIndex
                          ? 'border-[#2D6294]'
                          : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        width={80}
                        height={80}
                        className='h-full w-full object-cover'
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Products */}
          <div>
            <div className='rounded-lg border border-gray-200 bg-white p-4'>
              <h3 className='mb-4 font-bold text-gray-900'>
                SẢN PHẨM LIÊN QUAN
              </h3>
              <div className='space-y-4'>
                <div className='flex items-center space-x-3 border-b border-gray-100 pb-4'>
                  <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200'>
                    <Image
                      src='https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=64&h=64&fit=crop'
                      alt='Đèn pha LED'
                      width={64}
                      height={64}
                      className='h-full w-full object-cover'
                    />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <h4 className='truncate text-sm font-medium text-gray-900'>
                      Đèn pha LED xe ô tô cao cấp...
                    </h4>
                    <p className='text-sm font-bold text-red-600'>1,890,000₫</p>
                  </div>
                </div>
                <div className='flex items-center space-x-3 border-b border-gray-100 pb-4'>
                  <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200'>
                    <Image
                      src='https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=64&h=64&fit=crop'
                      alt='Bộ lọc gió động cơ'
                      width={64}
                      height={64}
                      className='h-full w-full object-cover'
                    />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <h4 className='truncate text-sm font-medium text-gray-900'>
                      Bộ lọc gió động cơ cao cấp...
                    </h4>
                    <p className='text-sm font-bold text-red-600'>450,000₫</p>
                  </div>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200'>
                    <Image
                      src='https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=64&h=64&fit=crop'
                      alt='Dầu nhớt động cơ'
                      width={64}
                      height={64}
                      className='h-full w-full object-cover'
                    />
                  </div>
                  <div className='min-w-0 flex-1'>
                    <h4 className='truncate text-sm font-medium text-gray-900'>
                      Dầu nhớt động cơ tổng hợp...
                    </h4>
                    <p className='text-sm font-bold text-red-600'>650,000₫</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section - Bottom Center */}
        <div className='mx-auto mt-12 max-w-6xl'>
          <div className='p-6'>
            <div className='mx-auto mb-6 w-[90%] px-6 py-3 text-black lg:w-[50%]'>
              <h2 className='text-center text-[16px] font-bold lg:text-lg'>
                CÙNG XEM REVIEW SẢN PHẨM
              </h2>
            </div>

            <div className='flex items-center space-x-4'>
              {/* Prev Button - Only visible on PC */}
              <button
                onClick={() => {
                  const container =
                    document.getElementById('reviews-container');
                  if (container) {
                    container.scrollBy({ left: -400, behavior: 'smooth' });
                  }
                }}
                className='hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300 lg:flex'
              >
                <svg
                  className='h-5 w-5 text-gray-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 19l-7-7 7-7'
                  />
                </svg>
              </button>

              {/* Reviews Container */}
              <div
                id='reviews-container'
                className='scrollbar-hide flex flex-grow gap-4 overflow-x-auto'
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className='w-64 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg lg:w-80'>
                  <div className='aspect-[4/3]'>
                    <iframe
                      src='https://www.youtube.com/embed/85FWwntb8Zo'
                      title='Review đèn LED xe ô tô'
                      className='h-full w-full'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className='p-2'>
                    <h3 className='text-xs leading-tight font-medium text-gray-900'>
                      REVIEW ĐÈN LED XE Ô TÔ CAO CẤP - SO SÁNH VỚI ĐÈN HALOGEN
                    </h3>
                  </div>
                </div>

                <div className='w-64 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg lg:w-80'>
                  <div className='aspect-[4/3]'>
                    <iframe
                      src='https://www.youtube.com/embed/85FWwntb8Zo'
                      title='Hướng dẫn lắp đặt đèn LED'
                      className='h-full w-full'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className='p-2'>
                    <h3 className='text-xs leading-tight font-medium text-gray-900'>
                      HƯỚNG DẪN LẮP ĐẶT ĐÈN LED XE Ô TÔ CHI TIẾT TỪ A-Z
                    </h3>
                  </div>
                </div>

                <div className='w-64 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg lg:w-80'>
                  <div className='aspect-[4/3]'>
                    <iframe
                      src='https://www.youtube.com/embed/85FWwntb8Zo'
                      title='Test đèn LED ban đêm'
                      className='h-full w-full'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className='p-2'>
                    <h3 className='text-xs leading-tight font-medium text-gray-900'>
                      TEST ĐÈN LED XE Ô TÔ BAN ĐÊM - HIỆU QUẢ THỰC TẾ
                    </h3>
                  </div>
                </div>

                <div className='w-64 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg lg:w-80'>
                  <div className='aspect-[4/3]'>
                    <iframe
                      src='https://www.youtube.com/embed/85FWwntb8Zo'
                      title='So sánh các loại đèn'
                      className='h-full w-full'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className='p-2'>
                    <h3 className='text-xs leading-tight font-medium text-gray-900'>
                      SO SÁNH ĐÈN LED, HALOGEN VÀ XENON - LOẠI NÀO TỐT NHẤT?
                    </h3>
                  </div>
                </div>

                <div className='w-64 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg lg:w-80'>
                  <div className='aspect-[4/3]'>
                    <iframe
                      src='https://www.youtube.com/embed/85FWwntb8Zo'
                      title='Bảo dưỡng đèn LED'
                      className='h-full w-full'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className='p-2'>
                    <h3 className='text-xs leading-tight font-medium text-gray-900'>
                      HƯỚNG DẪN BẢO DƯỠNG ĐÈN LED XE Ô TÔ ĐÚNG CÁCH
                    </h3>
                  </div>
                </div>

                <div className='w-64 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg lg:w-80'>
                  <div className='aspect-[4/3]'>
                    <iframe
                      src='https://www.youtube.com/embed/85FWwntb8Zo'
                      title='Đèn LED cho xe SUV'
                      className='h-full w-full'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className='p-2'>
                    <h3 className='text-xs leading-tight font-medium text-gray-900'>
                      LẮP ĐẶT ĐÈN LED CHO XE SUV - KINH NGHIỆM THỰC TẾ
                    </h3>
                  </div>
                </div>

                <div className='w-64 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg lg:w-80'>
                  <div className='aspect-[4/3]'>
                    <iframe
                      src='https://www.youtube.com/embed/85FWwntb8Zo'
                      title='Đèn LED xe sedan'
                      className='h-full w-full'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className='p-2'>
                    <h3 className='text-xs leading-tight font-medium text-gray-900'>
                      NÂNG CẤP ĐÈN LED CHO XE SEDAN - TRƯỚC VÀ SAU
                    </h3>
                  </div>
                </div>

                <div className='w-64 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg lg:w-80'>
                  <div className='aspect-[4/3]'>
                    <iframe
                      src='https://www.youtube.com/embed/85FWwntb8Zo'
                      title='Tổng hợp đèn LED'
                      className='h-full w-full'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className='p-2'>
                    <h3 className='text-xs leading-tight font-medium text-gray-900'>
                      TỔNG HỢP CÁC LOẠI ĐÈN LED XE Ô TÔ PHỔ BIẾN NHẤT
                    </h3>
                  </div>
                </div>
              </div>

              {/* Next Button - Only visible on PC */}
              <button
                onClick={() => {
                  const container =
                    document.getElementById('reviews-container');
                  if (container) {
                    container.scrollBy({ left: 400, behavior: 'smooth' });
                  }
                }}
                className='hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300 lg:flex'
              >
                <svg
                  className='h-5 w-5 text-gray-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 5l7 7-7 7'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
