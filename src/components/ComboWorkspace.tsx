'use client';

import { useTranslations } from 'next-intl';

export default function ComboWorkspace() {
  const t = useTranslations('combo_workspace');

  const groups = [
    'group_1',
    'group_2',
    'group_3',
    'group_4',
    'group_5',
    'group_6',
    'group_7',
    'group_8',
  ];

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-4">{t('title')}</h2>
        <a href="#" className="text-blue-600 hover:underline text-center block mb-6">
          {t('explore_more')}
        </a>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {groups.map((group) => (
            <div key={group} className="border p-4 rounded">
              <ul className="space-y-2">
                {t.raw(group).map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href="#" className="text-blue-600 hover:underline mt-2 inline-block">
                {t('view')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
