'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const PRODUCT_MOCK = {
  id: 'den-led-xe-o-to-cao-cap',
  name: 'Đèn LED Xe Ô Tô Cao Cấp – Ánh sáng trắng sáng, thiết kế hiện đại, tương thích đa dòng xe',
  price: '1,250,000₫',
  images: [
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop',
  ],
  colors: [
    { name: 'Trắng', value: 'white' },
    { name: 'Vàng', value: 'yellow' },
  ],
  description: 'Đèn LED xe ô tô cao cấp với công nghệ LED hiện đại, ánh sáng trắng sáng và rõ ràng, phù hợp cho nhiều dòng xe khác nhau. Sản phẩm được thiết kế với chất liệu cao cấp, chống nước và chống rung tốt, đảm bảo tuổi thọ lâu dài và hiệu suất ánh sáng tối ưu. Với thiết kế compact và dễ lắp đặt, đèn không chỉ cải thiện tầm nhìn khi lái xe mà còn tăng tính thẩm mỹ cho chiếc xe của bạn.',
  brand: 'AUTOLIGHT',
  brandDescription: 'AUTOLIGHT là thương hiệu chuyên về thiết bị chiếu sáng xe ô tô hàng đầu với hơn 15 năm kinh nghiệm trong lĩnh vực automotive lighting. Chúng tôi cam kết cung cấp những sản phẩm chất lượng cao, đáp ứng các tiêu chuẩn quốc tế về an toàn và hiệu suất. AUTOLIGHT tự hào là đối tác tin cậy của nhiều hãng xe lớn và được người tiêu dùng Việt Nam tin tưởng lựa chọn. Với đội ngũ kỹ thuật viên giàu kinh nghiệm và hệ thống bảo hành toàn quốc, AUTOLIGHT luôn đồng hành cùng khách hàng trong việc nâng cấp và bảo trì hệ thống chiếu sáng xe.',
  services: [
    { icon: '🚚', text: 'Miễn phí vận chuyển' },
    { icon: '🔧', text: 'Lắp đặt miễn phí' },
    { icon: '🛡️', text: 'Bảo hành 2 năm' },
    { icon: '📞', text: 'Hỗ trợ 24/7' },
  ],
  specs: {
    'Thương hiệu': 'AUTOLIGHT',
    'Model': 'AL-2024',
    'Công suất': '35W',
    'Điện áp': '12V/24V',
    'Tuổi thọ': '50,000 giờ',
    'Kích thước': '120 × 80 × 45mm',
    'Trọng lượng': '280g',
    'Chất liệu': 'Nhôm hợp kim + Kính cường lực',
  }
};

