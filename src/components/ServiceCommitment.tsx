'use client';

import { useTranslations } from 'next-intl';

export default function ServiceCommitment() {
  const t = useTranslations('service_commitment');

  const commitments = [
    { title: t('support'), icon: '/support-icon.png' },
    { title: t('quality'), icon: '/quality-icon.png' },
    { title: t('delivery'), icon: '/delivery-icon.png' },
    { title: t('purchase'), icon: '/purchase-icon.png' },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">{t('title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {commitments.map((commitment) => (
            <div key={commitment.title} className="text-center">
              <img src={commitment.icon} alt={commitment.title} className="w-16 h-16 mx-auto mb-2" />
              <p className="text-sm font-semibold">{commitment.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
