'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MapPinIcon } from '@heroicons/react/24/outline';

const workspaces = [
  {
    id: 1,
    title: 'MEXE WORKSPACE',
    description: 'Trải nghiệm trực tiếp sản phẩm của Mexe tại các Workspace',
    image: '/images/workspace.webp',
    location: 'TÂN BÌNH TP HCM',
  },
  {
    id: 2,
    title: 'MEXE WORKSPACE',
    description: 'Trải nghiệm trực tiếp sản phẩm của Mexe tại các Workspace',
    image: '/images/workspace.webp',
    location: 'TÂN BÌNH TP HCM',
  },
];

export default function Workspace() {
  const [slider, setSlider] = useState(0);
  const visible = 2;
  const totalSlides = Math.max(1, workspaces.length - visible + 1);

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
        <section className="w-full bg-[#757575] rounded-3xl py-8 px-2 max-w-7xl mx-auto my-8 relative overflow-hidden">
          {/* Hiệu ứng vân sóng */}
          <div className="absolute inset-0 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path fill="#fff" fillOpacity="0.07" d="M0,64L60,80C120,96,240,128,360,133.3C480,139,600,117,720,117.3C840,117,960,139,1080,154.7C1200,171,1320,181,1380,186.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
            </svg>
          </div>
          {/* Tiêu đề */}
          <div className="relative z-10 flex flex-col items-center mb-6">
            <div className="flex items-center w-full justify-center mb-2">
              <span className="h-1 w-24 bg-white rounded-full mr-4"></span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide text-center">MEXE WORKSPACE</h2>
              <span className="h-1 w-24 bg-white rounded-full ml-4"></span>
            </div>
            <div className="text-lg text-white/80 text-center">Trải nghiệm trực tiếp sản phẩm của Mexe tại các Workspace</div>
          </div>
          {/* Slider */}
          <div className="relative z-10">
            {/* Nút trái */}
            <button onClick={prev} disabled={slider === 0} className="absolute top-1/2 -translate-y-1/2 left-0 bg-white/80 hover:bg-white rounded-full p-2 z-20 disabled:opacity-50">
              <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
            </button>
            {/* Danh sách workspace */}
            <div className="flex space-x-6 overflow-x-auto pb-2 justify-center transition-transform duration-500" style={{ transform: `translateX(-${slider * 300}px)` }}>
              {workspaces.map((workspace, idx) => (
                <div key={workspace.id} className="min-w-[290px] max-w-[290px] aspect-[5/4] bg-white/10 rounded-2xl shadow-lg overflow-hidden relative flex flex-col">
                  <Image src={workspace.image} alt={workspace.title} fill className="w-full h-full object-cover absolute inset-0" />
                  {/* Overlay Giới thiệu */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-[54%] w-[88%] bg-gray-700/70 rounded-2xl px-4 py-2 flex items-center justify-center z-10">
                    <span className="text-white font-bold text-lg text-center drop-shadow">Giới thiệu cửa hàng</span>
                  </div>
                  {/* Thông tin dưới */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-full flex flex-row items-center justify-between gap-2 z-10">
                    <div className="flex items-center bg-gray-700/90 rounded-2xl px-3 py-1 ml-2 max-w-[60%] whitespace-pre-line">
                      <MapPinIcon className="w-4 h-4 text-red-500 mr-1 flex-shrink-0" />
                      <span className="text-white text-xs font-bold leading-tight">{workspace.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Nút phải */}
            <button onClick={next} disabled={slider >= totalSlides - 1} className="absolute top-1/2 -translate-y-1/2 right-0 bg-white/80 hover:bg-white rounded-full p-2 z-20 disabled:opacity-50">
              <ChevronRightIcon className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </section>
      </div>
      {/* Mobile version */}
      <div className="block lg:hidden">
        <section className="w-full bg-[#757575] rounded-2xl py-4 px-2 max-w-xs mx-auto my-4 relative overflow-hidden">
          <div className="flex flex-col items-center mb-4">
            <h2 className="text-lg font-extrabold text-white tracking-wide text-center mb-2">MEXE WORKSPACE</h2>
            <div className="text-xs text-white/80 text-center">Trải nghiệm trực tiếp sản phẩm của Mexe tại các Workspace</div>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 justify-center">
            {workspaces.map((workspace) => (
              <div key={workspace.id} className="min-w-[140px] max-w-[140px] aspect-[5/4] bg-white/10 rounded-xl shadow-lg overflow-hidden relative flex flex-col">
                <Image src={workspace.image} alt={workspace.title} fill className="w-full h-full object-cover absolute inset-0" />
                <div className="absolute left-1/2 -translate-x-1/2 top-[54%] w-[90%] bg-gray-700/70 rounded-xl px-2 py-1 flex items-center justify-center z-10">
                  <span className="text-white font-bold text-xs text-center drop-shadow">Giới thiệu cửa hàng</span>
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full flex flex-row items-center justify-between gap-1 z-10">
                  <div className="flex items-center bg-gray-700/90 rounded-xl px-2 py-1 ml-1 max-w-[60%] whitespace-pre-line">
                    <MapPinIcon className="w-3 h-3 text-red-500 mr-1 flex-shrink-0" />
                    <span className="text-white text-[10px] font-bold leading-tight">{workspace.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
