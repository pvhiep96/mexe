'use client';

import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const roles = [
  'PHÂN PHỐI/ĐẠI LÝ',
  'BÁN HÀNG LIÊN KẾT (AFFILIATE)',
  'QUÀ TẶNG DOANH NGHIỆP',
  'YOUTUBER/ TIKTOKER/ CONTENT CREATOR',
];

export default function Contact() {
  const [selectedRole, setSelectedRole] = useState(0);

  return (
    <div>
      {/* Desktop version */}
      <div className='hidden lg:block'>
        <section className='w-full bg-[#0A115F]/10 py-8'>
          <div className='mx-auto max-w-3xl px-2'>
            <h2 className='mb-8 text-center text-3xl font-extrabold tracking-wide text-[#0A115F]'>
              LIÊN HỆ NGAY ĐỂ ĐỒNG HÀNH CÙNG CHÚNG TÔI
            </h2>
            <div className='flex flex-col items-center justify-center gap-6 md:flex-row'>
              {/* Box chọn bạn là ai */}
              <div className='flex max-w-md min-w-[220px] flex-1 flex-col items-center rounded-3xl bg-white p-6 shadow-lg'>
                <div className='mb-4 text-lg font-semibold text-[#0A115F]'>
                  Bạn là...
                </div>
                <div
                  className='flex w-full flex-col gap-3'
                  id='contact-role-group'
                >
                  {roles.map((role, idx) => (
                    <button
                      type='button'
                      key={role}
                      data-index={idx}
                      className={`role-btn w-full rounded-full py-3 text-center text-base font-bold shadow transition ${selectedRole === idx ? 'bg-[#0A115F] text-white' : 'bg-gray-100 text-[#0A115F]'}`}
                      onClick={() => setSelectedRole(idx)}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
              {/* Form đăng ký */}
              <form className='flex max-w-md flex-1 flex-col gap-4'>
                <input
                  type='text'
                  placeholder='Tên:'
                  className='rounded-full bg-white px-6 py-3 text-base text-[#0A115F] placeholder-gray-500 focus:outline-none'
                />
                <input
                  type='text'
                  placeholder='Số Điện Thoại:'
                  className='rounded-full bg-white px-6 py-3 text-base text-[#0A115F] placeholder-gray-500 focus:outline-none'
                />
                <input
                  type='email'
                  placeholder='Email:'
                  className='rounded-full bg-white px-6 py-3 text-base text-[#0A115F] placeholder-gray-500 focus:outline-none'
                />
                <button
                  type='submit'
                  className='mt-2 flex items-center justify-center gap-2 rounded-full bg-[#0A115F] px-8 py-3 text-lg font-bold text-white shadow transition hover:bg-[#0A115F]/80'
                >
                  ĐĂNG KÝ
                  <PaperAirplaneIcon className='h-6 w-6' />
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      {/* Mobile version */}
      <div className='block lg:hidden'>
        <section className='w-full bg-[#0A115F]/10 py-4'>
          <div className='mx-auto max-w-xs px-2'>
            <h2 className='mb-4 text-center text-lg font-extrabold tracking-wide text-[#0A115F]'>
              LIÊN HỆ NGAY
            </h2>
            <form className='flex flex-col gap-2'>
              <input
                type='text'
                placeholder='Tên'
                className='rounded-full bg-white px-4 py-2 text-xs text-[#0A115F] placeholder-gray-500 focus:outline-none'
              />
              <input
                type='text'
                placeholder='Số Điện Thoại'
                className='rounded-full bg-white px-4 py-2 text-xs text-[#0A115F] placeholder-gray-500 focus:outline-none'
              />
              <input
                type='email'
                placeholder='Email'
                className='rounded-full bg-white px-4 py-2 text-xs text-[#0A115F] placeholder-gray-500 focus:outline-none'
              />
              <button
                type='submit'
                className='mt-2 rounded-full bg-[#0A115F] px-4 py-2 text-xs font-bold text-white shadow transition hover:bg-[#0A115F]/80'
              >
                ĐĂNG KÝ
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
