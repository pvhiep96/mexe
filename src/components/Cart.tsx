'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { CreditCardIcon, GiftIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { useFlashTooltip } from '@/context/FlashTooltipContext';
import { useState } from 'react';

interface Product {
  id: string | number;
  product_name: string;
  unit_price: number;
  product_image: string;
  discount?: number;
  quantity: number;
}

interface Order {
  order_items: Product[];
  total_amount: number;
}

interface ShippingCondition {
  id: number;
  nameKey: string;
  descriptionKey: string;
  image: string;
}

interface CartItemProps {
  item: Product;
}

interface ShippingConditionCardProps {
  condition: ShippingCondition;
}

interface CartProps {
  order: Order;
}
const shippingConditions = [
  {
    id: 1,
    descriptionKey: 'free_shipping_desc',
    image: '/images/demo-icon-delivery.png',
    nameKey: 'free_shipping',
  },
  {
    id: 2,
    descriptionKey: 'fast_delivery_desc',
    image: '/images/demo-icon-delivery.png',
    nameKey: 'fast_delivery',
  },
  {
    id: 3,
    descriptionKey: 'secure_payment_desc',
    image: '/images/demo-icon-delivery.png',
    nameKey: 'secure_payment',
  },
  {
    id: 4,
    descriptionKey: 'easy_returns_desc',
    image: '/images/demo-icon-delivery.png',
    nameKey: 'easy_returns',
  },
];

function CartItem({ item }: CartItemProps) {
  // Fallback translations if useTranslations fails
  const fallbackTranslations: Record<string, string> = {
    quantity: 'Số lượng',
    decrease_quantity: 'Giảm số lượng',
    increase_quantity: 'Tăng số lượng',
    quantity_updated: 'Cập nhật số lượng thành công!',
    remove_item: 'Xóa sản phẩm',
    item_removed: 'Đã xóa sản phẩm khỏi giỏ hàng!',
  };

  // Safe translation function
  const safeTranslate = (key: string) => {
    try {
      const t = useTranslations('cart');
      return t(key);
    } catch (error) {
      // Translation failed for key "${key}", using fallback
      return fallbackTranslations[key] || key;
    }
  };

  const { updateQuantity, removeItem } = useCart();
  const { showTooltip } = useFlashTooltip();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      updateQuantity(item.id, newQuantity);
      try {
        showTooltip(safeTranslate('quantity_updated'), 'noti');
      } catch (error) {
        showTooltip('Cập nhật số lượng thành công!', 'noti');
      }
    }
  };

  const handleRemoveItem = () => {
    removeItem(item.id);
    try {
      showTooltip(safeTranslate('item_removed'), 'success');
    } catch (error) {
      showTooltip('Đã xóa sản phẩm khỏi giỏ hàng!', 'success');
    }
  };

  return (
    <li className='flex flex-col items-start justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:bg-gray-50 sm:flex-row sm:items-center'>
      <div className='flex w-full items-center space-x-4 sm:w-auto'>
        <input
          type='checkbox'
          className='size-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
          defaultChecked
        />
        <Image
          src={item.product_image}
          alt={item.product_name}
          width={80}
          height={80}
          className='size-20 rounded object-cover sm:size-24'
        />
        <div>
          <h3 className='text-base font-semibold text-gray-900 sm:text-lg'>
            {item.product_name}
          </h3>
          <p className='mt-1 text-sm text-gray-500'>
            {safeTranslate('quantity')}: {quantity}
          </p>
          <div className='mt-2 flex items-center gap-2'>
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className='rounded bg-gray-100 px-2 py-1 hover:bg-gray-200'
              aria-label={safeTranslate('decrease_quantity')}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className='rounded bg-gray-100 px-2 py-1 hover:bg-gray-200'
              aria-label={safeTranslate('increase_quantity')}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className='mt-4 flex flex-col items-end gap-2 sm:mt-0'>
        <button
          onClick={handleRemoveItem}
          className='cursor-pointer rounded bg-red-100 px-3 py-1 text-sm text-red-600 transition-colors hover:bg-red-200'
          aria-label={safeTranslate('remove_item')}
        >
          Xóa
        </button>
        <p className='text-lg font-semibold text-blue-600'>
          {(item.unit_price * quantity).toLocaleString('vi-VN')}đ
        </p>
        {item.discount && item.discount > 0 && (
          <>
            <p className='text-sm text-gray-500 line-through'>
              {(item.discount * quantity).toLocaleString('vi-VN')}đ
            </p>
            <p className='mt-1 inline-block rounded-full bg-green-100 px-2 py-1 text-xs text-green-500'>
              -{(item.discount * quantity).toLocaleString('vi-VN')}đ
            </p>
          </>
        )}
      </div>
    </li>
  );
}

