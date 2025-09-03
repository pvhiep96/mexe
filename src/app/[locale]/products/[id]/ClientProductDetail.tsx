'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { useTranslations } from 'next-intl';
import { useFlashTooltip } from '@/context/FlashTooltipContext';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  colors: Array<{ name: string; value: string }>;
  description: string;
  brand: string;
  brandDescription: string;
  services: Array<{ icon: string; text: string }>;
  specs: Record<string, string>;
  quantity: number;
}

interface ClientProductDetailProps {
  productData: Product;
}

export default function ClientProductDetail({ productData }: ClientProductDetailProps) {
  const t = useTranslations('product_detail');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('white');
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullProductInfo, setShowFullProductInfo] = useState(true);
  const { addToCart } = useCart();
  const { showTooltip } = useFlashTooltip();

  const handleAddToCart = () => {
    addToCart({
      id: productData.id,
      name: productData.name,
      price: productData.price,
      image: productData.image,
      quantity: quantity,
    }, quantity, selectedColor);
    showTooltip('Đã thêm vào giỏ hàng thành công!', 'success');
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Navigation */}
      <nav className='bg-white p-4 shadow-sm'>
        <div className='mx-auto flex max-w-7xl items-center space-x-2 text-sm'>
          <a href='/' className='text-gray-700 hover:text-blue-600 cursor-pointer'>
            Trang chủ
          </a>
          <span className='text-gray-400'>/</span>
          <a href='/products/' className='text-gray-700 hover:text-blue-600 cursor-pointer'>
            Sản phẩm
          </a>
          <span className='text-gray-400'>/</span>
          <span className='text-gray-900'>{productData.name}</span>
        </div>
      </nav>

      <div className='mx-auto max-w-7xl px-4 py-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {/* Images */}
          <div className='space-y-4'>
            <div className='aspect-square overflow-hidden rounded-2xl bg-white shadow-lg'>
              <Image
                src={productData.images?.[selectedImage] || '/images/placeholder-product.png'}
                alt={productData.name}
                width={600}
                height={600}
                className='h-full w-full object-cover'
              />
            </div>
            <div className='grid grid-cols-4 gap-2'>
              {productData.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-full border-2 transition-all duration-200 hover:scale-105 cursor-pointer ${
                    selectedImage === index ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image || '/images/placeholder-product.png'}
                    alt={`${productData.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className='h-full w-full object-cover'
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>{productData.name}</h1>
              <p className='mt-2 text-2xl font-bold text-blue-600'>
                {productData.price.toLocaleString()}đ
              </p>
            </div>

            {/* Colors */}
            <div>
              <h3 className='mb-3 text-sm font-medium'>Màu sắc</h3>
              <div className='flex space-x-2'>
                {productData.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`flex items-center justify-center px-4 py-2 rounded-full border-2 transition-all duration-200 hover:scale-105 cursor-pointer ${
                      selectedColor === color.value ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md' : 'border-gray-300 bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className='text-sm font-medium'>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className='mb-3 text-sm font-medium'>Số lượng</h3>
              <div className='flex items-center shadow-sm'>
                <button
                  onClick={() => {
                    const newQuantity = Math.max(1, quantity - 1);
                    setQuantity(newQuantity);
                    // Thêm vào giỏ hàng với số lượng mới
                    addToCart({
                      id: productData.id,
                      name: productData.name,
                      price: productData.price,
                      image: productData.image,
                      quantity: newQuantity,
                    }, newQuantity, selectedColor);
                    showTooltip('Đã cập nhật giỏ hàng!', 'success');
                  }}
                  className='flex h-10 w-10 items-center justify-center rounded-l-full border border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer bg-gray-100 text-gray-700 font-medium border-r-0 hover:scale-105'
                >
                  -
                </button>
                <span className='px-4 py-2 border border-gray-300 bg-white text-center min-w-[4rem] flex items-center justify-center text-gray-700 font-medium'>{quantity}</span>
                <button
                  onClick={() => {
                    const newQuantity = quantity + 1;
                    setQuantity(newQuantity);
                    // Thêm vào giỏ hàng với số lượng mới
                    addToCart({
                      id: productData.id,
                      name: productData.name,
                      price: productData.price,
                      image: productData.image,
                      quantity: newQuantity,
                    }, newQuantity, selectedColor);
                    showTooltip('Đã cập nhật giỏ hàng!', 'success');
                  }}
                  className='flex h-10 w-10 items-center justify-center rounded-r-full border border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer bg-gray-100 text-gray-700 font-medium border-l-0 hover:scale-105'
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3'>
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className='flex items-center justify-center rounded-full bg-gray-100 px-4 py-3 text-gray-700 hover:bg-gray-200 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer border border-gray-200 font-medium w-12 h-12'
              >
                <div className='relative'>
                  <ShoppingCartIcon className='h-6 w-6' />
                  <div className='absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center'>
                    <span className='text-white text-xs font-bold'>+</span>
                  </div>
                </div>
              </button>
              
              {/* Buy Now */}
              <button
                onClick={handleAddToCart}
                className='flex flex-1 items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer font-medium'
              >
                Mua hàng
              </button>
            </div>

            {/* Services */}
            <div className='grid grid-cols-2 gap-4'>
              {productData.services.map((service, index) => (
                <div key={index} className='flex items-center space-x-2'>
                  <span className='text-xl'>{service.icon}</span>
                  <span className='text-sm text-gray-600'>{service.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description and Specs */}
        <div className='mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {/* Description */}
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold'>Mô tả sản phẩm</h2>
            <div className='prose max-w-none text-gray-600'>
              <p>{productData.description}</p>
            </div>
          </div>

          {/* Specifications */}
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold'>Thông số kỹ thuật</h2>
            <div className='space-y-2'>
              {Object.entries(productData.specs).map(([key, value]) => (
                <div key={key} className='flex justify-between border-b border-gray-200 py-2'>
                  <span className='font-medium'>{key}:</span>
                  <span className='text-gray-600'>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
