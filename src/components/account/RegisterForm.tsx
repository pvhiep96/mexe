'use client';
import React, { useState } from 'react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onRegister: (name: string, email: string, password: string) => void;
}

export default function RegisterForm({ onSwitchToLogin, onRegister }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    onRegister(formData.name, formData.email, formData.password);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
          Họ và tên
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleInputChange}
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
          placeholder='Nhập họ và tên'
          required
        />
      </div>

      <div>
        <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
          placeholder='Nhập email của bạn'
          required
        />
      </div>

      <div>
        <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
          Mật khẩu
        </label>
        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleInputChange}
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
          placeholder='Tạo mật khẩu'
          required
        />
      </div>

      <div>
        <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700 mb-2'>
          Xác nhận mật khẩu
        </label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
          placeholder='Nhập lại mật khẩu'
          required
        />
      </div>

      <div className='flex items-center'>
        <input 
          type='checkbox' 
          name='agreeToTerms'
          checked={formData.agreeToTerms}
          onChange={handleInputChange}
          className='rounded border-gray-300 text-[#2D6294] focus:ring-[#2D6294]' 
          required 
        />
        <span className='ml-2 text-sm text-gray-600'>
          Tôi đồng ý với{' '}
          <a href='#' className='text-[#2D6294] hover:underline'>
            Điều khoản sử dụng
          </a>{' '}
          và{' '}
          <a href='#' className='text-[#2D6294] hover:underline'>
            Chính sách bảo mật
          </a>
        </span>
      </div>

      <button
        type='submit'
        className='w-full rounded-lg bg-[#2D6294] px-4 py-3 text-white font-medium hover:bg-[#2D6294]/90 transition-colors'
      >
        Đăng ký
      </button>

      <div className='text-center'>
        <span className='text-sm text-gray-600'>Đã có tài khoản? </span>
        <button
          type='button'
          onClick={onSwitchToLogin}
          className='text-sm text-[#2D6294] hover:underline font-medium'
        >
          Đăng nhập ngay
        </button>
      </div>
    </form>
  );
} 