'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFlashTooltip } from '@/context/FlashTooltipContext';
import { apiClient } from '@/services/api';
import type { User, Order, WishlistItem, ChangePasswordRequest } from '@/types';

interface AuthenticatedViewProps {
  user: User;
  onLogout: () => void;
}

export default function AuthenticatedView({ user, onLogout }: AuthenticatedViewProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'favorites' | 'coupons' | 'settings'>('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    phone: user.phone || '',
    date_of_birth: user.date_of_birth || '',
    address: user.address || '',
  });
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const { updateProfile } = useAuth();
  const { showTooltip } = useFlashTooltip();

  // Load user data when tabs change
  useEffect(() => {
    if (activeTab === 'orders') {
      loadOrders();
    } else if (activeTab === 'favorites') {
      loadWishlist();
    }
  }, [activeTab]);

  // Update form when user data changes
  useEffect(() => {
    setProfileForm({
      name: user.name,
      phone: user.phone || '',
      date_of_birth: user.date_of_birth || '',
      address: user.address || '',
    });
  }, [user]);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const userOrders = await apiClient.getUserOrders();
      setOrders(userOrders);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadWishlist = async () => {
    try {
      setIsLoading(true);
      const userWishlist = await apiClient.getUserWishlist();
      setWishlist(userWishlist);
    } catch (error) {
      console.error('Failed to load wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ user: profileForm });
      // Success message will be shown by AuthContext
    } catch (error: any) {
      // Error message will be shown by AuthContext
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      showTooltip('Mật khẩu xác nhận không khớp!', 'error');
      return;
    }
    
    try {
      const passwordData: ChangePasswordRequest = {
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
      };
      await apiClient.changePassword(passwordData);
      showTooltip('Đổi mật khẩu thành công!', 'success');
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch (error: any) {
      showTooltip(error.errors?.[0] || 'Đổi mật khẩu thất bại', 'error');
    }
  };

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
          <form onSubmit={handleProfileUpdate} className='space-y-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Thông tin cá nhân</h3>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Họ và tên
                </label>
                <input
                  type='text'
                  value={profileForm.name}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
                  required
                />
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Email
                </label>
                <input
                  type='email'
                  value={user.email}
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 bg-gray-100 text-gray-500'
                  disabled
                />
                <p className='text-xs text-gray-500 mt-1'>Email không thể thay đổi</p>
              </div>
              
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Số điện thoại
                </label>
                <input
                  type='tel'
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
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
                  value={profileForm.date_of_birth}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, date_of_birth: e.target.value }))}
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
                value={profileForm.address}
                onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
                placeholder='Nhập địa chỉ của bạn'
              />
            </div>
            
            <div className='flex justify-end'>
              <button 
                type='submit'
                className='rounded-lg bg-[#2D6294] px-6 py-2 text-white font-medium hover:bg-[#2D6294]/90 transition-colors'
              >
                Cập nhật thông tin
              </button>
            </div>
          </form>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Lịch sử đơn hàng</h3>
            
            {isLoading ? (
              <div className='text-center py-8'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#2D6294] mx-auto'></div>
                <p className='mt-2 text-gray-600'>Đang tải...</p>
              </div>
            ) : orders.length === 0 ? (
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
            ) : (
              <div className='space-y-4'>
                {orders.map((order) => (
                  <div key={order.id} className='border border-gray-200 rounded-lg p-4'>
                    <div className='flex justify-between items-start mb-3'>
                      <div>
                        <h4 className='font-medium text-gray-900'>Đơn hàng #{order.id}</h4>
                        <p className='text-sm text-gray-600'>
                          {new Date(order.created_at).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      <div className='text-right'>
                        <span className='px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800'>
                          {order.status}
                        </span>
                        <p className='mt-1 font-semibold text-gray-900'>
                          {order.total_amount.toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                    </div>
                    
                    <div className='space-y-2'>
                      {order.items.map((item) => (
                        <div key={item.id} className='flex items-center space-x-3 text-sm'>
                          <img 
                            src={item.product_image} 
                            alt={item.product_name}
                            className='w-12 h-12 object-cover rounded'
                          />
                          <div className='flex-1'>
                            <p className='text-gray-900'>{item.product_name}</p>
                            <p className='text-gray-600'>
                              {item.quantity} x {item.price.toLocaleString('vi-VN')}đ
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className='space-y-6'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>Sản phẩm yêu thích</h3>
            
            {isLoading ? (
              <div className='text-center py-8'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#2D6294] mx-auto'></div>
                <p className='mt-2 text-gray-600'>Đang tải...</p>
              </div>
            ) : wishlist.length === 0 ? (
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
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {wishlist.map((item) => (
                  <div key={item.id} className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'>
                    <img 
                      src={item.product_image} 
                      alt={item.product_name}
                      className='w-full h-48 object-cover rounded-lg mb-4'
                    />
                    <h4 className='font-medium text-gray-900 mb-2'>{item.product_name}</h4>
                    <p className='text-lg font-semibold text-[#2D6294] mb-3'>
                      {item.product_price.toLocaleString('vi-VN')}đ
                    </p>
                    <p className='text-xs text-gray-500 mb-3'>
                      Đã thêm: {new Date(item.added_at).toLocaleDateString('vi-VN')}
                    </p>
                    <div className='flex space-x-2'>
                      <button className='flex-1 bg-[#2D6294] text-white px-4 py-2 rounded-lg hover:bg-[#2D6294]/90 transition-colors'>
                        Mua ngay
                      </button>
                      <button className='px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'>
                        <svg className='w-5 h-5 text-red-500' fill='currentColor' viewBox='0 0 20 20'>
                          <path fillRule='evenodd' d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z' clipRule='evenodd' />
                          <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L7.586 12l-1.293 1.293a1 1 0 101.414 1.414L9 13.414l1.293 1.293a1 1 0 001.414-1.414L10.414 12l1.293-1.293z' clipRule='evenodd' />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
            
            <div className='space-y-6'>
              {/* Change Password Form */}
              <div className='border border-gray-200 rounded-lg p-6'>
                <h4 className='font-medium text-gray-900 mb-4'>Thay đổi mật khẩu</h4>
                <form onSubmit={handlePasswordChange} className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Mật khẩu hiện tại
                    </label>
                    <input
                      type='password'
                      value={passwordForm.current_password}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, current_password: e.target.value }))}
                      className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
                      required
                    />
                  </div>
                  
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Mật khẩu mới
                    </label>
                    <input
                      type='password'
                      value={passwordForm.new_password}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, new_password: e.target.value }))}
                      className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
                      minLength={6}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Xác nhận mật khẩu mới
                    </label>
                    <input
                      type='password'
                      value={passwordForm.confirm_password}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm_password: e.target.value }))}
                      className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
                      required
                    />
                  </div>
                  
                  <button 
                    type='submit'
                    className='bg-[#2D6294] text-white px-6 py-2 rounded-lg hover:bg-[#2D6294]/90 transition-colors'
                  >
                    Đổi mật khẩu
                  </button>
                </form>
              </div>
              
              {/* Other Settings */}
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
              
              <div className='flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50'>
                <div>
                  <h4 className='font-medium text-red-900'>Xóa tài khoản</h4>
                  <p className='text-sm text-red-600'>Xóa vĩnh viễn tài khoản của bạn</p>
                </div>
                <button 
                  onClick={() => {
                    if (confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.')) {
                      alert('Tính năng xóa tài khoản sẽ được triển khai sau');
                    }
                  }}
                  className='text-red-600 hover:underline font-medium'
                >
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