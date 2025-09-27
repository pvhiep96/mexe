'use client';

import React, { useState } from 'react';
import CheckoutAddressSelector from '../CheckoutAddressSelector';

export default function CheckoutAddressDemo() {
  const [addressData, setAddressData] = useState<any>({});

  const handleAddressChange = (address: any) => {
    setAddressData(address);
    console.log('Address Data:', address);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Demo CheckoutAddressSelector
      </h1>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Component chọn địa chỉ cho Checkout
        </h2>
        <p className="text-gray-600 mb-6">
          Component này sử dụng đầy đủ dữ liệu từ database: AdministrativeRegion, AdministrativeUnit, Province, Ward
        </p>

        <CheckoutAddressSelector
          onAddressChange={handleAddressChange}
          required={true}
          className="space-y-4"
        />
      </div>

      {/* Display Selected Data */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Dữ liệu địa chỉ đã chọn
        </h2>

        {Object.keys(addressData).length > 0 ? (
          <div className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">🏛️ Thông tin cơ bản</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <div><strong>Mã tỉnh:</strong> {addressData.provinceCode || 'Chưa chọn'}</div>
                  <div><strong>Mã phường/xã:</strong> {addressData.wardCode || 'Chưa chọn'}</div>
                  <div><strong>Địa chỉ đầy đủ:</strong> {addressData.fullAddress || 'Chưa có'}</div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">📍 Địa chỉ chi tiết</h3>
                <div className="text-sm text-green-700">
                  <div><strong>Chi tiết:</strong> {addressData.detailAddress || 'Chưa nhập'}</div>
                </div>
              </div>
            </div>

            {/* Province Info */}
            {addressData.province && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800 mb-2">🏙️ Thông tin Tỉnh/Thành phố</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700">
                  <div>
                    <div><strong>Tên:</strong> {addressData.province.name}</div>
                    <div><strong>Tên đầy đủ:</strong> {addressData.province.full_name}</div>
                    <div><strong>Tên tiếng Anh:</strong> {addressData.province.name_en}</div>
                  </div>
                  <div>
                    <div><strong>Loại:</strong> {addressData.province.type || 'N/A'}</div>
                    <div><strong>Loại (EN):</strong> {addressData.province.type_en || 'N/A'}</div>
                    <div><strong>Thành phố TW:</strong> {addressData.province.is_municipality ? 'Có' : 'Không'}</div>
                    <div><strong>Số phường/xã:</strong> {addressData.province.wards_count || 'N/A'}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Ward Info */}
            {addressData.ward && (
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-medium text-orange-800 mb-2">🏘️ Thông tin Phường/Xã</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-orange-700">
                  <div>
                    <div><strong>Tên:</strong> {addressData.ward.name}</div>
                    <div><strong>Tên đầy đủ:</strong> {addressData.ward.full_name}</div>
                    <div><strong>Tên tiếng Anh:</strong> {addressData.ward.name_en}</div>
                  </div>
                  <div>
                    <div><strong>Đơn vị hành chính:</strong> {addressData.ward.administrative_unit_name || 'N/A'}</div>
                    <div><strong>Mã tỉnh:</strong> {addressData.ward.province_code}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Administrative Unit Info */}
            {addressData.administrativeUnit && (
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-medium text-red-800 mb-2">🏛️ Thông tin Đơn vị Hành chính</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-700">
                  <div>
                    <div><strong>ID:</strong> {addressData.administrativeUnit.id}</div>
                    <div><strong>Tên đầy đủ:</strong> {addressData.administrativeUnit.full_name}</div>
                    <div><strong>Tên ngắn:</strong> {addressData.administrativeUnit.short_name}</div>
                  </div>
                  <div>
                    <div><strong>Tên đầy đủ (EN):</strong> {addressData.administrativeUnit.full_name_en}</div>
                    <div><strong>Tên ngắn (EN):</strong> {addressData.administrativeUnit.short_name_en}</div>
                    <div><strong>Code name:</strong> {addressData.administrativeUnit.code_name}</div>
                  </div>
                </div>
              </div>
            )}

            {/* JSON Data */}
            <details className="bg-gray-50 p-4 rounded-lg">
              <summary className="font-medium text-gray-800 cursor-pointer">📄 Dữ liệu JSON đầy đủ</summary>
              <pre className="mt-4 text-xs text-gray-600 whitespace-pre-wrap overflow-auto">
                {JSON.stringify(addressData, null, 2)}
              </pre>
            </details>
          </div>
        ) : (
          <p className="text-gray-500 italic">Chưa chọn địa chỉ nào</p>
        )}
      </div>

      {/* Usage Info */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          📖 Thông tin sử dụng
        </h2>

        <div className="space-y-4 text-blue-700">
          <div>
            <h3 className="font-medium">Dữ liệu từ Database</h3>
            <ul className="text-sm mt-1 space-y-1">
              <li>• <strong>AdministrativeRegion:</strong> 8 vùng địa lý Việt Nam</li>
              <li>• <strong>AdministrativeUnit:</strong> Các đơn vị hành chính (Tỉnh, TP, Phường, Xã...)</li>
              <li>• <strong>Province:</strong> 63 tỉnh/thành phố với thông tin chi tiết</li>
              <li>• <strong>Ward:</strong> Tất cả phường/xã/thị trấn trên toàn quốc</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium">API Endpoints</h3>
            <ul className="text-sm mt-1 space-y-1">
              <li>• <code>/api/v1/addresses/provinces</code> - Danh sách tỉnh/thành phố</li>
              <li>• <code>/api/v1/addresses/wards?province_code=XX</code> - Danh sách phường/xã theo tỉnh</li>
              <li>• <code>/api/v1/addresses/administrative_units</code> - Danh sách đơn vị hành chính</li>
              <li>• <code>/api/v1/addresses/search?q=keyword</code> - Tìm kiếm địa điểm</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium">Tính năng nổi bật</h3>
            <ul className="text-sm mt-1 space-y-1">
              <li>• ✅ Phân loại tỉnh/thành phố theo loại hành chính</li>
              <li>• ✅ Hiển thị số lượng phường/xã của mỗi tỉnh</li>
              <li>• ✅ Phân biệt thành phố trực thuộc trung ương</li>
              <li>• ✅ Hiển thị tên đầy đủ theo chuẩn Việt Nam</li>
              <li>• ✅ Tự động tạo địa chỉ đầy đủ</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}