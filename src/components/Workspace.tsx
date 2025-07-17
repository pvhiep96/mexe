'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Workspace() {
  const t = useTranslations('workspace');

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-4">{t('title')}</h2>
        <p className="text-center mb-6">{t('description')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image src="/images/store-1.jpg" alt={t('store_intro')} width={400} height={300} className="w-full h-auto rounded" />
            <h3 className="text-lg font-semibold mt-4">{t('store_intro')}</h3>
            <p>{t('location')}</p>
          </div>
          <div>
            <Image src="/images/store-2.jpg" alt={t('store_intro')} width={400} height={300} className="w-full h-auto rounded" />
            <h3 className="text-lg font-semibold mt-4">{t('store_intro')}</h3>
            <p>{t('location')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
