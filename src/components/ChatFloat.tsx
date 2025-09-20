'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { apiClient } from '@/services/api';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  productInfo?: string;
}

interface ChatFloatProps {
  productName?: string;
  productUrl?: string;
}

export default function ChatFloat({ productName, productUrl }: ChatFloatProps) {
  const [showContactForm, setShowContactForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    productInfo: productName
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleMessengerClick = () => {
    window.open('https://m.me/mexeauto', '_blank');
  };

  const handleZaloClick = () => {
    window.open('https://zalo.me/mexeauto', '_blank');
  };

  const handleContactClick = () => {
    setShowContactForm(true);
  };

  const handleCloseForm = () => {
    setShowContactForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      productInfo: productName
    });
    setSuccessMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.sendContactForm({
        ...formData,
        productUrl: productUrl || window.location.href,
        subject: `Yêu cầu thông tin sản phẩm: ${productName || 'Sản phẩm không xác định'}`
      });

      if (response.success) {
        setSuccessMessage('Thông tin đã được gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
        setTimeout(() => {
          handleCloseForm();
        }, 3000);
      } else {
        throw new Error(response.message || 'Có lỗi xảy ra khi gửi thông tin');
      }
    } catch (error: any) {
      const errorMessage = error?.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.';
      setSuccessMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Float Icons */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
        {/* Messenger Icon */}
        <button
          onClick={handleMessengerClick}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          title="Chat qua Facebook Messenger"
        >
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.15 2 11.34c0 2.99 1.36 5.66 3.5 7.42V22l3.05-1.68C9.64 20.58 10.8 20.66 12 20.66c5.52 0 10-4.15 10-9.32C22 6.15 17.52 2 12 2zm1 12.5l-2.5-2.67L6 14.5l5.5-5.83L14 11.33 18.5 8.5 13 14.33z"/>
          </svg>
        </button>

        {/* Zalo Icon */}
        <button
          onClick={handleZaloClick}
          className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          title="Chat qua Zalo"
        >
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438C8.34 21.475 10.11 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm3.5 13.5h-2v-2h-3v2h-2v-7h2v3h3v-3h2v7z"/>
          </svg>
        </button>

        {/* Contact Form Icon */}
        <button
          onClick={handleContactClick}
          className="w-14 h-14 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          title="Gửi thông tin liên hệ"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
        </button>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <>
          {/* Light backdrop */}
          <div className="fixed inset-0 bg-opacity-10 z-[55]"></div>
          
          {/* Form positioned near the contact icon */}
          <div className="fixed right-20 top-1/2 transform -translate-y-1/2 z-[60] w-80 max-h-[80vh] overflow-y-auto">
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-base font-semibold text-gray-900">
                Yêu cầu thông tin sản phẩm
              </h3>
              <button
                onClick={handleCloseForm}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              {productName && (
                <div className="bg-gray-50 p-2 rounded-md">
                  <p className="text-xs text-gray-600">Sản phẩm quan tâm:</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{productName}</p>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập họ và tên"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập địa chỉ email"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-xs font-medium text-gray-700 mb-1">
                  Địa chỉ *
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Nhập địa chỉ của bạn"
                />
              </div>

              {successMessage && (
                <div className={`p-2 rounded-md text-sm ${successMessage.includes('thành công') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {successMessage}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                  {loading ? 'Đang gửi...' : 'Gửi thông tin'}
                </button>
              </div>
             </form>
           </div>
         </div>
         </>
       )}
    </>
  );
}