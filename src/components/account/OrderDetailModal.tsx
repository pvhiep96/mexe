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
          className='bg-opacity-50 fixed inset-0 bg-black opacity-50 transition-opacity'
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
                      {order.total_amount.toLocaleString('vi-VN')}đ
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
                {order.items.map((item) => (
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
                    />
                    <div className='flex-1'>
                      <h4 className='font-medium text-gray-900'>
                        {item.product_name}
                      </h4>
                      <p className='text-sm text-gray-600'>
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium text-gray-900'>
                        {item.price.toLocaleString('vi-VN')}đ
                      </p>
                      <p className='text-sm text-gray-600'>
                        Tổng: {item.total.toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className='flex justify-end space-x-3 border-t border-gray-200 pt-4'>
              {/* <button
                onClick={() => {
                  window.open(`/order-status/${order.id}`, '_blank');
                  onClose();
                }}
                className='rounded-lg bg-[#2D6294] px-6 py-2 text-white transition-colors hover:bg-[#2D6294]/90'
              >
                Xem chi tiết đầy đủ
              </button> */}
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
