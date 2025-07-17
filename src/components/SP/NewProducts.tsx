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
    <section className="py-4 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t('title')}</h2>
          <a href="#" className="text-blue-600 hover:underline text-sm">{t('explore_more')}</a>
        </div>
        <div className="flex flex-col space-y-4">
          {products.map((product) => (
            <div key={product.name} className="border rounded overflow-hidden">
              <Image src={product.image} alt={product.name} width={300} height={200} className="w-full h-auto" />
              <div className="p-2">
                <p className="text-xs font-semibold">{product.status}</p>
                <p className="text-xs">{product.info}</p>
                <p className="text-xs">{product.sold}</p>
                <p className="text-xs">{t('product_info')}</p>
                <p className="text-xs">{product.description}</p>
                <p className="text-xs">{product.launch}</p>
                <a href="#" className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 mt-2 inline-block text-sm">{t('buy_now')}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
