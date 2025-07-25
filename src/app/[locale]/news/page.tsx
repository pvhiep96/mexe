import React from 'react';
import { getTranslations } from 'next-intl/server';
import NewsList from '@/components/NewsList';
import NewsListSP from '@/components/SP/NewsListSP';
import FeaturedNews from '@/components/FeaturedNews';
import HeadlinesSection from '@/components/HeadlinesSection';
import Pagination from '@/components/Pagination'; // Added

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const t = await getTranslations('news');

  // Get current page from URL params, default to 1
  const currentPage = parseInt(searchParams.page || '1', 10);

  // Mock data - in real app this would come from API
  const totalPages = 15; // Total number of pages
  const baseUrl = '/news'; // Base URL for pagination

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Headlines Section */}
      <HeadlinesSection />

      {/* Desktop Version */}
      <div className='hidden md:block'>
        <NewsList currentPage={currentPage} />
      </div>

      {/* Mobile Version */}
      <div className='md:hidden'>
        <NewsListSP currentPage={currentPage} />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl={baseUrl}
      />
    </div>
  );
}
