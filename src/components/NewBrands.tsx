'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
export default function NewBrands() {
  const t = useTranslations('new_brands');

  const products = t.raw('products').map((product: { name: string; original_price: string; discounted_price: string; discount: string }) => ({
    id: product.name,
    name: product.name,
    original_price: product.original_price,
    discounted_price: product.discounted_price,
    discount: product.discount,
    image: `/images/demo-new-products/new-pro-2.png`,
  }));

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center">{t('title')}</h2>
          <a href="#" className="flex items-center gap-1 sm:gap-2 bg-[#E30613] text-white font-bold rounded-full px-4 sm:px-8 py-1.5 sm:py-2 text-sm sm:text-lg shadow hover:bg-red-700 transition">{t('view_more')}</a>
        </div>
        <div className="text-center mb-4">
          <p>{t('deal_ends')} <span className="font-semibold">1 {t('days')} : 12 {t('hours')} : 30 {t('minutes')} : 45 {t('seconds')}</span></p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.name} className="rounded overflow-hidden">
              <Link href={`/products/${product.id}`} className="block">
                <Image src={product.image} alt={product.name} width={300} height={200} className="w-full h-auto" />
                <div className="p-4">
                  <p className="text-sm font-semibold">{t('quality_deal')}</p>
                  <p className="text-sm">{t('ship_now')}</p>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm line-through">{product.original_price}</p>
                  <p className="text-lg font-bold">{product.discounted_price} <span className="text-red-600">{product.discount}</span></p>
                  <div className="flex space-x-2 mt-2">
                    <Link href={`/products/${product.name}`} className="flex items-center justify-center gap-0.5 sm:gap-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full px-1.5 sm:px-6 py-0.5 sm:py-2 text-xs sm:text-base w-full transition-all cursor-pointer">
                      <ShoppingCartIcon className="w-5 h-5" />

                      {t('buy_now')}
                    </Link>

                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
