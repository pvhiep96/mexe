'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { useTranslations } from 'next-intl';
import { ProductType, RelatedProductType, ProductVariant } from './types';
import Link from 'next/link';
import RelatedProducts from './RelatedProducts';
import ChatFloat from '../ChatFloat';
import { useRouter } from 'next/navigation';
import VariantSelector from './VariantSelector';
type ProductDetailProps = {
  product: ProductType;
  relatedProducts?: RelatedProductType[];
};
export default function ProductDetail({
  product,
  relatedProducts = [],
}: ProductDetailProps) {
  const t = useTranslations('product_detail');
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullProductInfo, setShowFullProductInfo] = useState(true);
  const [showFullTargetAudience, setShowFullTargetAudience] = useState(false);
  const [showWarrantyPolicy, setShowWarrantyPolicy] = useState(false);
  const [showTechnicalSpecs, setShowTechnicalSpecs] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );

  // const product: Product = PRODUCT_MOCK;

  // Get current price based on selected variant
  const getCurrentPrice = () => {
    if (selectedVariant) {
      return selectedVariant.final_price;
    }
    return product.price || 0;
  };

  // Get current stock based on selected variant
  const getCurrentStock = () => {
    if (selectedVariant) {
      return selectedVariant.stock_quantity;
    }
    return product.quantity || 0;
  };

  // Format price to Vietnamese currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Create cart item with variant info
  const createCartItem = (qty: number) => {
    const baseItem = {
      id: product.id,
      name: product.name || 'Unknown Product',
      price: product.price || 0,
      image: product.image || '/images/placeholder-product.png',
      quantity: qty,
      full_payment_transfer: product.full_payment_transfer || false,
      full_payment_discount_percentage: product.full_payment_discount_percentage || 0,
      partial_advance_payment: product.partial_advance_payment || false,
      advance_payment_percentage: product.advance_payment_percentage || 0,
      advance_payment_discount_percentage: product.advance_payment_discount_percentage || 0,
    };

    // Add variant info if variant is selected
    if (selectedVariant) {
      return {
        ...baseItem,
        variant_id: selectedVariant.id,
        variant_name: selectedVariant.variant_name,
        variant_value: selectedVariant.variant_value,
        variant_sku: selectedVariant.sku,
        variant_final_price: selectedVariant.final_price,
      };
    }

    return baseItem;
  };

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }

    // Thêm vào giỏ hàng với số lượng mới
    const newQuantity =
      type === 'increase' ? quantity + 1 : Math.max(1, quantity - 1);
    if (newQuantity > 0 && product.id) {
      const cartItem = createCartItem(newQuantity);
      addToCart(cartItem, newQuantity);
      setSuccessMessage(t('add_to_cart_success'));
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3s
    }
  };
  const { addToCart } = useCart();
  const [successMessage, setSuccessMessage] = useState('');
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const handleAddToCart = (event: React.MouseEvent) => {
    // Ngăn chặn event bubbling
    event.stopPropagation();

    if (product.id) {
      const cartItem = createCartItem(quantity);
      addToCart(cartItem, quantity);
      setSuccessMessage(t('add_to_cart_success'));
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3s
    }
  };

  const handleBuyNow = async (event: React.MouseEvent) => {
    // Ngăn chặn event bubbling
    event.stopPropagation();

    if (product.id) {
      setIsBuyingNow(true);

      try {
        // Tạo single product order cho checkout
        const cartItem = createCartItem(quantity);
        const itemPrice = cartItem.variant_final_price || cartItem.price;

        const singleProductOrder = {
          items: [cartItem],
          total: itemPrice * quantity,
          orderNumber: `ORD-SINGLE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          status: 'pending',
        };

        // Lưu vào localStorage
        localStorage.setItem(
          'currentOrder',
          JSON.stringify(singleProductOrder)
        );

        // Hiển thị thông báo thành công ngắn
        setSuccessMessage('Đang chuyển đến trang thanh toán...');

        // Chuyển đến trang checkout sau 1 giây
        setTimeout(() => {
          router.push('/checkout');
        }, 1000);
      } catch (error) {
        console.error('Error creating single product order:', error);
        setSuccessMessage('Có lỗi xảy ra, vui lòng thử lại');
        setTimeout(() => setSuccessMessage(''), 3000);
      } finally {
        setTimeout(() => setIsBuyingNow(false), 1500);
      }
    }
  };

  // Use product images from API
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : ['/images/placeholder-product.png'];

  return (
    <div className='min-h-screen'>
      {/* Chat Float Component */}
      <ChatFloat
        productId={product.id}
        productName={product.name}
        productUrl={
          typeof window !== 'undefined' ? window.location.href : undefined
        }
      />

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
                src={
                  product.images?.[selectedImage] ||
                  '/images/placeholder-product.png'
                }
                alt={product.name || 'Product'}
                width={600}
                height={600}
                className='h-full w-full object-cover'
              />
            </div>
            <div className='grid grid-cols-4 gap-2'>
              {product.images?.map((image, index) => (
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
                    src={image || '/images/placeholder-product.png'}
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
                {formatPrice(getCurrentPrice())}
              </p>
              {selectedVariant && selectedVariant.price_adjustment !== 0 && (
                <p className='text-sm text-gray-500 mt-1'>
                  Giá gốc: {formatPrice(product.price || 0)}
                  {selectedVariant.price_adjustment > 0 ? ' + ' : ' - '}
                  {formatPrice(Math.abs(selectedVariant.price_adjustment))}
                </p>
              )}
              {getCurrentStock() > 0 ? (
                <p className='text-sm text-green-600 mt-2'>
                  Còn {getCurrentStock()} sản phẩm
                </p>
              ) : (
                <p className='text-sm text-red-600 mt-2'>
                  Hết hàng
                </p>
              )}
            </div>

            {/* Services */}
            <div className='border-t border-b border-gray-200 py-4'>
              <div className='scrollbar-hide flex space-x-4 overflow-x-auto'>
                {(product.services || []).map((service, index) => (
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

                {/* Short Description */}
                {product.shortDescription && (
                  <div className='mt-4'>
                    <p className='text-sm leading-relaxed text-gray-600'>
                      {product.shortDescription}
                    </p>
                  </div>
                )}

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

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className='rounded-lg border border-gray-200 bg-white p-4'>
                <VariantSelector
                  variants={product.variants}
                  selectedVariant={selectedVariant}
                  onVariantSelect={setSelectedVariant}
                />
              </div>
            )}

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
              <button
                onClick={(event) => handleAddToCart(event)}
                className='flex h-[48px] min-w-[60px] cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200 sm:min-w-[70px] sm:px-6'
              >
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
                  onClick={(event) => handleBuyNow(event)}
                  disabled={isBuyingNow}
                  className={`flex h-[48px] min-w-[100px] flex-1 cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm font-bold whitespace-nowrap text-white transition-colors sm:min-w-[120px] sm:px-8 sm:py-3 sm:text-base ${
                    isBuyingNow
                      ? 'cursor-not-allowed bg-blue-400'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isBuyingNow ? (
                    <div className='flex items-center gap-2'>
                      <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                      <span>Đang xử lý...</span>
                    </div>
                  ) : (
                    'Mua ngay'
                  )}
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
          {/* Left Column - Product Descriptions from database (80% width) */}
          <div className='col-span-4 space-y-6'>
            {/* Render Product Descriptions from database */}
            {product.descriptions && product.descriptions.length > 0 ? (
              product.descriptions.map((desc, index) => {
                const sectionStateKey = `showSection${index}`;
                const isExpanded =
                  index === 0
                    ? showFullProductInfo
                    : index === 1
                      ? showFullTargetAudience
                      : index === 2
                        ? showWarrantyPolicy
                        : true;
                const toggleFunction =
                  index === 0
                    ? () => setShowFullProductInfo(!showFullProductInfo)
                    : index === 1
                      ? () => setShowFullTargetAudience(!showFullTargetAudience)
                      : index === 2
                        ? () => setShowWarrantyPolicy(!showWarrantyPolicy)
                        : () => {};

                return (
                  <div key={desc.id} className={index > 0 ? 'mt-6' : ''}>
                    {/* Section Header */}
                    <div className='mb-4 flex items-center justify-between rounded-lg bg-[#2D6294] px-6 py-3 text-white'>
                      <h2 className='text-lg font-bold'>{desc.title}</h2>
                      <button
                        onClick={toggleFunction}
                        className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-800'
                      >
                        <svg
                          className={`h-3 w-3 text-[#2D6294] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
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

                    {/* Section Content */}
                    {isExpanded && (
                      <div className='rounded-lg border border-gray-200 bg-white p-6'>
                        <div
                          className='prose max-w-none'
                          dangerouslySetInnerHTML={{ __html: desc.content }}
                        />
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              /* Fallback to default sections if no descriptions */
              <>
                {/* Default Product Information Header */}
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

                {/* Default Product Information Content */}
                {showFullProductInfo && (
                  <div className='rounded-lg border border-gray-200 bg-white p-6'>
                    <div className='space-y-8'>
                      <div>
                        <h3 className='mb-4 text-xl font-bold text-gray-900'>
                          {product.name}
                        </h3>
                        <p className='leading-relaxed text-gray-600'>
                          {product.description}
                        </p>
                      </div>
                      <div className='flex justify-center'>
                        <div className='aspect-square w-full max-w-md overflow-hidden rounded-lg bg-gray-800'>
                          <Image
                            src={
                              product.images?.[0] ||
                              '/images/placeholder-product.png'
                            }
                            alt='Product detail'
                            width={400}
                            height={400}
                            className='h-full w-full object-cover'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
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
                {product.specifications && product.specifications.length > 0 ? (
                  <table className='w-full'>
                    <tbody>
                      {product.specifications.map((spec, index) => (
                        <tr
                          key={spec.spec_name || index}
                          className={
                            index < product.specifications!.length - 1
                              ? 'border-b border-[#dee2e6]'
                              : ''
                          }
                        >
                          <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                            {spec.spec_name}
                          </td>
                          <td className='px-4 py-3 text-sm text-gray-900'>
                            {spec.spec_value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className='p-8 text-center'>
                    <div className='mb-3 text-3xl text-gray-400'>📋</div>
                    <p className='mb-2 text-gray-500'>
                      Thông số kỹ thuật không có sẵn
                    </p>
                    <p className='text-xs text-gray-400'>
                      Vui lòng liên hệ để biết thêm chi tiết
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Related Products */}
            <RelatedProducts products={relatedProducts} />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className='mt-12 space-y-6 lg:hidden'>
          {/* Render Product Descriptions from database for mobile */}
          {product.descriptions && product.descriptions.length > 0 ? (
            product.descriptions.map((desc, index) => {
              const isExpanded =
                index === 0
                  ? showFullProductInfo
                  : index === 1
                    ? showFullTargetAudience
                    : index === 2
                      ? showWarrantyPolicy
                      : true;
              const toggleFunction =
                index === 0
                  ? () => setShowFullProductInfo(!showFullProductInfo)
                  : index === 1
                    ? () => setShowFullTargetAudience(!showFullTargetAudience)
                    : index === 2
                      ? () => setShowWarrantyPolicy(!showWarrantyPolicy)
                      : () => {};

              return (
                <div key={desc.id}>
                  <div className='mb-4 flex items-center justify-between rounded-lg bg-[#2D6294] px-6 py-3 text-white'>
                    <h2 className='text-lg font-bold'>{desc.title}</h2>
                    <button
                      onClick={toggleFunction}
                      className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-gray-800'
                    >
                      <svg
                        className={`h-3 w-3 text-[#2D6294] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
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
                  {isExpanded && (
                    <div className='rounded-lg border border-gray-200 bg-white p-6'>
                      <div
                        className='prose max-w-none'
                        dangerouslySetInnerHTML={{ __html: desc.content }}
                      />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            /* Fallback sections for mobile if no descriptions */
            <>
              {/* Default Product Information for mobile */}
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
                          {product.name}
                        </h3>
                        <p className='leading-relaxed text-gray-600'>
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

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
                {product.specifications && product.specifications.length > 0 ? (
                  <table className='w-full'>
                    <tbody>
                      {product.specifications.map((spec, index) => (
                        <tr
                          key={spec.spec_name || index}
                          className={
                            index < product.specifications!.length - 1
                              ? 'border-b border-[#dee2e6]'
                              : ''
                          }
                        >
                          <td className='bg-[#f4f4f4] px-4 py-3 text-sm font-medium text-gray-900'>
                            {spec.spec_name}
                          </td>
                          <td className='px-4 py-3 text-sm text-gray-900'>
                            {spec.spec_value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className='p-8 text-center'>
                    <div className='mb-3 text-3xl text-gray-400'>📋</div>
                    <p className='mb-2 text-gray-500'>
                      Thông số kỹ thuật không có sẵn
                    </p>
                    <p className='text-xs text-gray-400'>
                      Vui lòng liên hệ để biết thêm chi tiết
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
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
                {product.videos && product.videos.length > 0 ? (
                  product.videos
                    .filter((video) => video.is_active)
                    .map((video) => (
                      <div
                        key={video.id}
                        className='w-64 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg lg:w-80'
                      >
                        <div className='aspect-[4/3]'>
                          <iframe
                            src={video.embed_url}
                            title={video.title}
                            className='h-full w-full'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                          ></iframe>
                        </div>
                        <div className='p-2'>
                          <h3 className='text-xs leading-tight font-medium text-gray-900'>
                            {video.title}
                          </h3>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className='w-full py-8 text-center'>
                    <p className='text-gray-500'>
                      Chưa có video review nào cho sản phẩm này
                    </p>
                  </div>
                )}
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
