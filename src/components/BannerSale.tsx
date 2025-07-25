'use client';

import Image from 'next/image';

export default function BannerSale() {
  return (
    <div>
      {/* Desktop version */}
      <div className='my-6 hidden justify-center lg:flex'>
        <Image
          src='/images/banner-sale.webp'
          alt='Banner Sale'
          width={1200}
          height={320}
          className='w-full max-w-4xl rounded-2xl shadow-lg'
          priority
        />
      </div>
      {/* Mobile version */}
      <div className='my-2 block flex justify-center lg:hidden'>
        <Image
          src='/images/banner-sale.webp'
          alt='Banner Sale'
          width={400}
          height={120}
          className='w-full max-w-xs rounded-xl shadow-lg'
          priority
        />
      </div>
    </div>
  );
}
