'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFlashTooltip } from '@/context/FlashTooltipContext';
import { apiClient } from '@/services/api';
import OrderDetailModal from './OrderDetailModal';
import type { User, Order, WishlistItem, ChangePasswordRequest } from '@/types';

interface AuthenticatedViewProps {
  user: User;
  onLogout: () => void;
}

export default function AuthenticatedView({
  user,
  onLogout,
}: AuthenticatedViewProps) {
  // Format price to Vietnamese currency (matching product detail page format)
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  const [activeTab, setActiveTab] = useState<
    'profile' | 'orders' | 'favorites' | 'coupons' | 'settings'
  >('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
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

  // Helper function to safely validate order data
  const validateOrderData = (order: any): Order => {
    try {
      return {
        id: order.id || `order-${Math.random()}`,
        status: order.status || 'Đang xử lý',
        total_amount: order.total_amount,
        items: Array.isArray(order.order_items) ? order.order_items : [],
        shipping_address: order.shipping_address
          ? order.shipping_address
          : [
              order.delivery_address,
              order.shipping_ward_name,
              order.shipping_district,
              order.shipping_province_name,
            ]
              .filter((item) => typeof item === 'string' && item.trim() !== '')
              .join(', '),
        created_at: order.created_at || new Date().toISOString(),
        updated_at: order.updated_at || new Date().toISOString(),
      };
    } catch (error) {
      return {
        id: `order-${Math.random()}`,
        status: 'Đang xử lý',
        total_amount: 0,
        items: [],
        shipping_address: 'Địa chỉ không xác định',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
  };

  // Helper function to safely validate wishlist item data
  const validateWishlistItemData = (item: any): WishlistItem => {
    try {
      return {
        id: item.id || `wishlist-${Math.random()}`,
        product_id: item.product_id || `product-${Math.random()}`,
        product_name: item.product_name || 'Tên sản phẩm không xác định',
        product_image: item.product_image || '/images/placeholder-product.png',
        product_price:
          typeof item.product_price === 'number' ? item.product_price : 0,
        added_at: item.added_at || new Date().toISOString(),
      };
    } catch (error) {
      return {
        id: `wishlist-${Math.random()}`,
        product_id: `product-${Math.random()}`,
        product_name: 'Tên sản phẩm không xác định',
        product_image: '/images/placeholder-product.png',
        product_price: 0,
        added_at: new Date().toISOString(),
      };
    }
  };

  // Load user data when tabs change
  useEffect(() => {
    try {
      if (activeTab === 'orders') {
        loadOrders();
      } else if (activeTab === 'favorites') {
        loadWishlist();
      }
    } catch (error) {}
  }, [activeTab]);

  // Initialize orders and wishlist as empty arrays to prevent undefined errors
  useEffect(() => {
    try {
      setOrders([]);
      setWishlist([]);
    } catch (error) {}
  }, []);

  // Add error boundary for unexpected data
  const handleUnexpectedData = (data: any, type: string) => {
    try {
      showTooltip(
        `Dữ liệu ${type} không đúng định dạng. Vui lòng thử lại sau.`,
        'error'
      );
    } catch (error) {}
  };

  // Update form when user data changes
  useEffect(() => {
    try {
      setProfileForm({
        name: user.name || '',
        phone: user.phone || '',
        date_of_birth: user.date_of_birth || '',
        address: user.address || '',
      });
    } catch (error) {
      // Set default values on error
      setProfileForm({
        name: '',
        phone: '',
        date_of_birth: '',
        address: '',
      });
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const userOrders = await apiClient.getUserOrders();

      // Ensure userOrders is an array
      if (!Array.isArray(userOrders)) {
        handleUnexpectedData(userOrders, 'đơn hàng');
        setOrders([]);
        return;
      }

      // Ensure orders have the correct structure
      const validatedOrders = userOrders.map((order) =>
        validateOrderData(order)
      );

      setOrders(validatedOrders);
    } catch (error: any) {
      // Handle 401 errors
      if (error.status === 401) {
        // Token expired or invalid, show empty state
        setOrders([]);
        showTooltip(
          'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
          'noti'
        );
        return;
      }

      // Handle other errors gracefully
      if (error.status === 404 || error.status === 500) {
        // Server errors - show empty state but don't logout
        setOrders([]);
        showTooltip(
          'Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.',
          'noti'
        );
      } else if (error.status === 0) {
        // Network error
        setOrders([]);
        showTooltip('Lỗi kết nối. Vui lòng kiểm tra internet.', 'noti');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadWishlist = async () => {
    try {
      setIsLoading(true);
      const userWishlist = await apiClient.getUserWishlist();

      // Ensure userWishlist is an array
      if (!Array.isArray(userWishlist)) {
        handleUnexpectedData(userWishlist, 'danh sách yêu thích');
        setWishlist([]);
        return;
      }

      // Ensure wishlist items have the correct structure
      const validatedWishlist = userWishlist.map((item) =>
        validateWishlistItemData(item)
      );

      setWishlist(validatedWishlist);
    } catch (error: any) {
      // Handle 401 errors
      if (error.status === 401) {
        // Token expired or invalid, show empty state
        setWishlist([]);
        showTooltip(
          'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
          'noti'
        );
        return;
      }

      // Handle other errors gracefully
      if (error.status === 404 || error.status === 500) {
        // Server errors - show empty state but don't logout
        setWishlist([]);
        showTooltip(
          'Không thể tải danh sách yêu thích. Vui lòng thử lại sau.',
          'noti'
        );
      } else if (error.status === 0) {
        // Network error
        setWishlist([]);
        showTooltip('Lỗi kết nối. Vui lòng kiểm tra internet.', 'noti');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      if (!productId) {
        showTooltip('ID sản phẩm không hợp lệ', 'error');
        return;
      }

      await apiClient.removeFromWishlist(productId);
      showTooltip('Đã xóa sản phẩm khỏi danh sách yêu thích!', 'success');
      // Reload wishlist
      loadWishlist();
    } catch (error: any) {
      showTooltip(
        error.errors?.[0] || 'Không thể xóa sản phẩm khỏi danh sách yêu thích',
        'error'
      );
    }
  };

  const handleOrderClick = (order: Order) => {
    try {
      // Ensure order data is valid before opening modal
      console.log(order);
      const validatedOrder = validateOrderData(order);
      setSelectedOrder(validatedOrder);
      setIsOrderModalOpen(true);
    } catch (error) {
      showTooltip(
        'Không thể mở chi tiết đơn hàng. Vui lòng thử lại sau.',
        'error'
      );
    }
  };

  const closeOrderModal = () => {
    try {
      setIsOrderModalOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      // Force close modal on error
      setIsOrderModalOpen(false);
      setSelectedOrder(null);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate form data
      if (!profileForm.name || profileForm.name.trim() === '') {
        showTooltip('Tên không được để trống', 'error');
        return;
      }

      await updateProfile({ user: profileForm });
      // Success message will be shown by AuthContext
    } catch (error: any) {
      // Error message will be shown by AuthContext
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (
      !passwordForm.current_password ||
      passwordForm.current_password.trim() === ''
    ) {
      showTooltip('Vui lòng nhập mật khẩu hiện tại', 'error');
      return;
    }

    if (!passwordForm.new_password || passwordForm.new_password.trim() === '') {
      showTooltip('Vui lòng nhập mật khẩu mới', 'error');
      return;
    }

    if (passwordForm.new_password.length < 6) {
      showTooltip('Mật khẩu mới phải có ít nhất 6 ký tự', 'error');
      return;
    }

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
      setPasswordForm({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
    } catch (error: any) {
      showTooltip(error.errors?.[0] || 'Đổi mật khẩu thất bại', 'error');
    }
  };

  return (
    <div className='mx-auto max-w-4xl'>
      {/* User Header */}
      <div className='mb-8 rounded-lg bg-white p-6 shadow-lg'>
        <div className='flex items-center space-x-4'>
          <div className='flex h-16 w-16 items-center justify-center rounded-full bg-[#2D6294]'>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || 'User'}
                className='h-16 w-16 rounded-full object-cover'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <span
              className={`text-2xl font-bold text-white ${user.avatar ? 'hidden' : ''}`}
            >
              {(user.name || 'U').charAt(0).toUpperCase()}
            </span>
          </div>
          <div className='flex-1'>
            <h2 className='text-xl font-bold text-gray-900'>
              {user.name || 'Tên không xác định'}
            </h2>
            <p className='text-gray-600'>
              {user.email || 'Email không xác định'}
            </p>
          </div>
          <button
            onClick={() => {
              try {
                onLogout();
              } catch (error) {
                // Force logout on error
                onLogout();
              }
            }}
            className='rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700'
          >
            Đăng xuất
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className='mb-8 flex overflow-x-auto rounded-lg bg-white p-1 shadow-sm'>
        <button
          className={`flex-shrink-0 cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'profile'
              ? 'bg-[#2D6294] text-white'
              : 'text-gray-600 hover:text-[#2D6294]'
          }`}
          onClick={() => {
            try {
              setActiveTab('profile');
            } catch (error) {}
          }}
        >
          Thông tin cá nhân
        </button>
        <button
          className={`flex-shrink-0 cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'orders'
              ? 'bg-[#2D6294] text-white'
              : 'text-gray-600 hover:text-[#2D6294]'
          }`}
          onClick={() => {
            try {
              setActiveTab('orders');
            } catch (error) {}
          }}
        >
          Đơn hàng
        </button>
        <button
          className={`flex-shrink-0 cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'favorites'
              ? 'bg-[#2D6294] text-white'
              : 'text-gray-600 hover:text-[#2D6294]'
          }`}
          onClick={() => {
            try {
              setActiveTab('favorites');
            } catch (error) {}
          }}
        >
          Sản phẩm yêu thích
        </button>
        <button
          className={`flex-shrink-0 cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'coupons'
              ? 'bg-[#2D6294] text-white'
              : 'text-gray-600 hover:text-[#2D6294]'
          }`}
          onClick={() => {
            try {
              setActiveTab('coupons');
            } catch (error) {}
          }}
        >
          Mã giảm giá
        </button>
        <button
          className={`flex-shrink-0 cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'settings'
              ? 'bg-[#2D6294] text-white'
              : 'text-gray-600 hover:text-[#2D6294]'
          }`}
          onClick={() => {
            try {
              setActiveTab('settings');
            } catch (error) {}
          }}
        >
          Cài đặt
        </button>
      </div>

      {/* Content Container */}
      <div className='rounded-lg bg-white p-8 shadow-lg'>
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileUpdate} className='space-y-6'>
            <h3 className='mb-4 text-lg font-medium text-gray-900'>
              Thông tin cá nhân
            </h3>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Họ và tên
                </label>
                <input
                  type='text'
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:ring-1 focus:ring-[#2D6294] focus:outline-none'
                  required
                />
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  type='email'
                  value={user.email || ''}
                  className='w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-500'
                  disabled
                />
                <p className='mt-1 text-xs text-gray-500'>
                  Email không thể thay đổi
                </p>
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Số điện thoại
                </label>
                <input
                  type='tel'
                  value={profileForm.phone}
                  onChange={(e) =>
                    setProfileForm((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:ring-1 focus:ring-[#2D6294] focus:outline-none'
                  placeholder='Nhập số điện thoại'
                />
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Ngày sinh
                </label>
                <input
                  type='date'
                  value={profileForm.date_of_birth}
                  onChange={(e) =>
                    setProfileForm((prev) => ({
                      ...prev,
                      date_of_birth: e.target.value,
                    }))
                  }
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:ring-1 focus:ring-[#2D6294] focus:outline-none'
                />
              </div>
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Địa chỉ
              </label>
              <textarea
                rows={3}
                value={profileForm.address}
                onChange={(e) =>
                  setProfileForm((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:ring-1 focus:ring-[#2D6294] focus:outline-none'
                placeholder='Nhập địa chỉ của bạn'
              />
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                onClick={(e) => {
                  try {
                    // Form submission is handled by onSubmit
                  } catch (error) {
                    e.preventDefault();
                    showTooltip(
                      'Có lỗi xảy ra. Vui lòng thử lại sau.',
                      'error'
                    );
                  }
                }}
                className='rounded-lg bg-[#2D6294] px-6 py-2 font-medium text-white transition-colors hover:bg-[#2D6294]/90'
              >
                Cập nhật thông tin
              </button>
            </div>
          </form>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className='space-y-6'>
            <h3 className='mb-4 text-lg font-medium text-gray-900'>
              Lịch sử đơn hàng
            </h3>

            {isLoading ? (
              <div className='py-8 text-center'>
                <div className='mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-[#2D6294]'></div>
                <p className='mt-2 text-gray-600'>Đang tải...</p>
              </div>
            ) : !Array.isArray(orders) || orders.length === 0 ? (
              <div className='py-8 text-center'>
                <div className='mb-4 text-gray-400'>
                  <svg
                    className='mx-auto h-12 w-12'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    />
                  </svg>
                </div>
                <p className='text-gray-600'>Bạn chưa có đơn hàng nào</p>
                <button
                  onClick={() => {
                    try {
                      // Navigate to products page
                      window.location.href = '/products';
                    } catch (error) {}
                  }}
                  className='mt-4 rounded-lg bg-[#2D6294] px-6 py-2 font-medium text-white transition-colors hover:bg-[#2D6294]/90'
                >
                  Mua sắm ngay
                </button>
              </div>
            ) : (
              <div className='space-y-4'>
                {orders.map((order) => {
                  // Additional safety check for each order
                  if (!order || typeof order !== 'object') {
                    handleUnexpectedData(order, 'đơn hàng');
                    return null;
                  }

                  return (
                    <div
                      key={order.id || `order-${Math.random()}`}
                      className='cursor-pointer rounded-lg border border-gray-200 p-4 transition-all hover:border-[#2D6294] hover:shadow-md'
                      onClick={() => handleOrderClick(order)}
                    >
                      <div className='mb-3 flex items-start justify-between'>
                        <div>
                          <h4 className='font-medium text-gray-900'>
                            Đơn hàng #{order.id || 'N/A'}
                          </h4>
                          <p className='text-sm text-gray-600'>
                            {order.created_at
                              ? new Date(order.created_at).toLocaleDateString(
                                  'vi-VN'
                                )
                              : 'N/A'}
                          </p>
                        </div>
                        <div className='text-right'>
                          <span className='rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800'>
                            {order.status || 'Đang xử lý'}
                          </span>
                          <p className='mt-1 font-semibold text-gray-900'>
                            {formatPrice(order.total_amount || 0)}
                          </p>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        {order.items &&
                        Array.isArray(order.items) &&
                        order.items.length > 0 ? (
                          order.items.map((item) => {
                            // Additional safety check for each item
                            if (!item || typeof item !== 'object') {
                              handleUnexpectedData(
                                item,
                                'sản phẩm trong đơn hàng'
                              );
                              return null;
                            }

                            // Parse variant_info if it's a string
                            let variantInfo = null;
                            if (item.variant_info) {
                              if (typeof item.variant_info === 'string') {
                                try {
                                  variantInfo = JSON.parse(item.variant_info);
                                } catch (e) {
                                  console.error('Failed to parse variant_info:', e);
                                }
                              } else {
                                variantInfo = item.variant_info;
                              }
                            }
                            
                            const unitPrice = item.unit_price || item.price || 0;

                            return (
                              <div
                                key={item.id || `item-${Math.random()}`}
                                className='flex items-center space-x-3 text-sm'
                              >
                                <img
                                  src={
                                    item.product_image ||
                                    '/images/placeholder-product.png'
                                  }
                                  alt={item.product_name || 'Sản phẩm'}
                                  className='h-12 w-12 rounded object-cover'
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src =
                                      '/images/placeholder-product.png';
                                  }}
                                />
                                <div className='flex-1'>
                                  <p className='text-gray-900'>
                                    {item.product_name ||
                                      'Tên sản phẩm không xác định'}
                                  </p>
                                  {variantInfo && (
                                    <p className='text-xs text-blue-600 mt-1'>
                                      {variantInfo.variant_name}: {variantInfo.variant_value}
                                      {variantInfo.variant_sku && ` (${variantInfo.variant_sku})`}
                                    </p>
                                  )}
                                  <p className='text-gray-600'>
                                    {item.quantity || 0} x{' '}
                                    {formatPrice(unitPrice || 0)}
                                  </p>
                                  {variantInfo && variantInfo.price_adjustment && variantInfo.price_adjustment !== 0 && (
                                    <p className='text-xs text-gray-500'>
                                      {variantInfo.price_adjustment > 0 ? '+' : ''}
                                      {formatPrice(variantInfo.price_adjustment)}
                                      {' '}(điều chỉnh)
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className='py-4 text-center text-gray-500'>
                            <p>Không có thông tin sản phẩm</p>
                          </div>
                        )}
                      </div>

                      <div className='mt-3 border-t border-gray-100 pt-3'>
                        <p className='text-center text-xs text-gray-500'>
                          Click để xem chi tiết đơn hàng
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className='space-y-6'>
            <h3 className='mb-4 text-lg font-medium text-gray-900'>
              Sản phẩm yêu thích
            </h3>

            {isLoading ? (
              <div className='py-8 text-center'>
                <div className='mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-[#2D6294]'></div>
                <p className='mt-2 text-gray-600'>Đang tải...</p>
              </div>
            ) : !Array.isArray(wishlist) || wishlist.length === 0 ? (
              <div className='py-8 text-center'>
                <div className='mb-4 text-gray-400'>
                  <svg
                    className='mx-auto h-12 w-12'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                    />
                  </svg>
                </div>
                <p className='text-gray-600'>
                  Bạn chưa có sản phẩm yêu thích nào
                </p>
                <button
                  onClick={() => {
                    try {
                      // Navigate to products page
                      window.location.href = '/products';
                    } catch (error) {}
                  }}
                  className='mt-4 rounded-lg bg-[#2D6294] px-6 py-2 font-medium text-white transition-colors hover:bg-[#2D6294]/90'
                >
                  Khám phá sản phẩm
                </button>
              </div>
            ) : (
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {wishlist.map((item) => {
                  // Additional safety check for each wishlist item
                  if (!item || typeof item !== 'object') {
                    handleUnexpectedData(item, 'sản phẩm yêu thích');
                    return null;
                  }

                  return (
                    <div
                      key={item.id || `wishlist-${Math.random()}`}
                      className='rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md'
                    >
                      <img
                        src={
                          item.product_image ||
                          '/images/placeholder-product.png'
                        }
                        alt={item.product_name || 'Sản phẩm'}
                        className='mb-4 h-48 w-full rounded-lg object-cover'
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder-product.png';
                        }}
                      />
                      <h4 className='mb-2 font-medium text-gray-900'>
                        {item.product_name || 'Tên sản phẩm không xác định'}
                      </h4>
                      <p className='mb-3 text-lg font-semibold text-[#2D6294]'>
                        {(item.product_price || 0).toLocaleString('vi-VN')}đ
                      </p>
                      <p className='mb-3 text-xs text-gray-500'>
                        Đã thêm:{' '}
                        {item.added_at
                          ? new Date(item.added_at).toLocaleDateString('vi-VN')
                          : 'N/A'}
                      </p>
                      <div className='flex space-x-2'>
                        <button
                          onClick={() => {
                            try {
                              // Navigate to product detail page
                              window.location.href = `/products/${item.product_id}`;
                            } catch (error) {
                              showTooltip(
                                'Không thể mở trang sản phẩm. Vui lòng thử lại sau.',
                                'error'
                              );
                            }
                          }}
                          className='flex-1 rounded-lg bg-[#2D6294] px-4 py-2 text-white transition-colors hover:bg-[#2D6294]/90'
                        >
                          Mua ngay
                        </button>
                        <button
                          onClick={(e) => {
                            try {
                              e.stopPropagation();
                              handleRemoveFromWishlist(item.id);
                            } catch (error) {
                              showTooltip(
                                'Không thể xóa sản phẩm. Vui lòng thử lại sau.',
                                'error'
                              );
                            }
                          }}
                          className='rounded-lg border border-gray-300 px-3 py-2 transition-colors hover:bg-gray-50'
                        >
                          <svg
                            className='h-5 w-5 text-red-500'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path
                              fillRule='evenodd'
                              d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z'
                              clipRule='evenodd'
                            />
                            <path
                              fillRule='evenodd'
                              d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L7.586 12l-1.293 1.293a1 1 0 101.414 1.414L9 13.414l1.293 1.293a1 1 0 001.414-1.414L10.414 12l1.293-1.293z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Coupons Tab */}
        {activeTab === 'coupons' && (
          <div className='space-y-6'>
            <h3 className='mb-4 text-lg font-medium text-gray-900'>
              Mã giảm giá
            </h3>

            <div className='py-8 text-center'>
              <div className='mb-4 text-gray-400'>
                <svg
                  className='mx-auto h-12 w-12'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z'
                  />
                </svg>
              </div>
              <p className='text-gray-600'>Bạn chưa có mã giảm giá nào</p>
              <button
                onClick={() => {
                  try {
                    // Navigate to coupons page or show message
                    showTooltip(
                      'Tính năng mã giảm giá sẽ được triển khai sau',
                      'noti'
                    );
                  } catch (error) {}
                }}
                className='mt-4 rounded-lg bg-[#2D6294] px-6 py-2 font-medium text-white transition-colors hover:bg-[#2D6294]/90'
              >
                Xem mã giảm giá
              </button>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className='space-y-6'>
            <h3 className='mb-4 text-lg font-medium text-gray-900'>
              Cài đặt tài khoản
            </h3>

            <div className='space-y-6'>
              {/* Change Password Form */}
              <div className='rounded-lg border border-gray-200 p-6'>
                <h4 className='mb-4 font-medium text-gray-900'>
                  Thay đổi mật khẩu
                </h4>
                <form onSubmit={handlePasswordChange} className='space-y-4'>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Mật khẩu hiện tại
                    </label>
                    <input
                      type='password'
                      value={passwordForm.current_password}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          current_password: e.target.value,
                        }))
                      }
                      className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:ring-1 focus:ring-[#2D6294] focus:outline-none'
                      required
                    />
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Mật khẩu mới
                    </label>
                    <input
                      type='password'
                      value={passwordForm.new_password}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          new_password: e.target.value,
                        }))
                      }
                      className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:ring-1 focus:ring-[#2D6294] focus:outline-none'
                      minLength={6}
                      required
                    />
                  </div>

                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-700'>
                      Xác nhận mật khẩu mới
                    </label>
                    <input
                      type='password'
                      value={passwordForm.confirm_password}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          confirm_password: e.target.value,
                        }))
                      }
                      className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:ring-1 focus:ring-[#2D6294] focus:outline-none'
                      required
                    />
                  </div>

                  <button
                    type='submit'
                    onClick={(e) => {
                      try {
                        // Form submission is handled by onSubmit
                      } catch (error) {
                        e.preventDefault();
                        showTooltip(
                          'Có lỗi xảy ra. Vui lòng thử lại sau.',
                          'error'
                        );
                      }
                    }}
                    className='rounded-lg bg-[#2D6294] px-6 py-2 text-white transition-colors hover:bg-[#2D6294]/90'
                  >
                    Đổi mật khẩu
                  </button>
                </form>
              </div>

              {/* Other Settings */}
              <div className='flex items-center justify-between rounded-lg border border-gray-200 p-4'>
                <div>
                  <h4 className='font-medium text-gray-900'>Thông báo email</h4>
                  <p className='text-sm text-gray-600'>
                    Quản lý thông báo qua email
                  </p>
                </div>
                <label className='relative inline-flex cursor-pointer items-center'>
                  <input
                    type='checkbox'
                    className='peer sr-only'
                    defaultChecked
                    onChange={(e) => {
                      try {
                        // Handle email notification toggle
                      } catch (error) {}
                    }}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[#2D6294] peer-focus:ring-4 peer-focus:ring-[#2D6294]/20 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>

              <div className='flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4'>
                <div>
                  <h4 className='font-medium text-red-900'>Xóa tài khoản</h4>
                  <p className='text-sm text-red-600'>
                    Xóa vĩnh viễn tài khoản của bạn
                  </p>
                </div>
                <button
                  onClick={() => {
                    try {
                      if (
                        confirm(
                          'Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.'
                        )
                      ) {
                        showTooltip(
                          'Tính năng xóa tài khoản sẽ được triển khai sau',
                          'noti'
                        );
                      }
                    } catch (error) {
                      showTooltip(
                        'Có lỗi xảy ra. Vui lòng thử lại sau.',
                        'error'
                      );
                    }
                  }}
                  className='font-medium text-red-600 hover:underline'
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          isOpen={isOrderModalOpen}
          onClose={closeOrderModal}
        />
      )}
    </div>
  );
}
