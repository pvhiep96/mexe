'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon, PlayIcon } from '@heroicons/react/24/outline';

interface YouTubeVideo {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  channelTitle: string;
}

// Component để handle YouTube thumbnail với fallback
const YouTubeThumbnail = ({ videoId, title, className }: { videoId: string; title: string; className?: string }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  if (imageError) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <div className="text-center text-gray-500">
          <PlayIcon className="h-12 w-12 mx-auto mb-2" />
          <p className="text-sm">Video không khả dụng</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {imageLoading && (
        <div className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}>
          <div className="text-gray-500">Đang tải...</div>
        </div>
      )}
      <Image
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        width={320}
        height={180}
        className={`${className} ${imageLoading ? 'hidden' : 'block'}`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        unoptimized
      />
    </div>
  );
};

// YouTube Data API v3 configuration
const CHANNEL_URL = 'https://www.youtube.com/@mexe2018/videos';
const CHANNEL_ID = '@mexe2018'; // Channel ID for API calls
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

// Helper function to format YouTube API date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Hôm nay';
  if (diffDays === 1) return 'Hôm qua';
  if (diffDays < 7) return `${diffDays} ngày trước`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} tháng trước`;
  
  return date.toLocaleDateString('vi-VN');
};

export default function Videos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [mainVideo, setMainVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (API_KEY) {
          // Fetch real data from YouTube API
          
          // First, get channel ID from username
          const channelResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${CHANNEL_ID}&type=channel&key=${API_KEY}`
          );
          
          if (!channelResponse.ok) {
            throw new Error('Failed to fetch channel info');
          }
          
          const channelData = await channelResponse.json();
          const channelId = channelData.items[0]?.id?.channelId;
          
          if (!channelId) {
            throw new Error('Channel not found');
          }
          

          
          // Then, get latest videos from channel
          const videosResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=5&type=video&key=${API_KEY}`
          );
          
          if (!videosResponse.ok) {
            throw new Error('Failed to fetch videos');
          }
          
          const videosData = await videosResponse.json();
          
          // Transform YouTube API data to our format
          const videoList = videosData.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            publishedAt: formatDate(item.snippet.publishedAt),
            thumbnail: item.snippet.thumbnails.high.url,
            channelTitle: item.snippet.channelTitle,
          }));
          

          
          setVideos(videoList.slice(1)); // All videos except the first one
          setMainVideo(videoList[0]); // First video as main video
        } else {
          // Fallback to sample data if no API key
          const videoList = [
            {
              id: 'oX2diE7FSRk',
              title: 'SKODA KUSHAQ - Xe Châu Âu lắp ráp có máy Turbo, ADAS',
              publishedAt: 'Hôm nay',
              thumbnail: 'https://img.youtube.com/vi/oX2diE7FSRk/hqdefault.jpg',
              channelTitle: 'Mexe',
            },
            {
              id: 'myhmcJRbi4g',
              title: 'NISSAN SUNNY Premium Xe Sedan rộng rãi và tiết kiệm | MUA BÁN Ô TÔ CŨ OTO.COM.VN',
              publishedAt: '10/03/2025',
              thumbnail: 'https://img.youtube.com/vi/myhmcJRbi4g/hqdefault.jpg',
              channelTitle: 'Mexe',
            },
            {
              id: 'myhmcJRbi4g',
              title: 'TOYOTA FOTUNER xe gia đình cực giữ gìn | MUA BÁN Ô TÔ CŨ OTO.COM.VN',
              publishedAt: '09/03/2025',
              thumbnail: 'https://img.youtube.com/vi/myhmcJRbi4g/hqdefault.jpg',
              channelTitle: 'Mexe',
            },
            {
              id: 'myhmcJRbi4g',
              title: 'FORD RANGER WILDTRACK 2020 giá cực rẻ | MUA BÁN Ô TÔ CŨ OTO.COM.VN',
              publishedAt: '09/03/2025',
              thumbnail: 'https://img.youtube.com/vi/myhmcJRbi4g/hqdefault.jpg',
              channelTitle: 'Mexe',
            },
            {
              id: 'myhmcJRbi4g',
              title: 'Mazda CX8 mẫu xe 7 chỗ gầm cao giá rẻ | MUA BÁN Ô TÔ CŨ OTO.COM.VN',
              publishedAt: '28/02/2025',
              thumbnail: 'https://img.youtube.com/vi/myhmcJRbi4g/hqdefault.jpg',
              channelTitle: 'Mexe',
            },
          ];
          
          setVideos(videoList.slice(1)); // All videos except the first one
          setMainVideo(videoList[0]); // First video as main video
        }
      } catch (error) {
        // Fallback to sample data on error
        const videoList = [
          {
            id: 'oX2diE7FSRk',
            title: 'SKODA KUSHAQ - Xe Châu Âu lắp ráp có máy Turbo, ADAS',
            publishedAt: 'Hôm nay',
            thumbnail: 'https://img.youtube.com/vi/oX2diE7FSRk/hqdefault.jpg',
            channelTitle: 'Mexe',
          },
          {
            id: 'myhmcJRbi4g',
            title: 'NISSAN SUNNY Premium Xe Sedan rộng rãi và tiết kiệm | MUA BÁN Ô TÔ CŨ OTO.COM.VN',
            publishedAt: '10/03/2025',
            thumbnail: 'https://img.youtube.com/vi/myhmcJRbi4g/hqdefault.jpg',
            channelTitle: 'Mexe',
          },
          {
            id: 'myhmcJRbi4g',
            title: 'TOYOTA FOTUNER xe gia đình cực giữ gìn | MUA BÁN Ô TÔ CŨ OTO.COM.VN',
            publishedAt: '09/03/2025',
            thumbnail: 'https://img.youtube.com/vi/myhmcJRbi4g/hqdefault.jpg',
            channelTitle: 'Mexe',
          },
          {
            id: 'myhmcJRbi4g',
            title: 'FORD RANGER WILDTRACK 2020 giá cực rẻ | MUA BÁN Ô TÔ CŨ OTO.COM.VN',
            publishedAt: '09/03/2025',
            thumbnail: 'https://img.youtube.com/vi/myhmcJRbi4g/hqdefault.jpg',
            channelTitle: 'Mexe',
          },
          {
            id: 'myhmcJRbi4g',
            title: 'Mazda CX8 mẫu xe 7 chỗ gầm cao giá rẻ | MUA BÁN Ô TÔ CŨ OTO.COM.VN',
            publishedAt: '28/02/2025',
            thumbnail: 'https://img.youtube.com/vi/myhmcJRbi4g/hqdefault.jpg',
            channelTitle: 'Mexe',
          },
        ];
        
        setVideos(videoList.slice(1)); // All videos except the first one
        setMainVideo(videoList[0]); // First video as main video
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [API_KEY]);

  return (
    <div>
      {/* Desktop version */}
      <div className='hidden w-full bg-gradient-to-br from-[#181d23] to-[#232a36] px-2 py-10 lg:block'>
        <div className='mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3'>
          {/* Cột trái: Video chính */}
          <div className='flex flex-col md:col-span-2'>
            <h2 className='mb-2 flex items-center gap-2 text-2xl font-extrabold text-white md:text-3xl'>
              KÊNH YOUTUBE CỦA CHÚNG TÔI
              <span className='text-xl text-red-600'>
                <svg
                  className='inline-block h-6 w-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M10 15l5.19-3.09a1 1 0 000-1.72L10 7' />
                </svg>
              </span>
            </h2>
            <p className='mb-4 text-gray-300'>
              Mexe là kênh thông tin và mua bán ô tô, xe hơi dẫn đầu thị trường.
              Đăng tin mua bán oto nhanh chóng và đơn giản. Cung cấp tin tức về
              khuyến mại hãng xe, salons, đánh giá xe ô tô nhanh nhất hiện nay.
            </p>
            <p className='mb-4 text-sm text-gray-400'>
              {API_KEY ? (
                <>
                  ✅ Đã cấu hình YouTube API - Hiển thị video thực từ kênh
                  <a href={CHANNEL_URL} target='_blank' className='text-blue-400 hover:underline ml-1'>
                    @mexe2018
                  </a>
                </>
              ) : (
                <>
                  ⚠️ Chưa cấu hình YouTube API key - Đang hiển thị dữ liệu mẫu. 
                  <a href={CHANNEL_URL} target='_blank' className='text-blue-400 hover:underline ml-1'>
                    Xem kênh YouTube thực tại đây
                  </a>
                </>
              )}
            </p>
            {loading ? (
              <div className='mb-2 aspect-video w-full overflow-hidden rounded-lg bg-gray-700 flex items-center justify-center'>
                <div className='text-white'>Đang tải video...</div>
              </div>
            ) : mainVideo ? (
                              <div className='mb-2 aspect-video w-full overflow-hidden rounded-lg'>
                <iframe
                  className='h-full w-full'
                  src={`https://www.youtube.com/embed/${mainVideo.id}`}
                  title={mainVideo.title}
                  frameBorder='0'
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className='mb-2 aspect-video w-full overflow-hidden rounded-lg bg-gray-700 flex items-center justify-center'>
                <div className='text-white'>Không có video</div>
              </div>
            )}
          </div>
          {/* Cột phải: Danh sách video */}
          <div className='flex flex-col gap-4'>
            {loading ? (
              <div className='text-white text-center py-4'>Đang tải danh sách video...</div>
            ) : (
              videos.map((video) => (
                <Link
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target='_blank'
                  rel='noopener'
                  className='flex gap-3 rounded-lg p-1 transition hover:bg-white/10'
                  key={video.id}
                >
                  <YouTubeThumbnail
                    videoId={video.id}
                    title={video.title}
                    className='h-20 w-28 flex-shrink-0 rounded-lg object-cover'
                  />
                  <div>
                    <div className='line-clamp-2 text-sm leading-tight font-semibold text-white'>
                      {video.title}
                    </div>
                    <div className='mt-1 text-xs text-gray-400'>{video.publishedAt}</div>
                  </div>
                </Link>
              ))
            )}
            <Link
              href={CHANNEL_URL}
              target='_blank'
              className='mt-4 flex items-center justify-end gap-1 text-right font-semibold text-white hover:underline'
            >
              Tới kênh YouTube
              <ChevronRightIcon className='inline-block h-4 w-4' />
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile version */}
      <div className='block w-full bg-gradient-to-br from-[#181d23] to-[#232a36] px-2 py-6 lg:hidden'>
        <div className='mx-auto flex max-w-xs flex-col gap-3'>
          <h2 className='mb-2 text-center text-lg font-extrabold text-white'>
            KÊNH YOUTUBE CỦA CHÚNG TÔI
          </h2>
          <div className='flex flex-col gap-2'>
            {loading ? (
              <div className='text-white text-center py-4 text-sm'>Đang tải danh sách video...</div>
            ) : (
              videos.map((video) => (
                <Link
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target='_blank'
                  rel='noopener'
                  className='flex gap-2 rounded-lg p-1 transition hover:bg-white/10'
                  key={video.id}
                >
                  <YouTubeThumbnail
                    videoId={video.id}
                    title={video.title}
                    className='h-16 w-20 flex-shrink-0 rounded-lg object-cover'
                  />
                  <div>
                    <div className='line-clamp-2 text-xs leading-tight font-semibold text-white'>
                      {video.title}
                    </div>
                    <div className='mt-1 text-[10px] text-gray-400'>
                      {video.publishedAt}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          <Link
            href={CHANNEL_URL}
            target='_blank'
            className='mt-4 flex items-center justify-center gap-1 text-center font-semibold text-white hover:underline'
          >
            Tới kênh YouTube
            <ChevronRightIcon className='inline-block h-4 w-4' />
          </Link>
        </div>
      </div>
    </div>
  );
}