export default function ProductDetail({ params }: { params: { id: string } }) {
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

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Product images for slideshow
  const productImages = [
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="text-gray-700 hover:text-blue-600">Trang chủ</a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <a href="/products" className="text-gray-700 hover:text-blue-600">Sản phẩm</a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{PRODUCT_MOCK.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <Image
                src={PRODUCT_MOCK.images[selectedImage]}
                alt={PRODUCT_MOCK.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {PRODUCT_MOCK.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-yellow-400' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${PRODUCT_MOCK.name} - ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {PRODUCT_MOCK.name}
              </h1>
              <p className="text-2xl font-semibold text-red-600">
                {PRODUCT_MOCK.price}
              </p>
            </div>

            {/* Services */}
            <div className="border-t border-b border-gray-200 py-4">
              <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                {PRODUCT_MOCK.services.map((service, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 p-3 rounded-lg border text-center text-sm min-w-[140px] ${
                      index === 0 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className="relative mb-2">
                      <div className={`text-lg ${index === 0 ? 'text-gray-800' : 'text-gray-400'}`}>
                        {service.icon}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className={`font-medium text-xs leading-tight ${
                      index === 0 ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {service.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Information */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="mb-3">
                <span className="font-bold text-gray-900 text-lg">THƯƠNG HIỆU: {PRODUCT_MOCK.brand}</span>
              </div>
              <div className="relative">
                <p className={`text-gray-600 leading-relaxed transition-all duration-500 ease-in-out ${
                  showFullDescription ? 'max-h-none' : 'line-clamp-3'
                }`}>
                  {PRODUCT_MOCK.brandDescription}
                </p>
                {!showFullDescription && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
                )}
                <div className="flex justify-center mt-3 relative z-10">
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 rounded-full text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    {showFullDescription ? '▲' : '▼'}
                  </button>
                </div>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Màu sắc:</h3>
              <div className="flex space-x-3">
                {PRODUCT_MOCK.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`px-6 py-2 rounded-full border-2 transition-all ${
                      selectedColor === color.value 
                        ? 'border-yellow-400 bg-yellow-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector and Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className="px-3 py-2 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center bg-white text-gray-900 font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className="px-3 py-2 text-gray-700 hover:text-gray-900"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300">
                <div className="relative">
                  <ShoppingCartIcon className="h-8 w-8" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">+</span>
                  </div>
                </div>
              </button>

              {/* Buy Now Button */}
              <button className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-900 transition-colors">
                MUA NGAY
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="mt-12 hidden lg:grid lg:grid-cols-6 gap-6">
          {/* Left Column - Product Information, Target Audience, Warranty Policy, Real Images (80% width) */}
          <div className="col-span-4 space-y-6">
            {/* Product Information Header */}
            <div className="bg-yellow-500 text-white px-6 py-3 rounded-lg mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">THÔNG TIN SẢN PHẨM</h2>
              <button
                onClick={() => setShowFullProductInfo(!showFullProductInfo)}
                className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className={`w-3 h-3 text-yellow-500 transition-transform duration-300 ${showFullProductInfo ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Product Information Content */}
            {showFullProductInfo && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="space-y-8">
                  {/* Title and Intro */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Ánh sáng LED trắng sáng – Tăng cường tầm nhìn khi lái xe ban đêm
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Đèn LED xe ô tô với ánh sáng trắng sáng 6000K, cung cấp tầm nhìn rõ ràng và an toàn 
                      khi lái xe trong điều kiện thiếu sáng. Công nghệ LED hiện đại giúp tiết kiệm điện 
                      và tuổi thọ lâu dài hơn so với đèn halogen truyền thống.
                    </p>
                  </div>

                  {/* First Image */}
                  <div className="flex justify-center">
                    <div className="w-full max-w-md aspect-square bg-gray-800 rounded-lg overflow-hidden">
                      <Image
                        src={PRODUCT_MOCK.images[0]}
                        alt="Product detail"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Second Content Block */}
                  <div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Đèn LED xe ô tô AUTOLIGHT AL-2024 với thiết kế hiện đại, tương thích với nhiều dòng xe 
                      khác nhau từ sedan đến SUV. Sản phẩm được thiết kế với công nghệ LED COB tiên tiến, 
                      tạo ra ánh sáng tập trung và đồng đều, giúp tăng cường tầm nhìn khi lái xe ban đêm.
                    </p>
                  </div>

                  {/* Second Image */}
                  <div className="flex justify-center">
                    <div className="w-full max-w-md aspect-square bg-gray-800 rounded-lg overflow-hidden">
                      <Image
                        src={PRODUCT_MOCK.images[1]}
                        alt="Product detail 2"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Third Content Block */}
                  <div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Với thiết kế compact và dễ lắp đặt, đèn LED AUTOLIGHT không chỉ cải thiện tầm nhìn 
                      mà còn tăng tính thẩm mỹ cho chiếc xe của bạn. Chất liệu nhôm hợp kim cao cấp giúp 
                      tản nhiệt tốt, đảm bảo tuổi thọ lâu dài và hiệu suất ổn định.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Sản phẩm đi kèm với bộ lắp đặt đầy đủ và hướng dẫn chi tiết, phù hợp cho cả người 
                      mới bắt đầu và thợ chuyên nghiệp. Đèn được thiết kế chống nước IP67, đảm bảo hoạt động 
                      ổn định trong mọi điều kiện thời tiết.
                    </p>
                  </div>

                  {/* Third Image */}
                  <div className="flex justify-center">
                    <div className="w-full max-w-md aspect-square bg-gray-800 rounded-lg overflow-hidden">
                      <Image
                        src={PRODUCT_MOCK.images[2]}
                        alt="Product detail 3"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Target Audience Section */}
            <div className="mt-6">
                          {/* Target Audience Header */}
            <div className="bg-yellow-500 text-white px-6 py-3 rounded-lg mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">SẢN PHẨM GIÀNH CHO NHỮNG AI?</h2>
              <button
                onClick={() => setShowFullTargetAudience(!showFullTargetAudience)}
                className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className={`w-3 h-3 text-yellow-500 transition-transform duration-300 ${showFullTargetAudience ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

              {/* Target Audience Content */}
              {showFullTargetAudience && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="space-y-6">
                    {/* First Target Group */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Chủ xe muốn nâng cấp hệ thống chiếu sáng
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Với ánh sáng LED trắng sáng và thiết kế hiện đại, đèn rất phù hợp để thay thế 
                        đèn halogen cũ, cải thiện tầm nhìn và tăng tính thẩm mỹ cho xe.
                      </p>
                    </div>

                    {/* Second Target Group */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Tài xế thường xuyên lái xe ban đêm
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Ánh sáng LED mạnh mẽ và tập trung giúp tăng cường tầm nhìn khi lái xe trong 
                        điều kiện thiếu sáng, đảm bảo an toàn cho người lái và hành khách.
                      </p>
                    </div>

                    {/* Third Target Group */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Thợ sửa xe và cửa hàng phụ tùng
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Sản phẩm chất lượng cao, dễ lắp đặt và tương thích với nhiều dòng xe, phù hợp 
                        cho việc kinh doanh và cung cấp dịch vụ lắp đặt cho khách hàng.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Warranty and Return Policy Header */}
            <div className="bg-yellow-500 text-white px-6 py-3 rounded-lg mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">CHÍNH SÁCH ĐỔI TRẢ VÀ BẢO HÀNH</h2>
              <button
                onClick={() => setShowWarrantyPolicy(!showWarrantyPolicy)}
                className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className={`w-3 h-3 text-yellow-500 transition-transform duration-300 ${showWarrantyPolicy ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Warranty and Return Policy Content */}
            {showWarrantyPolicy && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="space-y-6">
                  {/* Return Policy */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">
                      Chính sách đổi trả hàng:
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Hàng bị lỗi kỹ thuật do nhà sản xuất.
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Hàng bị hư hỏng do quá trình vận chuyển.
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Hàng giao không đúng mẫu mã, loại mà khách đã đặt.
                      </li>
                    </ul>
                  </div>

                  {/* Return Conditions */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">
                      Điều kiện đổi trả hàng:
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Khách hàng cần thông báo cho chúng tôi về tình trạng lỗi sản phẩm, sự cố đơn hàng trong vòng 7 ngày kể từ thời điểm giao hàng thành công.
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Khách hàng cần cung cấp video mở hộp sản phẩm để chứng minh lỗi do quá trình vận chuyển hoặc sản xuất.
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Hàng hóa còn đầy đủ các phụ kiện đi kèm.
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Các vấn đề lỗi sản phẩm Vaithuhay sẽ nhận hàng về kiểm tra phản hồi trong vòng 14 ngày làm việc (kể từ ngày nhận được hàng chuyển về kiểm tra). Lý do: vì cần xác định lỗi sản xuất hay loại sử dụng không đúng hướng dẫn.
                      </li>
                    </ul>
                  </div>

                  {/* Non-eligible Cases */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">
                      Các trường hợp không đủ điều kiện đổi trả:
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Sản phẩm bị hư hỏng do lỗi của khách hàng, Vaithuhay chỉ hỗ trợ theo chính sách bảo hành đi kèm.
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Khách hàng không cung cấp được video/hình ảnh chứng minh vấn đề lỗi do nhà sản xuất và vận chuyển.
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Hàng hoàn về không còn đầy đủ phụ kiện ban đầu.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Real Images Section */}
                         <div className="bg-yellow-500 text-white px-6 py-3 rounded-lg mb-4 flex items-center justify-between">
               <h2 className="text-lg font-bold">HÌNH ẢNH</h2>
               <button
                 onClick={() => setShowRealImages(!showRealImages)}
                 className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
               >
                 <svg className={`w-3 h-3 text-yellow-500 transition-transform duration-300 ${showRealImages ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                 </svg>
               </button>
             </div>
             {showRealImages && (
             <div className="bg-white rounded-lg border border-gray-200 p-6">
              {/* Main Image Display */}
              <div className="relative mb-6">
                <div className="aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src={productImages[currentImageIndex]}
                    alt={`Product image ${currentImageIndex + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Navigation Dots */}
                <div className="flex justify-center mt-4 space-x-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full border border-gray-300 transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-yellow-500' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            )}
          </div>

          {/* Right Column - Technical Specifications and Related Products (20% width) */}
          <div className="col-span-2 space-y-6">
            {/* Technical Specifications Header */}
            <div className="bg-yellow-500 text-white px-6 py-3 rounded-lg mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">THÔNG SỐ KỸ THUẬT</h2>
              <button
                onClick={() => setShowTechnicalSpecs(!showTechnicalSpecs)}
                className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className={`w-3 h-3 text-yellow-500 transition-transform duration-300 ${showTechnicalSpecs ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Technical Specifications Content */}
            {showTechnicalSpecs && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-[#dee2e6]">
                    <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Loại đèn</td>
                    <td className="py-3 px-4 text-gray-900 text-sm">LED COB – Ánh sáng trắng sáng</td>
                  </tr>
                  <tr className="border-b border-[#dee2e6]">
                    <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Nhiệt độ màu</td>
                    <td className="py-3 px-4 text-gray-900 text-sm">6000K – Trắng sáng tự nhiên</td>
                  </tr>
                  <tr className="border-b border-[#dee2e6]">
                    <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Công suất</td>
                    <td className="py-3 px-4 text-gray-900 text-sm">35W</td>
                  </tr>
                  <tr className="border-b border-[#dee2e6]">
                    <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Điện áp hoạt động</td>
                    <td className="py-3 px-4 text-gray-900 text-sm">12V/24V DC</td>
                  </tr>
                  <tr className="border-b border-[#dee2e6]">
                    <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Tuổi thọ LED</td>
                    <td className="py-3 px-4 text-gray-900 text-sm">50,000 giờ</td>
                  </tr>
                  <tr className="border-b border-[#dee2e6]">
                    <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Chống nước</td>
                    <td className="py-3 px-4 text-gray-900 text-sm">IP67</td>
                  </tr>
                  <tr className="border-b border-[#dee2e6]">
                    <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Chống rung</td>
                    <td className="py-3 px-4 text-gray-900 text-sm">Có</td>
                  </tr>
                  <tr className="border-b border-[#dee2e6]">
                    <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Kích thước</td>
                    <td className="py-3 px-4 text-gray-900 text-sm">120 × 80 × 45 mm</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Trọng lượng</td>
                    <td className="py-3 px-4 text-gray-900 text-sm">280g</td>
                  </tr>
                </tbody>
              </table>
            </div>
            )}

            {/* Related Products */}
            <div className="bg-white rounded-lg border border-gray-200 lg:sticky lg:top-[100px]">
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-4">SẢN PHẨM LIÊN QUAN</h3>
                <div className="space-y-4">
                  {/* Related Product 1 */}
                  <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=64&h=64&fit=crop"
                        alt="Đèn pha LED"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">
                        Đèn pha LED xe ô tô cao cấp...
                      </h4>
                      <p className="text-red-600 font-bold text-sm">1,890,000₫</p>
                    </div>
                  </div>

                  {/* Related Product 2 */}
                  <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=64&h=64&fit=crop"
                        alt="Bộ lọc gió động cơ"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">
                        Bộ lọc gió động cơ cao cấp...
                      </h4>
                      <p className="text-red-600 font-bold text-sm">450,000₫</p>
                    </div>
                  </div>

                  {/* Related Product 3 */}
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=64&h=64&fit=crop"
                        alt="Dầu nhớt động cơ"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">
                        Dầu nhớt động cơ tổng hợp...
                      </h4>
                      <p className="text-red-600 font-bold text-sm">650,000₫</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="mt-12 lg:hidden space-y-6">
          {/* Product Information */}
          <div>
            <div className="bg-yellow-500 text-white px-6 py-3 rounded-lg mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">THÔNG TIN SẢN PHẨM</h2>
              <button
                onClick={() => setShowFullProductInfo(!showFullProductInfo)}
                className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className={`w-3 h-3 text-yellow-500 transition-transform duration-300 ${showFullProductInfo ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {showFullProductInfo && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Ánh sáng LED trắng sáng – Tăng cường tầm nhìn khi lái xe ban đêm
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Đèn LED xe ô tô với ánh sáng trắng sáng 6000K, cung cấp tầm nhìn rõ ràng và an toàn 
                      khi lái xe trong điều kiện thiếu sáng. Công nghệ LED hiện đại giúp tiết kiệm điện 
                      và tuổi thọ lâu dài hơn so với đèn halogen truyền thống.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-full max-w-md aspect-square bg-gray-800 rounded-lg overflow-hidden">
                      <Image
                        src={PRODUCT_MOCK.images[0]}
                        alt="Product detail"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Đèn LED xe ô tô AUTOLIGHT AL-2024 với thiết kế hiện đại, tương thích với nhiều dòng xe 
                      khác nhau từ sedan đến SUV. Sản phẩm được thiết kế với công nghệ LED COB tiên tiến, 
                      tạo ra ánh sáng tập trung và đồng đều, giúp tăng cường tầm nhìn khi lái xe ban đêm.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-full max-w-md aspect-square bg-gray-800 rounded-lg overflow-hidden">
                      <Image
                        src={PRODUCT_MOCK.images[1]}
                        alt="Product detail 2"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Với thiết kế compact và dễ lắp đặt, đèn LED AUTOLIGHT không chỉ cải thiện tầm nhìn 
                      mà còn tăng tính thẩm mỹ cho chiếc xe của bạn. Chất liệu nhôm hợp kim cao cấp giúp 
                      tản nhiệt tốt, đảm bảo tuổi thọ lâu dài và hiệu suất ổn định.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Sản phẩm đi kèm với bộ lắp đặt đầy đủ và hướng dẫn chi tiết, phù hợp cho cả người 
                      mới bắt đầu và thợ chuyên nghiệp. Đèn được thiết kế chống nước IP67, đảm bảo hoạt động 
                      ổn định trong mọi điều kiện thời tiết.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-full max-w-md aspect-square bg-gray-800 rounded-lg overflow-hidden">
                      <Image
                        src={PRODUCT_MOCK.images[2]}
                        alt="Product detail 3"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Technical Specifications */}
          <div>
            <div className="bg-yellow-500 text-white px-6 py-3 rounded-lg mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">THÔNG SỐ KỸ THUẬT</h2>
              <button
                onClick={() => setShowTechnicalSpecs(!showTechnicalSpecs)}
                className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className={`w-3 h-3 text-yellow-500 transition-transform duration-300 ${showTechnicalSpecs ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {showTechnicalSpecs && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-[#dee2e6]">
                      <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Loại đèn</td>
                      <td className="py-3 px-4 text-gray-900 text-sm">LED COB – Ánh sáng trắng sáng</td>
                    </tr>
                    <tr className="border-b border-[#dee2e6]">
                      <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Nhiệt độ màu</td>
                      <td className="py-3 px-4 text-gray-900 text-sm">6000K – Trắng sáng tự nhiên</td>
                    </tr>
                    <tr className="border-b border-[#dee2e6]">
                      <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Công suất</td>
                      <td className="py-3 px-4 text-gray-900 text-sm">35W</td>
                    </tr>
                    <tr className="border-b border-[#dee2e6]">
                      <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Điện áp hoạt động</td>
                      <td className="py-3 px-4 text-gray-900 text-sm">12V/24V DC</td>
                    </tr>
                    <tr className="border-b border-[#dee2e6]">
                      <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Tuổi thọ LED</td>
                      <td className="py-3 px-4 text-gray-900 text-sm">50,000 giờ</td>
                    </tr>
                    <tr className="border-b border-[#dee2e6]">
                      <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Chống nước</td>
                      <td className="py-3 px-4 text-gray-900 text-sm">IP67</td>
                    </tr>
                    <tr className="border-b border-[#dee2e6]">
                      <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Chống rung</td>
                      <td className="py-3 px-4 text-gray-900 text-sm">Có</td>
                    </tr>
                    <tr className="border-b border-[#dee2e6]">
                      <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Kích thước</td>
                      <td className="py-3 px-4 text-gray-900 text-sm">120 × 80 × 45 mm</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-900 text-sm bg-[#f4f4f4]">Trọng lượng</td>
                      <td className="py-3 px-4 text-gray-900 text-sm">280g</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Target Audience */}
          <div>
            <div className="bg-yellow-500 text-white px-6 py-3 rounded-lg mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">SẢN PHẨM GIÀNH CHO NHỮNG AI?</h2>
              <button
                onClick={() => setShowFullTargetAudience(!showFullTargetAudience)}
                className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className={`w-3 h-3 text-yellow-500 transition-transform duration-300 ${showFullTargetAudience ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {showFullTargetAudience && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Chủ xe muốn nâng cấp hệ thống chiếu sáng
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Với ánh sáng LED trắng sáng và thiết kế hiện đại, đèn rất phù hợp để thay thế 
                      đèn halogen cũ, cải thiện tầm nhìn và tăng tính thẩm mỹ cho xe.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Tài xế thường xuyên lái xe ban đêm
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Ánh sáng LED mạnh mẽ và tập trung giúp tăng cường tầm nhìn khi lái xe trong 
                      điều kiện thiếu sáng, đảm bảo an toàn cho người lái và hành khách.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      Thợ sửa xe và cửa hàng phụ tùng
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Sản phẩm chất lượng cao, dễ lắp đặt và tương thích với nhiều dòng xe, phù hợp 
                      cho việc kinh doanh và cung cấp dịch vụ lắp đặt cho khách hàng.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Warranty Policy */}
          <div>
            <div className="bg-yellow-500 text-white px-6 py-3 rounded-lg mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">CHÍNH SÁCH ĐỔI TRẢ VÀ BẢO HÀNH</h2>
              <button
                onClick={() => setShowWarrantyPolicy(!showWarrantyPolicy)}
                className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className={`w-3 h-3 text-yellow-500 transition-transform duration-300 ${showWarrantyPolicy ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {showWarrantyPolicy && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">
                      Chính sách đổi trả hàng:
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Hàng bị lỗi kỹ thuật do nhà sản xuất.
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Hàng bị hư hỏng do quá trình vận chuyển.
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Hàng giao không đúng mẫu mã, loại mà khách đã đặt.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">
                      Điều kiện đổi trả hàng:
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Khách hàng cần thông báo cho chúng tôi về tình trạng lỗi sản phẩm, sự cố đơn hàng trong vòng 7 ngày kể từ thời điểm giao hàng thành công.
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Khách hàng cần cung cấp video mở hộp sản phẩm để chứng minh lỗi do quá trình vận chuyển hoặc sản xuất.
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Hàng hóa còn đầy đủ các phụ kiện đi kèm.
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Các vấn đề lỗi sản phẩm Vaithuhay sẽ nhận hàng về kiểm tra phản hồi trong vòng 14 ngày làm việc (kể từ ngày nhận được hàng chuyển về kiểm tra). Lý do: vì cần xác định lỗi sản xuất hay loại sử dụng không đúng hướng dẫn.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">
                      Các trường hợp không đủ điều kiện đổi trả:
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Sản phẩm bị hư hỏng do lỗi của khách hàng, Vaithuhay chỉ hỗ trợ theo chính sách bảo hành đi kèm.
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
                        Khách hàng không cung cấp được video/hình ảnh chứng minh vấn đề lỗi do nhà sản xuất và vận chuyển.
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">•</span>
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
            <div className="bg-yellow-500 text-white px-6 py-3 rounded-lg mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">HÌNH ẢNH</h2>
              <button
                onClick={() => setShowRealImages(!showRealImages)}
                className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className={`w-3 h-3 text-yellow-500 transition-transform duration-300 ${showRealImages ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {showRealImages && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">

              {/* Main Image Display */}
              <div className="relative mb-6">
                <div className="aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src={productImages[currentImageIndex]}
                    alt={`Product image ${currentImageIndex + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Navigation Dots */}
                <div className="flex justify-center mt-4 space-x-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full border border-gray-300 transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-yellow-500' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            )}
          </div>

          {/* Related Products */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900 mb-4">SẢN PHẨM LIÊN QUAN</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=64&h=64&fit=crop"
                      alt="Đèn pha LED"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      Đèn pha LED xe ô tô cao cấp...
                    </h4>
                    <p className="text-red-600 font-bold text-sm">1,890,000₫</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=64&h=64&fit=crop"
                      alt="Bộ lọc gió động cơ"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      Bộ lọc gió động cơ cao cấp...
                    </h4>
                    <p className="text-red-600 font-bold text-sm">450,000₫</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=64&h=64&fit=crop"
                      alt="Dầu nhớt động cơ"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      Dầu nhớt động cơ tổng hợp...
                    </h4>
                    <p className="text-red-600 font-bold text-sm">650,000₫</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section - Bottom Center */}
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="p-6">
            <div className="w-[90%] lg:w-[50%] mx-auto text-black px-6 py-3 mb-6">
              <h2 className="text-[16px] lg:text-lg font-bold text-center">CÙNG XEM REVIEW SẢN PHẨM</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Prev Button - Only visible on PC */}
              <button 
                onClick={() => {
                  const container = document.getElementById('reviews-container');
                  if (container) {
                    container.scrollBy({ left: -400, behavior: 'smooth' });
                  }
                }}
                className="hidden lg:flex flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Reviews Container */}
              <div 
                id="reviews-container"
                className="flex-grow flex gap-4 overflow-x-auto scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 w-64 lg:w-80">
                  <div className="aspect-[4/3]">
                    <iframe
                      src="https://www.youtube.com/embed/85FWwntb8Zo"
                      title="Review đèn LED xe ô tô"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-gray-900 text-xs leading-tight">
                      REVIEW ĐÈN LED XE Ô TÔ CAO CẤP - SO SÁNH VỚI ĐÈN HALOGEN
                    </h3>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 w-64 lg:w-80">
                  <div className="aspect-[4/3]">
                    <iframe
                      src="https://www.youtube.com/embed/85FWwntb8Zo"
                      title="Hướng dẫn lắp đặt đèn LED"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-gray-900 text-xs leading-tight">
                      HƯỚNG DẪN LẮP ĐẶT ĐÈN LED XE Ô TÔ CHI TIẾT TỪ A-Z
                    </h3>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 w-64 lg:w-80">
                  <div className="aspect-[4/3]">
                    <iframe
                      src="https://www.youtube.com/embed/85FWwntb8Zo"
                      title="Test đèn LED ban đêm"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-gray-900 text-xs leading-tight">
                      TEST ĐÈN LED XE Ô TÔ BAN ĐÊM - HIỆU QUẢ THỰC TẾ
                    </h3>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 w-64 lg:w-80">
                  <div className="aspect-[4/3]">
                    <iframe
                      src="https://www.youtube.com/embed/85FWwntb8Zo"
                      title="So sánh các loại đèn"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-gray-900 text-xs leading-tight">
                      SO SÁNH ĐÈN LED, HALOGEN VÀ XENON - LOẠI NÀO TỐT NHẤT?
                    </h3>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 w-64 lg:w-80">
                  <div className="aspect-[4/3]">
                    <iframe
                      src="https://www.youtube.com/embed/85FWwntb8Zo"
                      title="Bảo dưỡng đèn LED"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-gray-900 text-xs leading-tight">
                      HƯỚNG DẪN BẢO DƯỠNG ĐÈN LED XE Ô TÔ ĐÚNG CÁCH
                    </h3>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 w-64 lg:w-80">
                  <div className="aspect-[4/3]">
                    <iframe
                      src="https://www.youtube.com/embed/85FWwntb8Zo"
                      title="Đèn LED cho xe SUV"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-gray-900 text-xs leading-tight">
                      LẮP ĐẶT ĐÈN LED CHO XE SUV - KINH NGHIỆM THỰC TẾ
                    </h3>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 w-64 lg:w-80">
                  <div className="aspect-[4/3]">
                    <iframe
                      src="https://www.youtube.com/embed/85FWwntb8Zo"
                      title="Đèn LED xe sedan"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-gray-900 text-xs leading-tight">
                      NÂNG CẤP ĐÈN LED CHO XE SEDAN - TRƯỚC VÀ SAU
                    </h3>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 w-64 lg:w-80">
                  <div className="aspect-[4/3]">
                    <iframe
                      src="https://www.youtube.com/embed/85FWwntb8Zo"
                      title="Tổng hợp đèn LED"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-gray-900 text-xs leading-tight">
                      TỔNG HỢP CÁC LOẠI ĐÈN LED XE Ô TÔ PHỔ BIẾN NHẤT
                    </h3>
                  </div>
                </div>
              </div>

              {/* Next Button - Only visible on PC */}
              <button 
                onClick={() => {
                  const container = document.getElementById('reviews-container');
                  if (container) {
                    container.scrollBy({ left: 400, behavior: 'smooth' });
                  }
                }}
                className="hidden lg:flex flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
} 