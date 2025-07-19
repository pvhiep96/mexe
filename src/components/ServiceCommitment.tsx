'use client';

import { useTranslations } from 'next-intl';
import { PhoneIcon } from '@heroicons/react/24/outline';

export default function ServiceCommitment() {
  const t = useTranslations('service_commitment');

  const commitments = [
    { title: t('support'), icon: '/images/demo-icon-delivery.png' },
    { title: t('quality'), icon: '/images/demo-icon-delivery.png' },
    { title: t('delivery'), icon: '/images/demo-icon-delivery.png' },
    { title: t('purchase'), icon: '/images/demo-icon-delivery.png' },
  ];

  return (
    <section className='relative flex min-h-[500px] flex-col items-center justify-center bg-blue-600'>
      <div className='container mx-auto px-12'>
        <div className='absolute bottom-0 left-0 w-full rotate-180 overflow-hidden leading-none'>
          <svg
            className='relative block h-24 w-full'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 1440 320'
            preserveAspectRatio='none'
          >
            <path
              fill='#ffffff'
              d='M0,224L48,202.7C96,181,192,139,288,112C384,85,480,75,576,101.3C672,128,768,192,864,186.7C960,181,1056,107,1152,106.7C1248,107,1344,181,1392,218.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
            />
          </svg>
        </div>
        <h2 className='mb-20 text-center text-6xl font-bold text-white'>
          {t('title')}
        </h2>
        <div className='grid grid-cols-1 gap-4 text-white sm:grid-cols-2 md:grid-cols-4'>
          {commitments.map((commitment) => (
            <div key={commitment.title} className='text-center'>
              <PhoneIcon className='mx-auto mb-2 size-12 text-white' />
              <p className='font-semibold'>{commitment.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
