'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Videos() {
  const t = useTranslations('videos');

  const videos = t.raw('videos').map((video: { title: string; date: string }) => ({
    title: video.title,
    date: video.date,
    thumbnail: `/thumbnail-${video.title.split(' ').join('-').toLowerCase()}.jpg`,
  }));

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-4">{t('title')}</h2>
        <p className="text-center mb-6">{t('description')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.map((video) => (
            <div key={video.title} className="border rounded overflow-hidden">
              <Image src={video.thumbnail} alt={video.title} width={300} height={200} className="w-full h-auto" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p className="text-sm">{video.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{t('youtube_link')}</a>
        </div>
      </div>
    </section>
  );
}
