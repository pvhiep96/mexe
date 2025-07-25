'use client';

import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const brands = [
  {
    id: 'honda',
    image: '/images/demo-logo-honda.jpg',
    name: 'Honda Genuine Parts',
    brand: 'Thương hiệu Honda',
    field: 'Phụ tùng ô tô',
    founded: '1948',
    story:
      'Honda Genuine Parts cung cấp phụ tùng, linh kiện chính hãng cho các dòng xe Honda, đảm bảo chất lượng và độ bền tối ưu cho xe của bạn.',
  },
  {
    id: 'toyota',
    image: '/images/demo-logo-honda.jpg',
    name: 'Toyota Genuine Parts',
    brand: 'Thương hiệu Toyota',
    field: 'Phụ tùng ô tô',
    founded: '1937',
    story:
      'Toyota Genuine Parts mang đến các sản phẩm phụ tùng thay thế chất lượng cao, giúp xe Toyota vận hành ổn định và an toàn trên mọi hành trình.',
  },
  {
    id: 'hyundai',
    image: '/images/demo-logo-honda.jpg',
    name: 'Hyundai Mobis',
    brand: 'Thương hiệu Hyundai',
    field: 'Linh kiện, phụ tùng ô tô',
    founded: '1977',
    story:
      'Hyundai Mobis là nhà cung cấp linh kiện, phụ tùng chính hãng cho các dòng xe Hyundai, nổi bật với công nghệ hiện đại và độ bền cao.',
  },
  {
    id: 'ford',
    image: '/images/demo-logo-honda.jpg',
    name: 'Ford Genuine Parts',
    brand: 'Thương hiệu Ford',
    field: 'Phụ tùng ô tô',
    founded: '1903',
    story:
      'Ford Genuine Parts cung cấp phụ tùng thay thế chính hãng cho các dòng xe Ford, đảm bảo sự an tâm và hiệu suất tối ưu cho khách hàng.',
  },
];

export default function Brands() {
  return (
    <div>
      {/* Desktop version */}
      <div className='hidden lg:block'>
        <section className='w-full bg-white py-8'>
          <div className='mx-auto max-w-7xl px-4'>
            <h2 className='mb-8 text-center text-4xl font-extrabold tracking-wide'>
              THƯƠNG HIỆU HAY TẠI MEXE
            </h2>
            <div className='flex gap-6 overflow-x-auto pb-2'>
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className='flex h-full max-w-[320px] min-w-[320px] flex-col overflow-hidden rounded-3xl bg-white shadow-lg'
                >
                  <div className='relative h-40'>
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className='h-full w-full object-cover'
                    />
                    <div className='absolute inset-0 flex items-center justify-center bg-black/60'>
                      <span className='text-xl font-bold text-white'>
                        {brand.name}
                      </span>
                    </div>
                  </div>
                  <div className='bg-black py-2 text-center text-lg font-bold text-white'>
                    {brand.brand}
                  </div>
                  <div className='flex-1 bg-white p-4 text-left text-black'>
                    <div>
                      <b>Lĩnh vực:</b> {brand.field}
                    </div>
                    <div>
                      <b>Ra đời:</b> {brand.founded}
                    </div>
                    <div className='mt-2'>
                      <b>Câu chuyện thương hiệu:</b> {brand.story}
                    </div>
                  </div>
                  <div className='flex cursor-pointer items-center justify-center gap-1 bg-[#0A115F] py-3 text-center font-bold text-white transition hover:bg-[#0A115F]/80'>
                    Câu chuyện phía sau{' '}
                    <ChevronRightIcon className='inline-block h-4 w-4' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* Mobile version */}
      <div className='block lg:hidden'>
        <section className='w-full bg-white py-4'>
          <div className='mx-auto max-w-xs px-2'>
            <h2 className='mb-4 text-center text-lg font-extrabold'>
              THƯƠNG HIỆU HAY
            </h2>
            <div className='flex gap-3 overflow-x-auto pb-2'>
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className='flex min-w-[140px] flex-col items-center rounded-xl bg-white p-2 shadow'
                >
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={80}
                    height={80}
                    className='mb-1 h-20 w-20 rounded-lg object-cover'
                  />
                  <div className='text-center text-xs font-bold'>
                    {brand.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
