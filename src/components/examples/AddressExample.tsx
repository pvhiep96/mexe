'use client';

import React, { useState } from 'react';
import AddressInput, { type AddressData } from '../AddressInput';
import AddressSelector from '../AddressSelector';
import AddressSearch from '../AddressSearch';

export default function AddressExample() {
  const [addressData, setAddressData] = useState<AddressData>({});
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const handleAddressChange = (address: AddressData) => {
    setAddressData(address);
  };

  const handleSelectorChange = (address: any) => {
    setSelectedProvince(address.provinceCode || '');
    setSelectedWard(address.wardCode || '');
  };

  const handleSearchSelect = (result: any) => {
    console.log('Search Select:', result);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Ví dụ sử dụng Address Components
      </h1>

      {/* Complete Address Input */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          1. AddressInput - Component hoàn chỉnh
        </h2>
        <p className="text-gray-600 mb-4">
          Component tích hợp đầy đủ với chế độ chọn từ danh sách và tìm kiếm.
        </p>

        <AddressInput
          onAddressChange={handleAddressChange}
          mode="selector"
          allowModeSwitch={true}
          required={false}
          placeholder={{
            province: 'Chọn Tỉnh/Thành phố',
            ward: 'Chọn Phường/Xã',
            search: 'Tìm kiếm địa điểm...',
            manual: 'Nhập địa chỉ chi tiết (số nhà, tên đường...)'
          }}
          className="space-y-3"
        />

        {/* Display Selected Data */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Dữ liệu đã chọn:</h3>
          <pre className="text-sm text-gray-600 whitespace-pre-wrap">
            {JSON.stringify(addressData, null, 2)}
          </pre>
        </div>
      </section>

      {/* Address Selector */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          2. AddressSelector - Dropdown chọn tỉnh/phường
        </h2>
        <p className="text-gray-600 mb-4">
          Component riêng lẻ để chọn tỉnh thành và phường xã từ dropdown.
        </p>

        <AddressSelector
          onAddressChange={handleSelectorChange}
          initialProvinceCode=""
          initialWardCode=""
          required={false}
          placeholder={{
            province: 'Chọn Tỉnh/Thành phố',
            ward: 'Chọn Phường/Xã'
          }}
        />

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Tỉnh:</strong> {selectedProvince || 'Chưa chọn'} |{' '}
            <strong>Phường:</strong> {selectedWard || 'Chưa chọn'}
          </p>
        </div>
      </section>

      {/* Address Search */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          3. AddressSearch - Tìm kiếm địa điểm
        </h2>
        <p className="text-gray-600 mb-4">
          Component tìm kiếm với gợi ý tự động cho tỉnh thành và phường xã.
        </p>

        <AddressSearch
          onAddressSelect={handleSearchSelect}
          placeholder="Tìm kiếm tỉnh thành, phường xã..."
          required={false}
        />
      </section>

      {/* Usage Guide */}
      <section className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          📖 Hướng dẫn sử dụng
        </h2>

        <div className="space-y-4 text-blue-700">
          <div>
            <h3 className="font-medium">AddressInput (Khuyến nghị)</h3>
            <p className="text-sm">
              Sử dụng component này cho form đăng ký, checkout, hoặc bất kỳ form nào cần nhập địa chỉ đầy đủ.
              Hỗ trợ cả chế độ chọn từ danh sách và tìm kiếm.
            </p>
          </div>

          <div>
            <h3 className="font-medium">AddressSelector</h3>
            <p className="text-sm">
              Sử dụng khi chỉ cần chọn tỉnh thành và phường xã từ dropdown, không cần nhập địa chỉ chi tiết.
            </p>
          </div>

          <div>
            <h3 className="font-medium">AddressSearch</h3>
            <p className="text-sm">
              Sử dụng khi cần tìm kiếm nhanh địa điểm mà không cần form nhập chi tiết.
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-100 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">💡 Lưu ý:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Dữ liệu được lấy từ các bảng AdministrativeRegion, AdministrativeUnit, Province, Ward</li>
            <li>• API endpoints: /api/v1/addresses/provinces, /api/v1/addresses/wards, /api/v1/addresses/search</li>
            <li>• Component tự động debounce search để tối ưu performance</li>
            <li>• Hỗ trợ keyboard navigation (Arrow keys, Enter, Escape)</li>
          </ul>
        </div>
      </section>
    </div>
  );
}