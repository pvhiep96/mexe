'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useFlashTooltip } from '@/context/FlashTooltipContext';

export default function SPNewProducts() {
  const t = useTranslations('new_products');
  const { addToCart } = useCart();
  const { showTooltip } = useFlashTooltip();

  const products = [
    {
      name: 'Product 1',
      status: t('coming_soon'),
      info: t('coming_soon_info'),
      sold: t('sold'),
      description: t('lorem_ipsum'),
      launch: t('launch_time'),
      image: '/product-coming-soon.jpg',
    },
  ];

  return (
    <section className='bg-gray-100 py-4'>
      <div className='container mx-auto px-4'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold'>{t('title')}</h2>
          <a href='/products' className='text-sm text-blue-600 hover:underline'>
            {t('explore_more')}
          </a>
        </div>
        <div className='flex flex-col space-y-4'>
          {products.map((product) => (
            <div key={product.name} className='overflow-hidden rounded border'>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className='h-auto w-full'
              />
              <div className='p-2'>
                <p className='text-xs font-semibold'>{product.status}</p>
                <p className='text-xs'>{product.info}</p>
                <p className='text-xs'>{product.sold}</p>
                <p className='text-xs'>{t('product_info')}</p>
                <p className='text-xs'>{product.description}</p>
                <p className='text-xs'>{product.launch}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // Tạo mock product data để thêm vào giỏ hàng
                    const productToAdd = {
                      id: Math.random(), // Mock ID
                      name: product.name,
                      price: 100000, // Mock price
                      image: product.image,
                      quantity: 1,
                    };
                    
                    addToCart(productToAdd, 1);
                    showTooltip('Đã thêm vào giỏ hàng thành công!', 'success');
                  }}
                  className='mt-2 inline-block rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600 transition-colors'
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
