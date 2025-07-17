'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function SPNewBrands() {
  const t = useTranslations('new_brands');

  const products = t.raw('products').map((product: { name: string; original_price: string; discounted_price: string; discount: string }) => ({
    name: product.name,
    original_price: product.original_price,
    discounted_price: product.discounted_price,
    discount: product.discount,
    image: `/product-${product.name.split(' ').join('-').toLowerCase()}.jpg`,
  }));

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t('title')}</h2>
          <a href="#" className="text-blue-600 hover:underline text-sm">{t('view_more')}</a>
        </div>
        <div className="text-center mb-4">
          <p className="text-sm">{t('deal_ends')} <span className="font-semibold">1 {t('days')} : 12 {t('hours')} : 30 {t('minutes')} : 45 {t('seconds')}</span></p>
        </div>
        <div className="flex flex-col space-y-4">
          {products.map((product) => (
            <div key={product.name} className="border rounded overflow-hidden">
              <Image src={product.image} alt={product.name} width={300} height={200} className="w-full h-auto" />
              <div className="p-2">
                <p className="text-xs font-semibold">{t('quality_deal')}</p>
                <p className="text-xs">{t('ship_now')}</p>
                <h3 className="text-base font-semibold">{product.name}</h3>
                <p className="text-xs line-through">{product.original_price}</p>
                <p className="text-base font-bold">{product.discounted_price} <span className="text-red-600">{product.discount}</span></p>
                <div className="flex space-x-2 mt-2">
                  <a href="#" className="text-blue-600 hover:underline text-sm">{t('view_details')}</a>
                  <a href="#" className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-sm">{t('buy_now')}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
