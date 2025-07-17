'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function NewBrands() {
  const t = useTranslations('new_brands');

  const products = t.raw('products').map((product: { name: string; original_price: string; discounted_price: string; discount: string }) => ({
    name: product.name,
    original_price: product.original_price,
    discounted_price: product.discounted_price,
    discount: product.discount,
    image: `/product-${product.name.split(' ').join('-').toLowerCase()}.jpg`,
  }));

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{t('title')}</h2>
          <a href="#" className="text-blue-600 hover:underline">{t('view_more')}</a>
        </div>
        <div className="text-center mb-4">
          <p>{t('deal_ends')} <span className="font-semibold">1 {t('days')} : 12 {t('hours')} : 30 {t('minutes')} : 45 {t('seconds')}</span></p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.name} className="border rounded overflow-hidden">
              <Image src={product.image} alt={product.name} width={300} height={200} className="w-full h-auto" />
              <div className="p-4">
                <p className="text-sm font-semibold">{t('quality_deal')}</p>
                <p className="text-sm">{t('ship_now')}</p>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm line-through">{product.original_price}</p>
                <p className="text-lg font-bold">{product.discounted_price} <span className="text-red-600">{product.discount}</span></p>
                <div className="flex space-x-2 mt-2">
                  <a href="#" className="text-blue-600 hover:underline">{t('view_details')}</a>
                  <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{t('buy_now')}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
