'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('customer_support')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">{t('policies')}</a></li>
              <li><a href="#" className="hover:underline">{t('salon_terms')}</a></li>
              <li><a href="#" className="hover:underline">{t('faq')}</a></li>
              <li><a href="#" className="hover:underline">{t('contact')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('about_us')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">{t('introduction')}</a></li>
              <li><a href="#" className="hover:underline">{t('operating_terms')}</a></li>
              <li><a href="#" className="hover:underline">{t('recruitment')}</a></li>
              <li><a href="#" className="hover:underline">{t('sitemap')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('car_news')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">{t('service_pricing')}</a></li>
              <li><a href="#" className="hover:underline">{t('auto_academy')}</a></li>
            </ul>
          </div>
          <div>
            <Image src="/images/footer-logo.png" alt="Mexe Logo" width={100} height={40} />
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold">{t('company')}</h3>
          <p>{t('copyright')}</p>
          <p>📞 {t('phone')}</p>
          <p>✉️ {t('email')}</p>
          <p>{t('working_hours')}</p>
          <p>{t('icp_license')}</p>
          <p>{t('content_responsible')}</p>
          <p>{t('terms_note')}</p>
          <h3 className="text-lg font-semibold mt-4">{t('address.hq')}</h3>
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
