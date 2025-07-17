'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';

export default function Brands() {
  const t = useTranslations('brands');
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    centerPadding: '40px',
  };

  const brands = [
    {
      id: 'honda',
      image: '/images/demo-logo-honda.jpg',
      alt: t('honda.name'),
    },
    {
      id: 'toyota',
      image: '/images/demo-logo-honda.jpg',
      alt: t('toyota.name'),
    },
    {
      id: 'hyundai',
      image: '/images/demo-logo-honda.jpg',
      alt: t('hyundai.name'),
    },
    {
      id: 'ford',
      image: '/images/demo-logo-honda.jpg',
      alt: t('ford.name'),
    },
    {
      id: 'ford',
      image: '/images/demo-logo-honda.jpg',
      alt: t('ford.name'),
    },
    {
      id: 'ford',
      image: '/images/demo-logo-honda.jpg',
      alt: t('ford.name'),
    },
    {
      id: 'ford',
      image: '/images/demo-logo-honda.jpg',
      alt: t('ford.name'),
    },
  ];

  return (
    <section className='bg-white py-8'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-6 text-center text-2xl font-bold'>{t('title')}</h2>
        <div className=''>
          <Slider {...sliderSettings}>
            {brands.map((brand) => (
              <div key={brand.id} className='rounded-t-lg px-2 shadow-lg'>
                <div className='relative'>
                  <Image
                    src={brand.image}
                    alt={brand.alt}
                    width={150}
                    height={100}
                    className='mb-4 h-auto w-full'
                  />
                  <h3 className='absolute bottom-1 flex w-full bg-black p-2 text-lg font-semibold text-white opacity-80'>
                    {t(`${brand.id}.name`)}
                  </h3>
                </div>
                <div className='mb-4'>
                  <p className='text-sm font-semibold'>
                    {t(`${brand.id}.brand`)}
                  </p>
                  <p className='text-sm font-semibold'>
                    {t(`${brand.id}.field`)}
                  </p>
                  <p className='text-sm font-semibold'>
                    {t(`${brand.id}.founded`)}
                  </p>
                  <p className='mt-2 text-sm'>{t(`${brand.id}.story`)}</p>
                </div>
                <Link
                  href='#'
                  className='flex cursor-pointer bg-[#0A115F] p-3 text-white'
                >
                  {t(`${brand.id}.story_link`)}
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
