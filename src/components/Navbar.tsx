'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import LoginModal from './LoginModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false); // State for about submenu

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Simulated cart data
  const cartItems = [];
  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl sm:text-2xl font-bold">Vài Thứ Hay</Link>

        {/* Desktop Navigation and Search */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="flex space-x-4">
            <Link href="/products" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">Sản Phẩm</Link>
            <Link href="/combos" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">Combo</Link>
            <div className="relative">
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 text-sm sm:text-base"
                onClick={() => setIsOpen(false)}
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
                style={{
                  transition: 'background-color 0.3s, font-weight 0.3s',
                  backgroundColor: isAboutOpen ? '#fcde50' : 'transparent',
                  fontWeight: isAboutOpen ? 'bold' : 'normal'
                }}
              >
                Về Chúng Tôi
              </Link>
              {isAboutOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2 z-10">
                  <ul className="space-y-1">
                    <li className="block px-2 py-1 text-gray-600">Setup & Decor</li>
                    <li className="block px-2 py-1 text-gray-600">Công Nghệ</li>
                    <li className="block px-2 py-1 text-gray-600">Thiết Kế</li>
                    <li className="block px-2 py-1 text-gray-600">Đổi Mới</li>
                  </ul>
                </div>
              )}
            </div>
            <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">Đăng Nhập</Link>
          </div>
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm sản phẩm..."
              className="pl-10 pr-4 py-1 sm:py-2 text-sm sm:text-base border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
          {/* Cart Icon with Popover */}
          <div className="relative">
            <button
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none ml-2"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{totalItems}</span>}
            </button>
            {isCartOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-10"
                onMouseEnter={() => setIsCartOpen(true)}
                onMouseLeave={() => setIsCartOpen(false)}
              >
                {totalItems === 0 ? (
                  <p className="text-center text-gray-600">Giỏ hàng rỗng<br />Hổng lẻ hổng ưng</p>
                ) : (
                  <>
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex justify-between mb-2">
                        <span>{item.name}</span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                    <div className="mt-4 border-t pt-2">
                      <p className="text-right font-semibold">Tổng: {totalPrice.toLocaleString()}₫</p>
                      <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600">
                        Xem giỏ hàng
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          {/* User Circle Icon with Modal */}
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none ml-2"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
        </div>

        {/* Hamburger Button for Mobile */}
        <button
          className="sm:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            <Link href="/products" className="text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>Sản Phẩm</Link>
            <Link href="/combos" className="text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>Combo</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>Về Chúng Tôi</Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>Đăng Nhập</Link>
            {/* Mobile Search Bar */}
            <form onSubmit={handleSearch} className="relative mt-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm sản phẩm..."
                className="w-full pl-10 pr-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
            {/* Mobile Cart Icon */}
            <div className="relative mt-2">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none w-full text-left"
              >
                <div className="flex items-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{totalItems}</span>}
                  <span className="ml-2">Giỏ hàng</span>
                </div>
              </button>
              {isCartOpen && (
                <div className="mt-2 w-full bg-white border rounded-lg shadow-lg p-4">
                  {totalItems === 0 ? (
                    <p className="text-center text-gray-600">Giỏ hàng rỗng<br />Hổng lẻ hổng ưng</p>
                  ) : (
                    <>
                      {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between mb-2">
                          <span>{item.name}</span>
                          <span>{item.price}</span>
                        </div>
                      ))}
                      <div className="mt-4 border-t pt-2">
                        <p className="text-right font-semibold">Tổng: {totalPrice.toLocaleString()}₫</p>
                        <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600">
                          Xem giỏ hàng
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            {/* Mobile User Circle Icon */}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none mt-2 w-full text-left"
            >
              <div className="flex items-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span className="ml-2">Tài khoản</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
    </nav>
  );
}
