'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function SPNewProducts() {
  const t = useTranslations('new_products');

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
                <a
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    // Chỉ hiển thị thông báo đơn giản, không thêm vào giỏ hàng
                    alert('Đặt hàng thành công!');
                  }}
                  className='mt-2 inline-block rounded bg-blue-600 px-2 py-1 text-sm text-white hover:bg-blue-700'
                >
                  {t('buy_now')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
