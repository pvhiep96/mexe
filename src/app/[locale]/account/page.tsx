'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import UnauthenticatedView from '@/components/account/UnauthenticatedView';
import AuthenticatedView from '@/components/account/AuthenticatedView';
import { useAuth } from '@/context/AuthContext';
import type { LoginRequest, RegisterRequest } from '@/types';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, login, register, logout, isLoading } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      const credentials: LoginRequest = { email, password };
      await login(credentials);
    } catch (error: any) {
      // Error message will be shown by AuthContext
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async (userData: any) => {
    try {
      await register(userData);
    } catch (error: any) {
      // Error message will be shown by AuthContext
      console.error('Registration failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      // Error message will be shown by AuthContext
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D6294] mx-auto'></div>
          <p className='mt-4 text-gray-600'>Đang tải...</p>
        </div>
      </div>
    );
  }

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
        {isAuthenticated && user ? (
          <AuthenticatedView user={user} onLogout={handleLogout} />
        ) : (
          <UnauthenticatedView onLogin={handleLogin} onRegister={handleRegister} />
        )}
      </div>
      <Footer />
    </div>
  );
} 