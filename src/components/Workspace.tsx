'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

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
      <div className='hidden lg:block'>
        <section className='relative mx-auto my-8 w-full max-w-7xl overflow-hidden rounded-3xl bg-[#757575] px-2 py-8'>
          {/* Hiệu ứng vân sóng */}
          <div className='pointer-events-none absolute inset-0'>
            <svg
              width='100%'
              height='100%'
              viewBox='0 0 1440 320'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='h-full w-full'
            >
              <path
                fill='#fff'
                fillOpacity='0.07'
                d='M0,64L60,80C120,96,240,128,360,133.3C480,139,600,117,720,117.3C840,117,960,139,1080,154.7C1200,171,1320,181,1380,186.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z'
              ></path>
            </svg>
          </div>
          {/* Tiêu đề */}
          <div className='relative z-10 mb-6 flex flex-col items-center'>
            <div className='mb-2 flex w-full items-center justify-center'>
              <span className='mr-4 h-1 w-24 rounded-full bg-white'></span>
              <h2 className='text-center text-3xl font-extrabold tracking-wide text-white md:text-4xl'>
                MEXE WORKSPACE
              </h2>
              <span className='ml-4 h-1 w-24 rounded-full bg-white'></span>
            </div>
            <div className='text-center text-lg text-white/80'>
              Trải nghiệm trực tiếp sản phẩm của Mexe tại các Workspace
            </div>
          </div>
          {/* Slider */}
          <div className='relative z-10'>
            {/* Nút trái */}
            <button
              onClick={prev}
              disabled={slider === 0}
              className='absolute top-1/2 left-0 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white disabled:opacity-50 cursor-pointer'
              style={{
                cursor: slider === 0 ? 'not-allowed !important' : 'pointer !important'
              }}
            >
              <ChevronLeftIcon className='h-6 w-6 text-gray-700' />
            </button>
            {/* Danh sách workspace */}
            <div
              className='flex justify-center space-x-6 overflow-x-auto pb-2 transition-transform duration-500'
              style={{ transform: `translateX(-${slider * 300}px)` }}
            >
              {workspaces.map((workspace, idx) => (
                <div
                  key={workspace.id}
                  className='relative flex aspect-[5/4] max-w-[290px] min-w-[290px] flex-col overflow-hidden rounded-2xl bg-white/10 shadow-lg'
                >
                  <Image
                    src={workspace.image}
                    alt={workspace.title}
                    fill
                    className='absolute inset-0 h-full w-full object-cover'
                  />
                  {/* Thông tin dưới */}
                  <div className='absolute bottom-3 left-1/2 z-10 flex w-full -translate-x-1/2 flex-row items-center justify-between gap-2'>
                    <div className='ml-2 flex max-w-[60%] items-center rounded-2xl bg-gray-700/90 px-3 py-1 whitespace-pre-line'>
                      <MapPinIcon className='mr-1 h-4 w-4 flex-shrink-0 text-red-500' />
                      <span className='text-xs leading-tight font-bold text-white'>
                        {workspace.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Nút phải */}
            <button
              onClick={next}
              disabled={slider >= totalSlides - 1}
              className='absolute top-1/2 right-0 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white disabled:opacity-50 cursor-pointer'
              style={{
                cursor: slider >= totalSlides - 1 ? 'not-allowed !important' : 'pointer !important'
              }}
            >
              <ChevronRightIcon className='h-6 w-6 text-gray-700' />
            </button>
          </div>
        </section>
      </div>
      {/* Mobile version */}
      <div className='block lg:hidden'>
        <section className='relative mx-auto my-4 w-[92%] overflow-hidden rounded-2xl bg-[#757575] px-2 py-4'>
          <div className='mb-4 flex flex-col items-center'>
            <h2 className='mb-2 text-center text-lg font-extrabold tracking-wide text-white'>
              MEXE WORKSPACE
            </h2>
            <div className='text-center text-xs text-white/80'>
              Trải nghiệm trực tiếp sản phẩm của Mexe tại các Workspace
            </div>
          </div>
          <div className='flex justify-center space-x-2 overflow-x-auto pb-2'>
            {workspaces.map((workspace) => (
                              <div
                  key={workspace.id}
                  className='relative flex aspect-[5/4] max-w-[140px] min-w-[140px] flex-col overflow-hidden rounded-lg bg-white/10 shadow-lg'
                >
                <Image
                  src={workspace.image}
                  alt={workspace.title}
                  fill
                  className='absolute inset-0 h-full w-full object-cover'
                />
                <div className='absolute bottom-2 left-1/2 z-10 flex w-full -translate-x-1/2 flex-row items-center justify-between gap-1'>
                  <div className='ml-1 flex max-w-[60%] items-center rounded-lg bg-gray-700/90 px-2 py-1 whitespace-pre-line'>
                    <MapPinIcon className='mr-1 h-3 w-3 flex-shrink-0 text-red-500' />
                    <span className='text-[10px] leading-tight font-bold text-white'>
                      {workspace.location}
                    </span>
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
