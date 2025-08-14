'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className='bg-[url(/images/footer-background.jpg)] bg-cover bg-center bg-no-repeat py-8 text-white'>
      <div className='container mx-auto px-4'>
        {/* Mobile layout */}
        <div className='md:hidden flex justify-between'>
          
          
          {/* Các phần còn lại nằm bên trái */}
          <div className='grid grid-cols-1 gap-8'>
            <div>
              <h3 className='mb-4 text-lg font-semibold'>
                {t('customer_support')}
              </h3>
              <ul className='space-y-2'>
                <li>
                  <a href='#' className='hover:underline'>
                    {t('policies')}
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    {t('salon_terms')}
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    {t('faq')}
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    {t('contact')}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='mb-4 text-lg font-semibold'>{t('about_us')}</h3>
              <ul className='space-y-2'>
                <li>
                  <a href='#' className='hover:underline'>
                    {t('introduction')}
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    {t('operating_terms')}
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    {t('recruitment.title')}
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    {t('sitemap')}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='mb-4 text-lg font-semibold'>{t('car_news')}</h3>
              <ul className='space-y-2'>
                <li>
                  <a href='#' className='hover:underline'>
                    {t('service_pricing')}
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    {t('auto_academy')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Logo ở phía trên bên phải */}
          <div className='mb-6 flex justify-end'>
            <Image
              src='/images/logo-mexe.png'
              alt='Mexe Logo'
              width={80}
              height={32}
              style={{ width: '60px', height: '60px' }}
            />
          </div>
        </div>

        {/* Desktop layout - giữ nguyên */}
        <div className='hidden md:grid md:grid-cols-4 gap-8'>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>
              {t('customer_support')}
            </h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='hover:underline'>
                  {t('policies')}
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  {t('salon_terms')}
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  {t('faq')}
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  {t('contact')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>{t('about_us')}</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='hover:underline'>
                  {t('introduction')}
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  {t('operating_terms')}
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  {t('recruitment.title')}
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  {t('sitemap')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>{t('car_news')}</h3>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='hover:underline'>
                  {t('service_pricing')}
                </a>
              </li>
              <li>
                <a href='#' className='hover:underline'>
                  {t('auto_academy')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <Image
              src='/images/logo-mexe.png'
              alt='Mexe Logo 123123'
              width={80}
              height={32}
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
        </div>
        <div className='mt-8'>
          <h3 className='text-lg font-semibold'>{t('company')}</h3>
          <p>{t('copyright')}</p>
          <p>📞 {t('phone')}</p>
          <p>✉️ {t('email')}</p>
          <p>{t('working_hours')}</p>
          <p>{t('icp_license')}</p>
          <p>{t('content_responsible')}</p>
          <p>{t('terms_note')}</p>
          <h3 className='mt-4 text-lg font-semibold'>{t('address.hq')}</h3>
          <p>{t('address.hanoi_business')}</p>
          <p>☎️ {t('address.hotline')}</p>
          <p>{t('address.hcm_office')}</p>
          <p>☎️ {t('address.hotline')}</p>
          <p>{t('business_license')}</p>
          <p>{t('icp_license_1')}</p>
          <p>{t('icp_license_amended')}</p>
        </div>
      </div>
    </footer>
  );
}
