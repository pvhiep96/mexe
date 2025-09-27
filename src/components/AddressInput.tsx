'use client';

import React, { useState, useCallback } from 'react';
import AddressSelector from './AddressSelector';
import AddressSearch from './AddressSearch';
import type { Province, Ward } from '@/types';

export type AddressInputMode = 'selector' | 'search';

export interface AddressData {
  province?: Province;
  ward?: Ward;
  provinceCode?: string;
  wardCode?: string;
  fullAddress?: string;
  manualAddress?: string;
}

interface AddressInputProps {
  mode?: AddressInputMode;
  onAddressChange: (address: AddressData) => void;
  initialProvinceCode?: string;
  initialWardCode?: string;
  initialAddress?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  allowModeSwitch?: boolean;
  placeholder?: {
    province?: string;
    ward?: string;
    search?: string;
    manual?: string;
  };
}

export default function AddressInput({
  mode = 'selector',
  onAddressChange,
  initialProvinceCode,
  initialWardCode,
  initialAddress,
  disabled = false,
  required = false,
  className = '',
  allowModeSwitch = true,
  placeholder = {
    province: 'Chọn Tỉnh/Thành phố',
    ward: 'Chọn Phường/Xã',
    search: 'Tìm kiếm tỉnh thành, phường xã...',
    manual: 'Nhập địa chỉ chi tiết...'
  }
}: AddressInputProps) {
  const [currentMode, setCurrentMode] = useState<AddressInputMode>(mode);
  const [manualAddress, setManualAddress] = useState(initialAddress || '');
  const [searchValue, setSearchValue] = useState('');

  const handleSelectorChange = useCallback((address: {
    province?: Province;
    ward?: Ward;
    provinceCode?: string;
    wardCode?: string;
    fullAddress?: string;
  }) => {
    onAddressChange({
      ...address,
      manualAddress: manualAddress
    });
  }, [onAddressChange, manualAddress]);

  const handleSearchSelect = useCallback((result: {
    type: 'province' | 'ward';
    code: string;
    name: string;
    full_name: string;
    province_name?: string;
  }) => {
    let address: AddressData = {
      manualAddress: manualAddress
    };

    if (result.type === 'province') {
      address.provinceCode = result.code;
      address.fullAddress = result.full_name;
    } else if (result.type === 'ward') {
      address.wardCode = result.code;
      address.fullAddress = `${result.full_name}, ${result.province_name}`;
    }

    onAddressChange(address);
  }, [onAddressChange, manualAddress]);

  const handleManualAddressChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setManualAddress(value);
    onAddressChange({
      manualAddress: value
    });
  }, [onAddressChange]);

  const handleModeSwitch = (newMode: AddressInputMode) => {
    setCurrentMode(newMode);
    // Clear search value when switching modes
    if (newMode !== 'search') {
      setSearchValue('');
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Mode Switcher */}
      {allowModeSwitch && (
        <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
          <button
            type="button"
            onClick={() => handleModeSwitch('selector')}
            disabled={disabled}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              currentMode === 'selector'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            Chọn từ danh sách
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch('search')}
            disabled={disabled}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              currentMode === 'search'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            Tìm kiếm
          </button>
        </div>
      )}

      {/* Address Selection Component */}
      {currentMode === 'selector' && (
        <AddressSelector
          onAddressChange={handleSelectorChange}
          initialProvinceCode={initialProvinceCode}
          initialWardCode={initialWardCode}
          disabled={disabled}
          required={required}
          placeholder={{
            province: placeholder.province,
            ward: placeholder.ward
          }}
        />
      )}

      {currentMode === 'search' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Địa chỉ {required && <span className="text-red-500">*</span>}
          </label>
          <AddressSearch
            onAddressSelect={handleSearchSelect}
            placeholder={placeholder.search}
            disabled={disabled}
            required={required}
            value={searchValue}
            onChange={setSearchValue}
          />
        </div>
      )}

      {/* Manual Address Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Địa chỉ chi tiết {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          value={manualAddress}
          onChange={handleManualAddressChange}
          disabled={disabled}
          required={required}
          rows={3}
          className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 ${
            disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
          }`}
          placeholder={placeholder.manual}
        />
        <p className="mt-1 text-xs text-gray-500">
          Nhập số nhà, tên đường và các thông tin địa chỉ chi tiết khác
        </p>
      </div>

      {/* Help Text */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>💡 <strong>Gợi ý:</strong></p>
        <ul className="ml-4 space-y-1">
          <li>• Sử dụng "Chọn từ danh sách" để chọn chính xác tỉnh thành và phường xã</li>
          <li>• Sử dụng "Tìm kiếm" để nhanh chóng tìm địa điểm</li>
          <li>• Điền đầy đủ địa chỉ chi tiết để đảm bảo giao hàng chính xác</li>
        </ul>
      </div>
    </div>
  );
}