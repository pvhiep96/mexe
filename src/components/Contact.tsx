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
      <div className="hidden lg:block">
        <section className="w-full bg-[#0A115F]/10 py-8">
          <div className="max-w-3xl mx-auto px-2">
            <h2 className="text-3xl font-extrabold mb-8 text-center tracking-wide text-[#0A115F]">LIÊN HỆ NGAY ĐỂ ĐỒNG HÀNH CÙNG CHÚNG TÔI</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Box chọn bạn là ai */}
              <div className="bg-white rounded-3xl shadow-lg p-6 flex-1 max-w-md flex flex-col items-center min-w-[220px]">
                <div className="text-lg font-semibold text-[#0A115F] mb-4">Bạn là...</div>
                <div className="flex flex-col gap-3 w-full" id="contact-role-group">
                  {roles.map((role, idx) => (
                    <button
                      type="button"
                      key={role}
                      data-index={idx}
                      className={`role-btn w-full py-3 rounded-full font-bold text-base shadow text-center transition ${selectedRole === idx ? 'bg-[#0A115F] text-white' : 'bg-gray-100 text-[#0A115F]'}`}
                      onClick={() => setSelectedRole(idx)}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
              {/* Form đăng ký */}
              <form className="flex-1 max-w-md flex flex-col gap-4">
                <input type="text" placeholder="Tên:" className="rounded-full px-6 py-3 text-base bg-white placeholder-gray-500 text-[#0A115F] focus:outline-none" />
                <input type="text" placeholder="Số Điện Thoại:" className="rounded-full px-6 py-3 text-base bg-white placeholder-gray-500 text-[#0A115F] focus:outline-none" />
                <input type="email" placeholder="Email:" className="rounded-full px-6 py-3 text-base bg-white placeholder-gray-500 text-[#0A115F] focus:outline-none" />
                <button type="submit" className="mt-2 flex items-center justify-center gap-2 bg-[#0A115F] hover:bg-[#0A115F]/80 text-white font-bold text-lg rounded-full px-8 py-3 shadow transition">
                  ĐĂNG KÝ
                  <PaperAirplaneIcon className="w-6 h-6" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      {/* Mobile version */}
      <div className="block lg:hidden">
        <section className="w-full bg-[#0A115F]/10 py-4">
          <div className="max-w-xs mx-auto px-2">
            <h2 className="text-lg font-extrabold mb-4 text-center tracking-wide text-[#0A115F]">LIÊN HỆ NGAY</h2>
            <form className="flex flex-col gap-2">
              <input type="text" placeholder="Tên" className="rounded-full px-4 py-2 text-xs bg-white placeholder-gray-500 text-[#0A115F] focus:outline-none" />
              <input type="text" placeholder="Số Điện Thoại" className="rounded-full px-4 py-2 text-xs bg-white placeholder-gray-500 text-[#0A115F] focus:outline-none" />
              <input type="email" placeholder="Email" className="rounded-full px-4 py-2 text-xs bg-white placeholder-gray-500 text-[#0A115F] focus:outline-none" />
              <button type="submit" className="mt-2 bg-[#0A115F] hover:bg-[#0A115F]/80 text-white font-bold text-xs rounded-full px-4 py-2 shadow transition">ĐĂNG KÝ</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
