'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  submenu?: 'mega' | DropdownItem[];
}

const navItems: NavItem[] = [
  { label: 'Trang chủ', href: '#' },
  { label: 'Khám phá', submenu: 'mega' },
  {
    label: 'Tìm hiểu thêm',
    submenu: [
      { label: 'Về chúng tôi', href: '#' },
      { label: 'Liên hệ', href: '#' },
    ],
  },
  {
    label: 'Bài viết',
    submenu: [
      { label: 'Tin tức', href: '#' },
      { label: 'Hướng dẫn', href: '#' },
    ],
  },
];

const Header: React.FC = () => {
  return (
    <div className="hidden lg:block">
      <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-50 shadow">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="#" className="flex items-center">
              <Image src="/logo-mexe.png" alt="Logo" width={64} height={64} className="h-16 w-auto mr-2" />
            </Link>

            {/* Nav Links */}
            <nav className="flex justify-center">
              <ul className="flex space-x-8 text-base font-medium text-[#0A115F]">
                {navItems.map((item, index) =>
                  item.submenu === 'mega' ? (
                    <MegaMenu key={index} />
                  ) : item.submenu ? (
                    <DropdownMenu key={index} label={item.label} items={item.submenu} />
                  ) : (
                    <li key={index}>
                      <Link href={item.href ?? '#'} className="hover:text-[#0A115F] transition">
                        {item.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>

            {/* Search, Cart, Account */}
            <div className="flex items-center justify-end space-x-6">
              {/* Search */}
              <form className="relative w-80 max-w-xs" role="search">
                <input
                  className="w-full pl-5 pr-12 py-2 rounded-full bg-[#0A115F]/10 placeholder-gray-500 text-[#0A115F] focus:outline-none focus:ring-2 focus:ring-[#0A115F]"
                  type="search"
                  placeholder="Tìm sản phẩm"
                  aria-label="Search"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2" type="submit">
                  <Image src="/icon-search.svg" alt="Search" width={24} height={24} />
                </button>
              </form>

              {/* Cart */}
              <Link href="#" className="relative">
                <Image src="/cart-shopping-light.svg" alt="Cart" width={28} height={28} />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Account */}
              <Link href="#" className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                <Image src="/vth-user.webp" alt="Account" width={40} height={40} className="object-cover" />
              </Link>
            </div>
          </div>

          {/* Mobile Nav */}
          <div className="flex md:hidden items-center justify-between h-16">
            <button className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gray-500 shadow-md">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                4
              </span>
            </button>

            <Link href="#" className="flex items-center">
              <Image src="/logo-mexe.png" alt="Logo" width={32} height={32} className="h-8 w-auto" />
            </Link>

            <div className="flex items-center space-x-4">
              <button>
                <Image src="/icon-search.svg" alt="Search" width={28} height={28} />
              </button>
              <Link href="#" className="relative">
                <Image src="/cart-shopping-light.svg" alt="Cart" width={28} height={28} />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="Account"
                  width={36}
                  height={36}
                  className="object-cover"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, items }) => (
  <li className="relative group">
    <button className="flex items-center hover:text-[#0A115F] transition">
      {label}
      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div className="absolute left-0 top-full mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
      {items.map((item, idx) => (
        <Link key={idx} href={item.href} className="block px-4 py-2 hover:bg-gray-100">
          {item.label}
        </Link>
      ))}
    </div>
  </li>
);

const MegaMenu: React.FC = () => (
  <li className="relative group">
    <button className="flex items-center hover:text-[#0A115F] transition">
      Khám phá
      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div className="fixed left-0 top-[80px] w-screen bg-[#06064C] shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[9999] py-6 max-h-[calc(100vh-80px)] overflow-y-auto">
      <section className="max-w-7xl mx-auto px-4 text-white">
        <h2 className="text-3xl font-bold mb-6 uppercase">KHÁM PHÁ THEO CHỦ ĐỀ</h2>
        {/* You can render more dynamic sections here like cards or categories */}
        {/* This is left simplified — you can reuse and split more components */}
      </section>
    </div>
  </li>
);
