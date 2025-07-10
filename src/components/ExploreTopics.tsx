// components/ExploreTopics.tsx
import { Grid2X2, Percent, Sparkles, MoreHorizontal } from 'lucide-react';

export default function ExploreTopics() {
  const topics = [
    { icon: <Grid2X2 className='h-6 w-6' />, label: 'Tất cả' },
    { icon: <Percent className='h-6 w-6' />, label: 'Sale' },
    { icon: <Sparkles className='h-6 w-6' />, label: 'Mới' },
    { icon: <MoreHorizontal className='h-6 w-6' />, label: 'Khác' },
  ];

  return (
    <section className='bg-black px-6 py-10 text-white'>
      <h2 className='mb-6 text-xl font-bold text-yellow-400'>
        KHÁM PHÁ THEO CHỦ ĐỀ
      </h2>
      <div className='flex flex-col gap-6'>
        {topics.map((item, idx) => (
          <div
            key={idx}
            className='flex h-16 w-16 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105'
          >
            {item.icon}
          </div>
        ))}
      </div>
    </section>
  );
}
