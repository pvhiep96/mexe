'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function SPFooter() {
  const t = useTranslations('footer');

  return (
    <footer className='bg-gray-800 py-4 text-white'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col space-y-4'>
          <div>
            <h3 className='mb-2 text-base font-semibold'>
              {t('customer_support')}
            </h3>
            <ul className='space-y-1'>
              <li>
                <a href='#' className='text-sm hover:underline'>
                  {t('policies')}
                </a>
              </li>
              <li>
                <a href='#' className='text-sm hover:underline'>
                  {t('salon_terms')}
                </a>
              </li>
              <li>
                <a href='#' className='text-sm hover:underline'>
                  {t('faq')}
                </a>
              </li>
              <li>
                <a href='#' className='text-sm hover:underline'>
                  {t('contact')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-2 text-base font-semibold'>{t('about_us')}</h3>
            <ul className='space-y-1'>
              <li>
                <a href='#' className='text-sm hover:underline'>
                  {t('introduction')}
                </a>
              </li>
              <li>
                <a href='#' className='text-sm hover:underline'>
                  {t('operating_terms')}
                </a>
              </li>
              <li>
                <a href='#' className='text-sm hover:underline'>
                  {t('recruitment')}
                </a>
              </li>
              <li>
                <a href='#' className='text-sm hover:underline'>
                  {t('sitemap')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-2 text-base font-semibold'>{t('car_news')}</h3>
            <ul className='space-y-1'>
              <li>
                <a href='#' className='text-sm hover:underline'>
                  {t('service_pricing')}
                </a>
              </li>
              <li>
                <a href='#' className='text-sm hover:underline'>
                  {t('auto_academy')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <Image
              src='/images/footer-logo.png'
              alt='Mexe Logo'
              width={80}
              height={32}
            />
          </div>
          <div>
            <h3 className='text-base font-semibold'>{t('company')}</h3>
            <p className='text-sm'>{t('copyright')}</p>
            <p className='text-sm'>📞 {t('phone')}</p>
            <p className='text-sm'>✉️ {t('email')}</p>
            <p className='text-sm'>{t('working_hours')}</p>
            <p className='text-sm'>{t('icp_license')}</p>
            <p className='text-sm'>{t('content_responsible')}</p>
            <p className='text-sm'>{t('terms_note')}</p>
            <h3 className='mt-2 text-base font-semibold'>{t('address.hq')}</h3>
            <p className='text-sm'>{t('address.hanoi_business')}</p>
            <p className='text-sm'>☎️ {t('address.hotline')}</p>
            <p className='text-sm'>{t('address.hcm_office')}</p>
            <p className='text-sm'>☎️ {t('address.hotline')}</p>
            <p className='text-sm'>{t('business_license')}</p>
            <p className='text-sm'>{t('icp_license_1')}</p>
            <p className='text-sm'>{t('icp_license_amended')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
