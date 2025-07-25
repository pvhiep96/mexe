'use client';

import Image from 'next/image';

export default function BannerSale() {
  return (
    <div>
      {/* Desktop version */}
      <div className="hidden lg:flex justify-center my-6">
        <Image
          src="/images/banner-sale.webp"
          alt="Banner Sale"
          width={1200}
          height={320}
          className="rounded-2xl w-full max-w-4xl shadow-lg"
          priority
        />
      </div>
      {/* Mobile version */}
      <div className="block lg:hidden flex justify-center my-2">
        <Image
          src="/images/banner-sale.webp"
          alt="Banner Sale"
          width={400}
          height={120}
          className="rounded-xl w-full max-w-xs shadow-lg"
          priority
        />
      </div>
    </div>
  );
}
