'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function SPWorkspace() {
  const t = useTranslations('workspace');

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-center mb-4">{t('title')}</h2>
        <p className="text-center text-sm mb-4">{t('description')}</p>
        <div className="flex flex-col space-y-4">
          <div>
            <Image src="/images/store-1.jpg" alt={t('store_intro')} width={300} height={200} className="w-full h-auto rounded" />
            <h3 className="text-base font-semibold mt-2">{t('store_intro')}</h3>
            <p className="text-sm">{t('location')}</p>
          </div>
          <div>
            <Image src="/images/store-2.jpg" alt={t('store_intro')} width={300} height={200} className="w-full h-auto rounded" />
            <h3 className="text-base font-semibold mt-2">{t('store_intro')}</h3>
            <p className="text-sm">{t('location')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