function ShippingConditionCard({ condition }: ShippingConditionCardProps) {
  // Fallback translations if useTranslations fails
  const fallbackTranslations: Record<string, string> = {
    free_shipping: 'Miễn Phí Vận Chuyển',
    free_shipping_desc: 'Miễn phí vận chuyển cho đơn hàng trên 1.000.000đ',
    fast_delivery: 'Giao Hàng Nhanh',
    fast_delivery_desc: 'Giao hàng siêu tốc trong 24 giờ',
    secure_payment: 'Thanh Toán Bảo Mật',
    secure_payment_desc: 'Các tùy chọn thanh toán an toàn và bảo mật',
    easy_returns: 'Đổi Trả Dễ Dàng',
    easy_returns_desc: 'Đổi trả dễ dàng trong vòng 30 ngày',
  };

  const t = useTranslations('cart');
  // Safe translation function
  const safeTranslate = (key: string) => {
    try {
      return t(key);
    } catch (error) {
      // Translation failed for key "${key}", using fallback
      return fallbackTranslations[key] || key;
    }
  };

  return (
    <div className='flex items-center rounded-lg bg-white p-4 shadow-sm transition hover:bg-gray-50'>
      <Image
        src={condition.image}
        alt={safeTranslate(condition.nameKey)}
        width={60}
        height={60}
        className='mr-4 size-16 rounded object-cover'
      />
      <div>
        <h3 className='text-sm font-semibold text-gray-900'>
          {safeTranslate(condition.nameKey)}
        </h3>
        <p className='text-sm text-gray-500'>
          {safeTranslate(condition.descriptionKey)}
        </p>
      </div>
    </div>
  );
}

export default function Cart({ order }: CartProps) {
  const t = useTranslations('cart');
  const cartItems = order.order_items;
  const fallbackTranslations: Record<string, string> = {
    quantity: 'Số lượng',
    decrease_quantity: 'Giảm số lượng',
    increase_quantity: 'Tăng số lượng',
    quantity_updated: 'Cập nhật số lượng thành công!',
    remove_item: 'Xóa sản phẩm',
    item_removed: 'Đã xóa sản phẩm khỏi giỏ hàng!',
  };
  const safeTranslate = (key: string) => {
    try {
      return t(key);
    } catch (error) {
      // Translation failed for key "${key}", using fallback
      return fallbackTranslations[key] || key;
    }
  };

  return (
    <main className='relative py-6 sm:py-8'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <Link href='/'>
          <Image
            src='/images/cart-banner/banner.png'
            alt={safeTranslate('cart_banner_alt')}
            width={1200}
            height={300}
            className='my-6 w-full rounded-lg object-cover sm:my-8'
          />
        </Link>

        <div className='flex flex-col items-center'>
          {cartItems.length === 0 ? (
            <div className='text-center text-xl font-bold text-gray-500 sm:text-2xl'>
              {safeTranslate('empty_cart')}
            </div>
          ) : (
            <div className='w-full'>
              <h2 className='mb-6 text-2xl font-bold text-gray-900 sm:text-3xl'>
                {safeTranslate('title')}
              </h2>
              <ul className='space-y-4 sm:space-y-6'>
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>
              <div className='mt-6 flex flex-col justify-end gap-4 sm:flex-row'>
                <Link
                  href='/checkout'
                  className='flex items-center justify-center rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-yellow-400 sm:text-base'
                >
                  <CreditCardIcon className='mr-2 h-5 w-5' />
                  {safeTranslate('proceed_to_checkout')}
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className='mt-8 sm:mt-10'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {shippingConditions.map((condition) => (
              <ShippingConditionCard key={condition.id} condition={condition} />
            ))}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className='bg-opacity-90 fixed bottom-0 left-0 w-full bg-gray-800 backdrop-blur-sm'>
            <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row sm:px-6 lg:px-8'>
              <div className='flex gap-2'>
                <Link
                  href='/checkout'
                  className='flex items-center rounded-full bg-yellow-300 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-yellow-400'
                >
                  <CreditCardIcon className='mr-2 h-5 w-5' />
                  {t('coupon')}
                </Link>
                <Link
                  href='/checkout'
                  className='flex items-center rounded-full bg-yellow-300 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-yellow-400'
                >
                  <GiftIcon className='mr-2 h-5 w-5' />
                  {t('gift')}
                </Link>
              </div>
              <div className='flex items-center gap-4'>
                <div className='text-right'>
                  <h2 className='text-lg font-bold text-white sm:text-xl'>
                    {t('total')}
                  </h2>
                  <p className='text-base font-semibold text-white sm:text-lg'>
                    {order.total_amount.toLocaleString('vi-VN')}đ
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
