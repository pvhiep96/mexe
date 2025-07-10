'use client';

import { useState } from 'react';

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [isRecoverPassword, setIsRecoverPassword] = useState(false);

  const handleRecoverPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRecoverPassword(true);
  };

  const handleBackToLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRecoverPassword(false);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='login-box w-full max-w-md rounded-lg bg-white p-6'>
        {isRecoverPassword ? (
          <div id='recover-password'>
            <div className='recover-heading text-center'>
              <h2 className='ega-login-title text-2xl font-bold'>
                TÌM MẬT KHẨU
              </h2>
              <p className='mt-2 text-gray-600'>
                Nhập Email đã đăng ký tài khoản tại Vài Thứ Hay <br />
                Hệ thống sẽ gửi mail đến để xác nhận tài khoản của bạn
              </p>
            </div>
            <form
              acceptCharset='UTF-8'
              action='/account/recover'
              method='post'
              className='mt-4'
            >
              <input
                type='hidden'
                name='form_type'
                value='recover_customer_password'
              />
              <input type='hidden' name='utf8' value='✓' />
              <input
                type='hidden'
                name='__RequestVerificationToken'
                value='CfDJ8FyFPV59mBtNhmQGz0fYZt8IQK0jXTrqf697Bh17BBkaAaSLh1EOPdGUT7pXLBXDE8Jykl833yT55RUuUfGttSRkuTN72H4W2u7BysBTXUIJIImyRvt_HI21t4TSTQ7YEkQGJwhrWxDVUlv4HVhnRk0'
              />
              <div className='form-signup mb-4 text-red-500' />
              <div className='ega-form-input mb-4'>
                <label className='mb-1 block text-sm font-medium'>
                  Địa chỉ Email:
                </label>
                <input
                  pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$'
                  required
                  type='email'
                  name='email'
                  id='customer_email'
                  className='w-full rounded border p-2'
                />
              </div>
              <div className='action_account_custommer text-center'>
                <div className='action_bottom action-login button dark mb-2'>
                  <input
                    className='btn btn-signin w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600'
                    type='submit'
                    value='Xác nhận'
                  />
                </div>
                <div className='action_bottom action-register button dark'>
                  <a
                    href='#'
                    onClick={handleBackToLogin}
                    className='text-blue-500 hover:underline'
                  >
                    Trở về
                  </a>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div id='login' className='login-popup login-box-body'>
            <form
              acceptCharset='UTF-8'
              action='/account/login'
              id='customer_login'
              method='post'
            >
              <input type='hidden' name='form_type' value='customer_login' />
              <input type='hidden' name='utf8' value='✓' />
              <input
                type='hidden'
                name='__RequestVerificationToken'
                value='CfDJ8FyFPV59mBtNhmQGz0fYZt8IQK0jXTrqf697Bh17BBkaAaSLh1EOPdGUT7pXLBXDE8Jykl833yT55RUuUfGttSRkuTN72H4W2u7BysBTXUIJIImyRvt_HI21t4TSTQ7YEkQGJwhrWxDVUlv4HVhnRk0'
              />
              <div className='text-center'>
                <h2 className='ega-login-title text-2xl font-bold'>
                  ĐĂNG NHẬP
                </h2>
              </div>
              <div className='ega-form-input mb-4'>
                <input
                  placeholder='Email/ Số Điện Thoại:'
                  required
                  name='customer[email]'
                  id='customer_email'
                  className='w-full rounded border p-2'
                />
              </div>
              <div className='ega-form-input mb-4'>
                <input
                  placeholder='Mật khẩu:'
                  required
                  type='password'
                  name='customer[password]'
                  id='customer_password'
                  size={16}
                  className='w-full rounded border p-2'
                />
              </div>
              <div className='action_account_custommer text-center'>
                <div className='action_bottom action-login button dark mb-2'>
                  <input
                    className='btn btn-signin w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600'
                    type='submit'
                    value='Đăng nhập'
                  />
                </div>
                <div className='action_bottom action-register button dark'>
                  <a
                    href='/account/register'
                    className='text-blue-500 hover:underline'
                  >
                    Đăng ký
                  </a>
                </div>
              </div>
            </form>
          </div>
        )}
        <hr className='my-4' />
        <a
          id='ega-forgot-pass'
          href='#'
          onClick={handleRecoverPassword}
          className='mb-4 block text-center text-blue-500 hover:underline'
        >
          Quên mật khẩu
        </a>
        <span className='social-login-title mb-2 block text-center text-gray-600'>
          Đăng nhập nhanh với tài khoản mạng xã hội
        </span>
        <div className='social-btn-wrap flex justify-center space-x-4'>
          <button
            id='btn-facebook-login'
            className='btn btn-fb btn-signin flex items-center rounded bg-blue-700 p-2 text-white'
          >
            <svg
              className='mr-1 h-5 w-5'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.494v-9.294H9.691v-3.621h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.621h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z' />
            </svg>
          </button>
          <button
            id='btn-google-login'
            className='btn btn-google-plus flex items-center rounded bg-red-500 p-2 text-white'
          >
            <svg
              className='mr-1 h-5 w-5'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
              <path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
              <path d='M5.84 14.09c-.22-.66-.34-1.36-.34-2.09s.12-1.43.34-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
