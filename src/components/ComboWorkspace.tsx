'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Combo {
  id: number;
  name: string;
  image: string;
  tags: string[];
}

const combos: Combo[] = [
  {
    id: 1,
    name: 'Combo 1',
    image: '/images/demo-combo/demo-combo-1.png',
    tags: ['Camera hành trình', 'Cảm biến áp suất lốp', 'Thảm lót sàn', 'Máy lọc không khí', '...'],
  },
  {
    id: 2,
    name: 'Combo 2',
    image: '/images/demo-combo/demo-combo-2.png',
    tags: ['Sạc nhanh ô tô', 'Bọc vô lăng', 'Nước hoa ô tô', 'HUD hiển thị tốc độ', '...'],
  },
  {
    id: 3,
    name: 'Combo 3',
    image: '/images/demo-combo/demo-combo-3.png',
    tags: ['Bơm lốp điện tử', 'Tẩu sạc đa năng', 'Gối tựa đầu', 'Bọc ghế da', '...'],
  },
  {
    id: 4,
    name: 'Combo 4',
    image: '/images/demo-combo/demo-combo-4.png',
    tags: ['Bọc trần 5D', 'Ốp gương chiếu hậu', 'Ốp tay cửa', 'Chắn bùn', '...'],
  },
  {
    id: 5,
    name: 'Combo 5',
    image: '/images/demo-combo/demo-combo-5.png',
    tags: ['Cảm biến lùi', 'Đèn LED nội thất', 'Màn hình Android', 'Dán phim cách nhiệt', '...'],
  },
  {
    id: 6,
    name: 'Combo 6',
    image: '/images/demo-combo/demo-combo-6.png',
    tags: ['Gương cầu lồi', 'Ốp bậc lên xuống', 'Tấm che nắng', 'Bọc cần số', '...'],
  },
  {
    id: 7,
    name: 'Combo 7',
    image: '/images/demo-combo/demo-combo-1.png',
    tags: ['Bọc ghế da', 'Tựa lưng massage', 'Tấm chắn nắng kính lái', 'Bọc dây an toàn', '...'],
  },
  {
    id: 8,
    name: 'Combo 8',
    image: '/images/demo-combo/demo-combo-2.png',
    tags: ['Bọc trần 5D', 'Ốp gương chiếu hậu', 'Ốp tay cửa', 'Chắn bùn', '...'],
  },
];

export default function ComboWorkspace() {
  const [slider, setSlider] = useState(0);
  const visible = 8;
  const totalSlides = 1; // 8 items, 1 slide for now

  // Dot indicator logic for future extensibility
  const dots = Array.from({ length: totalSlides }, (_, i) => i);

  const prev = () => {
    if (slider > 0) setSlider(slider - 1);
  };
  const next = () => {
    if (slider < totalSlides - 1) setSlider(slider + 1);
  };

  return (
    <div>
      {/* Desktop version */}
      <div className="hidden lg:block">
        <section className="w-full py-8 flex justify-center items-center bg-[#f5f5f5]">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-extrabold text-gray-900">Phụ kiện nên có</h2>
              <button className="border border-gray-400 text-gray-900 font-bold rounded-full px-6 py-2 flex items-center gap-2 hover:bg-gray-900 hover:text-white transition">
                Khám phá thêm <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              {/* Nút prev */}
              <button onClick={prev} disabled={slider === 0} className="absolute left-[-30px] top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow z-10 border border-gray-200 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
              </button>
              {/* Grid items */}
              <div className="grid grid-cols-4 grid-rows-2 gap-6 transition-transform duration-500">
                {combos.map((combo) => (
                  <div key={combo.id} className="relative rounded-3xl overflow-hidden shadow-lg group bg-black/10">
                    <Image src={combo.image} alt={combo.name} width={300} height={288} className="w-full h-72 object-cover group-hover:brightness-75 transition" />
                    <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white text-white font-bold rounded-full px-6 py-2 bg-white/10 backdrop-blur-sm group-hover:bg-white/30 transition text-lg opacity-0 group-hover:opacity-100">Xem</button>
                    <div className="absolute left-0 bottom-0 w-full flex flex-wrap gap-2 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent cursor-pointer">
                      {combo.tags.map((tag) => (
                        <span key={tag} className="border border-white text-white rounded-full px-3 py-1 text-xs hover:bg-white hover:text-black transition">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Nút next */}
              <button onClick={next} disabled={slider >= totalSlides - 1} className="absolute right-[-30px] top-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow z-10 border border-gray-200 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronRightIcon className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            {/* Dot indicators */}
            <div className="flex justify-center items-center gap-3 mt-8">
              {dots.map((dot, idx) => (
                <button key={idx} className={`w-3 h-3 rounded-full transition-all duration-300 ${slider === idx ? 'bg-gray-900' : 'bg-gray-300'}`}></button>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* Mobile version */}
      <div className="block lg:hidden">
        <section className="w-full py-4 flex justify-center items-center bg-[#f5f5f5]">
          <div className="w-full max-w-xs mx-auto px-2">
            <div className="flex flex-col items-center mb-4">
              <h2 className="text-lg font-extrabold text-gray-900 text-center mb-2">Phụ kiện nên có</h2>
              <button className="border border-gray-400 text-gray-900 font-bold rounded-full px-4 py-1 flex items-center gap-2 hover:bg-gray-900 hover:text-white transition text-xs mb-2">Khám phá thêm <ChevronRightIcon className="w-3 h-3" /></button>
            </div>
            <div className="flex overflow-x-auto gap-2 pb-2">
              {combos.map((combo) => (
                <div key={combo.id} className="min-w-[120px] rounded-xl overflow-hidden shadow-lg bg-black/10 flex flex-col">
                  <Image src={combo.image} alt={combo.name} width={120} height={96} className="w-full h-24 object-cover" />
                  <div className="flex flex-wrap gap-1 p-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent cursor-pointer">
                    {combo.tags.map((tag) => (
                      <span key={tag} className="border border-white text-white rounded-full px-2 py-0.5 text-[10px] hover:bg-white hover:text-black transition">{tag}</span>
                    ))}
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
