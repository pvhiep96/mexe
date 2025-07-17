'use client';

import { useTranslations } from 'next-intl';

export default function SPContact() {
  const t = useTranslations('contact');

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-center mb-4">{t('title')}</h2>
        <div className="flex flex-col space-y-4">
          <div>
            <h3 className="text-base font-semibold mb-2">{t('you_are')}</h3>
            <ul className="space-y-1">
              <li>{t('distributor')}</li>
              <li>{t('affiliate')}</li>
              <li>{t('corporate_gifts')}</li>
              <li>{t('content_creator')}</li>
            </ul>
          </div>
          <div>
            <form className="space-y-2">
              <select className="w-full p-2 border rounded">
                <option>{t('distributor')}</option>
                <option>{t('affiliate')}</option>
                <option>{t('corporate_gifts')}</option>
                <option>{t('content_creator')}</option>
              </select>
              <input type="text" placeholder={t('name')} className="w-full p-2 border rounded" />
              <input type="tel" placeholder={t('phone')} className="w-full p-2 border rounded" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                {t('register')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
