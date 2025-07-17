'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function SPFooter() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-4">
          <div>
            <h3 className="text-base font-semibold mb-2">{t('customer_support')}</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline text-sm">{t('policies')}</a></li>
              <li><a href="#" className="hover:underline text-sm">{t('salon_terms')}</a></li>
              <li><a href="#" className="hover:underline text-sm">{t('faq')}</a></li>
              <li><a href="#" className="hover:underline text-sm">{t('contact')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-2">{t('about_us')}</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline text-sm">{t('introduction')}</a></li>
              <li><a href="#" className="hover:underline text-sm">{t('operating_terms')}</a></li>
              <li><a href="#" className="hover:underline text-sm">{t('recruitment')}</a></li>
              <li><a href="#" className="hover:underline text-sm">{t('sitemap')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-2">{t('car_news')}</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline text-sm">{t('service_pricing')}</a></li>
              <li><a href="#" className="hover:underline text-sm">{t('auto_academy')}</a></li>
            </ul>
          </div>
          <div>
            <Image src="/images/footer-logo.png" alt="Mexe Logo" width={80} height={32} />
          </div>
          <div>
            <h3 className="text-base font-semibold">{t('company')}</h3>
            <p className="text-sm">{t('copyright')}</p>
            <p className="text-sm">📞 {t('phone')}</p>
            <p className="text-sm">✉️ {t('email')}</p>
            <p className="text-sm">{t('working_hours')}</p>
            <p className="text-sm">{t('icp_license')}</p>
            <p className="text-sm">{t('content_responsible')}</p>
            <p className="text-sm">{t('terms_note')}</p>
            <h3 className="text-base font-semibold mt-2">{t('address.hq')}</h3>
            <p className="text-sm">{t('address.hanoi_business')}</p>
            <p className="text-sm">☎️ {t('address.hotline')}</p>
            <p className="text-sm">{t('address.hcm_office')}</p>
            <p className="text-sm">☎️ {t('address.hotline')}</p>
            <p className="text-sm">{t('business_license')}</p>
            <p className="text-sm">{t('icp_license_1')}</p>
            <p className="text-sm">{t('icp_license_amended')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
