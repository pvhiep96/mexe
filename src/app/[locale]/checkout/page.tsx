'use client';

import Checkout from '@/components/Checkout';
import { createPaymentUrlOnly } from '@/app/actions/payment';
import { useRouter } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import { apiClient, type CheckoutOrderData } from '@/services/api';

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  image: string;
  // Variant information
  variant_id?: number;
  variant_name?: string;
  variant_value?: string;
  variant_sku?: string;
  variant_final_price?: number;
  // Payment options
  full_payment_transfer?: boolean;
  full_payment_discount_percentage?: number;
  partial_advance_payment?: boolean;
  advance_payment_percentage?: number;
  advance_payment_discount_percentage?: number;
}

interface CheckoutOrder {
  items: OrderItem[];
  total: number;
  orderNumber: string;
  createdAt: string;
  status: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const [order, setOrder] = useState<CheckoutOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get order data from localStorage (contains user selections)
        const savedOrder = localStorage.getItem('currentOrder');

        if (!savedOrder) {
          // If no order in localStorage, redirect to cart
          router.push('/cart');
          return;
        }

        const parsedOrder = JSON.parse(savedOrder);

        if (!parsedOrder.items || parsedOrder.items.length === 0) {
          throw new Error('Đơn hàng không có sản phẩm nào');
        }

        // Query fresh product data from database for each item
        const enhancedItems = await Promise.all(
          parsedOrder.items.map(async (item: OrderItem) => {
            try {
              // Fetch latest product details from database
              const response = await apiClient.getProduct(String(item.id));
              const freshProductData = response;

              // If item has a variant, find the fresh variant data
              let variantFinalPrice = item.variant_final_price;
              if (item.variant_id && freshProductData.variants) {
                const freshVariant = freshProductData.variants.find(
                  (v: any) => v.id === item.variant_id
                );
                if (freshVariant) {
                  // Use fresh variant price from database
                  variantFinalPrice = freshVariant.final_price;
                }
              }

              // Merge fresh data from DB with user selections from localStorage
              const enhancedItem: OrderItem = {
                id: item.id,
                name: freshProductData.name, // Fresh name from DB
                price: parseFloat(freshProductData.price), // Fresh base price from DB
                quantity: item.quantity, // Keep user selected quantity
                selectedColor: item.selectedColor, // Keep user selected color
                image:
                  freshProductData.primary_image_url ||
                  freshProductData.images?.[0]?.image_url ||
                  item.image, // Fresh image from DB

                // Keep variant information from cart
                variant_id: item.variant_id,
                variant_name: item.variant_name,
                variant_value: item.variant_value,
                variant_sku: item.variant_sku,
                variant_final_price: variantFinalPrice, // Fresh variant price from DB

                // Fresh payment options from DB
                full_payment_transfer:
                  freshProductData.full_payment_transfer || false,
                full_payment_discount_percentage:
                  freshProductData.full_payment_discount_percentage || 0,
                partial_advance_payment:
                  freshProductData.partial_advance_payment || false,
                advance_payment_percentage:
                  freshProductData.advance_payment_percentage || 0,
                advance_payment_discount_percentage:
                  freshProductData.advance_payment_discount_percentage || 0,
              };

              return enhancedItem;
            } catch (error) {
              // Fallback to localStorage data if API fails
              return {
                ...item,
                // Set default payment options if API fails
                full_payment_transfer: item.full_payment_transfer || false,
                full_payment_discount_percentage:
                  item.full_payment_discount_percentage || 0,
                partial_advance_payment: item.partial_advance_payment || false,
                advance_payment_percentage:
                  item.advance_payment_percentage || 0,
                advance_payment_discount_percentage:
                  item.advance_payment_discount_percentage || 0,
              };
            }
          })
        );

        // Calculate total with fresh prices (use variant price if available)
        const freshTotal = enhancedItems.reduce((sum, item) => {
          const itemPrice = item.variant_final_price || item.price;
          return sum + itemPrice * item.quantity;
        }, 0);

        // Create enhanced order with fresh data
        const enhancedOrder: CheckoutOrder = {
          items: enhancedItems,
          total: freshTotal, // Recalculated total with fresh prices
          orderNumber: parsedOrder.orderNumber,
          createdAt: parsedOrder.createdAt,
          status: parsedOrder.status,
        };

        setOrder(enhancedOrder);
      } catch (error: any) {
        console.error('Error fetching checkout data:', error);
        setError(error.message || 'Có lỗi xảy ra khi tải thông tin đơn hàng');
        // Redirect to cart after a delay
        setTimeout(() => {
          router.push('/cart');
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderData();
  }, [router]);

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600'></div>
          <p className='mt-4 text-gray-600'>
            Đang cập nhật thông tin sản phẩm...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-red-600'>Lỗi tải đơn hàng</h1>
          <p className='mt-2 text-gray-600'>{error}</p>
          <p className='mt-2 text-sm text-gray-500'>
            Đang chuyển hướng về giỏ hàng...
          </p>
          <button
            onClick={() => router.push('/cart')}
            className='mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          >
            Quay lại giỏ hàng ngay
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900'>
            Không tìm thấy đơn hàng
          </h1>
          <p className='mt-2 text-gray-600'>
            Vui lòng quay lại giỏ hàng để tạo đơn hàng mới
          </p>
          <button
            onClick={() => router.push('/cart')}
            className='mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          >
            Quay lại giỏ hàng
          </button>
        </div>
      </div>
    );
  }

  // Kiểm tra xem order có items không
  if (!order.items || order.items.length === 0) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900'>Đơn hàng trống</h1>
          <p className='mt-2 text-gray-600'>Đơn hàng không có sản phẩm nào</p>
          <button
            onClick={() => router.push('/cart')}
            className='mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          >
            Quay lại giỏ hàng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <main className='grow'>
        <Checkout order={order} checkout={createPaymentUrlOnly} />
      </main>
    </div>
  );
};

export default CheckoutPage;
