'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Slider from 'react-slick';
import { MapPinIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Workspace() {
  const t = useTranslations('workspace');

  const workspaces = [
    {
      id: 1,
      title: t('title'),
      description: t('description'),
      image: '/images/workspace.webp',
      location: t('location'),
    },
    {
      id: 2,
      title: t('title'),
      description: t('description'),
      image: '/images/workspace.webp',
      location: t('location'),
    },
    {
      id: 1,
      title: t('title'),
      description: t('description'),
      image: '/images/workspace.webp',
      location: t('location'),
    },
    {
      id: 1,
      title: t('title'),
      description: t('description'),
      image: '/images/workspace.webp',
      location: t('location'),
    },
    {
      id: 1,
      title: t('title'),
      description: t('description'),
      image: '/images/workspace.webp',
      location: t('location'),
    },
    {
      id: 1,
      title: t('title'),
      description: t('description'),
      image: '/images/workspace.webp',
      location: t('location'),
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className='bg-white py-8'>
      <div className='px-4'>
        <h2 className='mb-4 text-center text-2xl font-bold'>{t('title')}</h2>
        <p className='mb-6 text-center'>{t('description')}</p>
        <Slider {...sliderSettings}>
          {workspaces.map((workspace) => (
            <div
              key={workspace.title}
              className='flex flex-col items-center p-4'
            >
              <div className='relative mb-4 w-full'>
                <Image
                  src={workspace.image}
                  alt={workspace.title}
                  width={400}
                  height={200}
                  className='h-auto w-full rounded'
                />

                <div className='absolute inset-x-0 bottom-0 p-4 text-white'>
                  <div className='mb-2 text-white'>
                    <div className='m-auto w-80 rounded-full bg-gray-500 p-1 text-center opacity-50'>
                      <h3 className='col-start-2 text-lg font-semibold'>
                        {workspace.title}
                      </h3>
                    </div>
                  </div>

                  <div className='flex rounded-full bg-gray-500 p-2 text-center opacity-50'>
                    <span className='mr-2 border-r-2 border-white pr-2 font-semibold'>
                      {workspace.title}
                    </span>
                    <span className='font-semibold'>
                      <MapPinIcon className='mr-1 inline-block size-5 font-bold text-red-500' />
                      {workspace.location}
                    </span>
                  </div>
                </div>
                <div className='absolute inset-x-0 bottom-0 p-4 text-white'>
                  <div className='mb-2 text-white'>
                    <div className='m-auto w-80 rounded-full p-1 text-center'>
                      <Link
                        key={workspace.title}
                        target='_blank'
                        href={`/workspaces/${workspace.id}`}
                        className='col-start-2 text-lg font-semibold'
                      >
                        {workspace.title}
                      </Link>
                    </div>
                  </div>

                  <div className='flex rounded-full p-2 text-center'>
                    <span className='mr-2 border-r-2 border-white pr-2 font-semibold'>
                      {workspace.title}
                    </span>
                    <span className='font-semibold'>
                      <MapPinIcon className='mr-1 inline-block size-5 font-bold text-red-500' />
                      {workspace.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
