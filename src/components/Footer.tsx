'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const t = useTranslations('footer');

  return (
    <>
      <footer className='bg-[#2D6294] text-white'>
        {/* Top Section: Feedback & Contact */}
        <div className='border-b border-white/20'>
          <div className='container mx-auto px-4 py-6 sm:py-8 lg:px-8'>
            <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
              {/* Feedback Section - Left */}
              <div className='space-y-4'>
                <h2 className='text-xl font-bold sm:text-2xl'>
                  MEXE lắng nghe bạn!
                </h2>
                <p className='text-xs text-white/80 sm:text-sm'>
                  Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến
                  đóng góp từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ
                  và sản phẩm tốt hơn nữa.
                </p>
                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className='mt-4 w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-gray-100 sm:w-auto sm:px-6 sm:py-3'
                >
                  ĐÓNG GÓP Ý KIẾN →
                </button>
              </div>

              {/* Contact Section - Right */}
              <div className='space-y-4 sm:space-y-6'>
                <div>
                  <div className='mb-2 flex items-center gap-3'>
                    <svg
                      className='h-4 w-4 sm:h-5 sm:w-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                      />
                    </svg>
                    <span className='text-sm font-semibold sm:text-base'>
                      Hotline
                    </span>
                  </div>
                  <p className='ml-7 text-base font-bold sm:ml-8 sm:text-lg'>
                    055 9517 007
                  </p>
                  <p className='ml-7 text-xs text-white/80 sm:ml-8 sm:text-sm'>
                    (8:30 - 22:00)
                  </p>
                </div>

                <div>
                  <div className='mb-2 flex items-center gap-3'>
                    <svg
                      className='h-4 w-4 sm:h-5 sm:w-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>
                    <span className='text-sm font-semibold sm:text-base'>
                      Email
                    </span>
                  </div>
                  <p className='ml-7 text-base font-bold sm:ml-8 sm:text-lg'>
                    mexestore2025@gmail.com
                  </p>
                </div>

                {/* Social Media Icons */}
                <div className='flex gap-3 pt-4'>
                  <a
                    href='https://facebook.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 transition-colors hover:border-white hover:bg-white/20'
                    aria-label='Facebook'
                  >
                    <svg
                      className='h-5 w-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                    </svg>
                  </a>
                  <a
                    href='https://zalo.me'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 transition-colors hover:border-white hover:bg-white/20'
                    aria-label='Zalo'
                  >
                    <svg
                      className='h-5 w-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12.238 3.366c-2.855 0-5.186 2.33-5.186 5.186 0 1.868.984 3.52 2.486 4.432l-.473 1.692 1.742-.712c.58.226 1.198.337 1.83.337 2.856 0 5.186-2.331 5.186-5.186 0-2.856-2.33-5.186-5.595-5.186zm-2.232 7.28c-.372 0-.67-.298-.67-.67 0-.372.298-.67.67-.67.372 0 .67.298.67.67 0 .372-.298.67-.67.67zm2.232 0c-.372 0-.67-.298-.67-.67 0-.372.298-.67.67-.67.372 0 .67.298.67.67 0 .372-.298.67-.67.67zm2.232 0c-.372 0-.67-.298-.67-.67 0-.372.298-.67.67-.67.372 0 .67.298.67.67 0 .372-.298.67-.67.67z' />
                    </svg>
                  </a>
                  <a
                    href='https://tiktok.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 transition-colors hover:border-white hover:bg-white/20'
                    aria-label='TikTok'
                  >
                    <svg
                      className='h-5 w-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.07 6.07 0 00-.88-.05 6.12 6.12 0 000 12.24 6.12 6.12 0 006.06-5.65v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z' />
                    </svg>
                  </a>
                  <a
                    href='https://instagram.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 transition-colors hover:border-white hover:bg-white/20'
                    aria-label='Instagram'
                  >
                    <svg
                      className='h-5 w-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                    </svg>
                  </a>
                  <a
                    href='https://youtube.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 transition-colors hover:border-white hover:bg-white/20'
                    aria-label='YouTube'
                  >
                    <svg
                      className='h-5 w-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Columns */}
        <div className='border-b border-white/20'>
          <div className='container mx-auto px-4 py-8 sm:py-12 lg:px-8'>
            <div className='grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-6'>
              {/* Column 1: Tài khoản/Thành viên */}
              <div>
                <h3 className='mb-4 font-semibold'>Tài khoản</h3>
                <ul className='space-y-2 text-sm text-white/80'>
                  <li>
                    <Link href='/account' className='hover:text-white'>
                      Tài khoản của tôi
                    </Link>
                  </li>
                  <li>
                    <Link href='/account' className='hover:text-white'>
                      Đăng ký thành viên
                    </Link>
                  </li>
                  <li>
                    <Link href='#' className='hover:text-white'>
                      Ưu đãi & Đặc quyền
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: Chính sách */}
              <div>
                <h3 className='mb-4 font-semibold'>Chính sách</h3>
                <ul className='space-y-2 text-sm text-white/80'>
                  <li>
                    <Link href='/purchase-policy' className='hover:text-white'>
                      Chính sách đổi trả
                    </Link>
                  </li>
                  <li>
                    <Link href='#' className='hover:text-white'>
                      Chính sách khuyến mãi
                    </Link>
                  </li>
                  <li>
                    <Link href='/privacy-policy' className='hover:text-white'>
                      Chính sách bảo mật
                    </Link>
                  </li>
                  <li>
                    <Link href='#' className='hover:text-white'>
                      Chính sách giao hàng
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Chăm sóc khách hàng */}
              <div>
                <h3 className='mb-4 font-semibold'>Chăm sóc khách hàng</h3>
                <ul className='space-y-2 text-sm text-white/80'>
                  <li>
                    <Link href='#' className='hover:text-white'>
                      Trải nghiệm mua sắm 100% hài lòng
                    </Link>
                  </li>
                  <li>
                    <Link href='#' className='hover:text-white'>
                      Hỏi đáp - FAQs
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 4: Kiến thức/Hướng dẫn */}
              <div>
                <h3 className='mb-4 font-semibold'>Kiến thức & Hướng dẫn</h3>
                <ul className='space-y-2 text-sm text-white/80'>
                  <li>
                    <Link href='#' className='hover:text-white'>
                      Hướng dẫn chọn size
                    </Link>
                  </li>
                  <li>
                    <Link href='/purchase-guide' className='hover:text-white'>
                      Hướng dẫn mua hàng & thanh toán
                    </Link>
                  </li>
                  <li>
                    <Link href='/news' className='hover:text-white'>
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 5: Về MEXE */}
              <div>
                <h3 className='mb-4 font-semibold'>Về MEXE</h3>
                <ul className='space-y-2 text-sm text-white/80'>
                  <li>
                    <Link href='#' className='hover:text-white'>
                      Giới thiệu
                    </Link>
                  </li>
                  <li>
                    <Link href='#' className='hover:text-white'>
                      Tuyển dụng
                    </Link>
                  </li>
                  <li>
                    <Link href='#' className='hover:text-white'>
                      Liên hệ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 6: Địa chỉ liên hệ */}
              <div className='col-span-2 md:col-span-1'>
                <h3 className='mb-4 font-semibold'>Địa chỉ liên hệ</h3>
                <ul className='space-y-2 text-sm text-white/80'>
                  <li className='leading-relaxed'>
                    Số 68, đường Chùa Thầy, Xã Quốc Oai, Thành phố Hà Nội, Việt Nam
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Certifications */}
        <div className='border-t border-white/20 py-8'>
          <div className='container mx-auto px-4 lg:px-8'>
            <div className='space-y-4'>
              {/* Company Info */}
              <div className='text-sm text-white/80'>
                <p className='mb-2 font-semibold text-white'>
                  @ CÔNG TY TNHH CARRIOR.,JSC
                </p>
                <p>
                  Mã số doanh nghiệp: 0111247891. Giấy chứng nhận đăng ký doanh
                  nghiệp do Sở Tài chính thành phố Hà Nội phòng đăng ký Dinh doanh và Tài chính doanh nghiệp cấp lần đầu ngày
                  10/10/2025.
                </p>
              </div>

              {/* Certifications */}
              <div className='flex flex-wrap items-center gap-6 pt-4'>
                {/* Có thể thêm các certification badges ở đây */}
                <div className='text-xs text-white/80'>
                  Website đạt chứng nhận TÍN NHIỆM MẠNG
                </div>
                <div className='text-xs text-white/80'>
                  ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
          onClick={() => setShowFeedbackModal(false)}
        >
          <div
            className='w-full max-w-md rounded-lg bg-white p-6 text-gray-900'
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className='mb-4 text-xl font-bold'>Đóng góp ý kiến</h3>
            <p className='mb-4 text-sm text-gray-600'>
              Cảm ơn bạn đã dành thời gian để đóng góp ý kiến cho chúng tôi!
            </p>
            <textarea
              className='mb-4 w-full rounded-lg border border-gray-300 p-3'
              rows={5}
              placeholder='Vui lòng nhập ý kiến của bạn...'
            />
            <div className='flex gap-3'>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className='flex-1 rounded-lg border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-100'
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  // Handle submit feedback
                  setShowFeedbackModal(false);
                  alert('Cảm ơn bạn đã đóng góp ý kiến!');
                }}
                className='flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
