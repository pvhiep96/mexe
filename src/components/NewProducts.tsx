'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function NewProducts() {
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
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{t('title')}</h2>
          <a href="#" className="text-blue-600 hover:underline">{t('explore_more')}</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.name} className="border rounded overflow-hidden">
              <Image src={product.image} alt={product.name} width={300} height={200} className="w-full h-auto" />
              <div className="p-4">
                <p className="text-sm font-semibold">{product.status}</p>
                <p className="text-sm">{product.info}</p>
                <p className="text-sm">{product.sold}</p>
                <p className="text-sm">{t('product_info')}</p>
                <p className="text-sm">{product.description}</p>
                <p className="text-sm">{product.launch}</p>
                <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2 inline-block">{t('buy_now')}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
