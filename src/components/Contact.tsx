'use client';

import { useTranslations } from 'next-intl';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function Contact() {
  const t = useTranslations('contact');

  return (
    <section className='py-8'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-6 text-center text-2xl font-bold'>{t('title')}</h2>
        <div className='grid grid-cols-8 gap-8'>
          <div className='col-span-2 col-start-3 rounded-4xl bg-white p-8'>
            <h3 className='mb-4 text-lg font-semibold'>{t('you_are')}</h3>
            <ul className='space-y-2'>
              <li className='role-btn hover:cusor w-full cursor-pointer rounded-full bg-gray-100 py-3 text-center text-base font-bold text-[#0A115F] shadow transition hover:bg-[#0A115F] hover:text-white'>
                {t('distributor')}
              </li>
              <li className='role-btn hover:cusor w-full cursor-pointer rounded-full bg-gray-100 py-3 text-center text-base font-bold text-[#0A115F] shadow transition hover:bg-[#0A115F] hover:text-white'>
                {t('affiliate')}
              </li>
              <li className='role-btn hover:cusor w-full cursor-pointer rounded-full bg-gray-100 py-3 text-center text-base font-bold text-[#0A115F] shadow transition hover:bg-[#0A115F] hover:text-white'>
                {t('corporate_gifts')}
              </li>
              <li className='role-btn hover:cusor w-full cursor-pointer rounded-full bg-gray-100 py-3 text-center text-base font-bold text-[#0A115F] shadow transition hover:bg-[#0A115F] hover:text-white'>
                {t('content_creator')}
              </li>
            </ul>
          </div>
          <div className='col-span-2 flex max-w-md flex-1 flex-col gap-4'>
            <form className='w-full space-y-4'>
              <input
                type='text'
                placeholder={t('name')}
                className='w-full rounded-full bg-white px-6 py-3 text-base text-[#0A115F] placeholder-gray-500 focus:outline-none'
              />
              <input
                type='tel'
                placeholder={t('phone')}
                className='w-full rounded-full bg-white px-6 py-3 text-base text-[#0A115F] placeholder-gray-500 focus:outline-none'
              />
              <input
                type='email'
                placeholder={t('email')}
                className='w-full rounded-full bg-white px-6 py-3 text-base text-[#0A115F] placeholder-gray-500 focus:outline-none'
              />
              <button
                type='submit'
                className='mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#0A115F] px-8 py-3 text-lg font-bold text-white shadow transition hover:bg-[#0A115F]/80'
              >
                {t('register')}
                <PaperAirplaneIcon className='h-5 w-5' />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
