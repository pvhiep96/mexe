'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function SPBanner() {
  const t = useTranslations('banner');

  return (
    <section className="py-4 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-4">
          <div>
            <h3 className="text-lg font-bold mb-2">{t('categories')}</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="text-blue-600 hover:underline">{t('all_products')}</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">{t('partner_brands')}</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">{t('accessories')}</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">{t('apps_positioning')}</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">{t('car_toys')}</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">{t('camping')}</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">{t('safety_equipment')}</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">{t('battery_charging')}</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">{t('partners')}</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="text-blue-600 hover:underline">{t('partner_1')}</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">{t('partner_2')}</a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">{t('partner_3')}</a>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <Image src="/images/placeholder-1.jpg" alt="Banner 1" width={300} height={200} className="w-full h-auto" />
            <Image src="/images/placeholder-2.jpg" alt="Banner 2" width={300} height={200} className="w-full h-auto" />
            <Image src="/images/placeholder-3.jpg" alt="Banner 3" width={300} height={200} className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
