'use client';

import React, { useState, useEffect, useRef } from 'react';
import { apiClient } from '@/services/api';
import type { AddressSearchResult } from '@/types';

interface AddressSearchProps {
  onAddressSelect: (address: {
    type: 'province' | 'ward';
    code: string;
    name: string;
    full_name: string;
    province_name?: string;
  }) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export default function AddressSearch({
  onAddressSelect,
  placeholder = 'Tìm kiếm tỉnh thành, phường xã...',
  disabled = false,
  className = '',
  required = false,
  value = '',
  onChange
}: AddressSearchProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<AddressSearchResult>({ provinces: [], wards: [] });
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (value !== query) {
      setQuery(value);
    }
  }, [value]);

  useEffect(() => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Don't search for empty or very short queries
    if (!query.trim() || query.trim().length < 2) {
      setResults({ provinces: [], wards: [] });
      setShowResults(false);
      return;
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      searchAddresses(query.trim());
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query]);

  // Close results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchAddresses = async (searchQuery: string) => {
    setLoading(true);
    try {
      const data = await apiClient.searchAddresses(searchQuery);
      setResults(data);
      setShowResults(true);
      setSelectedIndex(-1);
    } catch (error: any) {
      console.error('Failed to search addresses:', error);
      setResults({ provinces: [], wards: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setQuery(newValue);
    onChange?.(newValue);
  };

  const handleInputFocus = () => {
    if ((results.provinces.length > 0 || results.wards.length > 0) && query.trim().length >= 2) {
      setShowResults(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allResults = [...results.provinces, ...results.wards];

    if (!showResults || allResults.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => (prev < allResults.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < allResults.length) {
          handleResultSelect(allResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowResults(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleResultSelect = (result: any) => {
    const displayText = result.type === 'ward'
      ? `${result.full_name}, ${result.province_name}`
      : result.full_name;

    setQuery(displayText);
    setShowResults(false);
    setSelectedIndex(-1);
    onChange?.(displayText);
    onAddressSelect(result);
  };

  const allResults = [...results.provinces, ...results.wards];
  const hasResults = allResults.length > 0;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:ring-blue-500 ${
            disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
          }`}
        />

        {/* Loading spinner */}
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Search icon when not loading */}
        {!loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        )}
      </div>

      {/* Search Results */}
      {showResults && hasResults && (
        <div
          ref={resultsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {/* Provinces */}
          {results.provinces.length > 0 && (
            <div>
              <div className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b">
                Tỉnh/Thành phố
              </div>
              {results.provinces.map((province, index) => (
                <div
                  key={`province-${province.code}`}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedIndex === index ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                  }`}
                  onClick={() => handleResultSelect(province)}
                >
                  <div className="font-medium">{province.name}</div>
                  <div className="text-sm text-gray-500">{province.full_name}</div>
                </div>
              ))}
            </div>
          )}

          {/* Wards */}
          {results.wards.length > 0 && (
            <div>
              <div className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b">
                Phường/Xã
              </div>
              {results.wards.map((ward, index) => (
                <div
                  key={`ward-${ward.code}`}
                  className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                    selectedIndex === results.provinces.length + index ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                  }`}
                  onClick={() => handleResultSelect(ward)}
                >
                  <div className="font-medium">{ward.name}</div>
                  <div className="text-sm text-gray-500">
                    {ward.full_name}, {ward.province_name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* No results message */}
      {showResults && !hasResults && !loading && query.trim().length >= 2 && (
        <div
          ref={resultsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <div className="px-3 py-4 text-sm text-gray-500 text-center">
            Không tìm thấy kết quả cho "{query}"
          </div>
        </div>
      )}
    </div>
  );
}