'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export default function ComboWorkspace() {
  const t = useTranslations('combo_workspace');

  const groups = [
    {
      id: 'group_1',
      image: '/images/ws.jpg',
      name: 'group_1',
      items: ['Item 1', 'Item 2', 'Item 3'],
    },
    {
      id: 'group_1',
      image: '/images/ws.jpg',
      name: 'group_2',
      items: ['Item A', 'Item B', 'Item C'],
    },
    {
      id: 'group_1',
      image: '/images/ws.jpg',
      name: 'group_3',
      items: ['Feature X', 'Feature Y', 'Feature Z'],
    },
    {
      id: 'group_1',
      image: '/images/ws.jpg',
      name: 'group_4',
      items: ['Option 1', 'Option 2', 'Option 3'],
    },
    {
      id: 'group_1',
      image: '/images/ws.jpg',
      name: 'group_5',
      items: ['Choice A', 'Choice B', 'Choice C'],
    },
    {
      id: 'group_1',
      image: '/images/ws.jpg',
      name: 'group_6',
      items: ['Selection 1', 'Selection 2', 'Selection 3'],
    },
    {
      id: 'group_1',
      name: 'group_7',
      image: '/images/ws.jpg',
      items: ['Variant I', 'Variant II', 'Variant III'],
    },
    {
      id: 'group_1',
      name: 'group_8',
      image: '/images/ws.jpg',
      items: ['Type X', 'Type Y', 'Type Z', 'Type Z', 'Type Z', 'Type Z'],
    },
  ];

  return (
    <section className='relative flex min-h-[400px] flex-col items-center justify-center bg-[#2D6294] py-8 pt-[100px]'>
      <div className='absolute top-0 left-0 z-0 w-full overflow-hidden leading-none opacity-50'>
        <svg
          className='relative block h-[600px] w-full'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
          preserveAspectRatio='none'
        >
          <path
            fill='#9CA3AF' // Tailwind gray-400
            d='M0,224L48,202.7C96,181,192,139,288,112C384,85,480,75,576,101.3C672,128,768,192,864,186.7C960,181,1056,107,1152,106.7C1248,107,1344,181,1392,218.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
          />
        </svg>
      </div>

      <div className='absolute bottom-0 left-0 z-0 w-full rotate-180 overflow-hidden leading-none opacity-50'>
        <svg
          className='relative block h-[600px] w-full'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
          preserveAspectRatio='none'
        >
          <path
            fill='#9CA3AF' // Tailwind gray-400
            d='M0,224L48,202.7C96,181,192,139,288,112C384,85,480,75,576,101.3C672,128,768,192,864,186.7C960,181,1056,107,1152,106.7C1248,107,1344,181,1392,218.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
          />
        </svg>
      </div>
      <div className='z-10 container mx-auto px-4'>
        <h2 className='mb-4 text-center text-5xl font-bold'>{t('title')}</h2>
        <div className='mb-8 flex justify-center'>
          {['description', 'explore_more'].map((key) => (
            <Link
              key={key}
              href='#'
              className='mr-4 mb-6 block rounded-full border border-gray-300 p-2 text-center text-lg font-semibold text-gray-800 transition-colors duration-300 hover:border-white hover:bg-[#2D6294] hover:text-gray-700 hover:shadow-lg hover:shadow-[#2D6294]/50'
            >
              {t('explore_more')}
            </Link>
          ))}
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
          {groups.map((group) => (
            <div key={group.id} className='relative rounded-xl bg-white shadow'>
              <div className=''>
                <Image
                  src={group.image}
                  alt={group.name}
                  width={200}
                  height={150}
                  className='h-auto w-full rounded-lg object-cover'
                />
              </div>
              <div className='absolute inset-x-0 bottom-0 p-4 text-white'>
                <ul className='flex flex-wrap'>
                  {group.items.map((item: string) => (
                    <li
                      key={item}
                      className='mr-2 mb-1 rounded-full border border-white p-2 text-sm font-semibold transition-colors duration-300 hover:cursor-pointer hover:bg-[#2D6294] hover:text-gray-700'
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={`/combo/${group.id}`}
                className='absolute top-1/2 left-1/2 mt-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white p-2 text-white transition-opacity duration-300 hover:opacity-100'
              >
                <div className='size-full bg-gray-500 opacity-50'></div>
                {t('view')}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
