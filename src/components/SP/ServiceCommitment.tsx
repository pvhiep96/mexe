'use client';

import { useTranslations } from 'next-intl';

export default function SPServiceCommitment() {
  const t = useTranslations('service_commitment');

  const commitments = [
    { title: t('support'), icon: '/support-icon.png' },
    { title: t('quality'), icon: '/quality-icon.png' },
    { title: t('delivery'), icon: '/delivery-icon.png' },
    { title: t('purchase'), icon: '/purchase-icon.png' },
  ];

  return (
    <section className='bg-white py-4'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-4 text-center text-xl font-bold'>{t('title')}</h2>
        <div className='flex flex-col space-y-4'>
          {commitments.map((commitment) => (
            <div key={commitment.title} className='text-center'>
              <img
                src={commitment.icon}
                alt={commitment.title}
                className='mx-auto mb-2 h-12 w-12'
              />
              <p className='text-xs font-semibold'>{commitment.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
