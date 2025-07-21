'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Link from 'next/link';
import {
  CreditCardIcon,
  InboxIcon,
  GifIcon,
} from '@heroicons/react/24/outline';

export default function Cart() {
  const cartItems = [
    {
      id: 1,
      name: 'Màn hình cao cấp Kuycon P40K & P40U với độ phân giải 5K | 120Hz | 40inch | Ngàm VESA',
      subName: 'P40U (Mặt trơn-5K-60Hz-40inch) / Không chân đế / Tiên phong',
      originalPrice: 59.99,
      price: 49.99,
      discount: 10,
      image: '/images/demo-combo/demo-combo-3.png',
      quantity: 2,
    },
    {
      id: 2,
      name: 'Màn hình cao cấp Kuycon P40K & P40U với độ phân giải 5K | 120Hz | 40inch | Ngàm VESA',
      subName: 'P40U (Mặt trơn-5K-60Hz-40inch) / Không chân đế / Tiên phong',
      originalPrice: 59.99,
      price: 49.99,
      discount: 10,
      image: '/images/demo-combo/demo-combo-3.png',
      quantity: 2,
    },
  ];

  const shippingConditions = [
    {
      id: 1,
      description: 'Free shipping on orders over $50',
      image: '/images/demo-icon-delivery.png',
      name: 'Free Shipping',
    },
    {
      id: 1,
      description: 'Free shipping on orders over $50',
      image: '/images/demo-icon-delivery.png',
      name: 'Free Shipping',
    },
    {
      id: 1,
      description: 'Free shipping on orders over $50',
      image: '/images/demo-icon-delivery.png',
      name: 'Free Shipping',
    },
    {
      id: 1,
      description: 'Free shipping on orders over $50',
      image: '/images/demo-icon-delivery.png',
      name: 'Free Shipping',
    },
  ];
  return (
    <main className='relative mb-5'>
      <div>
        <Link href='/' className='text-primary text-2xl font-bold'>
          <Image
            src='/images/cart-banner/banner.png'
            alt='Cart'
            width={500}
            height={500}
            className='m-auto my-10 size-full rounded-lg object-cover'
          />
        </Link>
      </div>

      <div className='flex flex-col items-center justify-center'>
        {cartItems.length === 0 ? (
          <div className='text-center text-2xl font-bold text-gray-500'>
            Your cart is empty
          </div>
        ) : (
          <div className='w-full max-w-6xl'>
            <h2 className='mb-6 text-3xl font-bold'>Your Cart</h2>
            <ul className='space-y-6'>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className='flex items-center justify-between rounded-lg border-b border-gray-200 bg-white p-4 shadow-sm transition-colors hover:cursor-pointer hover:bg-gray-50'
                >
                  <div className='flex items-center space-x-4'>
                    <div>
                      <input
                        type='checkbox'
                        className='mr-2 size-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                        defaultChecked
                      />
                    </div>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className='size-24 rounded object-cover'
                    />
                    <div>
                      <h3 className='text-lg font-semibold'>{item.name}</h3>
                      <p className='text-sm text-gray-500'>{item.subName}</p>
                      <p className='text-sm text-gray-500'>
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-primary text-lg font-semibold'>
                      ${item.price.toFixed(2)}
                    </p>
                    {item.discount > 0 && (
                      <>
                        <p className='text-sm text-gray-500 line-through'>
                          ${item.originalPrice.toFixed(2)}
                        </p>
                        <p className='rounded-full bg-green-100 px-2 py-1 text-sm text-green-500'>
                          - ${item.discount.toFixed(2)}
                        </p>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className='mt-6 flex justify-end space-x-4'>
              <Link
                href='/checkout'
                className='rounded-full bg-blue-500 p-4 text-2xl font-bold text-white shadow-md transition-colors hover:bg-blue-600 hover:shadow-lg'
              >
                <InboxIcon className='mr-2 inline-block size-6' />
                Proceed to Checkout
              </Link>
              <Link
                href='/checkout'
                className='rounded-full bg-yellow-300 p-4 text-2xl font-bold text-black shadow-md transition-colors hover:bg-yellow-400 hover:shadow-lg'
              >
                <CreditCardIcon className='mr-2 inline-block size-6' />
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className='mx-auto mt-10 w-full max-w-6xl rounded-lg'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
          {shippingConditions.map((condition) => (
            <div
              key={condition.id}
              className='grid grid-cols-2 items-center bg-white p-4 shadow-sm transition-colors first:rounded-l-lg last:rounded-r-lg hover:cursor-pointer hover:bg-gray-50'
            >
              <Image
                src={condition.image}
                alt={condition.name}
                width={100}
                height={100}
                className='mb-4 size-24 rounded object-cover'
              />
              <div>
                <h3 className='text-sm font-semibold'>{condition.name}</h3>
                <p className='text-lg font-bold text-gray-500'>
                  {condition.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='fixed bottom-0 w-full text-center'>
        <div
          className='mx-auto flex w-full max-w-6xl items-center justify-between rounded-full bg-gray-500 p-1'
          style={{ backgroundImage: "url('/bg-cart.png')" }}
        >
          <div className='p-4'>
            <Link
              href='/checkout'
              className='mr-1 rounded-l-full bg-yellow-300 p-4 text-xl font-bold text-black shadow-md transition-colors hover:bg-yellow-400'
            >
              <CreditCardIcon className='mr-2 inline-block size-6' />
              Coupon
            </Link>
            <Link
              href='/checkout'
              className='rounded-r-full bg-yellow-300 p-4 text-xl font-bold text-black shadow-md transition-colors hover:bg-yellow-400'
            >
              <GifIcon className='mr-2 inline-block size-6' />
              Gift
            </Link>
          </div>
          <div className='flex items-center justify-center'>
            <div className='mr-4'>
              <h2 className='text-xl font-bold text-white'>Total</h2>
              <p className='text-lg font-semibold text-white'>$99.98</p>
            </div>

            <Link
              href='/checkout'
              className='rounded-full bg-red-500 p-4 text-xl font-bold text-white shadow-md transition-colors hover:bg-red-600'
            >
              <CreditCardIcon className='mr-2 inline-block size-6' />
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
