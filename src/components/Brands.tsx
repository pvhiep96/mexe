'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Brands() {
  const t = useTranslations('brands');

  const brands = [
    {
      id: 'honda',
      image: '/honda-logo.jpg',
      alt: t('honda.name'),
    },
    {
      id: 'toyota',
      image: '/toyota-logo.jpg',
      alt: t('toyota.name'),
    },
    {
      id: 'hyundai',
      image: '/hyundai-logo.jpg',
      alt: t('hyundai.name'),
    },
    {
      id: 'ford',
      image: '/ford-logo.jpg',
      alt: t('ford.name'),
    },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {brands.map((brand) => (
            <div key={brand.id} className="border p-4 rounded">
              <Image src={brand.image} alt={brand.alt} width={150} height={100} className="w-full h-auto mb-4" />
              <h3 className="text-lg font-semibold">{t(`${brand.id}.name`)}</h3>
              <p className="text-sm">{t(`${brand.id}.brand`)}</p>
              <p className="text-sm">{t(`${brand.id}.field`)}</p>
              <p className="text-sm">{t(`${brand.id}.founded`)}</p>
              <p className="text-sm mt-2">{t(`${brand.id}.story`)}</p>
              <a href="#" className="text-blue-600 hover:underline mt-2 inline-block">
                {t(`${brand.id}.story_link`)}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
