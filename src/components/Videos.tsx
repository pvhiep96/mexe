'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { PlayCircleIcon } from '@heroicons/react/24/outline';

export default function Videos() {
  const t = useTranslations('videos');
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const videosRaw = [
    {
      title:
        'Nissan Sunny Premium - Spacious and Fuel-Efficient Sedan | Used Car Trading',
      date: '03/10/2025',
      link: 'https://www.youtube.com/watch?v=example1',
      thumbnail: '/images/demo-preorder/preorder-1.png',
    },
    {
      title: 'Toyota Fortuner - Well-Maintained Family SUV | Used Car Trading',
      date: '03/09/2025',
      link: 'https://www.youtube.com/watch?v=example1',
      thumbnail: '/images/demo-preorder/preorder-1.png',
    },
    {
      title: 'Ford Ranger Wildtrack 2020 - Great Price | Used Car Trading',
      date: '03/09/2025',
      link: 'https://www.youtube.com/watch?v=example1',
      thumbnail: '/images/demo-preorder/preorder-1.png',
    },
    {
      title: 'Mazda CX8 - Affordable 7-Seater SUV | Used Car Trading',
      date: '02/28/2025',
      link: 'https://www.youtube.com/watch?v=example1',
      thumbnail: '/images/demo-preorder/preorder-1.png',
    },
  ];

  const videos = videosRaw.map(
    (video: {
      title: string;
      date: string;
      link: string;
      thumbnail: string;
    }) => ({
      title: video.title,
      date: video.date,
      link: video.link || '#',
      thumbnail: video.thumbnail || '/images/demo-preorder/preorder-1.png',
    })
  );

  return (
    <section className='bg-gray-100 py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-4 text-center text-4xl font-bold'>{t('title')}</h2>
        <p className='mb-6 text-center italic'>{t('description')}</p>
        <Slider {...sliderSettings}>
          {videos.map((video) => (
            <div className='p-4' key={video.title}>
              <Link href={video.link} target='_blank' rel='noopener noreferrer'>
                <div className='overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:cursor-pointer hover:shadow-xl'>
                  <div className='relative'>
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      width={300}
                      height={200}
                      className='h-auto w-full opacity-50 transition-opacity duration-300 hover:opacity-100'
                    />
                    <Image
                      src='/images/icon-youtube.webp'
                      alt='Play Icon'
                      width={50}
                      height={50}
                      className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 hover:opacity-100'
                    />
                  </div>
                  <div className='p-4'>
                    <h3 className='text-lg font-semibold'>
                      {video.title.length > 50
                        ? `${video.title.slice(0, 50)}...`
                        : video.title}
                    </h3>
                    <p className='text-sm'>{video.date}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
        <div className='mt-12 text-center'>
          <Link
            href='#'
            className='rounded-full bg-red-600 p-8 text-3xl font-semibold text-white transition-shadow duration-300 hover:bg-red-700 hover:text-white hover:shadow-lg hover:shadow-red-500/50'
          >
            {t('youtube_link')}
            <PlayCircleIcon className='ml-2 inline-block size-10' />
          </Link>
        </div>
      </div>
    </section>
  );
}
