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
    story: 'Honda Genuine Parts cung cấp phụ tùng, linh kiện chính hãng cho các dòng xe Honda, đảm bảo chất lượng và độ bền tối ưu cho xe của bạn.',
  },
  {
    id: 'toyota',
    image: '/images/demo-logo-honda.jpg',
    name: 'Toyota Genuine Parts',
    brand: 'Thương hiệu Toyota',
    field: 'Phụ tùng ô tô',
    founded: '1937',
    story: 'Toyota Genuine Parts mang đến các sản phẩm phụ tùng thay thế chất lượng cao, giúp xe Toyota vận hành ổn định và an toàn trên mọi hành trình.',
  },
  {
    id: 'hyundai',
    image: '/images/demo-logo-honda.jpg',
    name: 'Hyundai Mobis',
    brand: 'Thương hiệu Hyundai',
    field: 'Linh kiện, phụ tùng ô tô',
    founded: '1977',
    story: 'Hyundai Mobis là nhà cung cấp linh kiện, phụ tùng chính hãng cho các dòng xe Hyundai, nổi bật với công nghệ hiện đại và độ bền cao.',
  },
  {
    id: 'ford',
    image: '/images/demo-logo-honda.jpg',
    name: 'Ford Genuine Parts',
    brand: 'Thương hiệu Ford',
    field: 'Phụ tùng ô tô',
    founded: '1903',
    story: 'Ford Genuine Parts cung cấp phụ tùng thay thế chính hãng cho các dòng xe Ford, đảm bảo sự an tâm và hiệu suất tối ưu cho khách hàng.',
  },
];

export default function Brands() {
  return (
    <div>
      {/* Desktop version */}
      <div className="hidden lg:block">
        <section className="w-full bg-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-extrabold mb-8 text-center tracking-wide">THƯƠNG HIỆU HAY TẠI MEXE</h2>
            <div className="flex gap-6 overflow-x-auto pb-2">
              {brands.map((brand) => (
                <div key={brand.id} className="rounded-3xl overflow-hidden shadow-lg bg-white flex flex-col h-full min-w-[320px] max-w-[320px]">
                  <div className="relative h-40">
                    <Image src={brand.image} alt={brand.name} fill className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">{brand.name}</span>
                    </div>
                  </div>
                  <div className="bg-black text-white text-center py-2 text-lg font-bold">{brand.brand}</div>
                  <div className="p-4 text-black text-left bg-white flex-1">
                    <div><b>Lĩnh vực:</b> {brand.field}</div>
                    <div><b>Ra đời:</b> {brand.founded}</div>
                    <div className="mt-2"><b>Câu chuyện thương hiệu:</b> {brand.story}</div>
                  </div>
                  <div className="bg-[#0A115F] text-white text-center font-bold py-3 cursor-pointer hover:bg-[#0A115F]/80 transition flex items-center justify-center gap-1">
                    Câu chuyện phía sau <ChevronRightIcon className="w-4 h-4 inline-block" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* Mobile version */}
      <div className="block lg:hidden">
        <section className="w-full bg-white py-4">
          <div className="max-w-xs mx-auto px-2">
            <h2 className="text-lg font-extrabold mb-4 text-center">THƯƠNG HIỆU HAY</h2>
            <div className="flex overflow-x-auto gap-3 pb-2">
              {brands.map((brand) => (
                <div key={brand.id} className="min-w-[140px] bg-white rounded-xl shadow p-2 flex flex-col items-center">
                  <Image src={brand.image} alt={brand.name} width={80} height={80} className="w-20 h-20 object-cover rounded-lg mb-1" />
                  <div className="text-xs font-bold text-center">{brand.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
