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
    <section className='bg-gray-100 py-4'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-4 text-center text-xl font-bold'>{t('title')}</h2>
        <a
          href='#'
          className='mb-4 block text-center text-blue-600 hover:underline'
        >
          {t('explore_more')}
        </a>
        <div className='flex flex-col space-y-4'>
          {groups.map((group) => (
            <div key={group} className='rounded border p-4'>
              <ul className='space-y-1'>
                {t.raw(group).map((item: string) => (
                  <li key={item} className='text-sm'>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href='#'
                className='mt-2 inline-block text-sm text-blue-600 hover:underline'
              >
                {t('view')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
