'use client';
import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { Order } from '@/types';

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailModal({
  order,
  isOpen,
  onClose,
}: OrderDetailModalProps) {
  if (!isOpen || !order) return null;

  // Format price to Vietnamese currency (matching product detail page format)
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'shipping':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'processing':
        return 'Đang xử lý';
      case 'shipping':
        return 'Đang giao hàng';
      case 'delivered':
        return 'Đã giao hàng';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex min-h-screen items-center justify-center p-4'>
        {/* Backdrop */}
        <div
          className='modal-backdrop fade show fixed inset-0'
          style={{ opacity: 0.5, backgroundColor: '#000' }}
          onClick={onClose}
        />
        {/* Modal */}
        <div className='relative w-full max-w-4xl rounded-lg bg-white shadow-xl'>
          {/* Header */}
          <div className='flex items-center justify-between border-b border-gray-200 p-6'>
            <h2 className='text-xl font-semibold text-gray-900'>
              Chi tiết đơn hàng #{order.id}
            </h2>
            <button
              onClick={onClose}
              className='text-gray-400 transition-colors hover:text-gray-600'
            >
              <XMarkIcon className='h-6 w-6' />
            </button>
          </div>

          {/* Content */}
          <div className='space-y-6 p-6'>
            {/* Order Info */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div>
                <h3 className='mb-3 text-lg font-medium text-gray-900'>
                  Thông tin đơn hàng
                </h3>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Mã đơn hàng:</span>
                    <span className='font-medium'>#{order.id}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Ngày đặt:</span>
                    <span>
                      {new Date(order.created_at).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Trạng thái:</span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Tổng tiền:</span>
                    <span className='text-lg font-semibold text-[#2D6294]'>
                      {formatPrice(order.total_amount)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className='mb-3 text-lg font-medium text-gray-900'>
                  Địa chỉ giao hàng
                </h3>
                <div className='text-sm text-gray-600'>
                  {order.shipping_address || 'Chưa có thông tin địa chỉ'}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className='mb-3 text-lg font-medium text-gray-900'>
                Sản phẩm đã đặt
              </h3>
              <div className='space-y-3'>
                {order.items.map((item) => {
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
                  const totalPrice = item.total_price || item.total || (unitPrice * item.quantity);

                  return (
                    <div
                      key={item.id}
                      className='flex items-center space-x-4 rounded-lg border border-gray-200 p-3'
                    >
                      <img
                        src={
                          item.product_image || '/images/placeholder-product.png'
                        }
                        alt={item.product_name}
                        className='h-16 w-16 rounded object-cover'
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder-product.png';
                        }}
                      />
                      <div className='flex-1'>
                        <h4 className='font-medium text-gray-900'>
                          {item.product_name}
                        </h4>
                        {variantInfo && (
                          <div className='mt-1'>
                            <span className='inline-block rounded bg-blue-100 px-2 py-1 text-xs text-blue-800'>
                              {variantInfo.variant_name}: {variantInfo.variant_value}
                              {variantInfo.variant_sku && ` (${variantInfo.variant_sku})`}
                            </span>
                          </div>
                        )}
                        <p className='mt-1 text-sm text-gray-600'>
                          Số lượng: {item.quantity}
                        </p>
                        {variantInfo && variantInfo.price_adjustment && variantInfo.price_adjustment !== 0 && (
                          <p className='mt-1 text-xs text-gray-500'>
                            {variantInfo.price_adjustment > 0 ? '+' : ''}
                            {formatPrice(variantInfo.price_adjustment)} (điều chỉnh giá)
                          </p>
                        )}
                      </div>
                      <div className='text-right'>
                        <p className='text-sm text-gray-600'>
                          Đơn giá: {formatPrice(unitPrice)}
                        </p>
                        <p className='font-medium text-gray-900'>
                          Thành tiền: {formatPrice(totalPrice)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className='mt-6 rounded-lg bg-gray-50 p-4'>
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Tổng tiền hàng:</span>
                    <span className='font-medium text-gray-900'>
                      {formatPrice(order.items.reduce((sum, item) => {
                        const unitPrice = item.unit_price || item.price || 0;
                        return sum + (unitPrice * item.quantity);
                      }, 0))}
                    </span>
                  </div>
                  <div className='flex justify-between border-t-2 border-blue-600 pt-2 mt-2'>
                    <span className='font-semibold text-gray-900'>Tổng đơn hàng:</span>
                    <span className='text-lg font-bold text-blue-600'>
                      {formatPrice(order.total_amount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className='flex justify-end space-x-3 border-t border-gray-200 pt-4'>
              <button
                onClick={() => {
                  window.open(`/order-status/${order.id}`, '_blank');
                  onClose();
                }}
                className='rounded-lg bg-[#2D6294] px-6 py-2 text-white transition-colors hover:bg-[#2D6294]/90'
              >
                Xem chi tiết đầy đủ
              </button>
              <button
                onClick={onClose}
                className='rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50'
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
