'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function SPBrands() {
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
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-center mb-4">{t('title')}</h2>
        <div className="flex flex-col space-y-4">
          {brands.map((brand) => (
            <div key={brand.id} className="border p-4 rounded">
              <Image src={brand.image} alt={brand.alt} width={150} height={100} className="w-full h-auto mb-2" />
              <h3 className="text-base font-semibold">{t(`${brand.id}.name`)}</h3>
              <p className="text-xs">{t(`${brand.id}.brand`)}</p>
              <p className="text-xs">{t(`${brand.id}.field`)}</p>
              <p className="text-xs">{t(`${brand.id}.founded`)}</p>
              <p className="text-xs mt-2">{t(`${brand.id}.story`)}</p>
              <a href="#" className="text-blue-600 hover:underline mt-2 inline-block text-xs">
                {t(`${brand.id}.story_link`)}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
