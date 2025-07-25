'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const videos = [
  {
    title: 'NISSAN SUNNY Premium Xe Sedan rộng rãi và tiết kiệm | MUA BÁN Ô TÔ CŨ OTO.COM.VN',
    date: '10/03/2025',
    link: 'https://www.youtube.com/watch?v=myhmcJRbi4g',
    youtubeId: 'myhmcJRbi4g',
  },
  {
    title: 'TOYOTA FOTUNER xe gia đình cực giữ gìn | MUA BÁN Ô TÔ CŨ OTO.COM.VN',
    date: '09/03/2025',
    link: 'https://www.youtube.com/watch?v=myhmcJRbi4g',
    youtubeId: 'myhmcJRbi4g',
  },
  {
    title: 'FORD RANGER WILDTRACK 2020 giá cực rẻ | MUA BÁN Ô TÔ CŨ OTO.COM.VN',
    date: '09/03/2025',
    link: 'https://www.youtube.com/watch?v=myhmcJRbi4g',
    youtubeId: 'myhmcJRbi4g',
  },
  {
    title: 'Mazda CX8 mẫu xe 7 chỗ gầm cao giá rẻ | MUA BÁN Ô TÔ CŨ OTO.COM.VN',
    date: '28/02/2025',
    link: 'https://www.youtube.com/watch?v=myhmcJRbi4g',
    youtubeId: 'myhmcJRbi4g',
  },
];

const mainVideoId = 'oX2diE7FSRk';

export default function Videos() {
  return (
    <div>
      {/* Desktop version */}
      <div className="hidden lg:block w-full bg-gradient-to-br from-[#181d23] to-[#232a36] py-10 px-2">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột trái: Video chính */}
          <div className="md:col-span-2 flex flex-col">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 flex items-center gap-2">
              KÊNH YOUTUBE CỦA CHÚNG TÔI
              <span className="text-red-600 text-xl">
                <svg className="w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M10 15l5.19-3.09a1 1 0 000-1.72L10 7" /></svg>
              </span>
            </h2>
            <p className="text-gray-300 mb-4">
              Mexe là kênh thông tin và mua bán ô tô, xe hơi dẫn đầu thị trường. Đăng tin mua bán oto nhanh chóng và đơn giản. Cung cấp tin tức về khuyến mại hãng xe, salons, đánh giá xe ô tô nhanh nhất hiện nay.
            </p>
            <div className="w-full aspect-video rounded-xl overflow-hidden mb-2">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${mainVideoId}`}
                title="YouTube video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          {/* Cột phải: Danh sách video */}
          <div className="flex flex-col gap-4">
            {videos.map((video) => (
              <Link
                href={video.link}
                target="_blank"
                rel="noopener"
                className="flex gap-3 hover:bg-white/10 rounded-lg p-1 transition"
                key={video.title}
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  width={112}
                  height={80}
                  className="w-28 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div>
                  <div className="text-white font-semibold leading-tight text-sm line-clamp-2">{video.title}</div>
                  <div className="text-gray-400 text-xs mt-1">{video.date}</div>
                </div>
              </Link>
            ))}
            <Link
              href="https://www.youtube.com/@mexe2018"
              target="_blank"
              className="mt-4 text-right text-white font-semibold hover:underline flex items-center justify-end gap-1"
            >
              Tới kênh YouTube
              <ChevronRightIcon className="w-4 h-4 inline-block" />
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile version */}
      <div className="block lg:hidden w-full bg-gradient-to-br from-[#181d23] to-[#232a36] py-6 px-2">
        <div className="max-w-xs mx-auto flex flex-col gap-3">
          <h2 className="text-lg font-extrabold text-white mb-2 text-center">KÊNH YOUTUBE CỦA CHÚNG TÔI</h2>
          <div className="flex flex-col gap-2">
            {videos.map((video) => (
              <Link
                href={video.link}
                target="_blank"
                rel="noopener"
                className="flex gap-2 hover:bg-white/10 rounded-lg p-1 transition"
                key={video.title}
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  width={80}
                  height={60}
                  className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div>
                  <div className="text-white font-semibold leading-tight text-xs line-clamp-2">{video.title}</div>
                  <div className="text-gray-400 text-[10px] mt-1">{video.date}</div>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="https://www.youtube.com/@mexe2018"
            target="_blank"
            className="mt-4 text-center text-white font-semibold hover:underline flex items-center justify-center gap-1"
          >
            Tới kênh YouTube
            <ChevronRightIcon className="w-4 h-4 inline-block" />
          </Link>
        </div>
      </div>
    </div>
  );
}
