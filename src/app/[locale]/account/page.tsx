'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import UnauthenticatedView from '@/components/account/UnauthenticatedView';
import AuthenticatedView from '@/components/account/AuthenticatedView';

// Mock user data - sau này sẽ được thay thế bằng authentication logic thực tế
const mockUser = {
  id: '1',
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@example.com',
  avatar: undefined
};

export default function AccountPage() {
  const router = useRouter();
  // Mock authentication state - sau này sẽ được thay thế bằng authentication logic thực tế
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(mockUser);

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    // Mock login logic - sau này sẽ được thay thế bằng API call thực tế
    if (email && password) {
      setIsAuthenticated(true);
      setUser({
        ...mockUser,
        email: email,
        name: email.split('@')[0] // Mock name from email
      });
    }
  };

  const handleRegister = (name: string, email: string, password: string) => {
    console.log('Register attempt:', { name, email, password });
    // Mock register logic - sau này sẽ được thay thế bằng API call thực tế
    if (name && email && password) {
      setIsAuthenticated(true);
      setUser({
        id: '1',
        name: name,
        email: email,
        avatar: undefined
      });
    }
  };

  const handleLogout = () => {
    console.log('Logout');
    // Mock logout logic - sau này sẽ được thay thế bằng API call thực tế
    setIsAuthenticated(false);
    setUser(mockUser);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8'>
        {/* Breadcrumb */}
        <nav className='mb-8 flex' aria-label='Breadcrumb'>
          <ol className='inline-flex items-center space-x-1 md:space-x-3'>
            <li className='inline-flex items-center'>
              <a href='/' className='text-gray-700 hover:text-blue-600 cursor-pointer'>
                Trang chủ
              </a>
            </li>
            <li>
              <div className='flex items-center'>
                <span className='mx-2 text-gray-400'>/</span>
                <span className='text-gray-500'>Tài khoản</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Title */}
        <div className='mb-8 text-center'>
          <h1 className='mb-2 text-3xl font-bold text-gray-900'>
            Tài khoản
          </h1>
          <p className='text-gray-600'>
            {isAuthenticated ? 'Quản lý thông tin tài khoản của bạn' : 'Đăng nhập hoặc đăng ký tài khoản'}
          </p>
        </div>

        {/* Conditional Rendering based on Authentication Status */}
        {isAuthenticated ? (
          <AuthenticatedView user={user} onLogout={handleLogout} />
        ) : (
          <UnauthenticatedView onLogin={handleLogin} onRegister={handleRegister} />
        )}
      </div>
      <Footer />
    </div>
  );
} 