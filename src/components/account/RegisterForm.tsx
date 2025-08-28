'use client';
import React, { useState } from 'react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onRegister: (name: string, email: string, password: string, phone?: string, address?: string) => Promise<void>;
}

export default function RegisterForm({ onSwitchToLogin, onRegister }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Họ và tên là bắt buộc';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Họ và tên phải có ít nhất 2 ký tự';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Bạn phải đồng ý với điều khoản sử dụng';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      await onRegister(formData.name, formData.email, formData.password, formData.phone, formData.address);
    } catch (error) {
      // Error will be handled by parent component
    } finally {
      setIsLoading(false);
    }
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
          className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-1 ${
            errors.name 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-[#2D6294] focus:ring-[#2D6294]'
          }`}
          placeholder='Nhập họ và tên'
          required
        />
        {errors.name && (
          <p className='mt-1 text-sm text-red-600'>{errors.name}</p>
        )}
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

      <div>
        <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-2'>
          Số điện thoại
        </label>
        <input
          type='tel'
          id='phone'
          name='phone'
          value={formData.phone}
          onChange={handleInputChange}
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
          placeholder='Nhập số điện thoại (tùy chọn)'
        />
      </div>

      <div>
        <label htmlFor='address' className='block text-sm font-medium text-gray-700 mb-2'>
          Địa chỉ
        </label>
        <textarea
          id='address'
          name='address'
          rows={3}
          value={formData.address}
          onChange={handleInputChange}
          className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2D6294] focus:outline-none focus:ring-1 focus:ring-[#2D6294]'
          placeholder='Nhập địa chỉ của bạn (tùy chọn)'
        />
      </div>

      <div>
        <div className='flex items-center'>
          <input 
            type='checkbox' 
            name='agreeToTerms'
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className={`rounded text-[#2D6294] focus:ring-[#2D6294] ${
              errors.agreeToTerms ? 'border-red-300' : 'border-gray-300'
            }`}
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
        {errors.agreeToTerms && (
          <p className='mt-1 text-sm text-red-600'>{errors.agreeToTerms}</p>
        )}
      </div>

      <button
        type='submit'
        disabled={isLoading}
        className='w-full rounded-lg bg-[#2D6294] px-4 py-3 text-white font-medium hover:bg-[#2D6294]/90 transition-colors disabled:opacity-50'
        style={{
          cursor: isLoading ? 'not-allowed !important' : 'pointer'
        }}
      >
        {isLoading ? (
          <div className='flex items-center justify-center'>
            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
            Đang đăng ký...
          </div>
        ) : (
          'Đăng ký'
        )}
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