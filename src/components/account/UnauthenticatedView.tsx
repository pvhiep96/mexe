'use client';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface UnauthenticatedViewProps {
  onLogin: (email: string, password: string) => void;
  onRegister: (name: string, email: string, password: string) => void;
}

export default function UnauthenticatedView({ onLogin, onRegister }: UnauthenticatedViewProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>('login');

  const handleSwitchToRegister = () => {
    setActiveTab('register');
  };

  const handleSwitchToLogin = () => {
    setActiveTab('login');
  };

  const handleSwitchToForgot = () => {
    setActiveTab('forgot');
  };

  return (
    <div className='mx-auto max-w-md'>
      {/* Tab Navigation */}
      <div className='mb-8 flex rounded-lg bg-white p-1 shadow-sm'>
        <button
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'login'
              ? 'bg-[#2D6294] text-white'
              : 'text-gray-600 hover:text-[#2D6294]'
          }`}
          onClick={() => setActiveTab('login')}
        >
          Đăng nhập
        </button>
        <button
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'register'
              ? 'bg-[#2D6294] text-white'
              : 'text-gray-600 hover:text-[#2D6294]'
          }`}
          onClick={() => setActiveTab('register')}
        >
          Đăng ký
        </button>
        <button
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'forgot'
              ? 'bg-[#2D6294] text-white'
              : 'text-gray-600 hover:text-[#2D6294]'
          }`}
          onClick={() => setActiveTab('forgot')}
        >
          Quên mật khẩu
        </button>
      </div>

      {/* Form Container */}
      <div className='rounded-lg bg-white p-8 shadow-lg'>
        {/* Login Form */}
        {activeTab === 'login' && (
          <LoginForm
            onSwitchToRegister={handleSwitchToRegister}
            onSwitchToForgot={handleSwitchToForgot}
            onLogin={onLogin}
          />
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <RegisterForm
            onSwitchToLogin={handleSwitchToLogin}
            onRegister={onRegister}
          />
        )}

        {/* Forgot Password Form */}
        {activeTab === 'forgot' && (
          <form onSubmit={(e) => e.preventDefault()} className='space-y-6'>
            <div className='text-center'>
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                Tìm mật khẩu
              </h3>
              <p className='text-sm text-gray-600'>
                Nhập Email đã đăng ký tài khoản tại Vài Thứ Hay. Hệ thống sẽ gửi mail đến để xác nhận tài khoản của bạn.
              </p>
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                Địa chỉ Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
                placeholder='Nhập email của bạn'
                required
              />
            </div>

            <button
              type='submit'
              className='w-full rounded-lg bg-[#2D6294] px-4 py-3 text-white font-medium hover:bg-[#2D6294]/90 transition-colors'
            >
              Gửi email khôi phục
            </button>

            <div className='text-center'>
              <button
                type='button'
                onClick={() => setActiveTab('login')}
                className='text-sm text-[#2D6294] hover:underline'
              >
                ← Trở về đăng nhập
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Additional Info */}
      <div className='mt-8 text-center'>
        <p className='text-sm text-gray-600'>
          Cần hỗ trợ?{' '}
          <a href='mailto:support@vaithuhay.com' className='text-[#2D6294] hover:underline'>
            Liên hệ chúng tôi
          </a>
        </p>
      </div>
    </div>
  );
} 