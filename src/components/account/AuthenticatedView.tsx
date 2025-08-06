'use client';
import React, { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthenticatedViewProps {
  user: User;
  onLogout: () => void;
}

export default function AuthenticatedView({ user, onLogout }: AuthenticatedViewProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'favorites' | 'coupons' | 'settings'>('profile');

  return (
    <div className='mx-auto max-w-4xl'>
      {/* User Header */}
      <div className='mb-8 rounded-lg bg-white p-6 shadow-lg'>
        <div className='flex items-center space-x-4'>
          <div className='h-16 w-16 rounded-full bg-[#2D6294] flex items-center justify-center'>
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className='h-16 w-16 rounded-full object-cover' />
            ) : (
              <span className='text-2xl font-bold text-white'>
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className='flex-1'>
            <h2 className='text-xl font-bold text-gray-900'>{user.name}</h2>
            <p className='text-gray-600'>{user.email}</p>
          </div>
          <button
            onClick={onLogout}
            className='rounded-lg bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700 transition-colors'
          >
            Đăng xuất
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className='mb-8 flex rounded-lg bg-white p-1 shadow-sm overflow-x-auto'>
        <button
          className={`flex-shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#2D6294] text-white'
              : 'text-gray-600 hover:text-[#2D6294]'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          Thông tin cá nhân
        </button>
        <button
          className={`flex-shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-[#2D6294] text-white'
              : 'text-gray-600 hover:text-[#2D6294]'
          }`}
          onClick={() => setActiveTab('orders')}
        >
          Đơn hàng
        </button>
        <button
          className={`flex-shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'favorites'
              ? 'bg-[#2D6294] text-white'
              : 'text-gray-600 hover:text-[#2D6294]'
          }`}
          onClick={() => setActiveTab('favorites')}
        >
          Sản phẩm yêu thích
        </button>
        <button
          className={`flex-shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'coupons'
              ? 'bg-[#2D6294] text-white'
              : 'text-gray-600 hover:text-[#2D6294]'
          }`}
          onClick={() => setActiveTab('coupons')}
        >
          Mã giảm giá
        </button>
        <button
          className={`flex-shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-[#2D6294] text-white'
              : 'text-gray-600 hover:text-[#2D6294]'
          }`}
          onClick={() => setActiveTab('settings')}
        >
          Cài đặt
        </button>
      </div>

      {/* Content Container */}
      <div className='rounded-lg bg-white p-8 shadow-lg'>
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Thông tin cá nhân</h3>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Họ và tên
                </label>
                <input
                  type='text'
                  defaultValue={user.name}
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Email
                </label>
                <input
                  type='email'
                  defaultValue={user.email}
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Số điện thoại
                </label>
                <input
                  type='tel'
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
                  placeholder='Nhập số điện thoại'
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Ngày sinh
                </label>
                <input
                  type='date'
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
                />
              </div>
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Địa chỉ
              </label>
              <textarea
                rows={3}
                className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
                placeholder='Nhập địa chỉ của bạn'
              />
            </div>
            
            <div className='flex justify-end'>
              <button className='rounded-lg bg-[#2D6294] px-6 py-2 text-white font-medium hover:bg-[#2D6294]/90 transition-colors'>
                Cập nhật thông tin
              </button>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Lịch sử đơn hàng</h3>
            
            <div className='text-center py-8'>
              <div className='text-gray-400 mb-4'>
                <svg className='mx-auto h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                </svg>
              </div>
              <p className='text-gray-600'>Bạn chưa có đơn hàng nào</p>
              <button className='mt-4 rounded-lg bg-[#2D6294] px-6 py-2 text-white font-medium hover:bg-[#2D6294]/90 transition-colors'>
                Mua sắm ngay
              </button>
            </div>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Sản phẩm yêu thích</h3>
            
            <div className='text-center py-8'>
              <div className='text-gray-400 mb-4'>
                <svg className='mx-auto h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                </svg>
              </div>
              <p className='text-gray-600'>Bạn chưa có sản phẩm yêu thích nào</p>
              <button className='mt-4 rounded-lg bg-[#2D6294] px-6 py-2 text-white font-medium hover:bg-[#2D6294]/90 transition-colors'>
                Khám phá sản phẩm
              </button>
            </div>
          </div>
        )}

        {/* Coupons Tab */}
        {activeTab === 'coupons' && (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Mã giảm giá</h3>
            
            <div className='text-center py-8'>
              <div className='text-gray-400 mb-4'>
                <svg className='mx-auto h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' />
                </svg>
              </div>
              <p className='text-gray-600'>Bạn chưa có mã giảm giá nào</p>
              <button className='mt-4 rounded-lg bg-[#2D6294] px-6 py-2 text-white font-medium hover:bg-[#2D6294]/90 transition-colors'>
                Xem mã giảm giá
              </button>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Cài đặt tài khoản</h3>
            
            <div className='space-y-4'>
              <div className='flex items-center justify-between p-4 border border-gray-200 rounded-lg'>
                <div>
                  <h4 className='font-medium text-gray-900'>Thay đổi mật khẩu</h4>
                  <p className='text-sm text-gray-600'>Cập nhật mật khẩu tài khoản của bạn</p>
                </div>
                <button className='text-[#2D6294] hover:underline font-medium'>
                  Thay đổi
                </button>
              </div>
              
              <div className='flex items-center justify-between p-4 border border-gray-200 rounded-lg'>
                <div>
                  <h4 className='font-medium text-gray-900'>Thông báo email</h4>
                  <p className='text-sm text-gray-600'>Quản lý thông báo qua email</p>
                </div>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input type='checkbox' className='sr-only peer' defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#2D6294]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2D6294]"></div>
                </label>
              </div>
              
              <div className='flex items-center justify-between p-4 border border-gray-200 rounded-lg'>
                <div>
                  <h4 className='font-medium text-gray-900'>Xóa tài khoản</h4>
                  <p className='text-sm text-gray-600'>Xóa vĩnh viễn tài khoản của bạn</p>
                </div>
                <button className='text-red-600 hover:underline font-medium'>
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 