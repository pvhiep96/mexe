import React from 'react';
import { getTranslations } from 'next-intl/server';
import NewsList from '@/components/NewsList';
import NewsListSP from '@/components/SP/NewsListSP';
import HeadlinesSection from '@/components/HeadlinesSection';

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const t = await getTranslations('news');

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Headlines Section */}
      <HeadlinesSection />

      {/* Desktop Version */}
      <div className='hidden md:block'>
        <NewsList />
      </div>

      {/* Mobile Version */}
      <div className='md:hidden'>
        <NewsListSP />
      </div>
    
    </div>
  );
}
