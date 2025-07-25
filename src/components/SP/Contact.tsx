'use client';

import { useTranslations } from 'next-intl';

export default function SPContact() {
  const t = useTranslations('contact');

  return (
    <section className='bg-white py-4'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-4 text-center text-xl font-bold'>{t('title')}</h2>
        <div className='flex flex-col space-y-4'>
          <div>
            <h3 className='mb-2 text-base font-semibold'>{t('you_are')}</h3>
            <ul className='space-y-1'>
              <li>{t('distributor')}</li>
              <li>{t('affiliate')}</li>
              <li>{t('corporate_gifts')}</li>
              <li>{t('content_creator')}</li>
            </ul>
          </div>
          <div>
            <form className='space-y-2'>
              <select className='w-full rounded border p-2'>
                <option>{t('distributor')}</option>
                <option>{t('affiliate')}</option>
                <option>{t('corporate_gifts')}</option>
                <option>{t('content_creator')}</option>
              </select>
              <input
                type='text'
                placeholder={t('name')}
                className='w-full rounded border p-2'
              />
              <input
                type='tel'
                placeholder={t('phone')}
                className='w-full rounded border p-2'
              />
              <button
                type='submit'
                className='w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
              >
                {t('register')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
