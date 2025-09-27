'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/services/api';
import type { Province, Ward, AdministrativeUnit } from '@/types';

interface CheckoutAddressData {
  province?: Province;
  ward?: Ward;
  administrativeUnit?: AdministrativeUnit;
  provinceCode?: string;
  wardCode?: string;
  fullAddress?: string;
  detailAddress?: string;
}

interface CheckoutAddressSelectorProps {
  onAddressChange: (address: CheckoutAddressData) => void;
  initialProvinceCode?: string;
  initialWardCode?: string;
  initialDetailAddress?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export default function CheckoutAddressSelector({
  onAddressChange,
  initialProvinceCode,
  initialWardCode,
  initialDetailAddress,
  disabled = false,
  required = false,
  className = ''
}: CheckoutAddressSelectorProps) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [administrativeUnits, setAdministrativeUnits] = useState<AdministrativeUnit[]>([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>(initialProvinceCode || '');
  const [selectedWardCode, setSelectedWardCode] = useState<string>(initialWardCode || '');
  const [detailAddress, setDetailAddress] = useState<string>(initialDetailAddress || '');
  const [loading, setLoading] = useState({
    provinces: false,
    wards: false,
    units: false
  });
  const [errors, setErrors] = useState({
    provinces: '',
    wards: '',
    detail: ''
  });

  // Load data on component mount
  useEffect(() => {
    loadProvinces();
    loadAdministrativeUnits();
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

  // Update parent component when address changes
  useEffect(() => {
    const selectedProvince = provinces.find(p => p.code === selectedProvinceCode);
    const selectedWard = wards.find(w => w.code === selectedWardCode);
    const selectedUnit = administrativeUnits.find(u => u.id === selectedProvince?.administrative_unit_id);

    let fullAddress = '';
    const addressParts = [];

    if (detailAddress.trim()) {
      addressParts.push(detailAddress.trim());
    }
    if (selectedWard) {
      addressParts.push(selectedWard.full_name);
    }
    if (selectedProvince) {
      addressParts.push(selectedProvince.full_name);
    }

    fullAddress = addressParts.join(', ');

    onAddressChange({
      province: selectedProvince,
      ward: selectedWard,
      administrativeUnit: selectedUnit,
      provinceCode: selectedProvinceCode || undefined,
      wardCode: selectedWardCode || undefined,
      fullAddress: fullAddress || undefined,
      detailAddress: detailAddress.trim() || undefined
    });
  }, [provinces, wards, administrativeUnits, selectedProvinceCode, selectedWardCode, detailAddress, onAddressChange]);

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

  const loadAdministrativeUnits = async () => {
    setLoading(prev => ({ ...prev, units: true }));

    try {
      const data = await apiClient.getAdministrativeUnits();
      setAdministrativeUnits(data);
    } catch (error: any) {
      console.error('Failed to load administrative units:', error);
    } finally {
      setLoading(prev => ({ ...prev, units: false }));
    }
  };

  const handleProvinceChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceCode = event.target.value;
    setSelectedProvinceCode(provinceCode);
    setSelectedWardCode(''); // Reset ward selection
  }, []);

  const handleWardChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const wardCode = event.target.value;
    setSelectedWardCode(wardCode);
  }, []);

  const handleDetailAddressChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetailAddress(event.target.value);
  }, []);

  const getProvinceDisplayName = (province: Province) => {
    if (province.type) {
      return `${province.type} ${province.name}`;
    }
    return province.full_name;
  };

  const getWardDisplayName = (ward: Ward) => {
    if (ward.administrative_unit_name) {
      return `${ward.administrative_unit_name} ${ward.name}`;
    }
    return ward.full_name;
  };

  // Group provinces by type for better UX
  const groupedProvinces = provinces.reduce((groups, province) => {
    const type = province.type || 'Khác';
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(province);
    return groups;
  }, {} as Record<string, Province[]>);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          📍 Thông tin giao hàng
        </h3>
        <p className="text-xs text-blue-600">
          Vui lòng chọn chính xác địa chỉ để đảm bảo giao hàng thành công
        </p>
      </div>

      {/* Province Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tỉnh/Thành phố {required && <span className="text-red-500">*</span>}
        </label>
        <select
          value={selectedProvinceCode}
          onChange={handleProvinceChange}
          disabled={disabled || loading.provinces}
          className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
            disabled || loading.provinces
              ? 'bg-gray-50 cursor-not-allowed'
              : 'bg-white'
          } ${errors.provinces ? 'border-red-500' : 'border-gray-300'}`}
          required={required}
        >
          <option value="">
            {loading.provinces ? 'Đang tải...' : 'Chọn Tỉnh/Thành phố'}
          </option>

          {Object.entries(groupedProvinces).map(([type, provinceList]) => (
            <optgroup key={type} label={type}>
              {provinceList.map((province) => (
                <option key={province.code} value={province.code}>
                  {getProvinceDisplayName(province)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {errors.provinces && (
          <p className="mt-1 text-sm text-red-600">{errors.provinces}</p>
        )}
      </div>

      {/* Ward Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phường/Xã {required && <span className="text-red-500">*</span>}
        </label>
        <select
          value={selectedWardCode}
          onChange={handleWardChange}
          disabled={disabled || loading.wards || !selectedProvinceCode}
          className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
            disabled || loading.wards || !selectedProvinceCode
              ? 'bg-gray-50 cursor-not-allowed'
              : 'bg-white'
          } ${errors.wards ? 'border-red-500' : 'border-gray-300'}`}
          required={required}
        >
          <option value="">
            {!selectedProvinceCode
              ? 'Vui lòng chọn tỉnh/thành phố trước'
              : loading.wards
                ? 'Đang tải...'
                : 'Chọn Phường/Xã'
            }
          </option>
          {wards.map((ward) => (
            <option key={ward.code} value={ward.code}>
              {getWardDisplayName(ward)}
            </option>
          ))}
        </select>
        {errors.wards && (
          <p className="mt-1 text-sm text-red-600">{errors.wards}</p>
        )}
      </div>

      {/* Detail Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Địa chỉ chi tiết {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          value={detailAddress}
          onChange={handleDetailAddressChange}
          disabled={disabled}
          required={required}
          rows={3}
          className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
            disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
          } ${errors.detail ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Nhập số nhà, tên đường, tòa nhà, chung cư..."
        />
        <p className="mt-1 text-xs text-gray-500">
          Ví dụ: Số 123 Đường Nguyễn Văn Cừ, Chung cư ABC, Tầng 5...
        </p>
        {errors.detail && (
          <p className="mt-1 text-sm text-red-600">{errors.detail}</p>
        )}
      </div>

      {/* Selected Address Summary */}
      {(selectedProvinceCode || selectedWardCode || detailAddress) && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-800 mb-2">
            📋 Địa chỉ giao hàng
          </h4>
          <div className="text-sm text-green-700">
            {detailAddress && (
              <div><strong>Địa chỉ:</strong> {detailAddress}</div>
            )}
            {selectedWardCode && wards.find(w => w.code === selectedWardCode) && (
              <div><strong>Phường/Xã:</strong> {getWardDisplayName(wards.find(w => w.code === selectedWardCode)!)}</div>
            )}
            {selectedProvinceCode && provinces.find(p => p.code === selectedProvinceCode) && (
              <div><strong>Tỉnh/TP:</strong> {getProvinceDisplayName(provinces.find(p => p.code === selectedProvinceCode)!)}</div>
            )}
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {(loading.provinces || loading.wards || loading.units) && (
        <div className="flex items-center text-sm text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          Đang tải dữ liệu địa chỉ...
        </div>
      )}
    </div>
  );
}