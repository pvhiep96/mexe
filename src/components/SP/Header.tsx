'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function SPHeader() {
  const t = useTranslations('header');

  const exploreThemes = [
    t('workspace_setup'),
    t('monthly_offers'),
    t('newest_products'),
    t('diy_steampunk'),
  ];

  const mexeCornerItems = [
    { title: t('pre_order_info'), href: '#' },
    { title: t('livestream_sales'), href: '#' },
    { title: t('creative_clocks'), href: '#' },
    { title: t('keyboard_mouse_sets'), href: '#' },
  ];

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Image src="/images/logo.png" alt="Mexe Logo" width={80} height={32} />
          <nav className="flex flex-col space-y-2">
            <Link href="/" className="text-blue-600 hover:underline text-sm">{t('home')}</Link>
            <div className="relative group">
              <span className="text-blue-600 hover:underline cursor-pointer text-sm">{t('explore')}</span>
              <div className="absolute hidden group-hover:block bg-white shadow p-2">
                <h3 className="font-semibold text-sm">{t('explore_by_theme')}</h3>
                <ul className="space-y-1">
                  {exploreThemes.map((theme) => (
                    <li key={theme}>
                      <Link href="#" className="text-blue-600 hover:underline text-sm">{theme}</Link>
                    </li>
                  ))}
                </ul>
                <h3 className="font-semibold mt-2 text-sm">{t('mexe_corner')}</h3>
                <ul className="space-y-1">
                  {mexeCornerItems.map((item) => (
                    <li key={item.title}>
                      <Link href={item.href} className="text-blue-600 hover:underline text-sm">{item.title}</Link>
                    </li>
                  ))}
                  <li>
                    <Link href="#" className="text-blue-600 hover:underline text-sm">{t('view_all')}</Link>
                  </li>
                </ul>
              </div>
            </div>
            <Link href="/about" className="text-blue-600 hover:underline text-sm">{t('learn_more')}</Link>
            <Link href="/articles" className="text-blue-600 hover:underline text-sm">{t('news')}</Link>
          </nav>
          <div className="flex items-center space-x-2">
            <input type="text" placeholder={t('search')} className="p-1 border rounded text-sm" />
            <Link href="/cart" className="text-blue-600 text-sm">0 {t('cart')}</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
