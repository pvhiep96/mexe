'use client';

import { useTranslations } from 'next-intl';

export default function SPComboWorkspace() {
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
    <section className="py-4 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold text-center mb-4">{t('title')}</h2>
        <a href="#" className="text-blue-600 hover:underline text-center block mb-4">
          {t('explore_more')}
        </a>
        <div className="flex flex-col space-y-4">
          {groups.map((group) => (
            <div key={group} className="border p-4 rounded">
              <ul className="space-y-1">
                {t.raw(group).map((item: string) => (
                  <li key={item} className="text-sm">{item}</li>
                ))}
              </ul>
              <a href="#" className="text-blue-600 hover:underline mt-2 inline-block text-sm">
                {t('view')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
