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
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-center mb-4">{t('title')}</h2>
        <div className="flex flex-col space-y-4">
          {commitments.map((commitment) => (
            <div key={commitment.title} className="text-center">
              <img src={commitment.icon} alt={commitment.title} className="w-12 h-12 mx-auto mb-2" />
              <p className="text-xs font-semibold">{commitment.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
