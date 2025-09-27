'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/services/api';
import type { Province, Ward } from '@/types';

interface AddressSelectorProps {
  onAddressChange: (address: {
    province?: Province;
    ward?: Ward;
    provinceCode?: string;
    wardCode?: string;
    fullAddress?: string;
  }) => void;
  initialProvinceCode?: string;
  initialWardCode?: string;
  disabled?: boolean;
  placeholder?: {
    province?: string;
    ward?: string;
  };
  required?: boolean;
  className?: string;
}

export default function AddressSelector({
  onAddressChange,
  initialProvinceCode,
  initialWardCode,
  disabled = false,
  placeholder = {
    province: 'Chọn Tỉnh/Thành phố',
    ward: 'Chọn Phường/Xã'
  },
  required = false,
  className = ''
}: AddressSelectorProps) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>(initialProvinceCode || '');
  const [selectedWardCode, setSelectedWardCode] = useState<string>(initialWardCode || '');
  const [loading, setLoading] = useState({
    provinces: false,
    wards: false
  });
  const [errors, setErrors] = useState({
    provinces: '',
    wards: ''
  });

  // Load provinces on component mount
  useEffect(() => {
    loadProvinces();
  }, []);

  // Load wards when province changes
  useEffect(() => {
    if (selectedProvinceCode) {
      loadWards(selectedProvinceCode);
    } else {
      setWards([]);
      setSelectedWardCode('');
    }
  }, [selectedProvinceCode]);

  // Load wards for initial ward code
  useEffect(() => {
    if (initialProvinceCode && !selectedProvinceCode) {
      setSelectedProvinceCode(initialProvinceCode);
    }
    if (initialWardCode && !selectedWardCode) {
      setSelectedWardCode(initialWardCode);
    }
  }, [initialProvinceCode, initialWardCode, selectedProvinceCode, selectedWardCode]);

  const loadProvinces = async () => {
    setLoading(prev => ({ ...prev, provinces: true }));
    setErrors(prev => ({ ...prev, provinces: '' }));

    try {
      const data = await apiClient.getProvinces();
      setProvinces(data);
    } catch (error: any) {
      console.error('Failed to load provinces:', error);
      setErrors(prev => ({
        ...prev,
        provinces: 'Không thể tải danh sách tỉnh/thành phố'
      }));
    } finally {
      setLoading(prev => ({ ...prev, provinces: false }));
    }
  };

  const loadWards = async (provinceCode: string) => {
    setLoading(prev => ({ ...prev, wards: true }));
    setErrors(prev => ({ ...prev, wards: '' }));

    try {
      const data = await apiClient.getWards(provinceCode);
      setWards(data);
    } catch (error: any) {
      console.error('Failed to load wards:', error);
      setErrors(prev => ({
        ...prev,
        wards: 'Không thể tải danh sách phường/xã'
      }));
      setWards([]);
    } finally {
      setLoading(prev => ({ ...prev, wards: false }));
    }
  };

  const handleProvinceChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceCode = event.target.value;
    setSelectedProvinceCode(provinceCode);
    setSelectedWardCode(''); // Reset ward selection

    const selectedProvince = provinces.find(p => p.code === provinceCode);

    onAddressChange({
      province: selectedProvince,
      ward: undefined,
      provinceCode: provinceCode || undefined,
      wardCode: undefined,
      fullAddress: selectedProvince ? selectedProvince.full_name : undefined
    });
  }, [provinces, onAddressChange]);

  const handleWardChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const wardCode = event.target.value;
    setSelectedWardCode(wardCode);

    const selectedProvince = provinces.find(p => p.code === selectedProvinceCode);
    const selectedWard = wards.find(w => w.code === wardCode);

    let fullAddress = '';
    if (selectedWard && selectedProvince) {
      fullAddress = `${selectedWard.full_name}, ${selectedProvince.full_name}`;
    } else if (selectedProvince) {
      fullAddress = selectedProvince.full_name;
    }

    onAddressChange({
      province: selectedProvince,
      ward: selectedWard,
      provinceCode: selectedProvinceCode || undefined,
      wardCode: wardCode || undefined,
      fullAddress: fullAddress || undefined
    });
  }, [provinces, wards, selectedProvinceCode, onAddressChange]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Province Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tỉnh/Thành phố {required && <span className="text-red-500">*</span>}
        </label>
        <select
          value={selectedProvinceCode}
          onChange={handleProvinceChange}
          disabled={disabled || loading.provinces}
          className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 ${
            disabled || loading.provinces
              ? 'bg-gray-50 cursor-not-allowed'
              : 'bg-white'
          } ${errors.provinces ? 'border-red-500' : ''}`}
          required={required}
        >
          <option value="">
            {loading.provinces ? 'Đang tải...' : placeholder.province}
          </option>
          {provinces.map((province) => (
            <option key={province.code} value={province.code}>
              {province.full_name}
            </option>
          ))}
        </select>
        {errors.provinces && (
          <p className="mt-1 text-sm text-red-600">{errors.provinces}</p>
        )}
      </div>

      {/* Ward Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phường/Xã {required && <span className="text-red-500">*</span>}
        </label>
        <select
          value={selectedWardCode}
          onChange={handleWardChange}
          disabled={disabled || loading.wards || !selectedProvinceCode}
          className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 ${
            disabled || loading.wards || !selectedProvinceCode
              ? 'bg-gray-50 cursor-not-allowed'
              : 'bg-white'
          } ${errors.wards ? 'border-red-500' : ''}`}
          required={required}
        >
          <option value="">
            {!selectedProvinceCode
              ? 'Vui lòng chọn tỉnh/thành phố trước'
              : loading.wards
                ? 'Đang tải...'
                : placeholder.ward
            }
          </option>
          {wards.map((ward) => (
            <option key={ward.code} value={ward.code}>
              {ward.full_name}
            </option>
          ))}
        </select>
        {errors.wards && (
          <p className="mt-1 text-sm text-red-600">{errors.wards}</p>
        )}
      </div>

      {/* Loading indicator */}
      {(loading.provinces || loading.wards) && (
        <div className="flex items-center text-sm text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          Đang tải dữ liệu...
        </div>
      )}
    </div>
  );
}