'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const videos = [
  {
    title:
      'NISSAN SUNNY Premium Xe Sedan rộng rãi và tiết kiệm | MUA BÁN Ô TÔ CŨ OTO.COM.VN',
    date: '10/03/2025',
    link: 'https://www.youtube.com/watch?v=myhmcJRbi4g',
    youtubeId: 'myhmcJRbi4g',
  },
  {
    title:
      'TOYOTA FOTUNER xe gia đình cực giữ gìn | MUA BÁN Ô TÔ CŨ OTO.COM.VN',
    date: '09/03/2025',
    link: 'https://www.youtube.com/watch?v=myhmcJRbi4g',
    youtubeId: 'myhmcJRbi4g',
  },
  {
    title: 'FORD RANGER WILDTRACK 2020 giá cực rẻ | MUA BÁN Ô TÔ CŨ OTO.COM.VN',
    date: '09/03/2025',
    link: 'https://www.youtube.com/watch?v=myhmcJRbi4g',
    youtubeId: 'myhmcJRbi4g',
  },
  {
    title: 'Mazda CX8 mẫu xe 7 chỗ gầm cao giá rẻ | MUA BÁN Ô TÔ CŨ OTO.COM.VN',
    date: '28/02/2025',
    link: 'https://www.youtube.com/watch?v=myhmcJRbi4g',
    youtubeId: 'myhmcJRbi4g',
  },
];

const mainVideoId = 'oX2diE7FSRk';

export default function Videos() {
  return (
    <div>
      {/* Desktop version */}
      <div className='hidden w-full bg-gradient-to-br from-[#181d23] to-[#232a36] px-2 py-10 lg:block'>
        <div className='mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3'>
          {/* Cột trái: Video chính */}
          <div className='flex flex-col md:col-span-2'>
            <h2 className='mb-2 flex items-center gap-2 text-2xl font-extrabold text-white md:text-3xl'>
              KÊNH YOUTUBE CỦA CHÚNG TÔI
              <span className='text-xl text-red-600'>
                <svg
                  className='inline-block h-6 w-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M10 15l5.19-3.09a1 1 0 000-1.72L10 7' />
                </svg>
              </span>
            </h2>
            <p className='mb-4 text-gray-300'>
              Mexe là kênh thông tin và mua bán ô tô, xe hơi dẫn đầu thị trường.
              Đăng tin mua bán oto nhanh chóng và đơn giản. Cung cấp tin tức về
              khuyến mại hãng xe, salons, đánh giá xe ô tô nhanh nhất hiện nay.
            </p>
            <div className='mb-2 aspect-video w-full overflow-hidden rounded-xl'>
              <iframe
                className='h-full w-full'
                src={`https://www.youtube.com/embed/${mainVideoId}`}
                title='YouTube video'
                frameBorder='0'
                allowFullScreen
              ></iframe>
            </div>
          </div>
          {/* Cột phải: Danh sách video */}
          <div className='flex flex-col gap-4'>
            {videos.map((video) => (
              <Link
                href={video.link}
                target='_blank'
                rel='noopener'
                className='flex gap-3 rounded-lg p-1 transition hover:bg-white/10'
                key={video.title}
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  width={112}
                  height={80}
                  className='h-20 w-28 flex-shrink-0 rounded-lg object-cover'
                />
                <div>
                  <div className='line-clamp-2 text-sm leading-tight font-semibold text-white'>
                    {video.title}
                  </div>
                  <div className='mt-1 text-xs text-gray-400'>{video.date}</div>
                </div>
              </Link>
            ))}
            <Link
              href='https://www.youtube.com/@mexe2018'
              target='_blank'
              className='mt-4 flex items-center justify-end gap-1 text-right font-semibold text-white hover:underline'
            >
              Tới kênh YouTube
              <ChevronRightIcon className='inline-block h-4 w-4' />
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile version */}
      <div className='block w-full bg-gradient-to-br from-[#181d23] to-[#232a36] px-2 py-6 lg:hidden'>
        <div className='mx-auto flex max-w-xs flex-col gap-3'>
          <h2 className='mb-2 text-center text-lg font-extrabold text-white'>
            KÊNH YOUTUBE CỦA CHÚNG TÔI
          </h2>
          <div className='flex flex-col gap-2'>
            {videos.map((video) => (
              <Link
                href={video.link}
                target='_blank'
                rel='noopener'
                className='flex gap-2 rounded-lg p-1 transition hover:bg-white/10'
                key={video.title}
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  width={80}
                  height={60}
                  className='h-16 w-20 flex-shrink-0 rounded-lg object-cover'
                />
                <div>
                  <div className='line-clamp-2 text-xs leading-tight font-semibold text-white'>
                    {video.title}
                  </div>
                  <div className='mt-1 text-[10px] text-gray-400'>
                    {video.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href='https://www.youtube.com/@mexe2018'
            target='_blank'
            className='mt-4 flex items-center justify-center gap-1 text-center font-semibold text-white hover:underline'
          >
            Tới kênh YouTube
            <ChevronRightIcon className='inline-block h-4 w-4' />
          </Link>
        </div>
      </div>
    </div>
  );
}
